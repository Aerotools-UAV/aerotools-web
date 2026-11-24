// Formularios de contacto: envío por fetch a /api/contacto y modal "Consúltanos".
(function () {
  var MSG_OK = 'Gracias, tu mensaje se ha enviado correctamente.';
  var MSG_ERR = 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos a info@aerotools.es.';

  function mostrar(form, texto, ok) {
    var estado = form.querySelector('.contacto-estado');
    if (!estado) return;
    estado.textContent = texto;
    estado.style.color = ok ? '#1a7f37' : '#b42318';
  }

  function iniciarForm(form, primero) {
    var boton = form.querySelector('button[type="submit"]');

    // Si el JS falla y se envía como formulario normal, la función redirige con ?enviado / ?error
    if (primero) {
      var q = new URLSearchParams(location.search);
      if (q.has('enviado')) mostrar(form, MSG_OK, true);
      if (q.has('error')) mostrar(form, MSG_ERR, false);
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var datos = Object.fromEntries(new FormData(form).entries());
      // La API no tiene campo asunto: se antepone al mensaje
      if (datos.asunto) datos.mensaje = 'Asunto: ' + datos.asunto + '\n\n' + (datos.mensaje || '');
      delete datos.asunto;

      boton.disabled = true;
      mostrar(form, 'Enviando…', true);

      fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            mostrar(form, MSG_OK, true);
          } else {
            mostrar(form, res.error || 'No se pudo enviar el mensaje. Inténtalo de nuevo.', false);
          }
        })
        .catch(function () {
          mostrar(form, 'Error de conexión. Inténtalo de nuevo o escríbenos a info@aerotools.es.', false);
        })
        .finally(function () { boton.disabled = false; });
    });
  }

  var forms = document.querySelectorAll('form[data-contacto]');
  for (var i = 0; i < forms.length; i++) iniciarForm(forms[i], i === 0);

  // Mapa de Google: se carga solo al pulsar el botón
  var mapaBtn = document.querySelector('.aw-mapa-btn');
  if (mapaBtn) mapaBtn.addEventListener('click', function () {
    var fr = mapaBtn.parentNode.querySelector('iframe[data-src]');
    if (fr) fr.src = fr.getAttribute('data-src');
    mapaBtn.remove();
  });

  // Modal "Consúltanos" (sustituye al popup de Elementor Pro)
  var modal = document.getElementById('consultanos');
  if (!modal) return;
  var dialogo = modal.querySelector('.aw-modal__dialog');
  var previo = null;

  function abrir() {
    previo = document.activeElement;
    modal.hidden = false;
    document.documentElement.classList.add('aw-modal-abierto');
    var primer = modal.querySelector('input:not([type="hidden"]), textarea');
    (primer || dialogo).focus();
  }
  function cerrar() {
    modal.hidden = true;
    document.documentElement.classList.remove('aw-modal-abierto');
    if (previo && previo.focus) previo.focus();
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href="#consultanos"]');
    if (a) { ev.preventDefault(); abrir(); return; }
    if (!modal.hidden && ev.target.closest('[data-cerrar]')) cerrar();
  });
  document.addEventListener('keydown', function (ev) {
    if (modal.hidden) return;
    if (ev.key === 'Escape') { cerrar(); return; }
    if (ev.key === 'Tab') { // atrapa el foco dentro del modal
      var f = modal.querySelectorAll('button, input:not([type="hidden"]):not([tabindex="-1"]), textarea, a[href]');
      if (!f.length) return;
      var ini = f[0], fin = f[f.length - 1];
      if (ev.shiftKey && document.activeElement === ini) { ev.preventDefault(); fin.focus(); }
      else if (!ev.shiftKey && document.activeElement === fin) { ev.preventDefault(); ini.focus(); }
    }
  });
  if (location.hash === '#consultanos') abrir();
})();
