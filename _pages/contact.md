---
layout: single
title: "Contact"
permalink: /contact/
author_profile: false
---

Here are low-friction ways to get in touch without exposing personal email addresses.

## Options
- Connect on LinkedIn: <a href="{{ site.contact.linkedin_url }}" rel="noopener">LinkedIn profile</a>.
{% if site.contact.scheduling_url and site.contact.scheduling_url != "" %}
- Schedule a time: <a href="{{ site.contact.scheduling_url }}" rel="noopener">Book a call</a>.
{% endif %}
- Use the alias email below. It is protected until you click to reveal it.

<div class="contact-alias">
  <button type="button" class="btn btn--primary" id="reveal-email">Reveal email alias</button>
  <p id="contact-email" data-user="{{ site.contact.alias_email | split: '@' | first }}" data-domain="{{ site.contact.alias_email | split: '@' | last | split: '' | reverse | join: '' }}" aria-live="polite"></p>
  <p class="contact-note">This alias is guarded to reduce spam and forwards to the right inbox.</p>
</div>

{% if site.contact.formspree_endpoint and site.contact.formspree_endpoint != "" %}
## Contact form
<form action="{{ site.contact.formspree_endpoint }}" method="POST" class="contact-form">
  <label for="contact-name">Name</label>
  <input id="contact-name" type="text" name="name" required>

  <label for="contact-email-field">Email</label>
  <input id="contact-email-field" type="email" name="email" required>

  <label for="contact-message">Message</label>
  <textarea id="contact-message" name="message" rows="4" required></textarea>

  <input type="text" name="_gotcha" style="display:none">
  <p class="contact-note">Form submissions are handled by the configured provider. Enable reCAPTCHA in the provider settings for extra spam protection.</p>
  <button type="submit" class="btn btn--primary">Send</button>
</form>
{% endif %}

<script>
  (function() {
    var button = document.getElementById('reveal-email');
    var target = document.getElementById('contact-email');
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
      button.textContent = 'Alias revealed';
    });
  })();
</script>
