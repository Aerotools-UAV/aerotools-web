// Cloudflare Pages Function: POST /api/contacto
// Env: APPS_SCRIPT_URL (texto), CONTACT_SECRET (secret).
// Opcional: CONTACT_KV (binding KV) para rate-limit.

const LIMITES = { nombre: 100, email: 150, telefono: 30, empresa: 120, mensaje: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_POR_HORA = 5;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

async function leerCuerpo(request) {
  const tipo = request.headers.get('Content-Type') || '';
  if (tipo.includes('application/json')) return await request.json();
  return Object.fromEntries((await request.formData()).entries());
}

// TODO: sin KV no hay rate-limit. Crear un KV namespace, enlazarlo como CONTACT_KV
// en Pages (Settings -> Bindings) y/o activar Cloudflare Turnstile.
async function limitado(env, request) {
  if (!env.CONTACT_KV) return false;
  const ip = request.headers.get('CF-Connecting-IP') || 'desconocida';
  const clave = `rl:${ip}`;
  const n = parseInt((await env.CONTACT_KV.get(clave)) || '0', 10);
  if (n >= MAX_POR_HORA) return true;
  await env.CONTACT_KV.put(clave, String(n + 1), { expirationTtl: 3600 });
  return false;
}

export async function onRequestPost({ request, env }) {
  const quiereJson = (request.headers.get('Accept') || '').includes('application/json');
  const salir = (ok, status, mensaje) => {
    if (quiereJson) return json(ok ? { ok: true } : { ok: false, error: mensaje }, status);
    const destino = new URL(ok ? '/contacto/?enviado=1' : '/contacto/?error=1', request.url);
    return Response.redirect(destino.toString(), 303);
  };

  let datos;
  try {
    datos = await leerCuerpo(request);
  } catch {
    return salir(false, 400, 'Petición no válida');
  }

  // Honeypot: se responde como si fuera OK para no avisar al bot
  if (String(datos.website || '').trim() !== '') return salir(true, 200);

  const c = {};
  for (const k of Object.keys(LIMITES)) {
    const v = String(datos[k] ?? '').trim();
    if (v.length > LIMITES[k]) return salir(false, 400, 'Campo demasiado largo');
    c[k] = v;
  }
  if (!c.nombre || !c.mensaje) return salir(false, 400, 'Faltan campos obligatorios');
  if (!EMAIL_RE.test(c.email)) return salir(false, 400, 'Email no válido');

  if (await limitado(env, request)) return salir(false, 429, 'Demasiados envíos, inténtalo más tarde');

  if (!env.APPS_SCRIPT_URL || !env.CONTACT_SECRET) return salir(false, 500, 'Servicio no configurado');

  try {
    // Apps Script responde con 302 a googleusercontent; fetch lo sigue (POST pasa a GET en la redirección)
    const r = await fetch(env.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...c, token: env.CONTACT_SECRET }),
      redirect: 'follow',
    });
    const res = await r.json();
    if (!res.ok) return salir(false, 502, 'No se pudo enviar el mensaje');
  } catch {
    return salir(false, 502, 'No se pudo enviar el mensaje');
  }
  return salir(true, 200);
}
