# aerotools-web

Código de la nueva web de Aerotools.

## Flujo de trabajo

Publicación con Cloudflare Pages (proyecto `aerotools-web`):
- Se trabaja en la rama `dev`: cada push se ve en https://dev.aerotools-web.pages.dev
- Cuando guste el resultado, merge de `dev` a `main`: se publica en https://prueba.aerotools.es (y https://aerotools-web.pages.dev). www pendiente.

El repo es público: nunca subir claves, secretos ni credenciales.

## Formulario de contacto y analítica

- Formulario: `assets/contacto.js` envía por fetch a una Cloudflare Pages Function (`functions/api/contacto.js`), que reenvía a un Google Apps Script (`docs/contacto/Code.gs`) que manda el correo. Pasos de puesta en marcha en `docs/contacto/INSTRUCCIONES.md`. Variables en Cloudflare Pages (Production y Preview): `APPS_SCRIPT_URL` y `CONTACT_SECRET` (secret).
- Analítica: Cloudflare Web Analytics (sin cookies); se activa desde el panel de Cloudflare, no hay código en el repo.
- Sin WordPress en servidor: el buscador, los comentarios, el banner de cookies y Google Analytics se han eliminado; el popup "+ info" es un modal estático (`#consultanos`).
