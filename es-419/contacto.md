---
layout: single
title: "Contacto"
permalink: /es-419/contacto/
author_profile: false
lang: "es-419"
i18n_key: "contact"
ref: "contact"
---

Opciones para contactarme sin exponer correos personales.

## Opciones
- Conecta en LinkedIn: <a href="{{ site.contact.linkedin_url }}" rel="noopener">Perfil en LinkedIn</a>.
{% if site.contact.scheduling_url and site.contact.scheduling_url != "" %}
- Agenda una llamada: <a href="{{ site.contact.scheduling_url }}" rel="noopener">Reserva aquí</a>.
{% endif %}
- Usa el alias protegido abajo. Solo se revela al hacer clic.

<div class="contact-alias">
  <button type="button" class="btn btn--primary" id="reveal-email-es">Mostrar alias</button>
  <p id="contact-email-es" data-user="{{ site.contact.alias_email | split: '@' | first }}" data-domain="{{ site.contact.alias_email | split: '@' | last | split: '' | reverse | join: '' }}" aria-live="polite"></p>
  <p class="contact-note">El alias está protegido para reducir spam.</p>
</div>

{% if site.contact.formspree_endpoint and site.contact.formspree_endpoint != "" %}
## Formulario
<form action="{{ site.contact.formspree_endpoint }}" method="POST" class="contact-form">
  <label for="contact-name-es">Nombre</label>
  <input id="contact-name-es" type="text" name="name" required>

  <label for="contact-email-field-es">Email</label>
  <input id="contact-email-field-es" type="email" name="email" required>

  <label for="contact-message-es">Mensaje</label>
  <textarea id="contact-message-es" name="message" rows="4" required></textarea>

  <input type="text" name="_gotcha" style="display:none">
  <p class="contact-note">Las respuestas las maneja el proveedor configurado. Activa reCAPTCHA en el proveedor para más protección.</p>
  <button type="submit" class="btn btn--primary">Enviar</button>
</form>
{% endif %}

<script>
  (function() {
    var button = document.getElementById('reveal-email-es');
    var target = document.getElementById('contact-email-es');
    if (!button || !target) return;

    button.addEventListener('click', function() {
      var user = target.getAttribute('data-user');
      var reversedDomain = target.getAttribute('data-domain');
      if (!user || !reversedDomain) return;
      var domain = reversedDomain.split('').reverse().join('');
      var email = user + '@' + domain;
      var link = document.createElement('a');
      link.href = 'mailto:' + email;
      link.textContent = email;
      target.innerHTML = '';
      target.appendChild(link);
      button.setAttribute('disabled', 'disabled');
      button.textContent = 'Alias revelado';
    });
  })();
</script>
