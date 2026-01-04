---
layout: single
title: "Contato"
permalink: /pt-br/contato/
author_profile: false
lang: "pt-BR"
i18n_key: "contact"
ref: "contact"
---

Formas rápidas de falar comigo sem expor e-mails pessoais.

## Opções
- Conecte no LinkedIn: <a href="{{ site.contact.linkedin_url }}" rel="noopener">Perfil no LinkedIn</a>.
{% if site.contact.scheduling_url and site.contact.scheduling_url != "" %}
- Agende um horário: <a href="{{ site.contact.scheduling_url }}" rel="noopener">Reserve aqui</a>.
{% endif %}
- Use o alias protegido abaixo. Ele só aparece depois do clique.

<div class="contact-alias">
  <button type="button" class="btn btn--primary" id="reveal-email-pt">Mostrar alias</button>
  <p id="contact-email-pt" data-user="{{ site.contact.alias_email | split: '@' | first }}" data-domain="{{ site.contact.alias_email | split: '@' | last | split: '' | reverse | join: '' }}" aria-live="polite"></p>
  <p class="contact-note">O alias reduz spam e encaminha para a caixa certa.</p>
</div>

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

<script>
  (function() {
    var button = document.getElementById('reveal-email-pt');
    var target = document.getElementById('contact-email-pt');
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
