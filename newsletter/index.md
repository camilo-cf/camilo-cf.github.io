---
layout: single
title: "Newsletter"
permalink: /newsletter/
author_profile: false
lang: "en"
i18n_key: "newsletter"
ref: "newsletter"
---

{% assign locale_copy = site.data.newsletter[page.lang] | default: site.data.newsletter[site.lang] | default: site.data.newsletter.en %}

{{ locale_copy.intro }}

<p><a class="btn" href="{{ "/feed.xml" | relative_url }}">{{ locale_copy.rss_label }}</a></p>

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
  <p>{{ locale_copy.provider_hint }}</p>
{% endif %}

<p class="newsletter-note">All signups are handled by the configured email provider; this site does not store your email locally.</p>
