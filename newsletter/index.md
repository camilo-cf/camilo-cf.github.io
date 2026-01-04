---
layout: single
title: "Newsletter"
permalink: /newsletter/
author_profile: false
---

Stay up to date with new posts, playbooks, and case studies. Choose the best way for you to subscribe.

<p><a class="btn" href="{{ "/feed.xml" | relative_url }}">Subscribe via RSS/Atom</a></p>

{% if site.newsletter.embed_html %}
  <div class="newsletter-embed">
    {{ site.newsletter.embed_html }}
  </div>
{% elsif site.newsletter.form_action %}
  <form action="{{ site.newsletter.form_action }}" method="post" class="newsletter-form">
    <label for="newsletter-email">Email</label>
    <input id="newsletter-email" type="email" name="email" required>
    <div class="newsletter-form__hint">Double opt-in is recommended; check your inbox for confirmation after submitting.</div>
    <button type="submit" class="btn btn--primary">Subscribe</button>
  </form>
{% else %}
  <p>Provider-hosted embeds can be added via <code>newsletter.embed_html</code> in <code>_config.yml</code>. Until then, use the RSS feed above to stay updated.</p>
{% endif %}

<p class="newsletter-note">All signups are handled by the configured email provider; this site does not store your email locally.</p>
