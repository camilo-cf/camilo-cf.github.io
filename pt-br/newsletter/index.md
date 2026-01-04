---
layout: single
title: "Newsletter"
permalink: /pt-br/newsletter/
author_profile: false
lang: "pt-BR"
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
    <label for="newsletter-email-pt">Email</label>
    <input id="newsletter-email-pt" type="email" name="email" required>
    <div class="newsletter-form__hint">A confirmação dupla é recomendada.</div>
    <button type="submit" class="btn btn--primary">Assinar</button>
  </form>
{% else %}
  <p>{{ locale_copy.provider_hint }}</p>
{% endif %}

<p class="newsletter-note">O provedor configurado gerencia as inscrições; o site não armazena seu email.</p>
