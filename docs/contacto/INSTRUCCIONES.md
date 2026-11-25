# Formulario de contacto aerotools.es (Apps Script + Cloudflare Pages)

## 1. Apps Script (cuenta info@aerotools.es)
1. Generar el secreto: `openssl rand -hex 24` (guardarlo, es el mismo para los dos lados).
2. En https://script.google.com con info@aerotools.es: Nuevo proyecto, pegar `Code.gs`.
3. Project Settings (engranaje) → Script properties → añadir `SHARED_SECRET` = secreto generado.
4. Deploy → New deployment → tipo Web app. Execute as: **Me**. Who has access: **Anyone**. Deploy.
5. Aceptar los permisos (enviar correo) y copiar la URL `.../exec`.
6. Si se cambia el código: Deploy → Manage deployments → editar → nueva versión (la URL se mantiene).

## 2. Cloudflare Pages (proyecto aerotools-web)
Settings → Variables and secrets, en **Production y Preview**:
- `APPS_SCRIPT_URL` (texto) = URL `/exec` del paso 1.5
- `CONTACT_SECRET` (secret) = mismo valor que `SHARED_SECRET`

Redeploy para que apliquen.

## 3. Repo (cuando toque subirlo)
- `functions/api/contacto.js` → `functions/api/contacto.js`
- `contacto.js` → `assets/contacto.js` (más `assets/contacto.css`)
- `form-snippet.html` → sustituye el formulario Elementor en `/contacto/`

## Notas
- Rate-limit: sin KV está desactivado. Para activarlo, enlazar un KV como `CONTACT_KV` (5 envíos/hora por IP). Opcional: Turnstile.
- Prueba rápida: `curl -X POST https://aerotools.es/api/contacto -H 'Accept: application/json' -H 'Content-Type: application/json' -d '{"nombre":"Test","email":"a@b.es","mensaje":"hola"}'`

## 4. Probar en local (localhost)
`npm run dev` (Astro) no ejecuta Pages Functions: ahí el formulario da «Respuesta no válida del servidor».
1. `cp .dev.vars.example .dev.vars` y rellenar `CONTACT_SECRET` (pedírselo a Rodrigo, nunca en el repo). `.dev.vars` está en `.gitignore`.
2. `npm run build && npx wrangler pages dev dist --port 8788`
3. Abrir http://localhost:8788/contacto/ y enviar. Cada envío = correo real a info@aerotools.es: poner «PRUEBA» en el nombre.
