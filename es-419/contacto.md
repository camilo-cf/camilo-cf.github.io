---
layout: single
title: "Contacto"
permalink: /es-419/contacto/
author_profile: false
lang: "es-419"
i18n_key: "contact"
ref: "contact"
---

Opciones para contactarme.

## Opciones
- Conecta en LinkedIn: <a href="{{ site.contact.linkedin_url }}" rel="noopener">Perfil en LinkedIn</a>.
{% if site.contact.scheduling_url and site.contact.scheduling_url != "" %}
- Agenda una llamada: <a href="{{ site.contact.scheduling_url }}" rel="noopener">Reserva aquí</a>.
{% endif %}

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
