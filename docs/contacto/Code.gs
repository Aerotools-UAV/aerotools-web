// Web app de Google Apps Script: recibe el formulario de contacto y lo envía por email.
// Script property requerida: SHARED_SECRET

var DESTINO = 'info@aerotools.es';
var LIMITES = { nombre: 100, email: 150, telefono: 30, empresa: 120, mensaje: 5000 };
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function respuesta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function error(codigo, mensaje) {
  // Apps Script no permite fijar el status HTTP; se devuelve en el JSON.
  return respuesta({ ok: false, status: codigo, error: mensaje });
}

function doPost(e) {
  var datos;
  try {
    datos = JSON.parse(e.postData.contents);
  } catch (err) {
    return error(400, 'JSON inválido');
  }

  var secreto = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
  if (!secreto || datos.token !== secreto) return error(403, 'No autorizado');

  var c = {};
  var campos = ['nombre', 'email', 'telefono', 'empresa', 'mensaje'];
  for (var i = 0; i < campos.length; i++) {
    var k = campos[i];
    var v = datos[k] == null ? '' : String(datos[k]).trim();
    if (v.length > LIMITES[k]) return error(400, 'Campo demasiado largo: ' + k);
    c[k] = v;
  }
  if (!c.nombre || !c.mensaje) return error(400, 'Faltan campos obligatorios');
  if (!EMAIL_RE.test(c.email)) return error(400, 'Email no válido');
  // Evita inyección de cabeceras en asunto / replyTo
  if (/[\r\n]/.test(c.nombre + c.email)) return error(400, 'Caracteres no válidos');

  var fecha = Utilities.formatDate(new Date(), 'Europe/Madrid', 'dd/MM/yyyy HH:mm:ss');
  var cuerpo =
    'Nuevo mensaje desde el formulario de contacto de aerotools.es\n\n' +
    'Fecha: ' + fecha + ' (Europe/Madrid)\n' +
    'Nombre: ' + c.nombre + '\n' +
    'Email: ' + c.email + '\n' +
    'Teléfono: ' + (c.telefono || '-') + '\n' +
    'Empresa: ' + (c.empresa || '-') + '\n\n' +
    'Mensaje:\n' + c.mensaje + '\n';

  MailApp.sendEmail({
    to: DESTINO,
    replyTo: c.email,
    name: 'Web Aerotools',
    noReply: true,
    subject: 'Web aerotools.es — contacto de ' + c.nombre,
    body: cuerpo
  });

  return respuesta({ ok: true });
}
