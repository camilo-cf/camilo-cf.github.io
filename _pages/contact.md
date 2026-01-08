---
layout: single
title: "Contact"
permalink: /en/contact/
author_profile: false
lang: "en"
i18n_key: "contact"
ref: "contact"
---

Here are low-friction ways to get in touch.

## Options
- Connect on LinkedIn: <a href="{{ site.contact.linkedin_url }}" rel="noopener">LinkedIn profile</a>.
{% if site.contact.scheduling_url and site.contact.scheduling_url != "" %}
- Schedule a time: <a href="{{ site.contact.scheduling_url }}" rel="noopener">Book a call</a>.
{% endif %}

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
  <p class="contact-note">Form submissions are handled by the configured provider. Enable reCAPTCHA or CAPTCHA in the provider settings for extra spam protection.</p>
  <button type="submit" class="btn btn--primary">Send</button>
</form>
{% endif %}
