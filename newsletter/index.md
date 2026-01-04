---
layout: single
title: "Newsletter"
permalink: /newsletter/
author_profile: false
---

Stay up to date with new posts, playbooks, and case studies. Choose the best way for you to subscribe.

{% if site.newsletter.embed_html %}
  {{ site.newsletter.embed_html }}
{% elsif site.newsletter.form_action %}
  <form action="{{ site.newsletter.form_action }}" method="post" class="newsletter-form">
    <label for="newsletter-email">Email</label>
    <input id="newsletter-email" type="email" name="email" required>
    <button type="submit" class="btn btn--primary">Subscribe</button>
  </form>
{% else %}
  <p>You can subscribe by sending me a quick note. I will add you to the list manually.</p>
  <p><a class="btn btn--primary" href="mailto:{{ site.newsletter.fallback_email }}">Subscribe via email</a></p>
{% endif %}
