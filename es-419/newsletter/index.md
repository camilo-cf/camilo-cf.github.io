---
layout: single
title: "Newsletter"
permalink: /es-419/newsletter/
author_profile: false
lang: "es-419"
i18n_key: "newsletter"
ref: "newsletter"
description: "Suscríbete a insights de ML e IA vía RSS o email. Actualizaciones de sistemas de ML en producción, GenAI, MLOps y medición causal."
excerpt: "Recibe actualizaciones sobre ML en producción, GenAI e insights de MLOps."
---

<div class="newsletter-hero">
  <h2 style="color: white; margin-top: 0;">Mantente actualizado en ML en producción y GenAI</h2>
  <p style="margin-bottom: 0;">Deep dives en sistemas de ML, medición causal, patrones de MLOps y seguridad de GenAI. Escrito para ingenieros que lanzan a producción.</p>
</div>

<section class="newsletter-primary">
  <h2>📡 RSS / Atom (Recomendado)</h2>
  <p>No requiere email. Recibe actualizaciones en tu lector RSS favorito:</p>
  <p><a class="btn btn--primary btn--large" href="{{ "/feed.xml" | relative_url }}">Suscribirse vía RSS</a></p>
  <p class="newsletter-note">Lectores recomendados: <a href="https://feedly.com" rel="noopener">Feedly</a>, <a href="https://www.inoreader.com" rel="noopener">Inoreader</a>, <a href="https://netnewswire.com" rel="noopener">NetNewsWire</a></p>
</section>

{% if site.newsletter.embed_html or site.newsletter.form_action %}
<section class="newsletter-optional">
  <h2>📧 Email (Opcional)</h2>
  <p>¿Prefieres email? Suscríbete abajo. Privacy-first: sin tracking, cancela cuando quieras.</p>

  {% if site.newsletter.embed_html %}
    <div class="newsletter-embed">
      {{ site.newsletter.embed_html }}
    </div>
  {% elsif site.newsletter.form_action %}
    <form action="{{ site.newsletter.form_action }}" method="post" class="newsletter-form">
      <label for="newsletter-email">Email</label>
      <input id="newsletter-email" type="email" name="email" required>
      <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
      <div class="newsletter-form__hint">Double opt-in recomendado. Verifica tu inbox para confirmación.</div>
      <button type="submit" class="btn btn--primary">Suscribirse</button>
    </form>
  {% endif %}

  <p class="newsletter-note">Suscripciones por email manejadas por {{ site.newsletter.provider | default: "el proveedor configurado" }}. Este sitio no almacena tu email.</p>
</section>
{% endif %}

## Qué recibirás

**Temas cubiertos:**
- **Sistemas de ML en producción** — Planos de control, patrones de rollback, observabilidad por defecto
- **Evaluación y seguridad de GenAI** — LLM-as-judge, loops de evaluación, rails de seguridad
- **Medición causal** — Incrementalidad, experimentos geo, estimación de lift
- **Patrones de MLOps** — CI/CD/CT para modelos, desarrollo dirigido por contratos
- **Pensamiento de plataforma** — Patrones de arquitectura que escalan equipos

**Frecuencia:** Publicado cuando hay algo que vale la pena compartir (típicamente 1-2 posts por mes).

**Sin spam:** Solo posts técnicos sustanciales. Sin contenido promocional, sin link dumps.

---

## Posts recientes

{% for post in site.posts limit:5 %}
  {% if post.lang == "es-419" %}
  <div style="margin-bottom: 1.5rem;">
    <h3 style="margin-bottom: 0.25rem;"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p style="color: #666; font-size: 0.9rem; margin: 0.25rem 0;">{{ post.date | date: "%d de %B de %Y" }}</p>
    {% if post.excerpt %}<p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>{% endif %}
  </div>
  {% endif %}
{% endfor %}

[Ver todos los posts →]({{ "/es-419/blog/" | relative_url }})

<style>
.newsletter-hero {
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
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
