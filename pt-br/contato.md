---
layout: single
title: "Contato"
permalink: /pt-br/contato/
author_profile: false
lang: "pt-br"
i18n_key: "contact"
ref: "contact"
---

Formas rápidas de falar comigo.

## Opções
- Conecte no LinkedIn: <a href="{{ site.contact.linkedin_url }}" rel="noopener">Perfil no LinkedIn</a>.
{% if site.contact.scheduling_url and site.contact.scheduling_url != "" %}
- Agende um horário: <a href="{{ site.contact.scheduling_url }}" rel="noopener">Reserve aqui</a>.
{% endif %}

{% if site.contact.formspree_endpoint and site.contact.formspree_endpoint != "" %}
## Formulário
<form action="{{ site.contact.formspree_endpoint }}" method="POST" class="contact-form">
  <label for="contact-name-pt">Nome</label>
  <input id="contact-name-pt" type="text" name="name" required>

  <label for="contact-email-field-pt">Email</label>
  <input id="contact-email-field-pt" type="email" name="email" required>

  <label for="contact-message-pt">Mensagem</label>
  <textarea id="contact-message-pt" name="message" rows="4" required></textarea>

  <input type="text" name="_gotcha" style="display:none">
  <p class="contact-note">Envios são tratados pelo provedor configurado. Ative reCAPTCHA ou CAPTCHA no provedor para mais proteção.</p>
  <button type="submit" class="btn btn--primary">Enviar</button>
</form>
{% endif %}
