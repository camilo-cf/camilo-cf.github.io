---
layout: single
title: "Newsletter"
permalink: /es-419/newsletter/
author_profile: false
lang: "es-419"
i18n_key: "newsletter"
ref: "newsletter"
---

{% assign locale_copy = site.data.newsletter[page.lang] | default: site.data.newsletter.en %}

<div class="newsletter-hero">
  <p class="newsletter-hero__intro">{{ locale_copy.intro }}</p>
</div>

<section class="newsletter-primary">
  <h2>📡 RSS / Atom (Principal)</h2>
  <p>No requiere email. Recibe actualizaciones en tu lector de RSS favorito:</p>
  <p><a class="btn btn--primary btn--large" href="{{ "/feed.xml" | relative_url }}">{{ locale_copy.rss_label }}</a></p>
  <p class="newsletter-note">Lectores recomendados: <a href="https://feedly.com" rel="noopener">Feedly</a>, <a href="https://www.inoreader.com" rel="noopener">Inoreader</a>, <a href="https://netnewswire.com" rel="noopener">NetNewsWire</a></p>
</section>

{% if site.newsletter.embed_html or site.newsletter.form_action %}
<section class="newsletter-optional">
  <h2>📧 Email (Opcional)</h2>
  <p>¿Prefieres email? Suscríbete abajo. Privacidad primero: sin rastreo, cancela cuando quieras.</p>

  {% if site.newsletter.embed_html %}
    <div class="newsletter-embed">
      {{ site.newsletter.embed_html }}
    </div>
  {% elsif site.newsletter.form_action %}
    <form action="{{ site.newsletter.form_action }}" method="post" class="newsletter-form">
      <label for="newsletter-email-es">Email</label>
      <input id="newsletter-email-es" type="email" name="email" required>
      <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
      <div class="newsletter-form__hint">Se recomienda doble confirmación. Revisa tu bandeja de entrada.</div>
      <button type="submit" class="btn btn--primary">Suscribirse</button>
    </form>
  {% endif %}

  <p class="newsletter-note">{{ site.newsletter.provider | default: "El proveedor configurado" }} maneja las suscripciones. Este sitio no almacena tu email.</p>
</section>
{% endif %}

<style>
.newsletter-hero {
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}
.newsletter-hero__intro {
  font-size: 1.2rem;
  margin: 0;
}
.newsletter-primary {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 2px solid #667eea;
  border-radius: 8px;
}
.newsletter-optional {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #f9fafb;
}
.btn--large {
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
}
.newsletter-note {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}
.newsletter-form {
  max-width: 400px;
}
.newsletter-form label {
  display: block;
  margin-top: 0.75rem;
  font-weight: 600;
}
.newsletter-form input[type="email"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.25rem;
}
.newsletter-form__hint {
  font-size: 0.85rem;
  color: #666;
  margin: 0.5rem 0;
}
</style>
