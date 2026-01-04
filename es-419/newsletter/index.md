---
layout: single
title: "Newsletter"
permalink: /es-419/newsletter/
author_profile: false
lang: "es-419"
i18n_key: "newsletter"
---

{% assign locale_copy = site.data.newsletter[page.lang] | default: site.data.newsletter.en %}

{{ locale_copy.intro }}

<p><a class="btn" href="{{ "/feed.xml" | relative_url }}">{{ locale_copy.rss_label }}</a></p>

{% if site.newsletter.embed_html %}
  <div class="newsletter-embed">
    {{ site.newsletter.embed_html }}
  </div>
{% elsif site.newsletter.form_action %}
  <form action="{{ site.newsletter.form_action }}" method="post" class="newsletter-form">
    <label for="newsletter-email-es">Email</label>
    <input id="newsletter-email-es" type="email" name="email" required>
    <div class="newsletter-form__hint">La doble confirmación es recomendada.</div>
    <button type="submit" class="btn btn--primary">Suscribirse</button>
  </form>
{% else %}
  <p>{{ locale_copy.provider_hint }}</p>
{% endif %}

<p class="newsletter-note">El proveedor configurado maneja los registros; el sitio no almacena tu email.</p>
