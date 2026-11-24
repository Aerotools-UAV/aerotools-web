# aerotools-web

Código de la nueva web de Aerotools.

## Flujo de trabajo

Publicación con Cloudflare Pages (proyecto `aerotools-web`):
- `dev` = rama de trabajo, sin publicar: se prueba en local con `python3 -m http.server 8080`.
- `main` = lo publicado en https://prueba.aerotools.es (merge de `dev` a `main`). www pendiente.

El repo es público: nunca subir claves, secretos ni credenciales.

## Formulario de contacto y analítica

- Formulario: `assets/contacto.js` envía por fetch a una Cloudflare Pages Function (`functions/api/contacto.js`), que reenvía a un Google Apps Script (`docs/contacto/Code.gs`) que manda el correo. Pasos de puesta en marcha en `docs/contacto/INSTRUCCIONES.md`. Variables en Cloudflare Pages (Production y Preview): `APPS_SCRIPT_URL` y `CONTACT_SECRET` (secret).
- Analítica: Cloudflare Web Analytics (sin cookies); se activa desde el panel de Cloudflare, no hay código en el repo.
- Sin WordPress en servidor: el buscador, los comentarios, el banner de cookies y Google Analytics se han eliminado; el popup "+ info" es un modal estático (`#consultanos`).
