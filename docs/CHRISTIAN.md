# Rehacer la web aerotools.es (Christian)

## Objetivo
Rehacer la web en Astro + Tailwind sustituyendo el mirror de WordPress actual. Mismo contenido de partida, diseño propio.

## Cómo se trabaja
- Rama `dev` = trabajo (no se publica). `main` = publicada en https://prueba.aerotools.es (Cloudflare Pages, proyecto `aerotools-web`).
- Prueba local del diseño: `npm run dev` (Astro, http://localhost:4321). Ahí el formulario da «Respuesta no válida del servidor»: es normal, `/api/contacto` no existe en Astro.
- Prueba local con formulario: ver «Probar el formulario en local».
- Merge a `main` solo cuando Rodrigo lo revise.
- Al pasar a Astro, Rodrigo cambia en Pages: build `npm run build`, salida `dist`.

## Formulario de contacto (ya funciona, no hay que tocar backend)
- API: `POST /api/contacto` (Pages Function en `functions/api/contacto.js`). **Mantener la carpeta `functions/` en la raíz del repo.**
- Campos: `nombre`, `email`, `mensaje` obligatorios; `telefono`, `empresa` opcionales; `website` = campo oculto vacío (anti-bots, no mostrar).
- Acepta JSON o form. Con cabecera `Accept: application/json` responde `{ok:true}` o `{ok:false,error:"..."}`.
- Envía el correo a info@aerotools.es (Apps Script). Secretos ya configurados en Pages: no los necesitas.

```js
const r = await fetch('/api/contacto', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify({ nombre, email, telefono, empresa, mensaje, website: '' })
});
const { ok, error } = await r.json();
```

## Probar el formulario en local
`npm run dev` no ejecuta Pages Functions. Para probar el envío real:

1. `cp .dev.vars.example .dev.vars` y rellena `CONTACT_SECRET` (pídeselo a Rodrigo; nunca por chat público ni en el repo). `.dev.vars` está en `.gitignore`.
2. `npm run build && npx wrangler pages dev dist --port 8788`
3. Abre http://localhost:8788/contacto/ y envía.

Cada envío manda un correo real a info@aerotools.es: pon «PRUEBA» en el nombre y no abuses.

## No tocar
- DNS de aerotools.es (www/apex siguen en Igasoft hasta OK de Rodrigo).
- Variables/secretos de Pages, `docs/contacto/`.

## Criterio de aceptación
- Todas las páginas actuales (inicio, contacto, aviso legal, privacidad, accesibilidad, mapa web) rehechas.
- Responsive, sin cookies de terceros, formulario enviando OK desde prueba.aerotools.es.
