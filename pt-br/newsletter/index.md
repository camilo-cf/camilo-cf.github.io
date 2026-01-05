---
layout: single
title: "Newsletter"
permalink: /pt-br/newsletter/
author_profile: false
lang: "pt-br"
i18n_key: "newsletter"
ref: "newsletter"
description: "Inscreva-se para insights de ML e IA via RSS ou email. Atualizações sobre sistemas de ML em produção, GenAI, MLOps e medição causal."
excerpt: "Receba atualizações sobre ML em produção, GenAI e insights de MLOps."
---

<div class="newsletter-hero">
  <h2 style="color: white; margin-top: 0;">Fique atualizado em ML em produção e GenAI</h2>
  <p style="margin-bottom: 0;">Deep dives em sistemas de ML, medição causal, padrões de MLOps e segurança de GenAI. Escrito para engenheiros que lançam em produção.</p>
</div>

<section class="newsletter-primary">
  <h2>📡 RSS / Atom (Recomendado)</h2>
  <p>Não requer email. Receba atualizações no seu leitor RSS favorito:</p>
  <p><a class="btn btn--primary btn--large" href="{{ "/feed.xml" | relative_url }}">Inscrever via RSS</a></p>
  <p class="newsletter-note">Leitores recomendados: <a href="https://feedly.com" rel="noopener">Feedly</a>, <a href="https://www.inoreader.com" rel="noopener">Inoreader</a>, <a href="https://netnewswire.com" rel="noopener">NetNewsWire</a></p>
</section>

{% if site.newsletter.embed_html or site.newsletter.form_action %}
<section class="newsletter-optional">
  <h2>📧 Email (Opcional)</h2>
  <p>Prefere email? Inscreva-se abaixo. Privacy-first: sem tracking, cancele quando quiser.</p>

  {% if site.newsletter.embed_html %}
    <div class="newsletter-embed">
      {{ site.newsletter.embed_html }}
    </div>
  {% elsif site.newsletter.form_action %}
    <form action="{{ site.newsletter.form_action }}" method="post" class="newsletter-form">
      <label for="newsletter-email">Email</label>
      <input id="newsletter-email" type="email" name="email" required>
      <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
      <div class="newsletter-form__hint">Double opt-in recomendado. Verifique sua inbox para confirmação.</div>
      <button type="submit" class="btn btn--primary">Inscrever</button>
    </form>
  {% endif %}

  <p class="newsletter-note">Inscrições por email gerenciadas por {{ site.newsletter.provider | default: "o provedor configurado" }}. Este site não armazena seu email.</p>
</section>
{% endif %}

## O que você receberá

**Tópicos cobertos:**
- **Sistemas de ML em produção** — Planos de controle, padrões de rollback, observabilidade por padrão
- **Avaliação e segurança de GenAI** — LLM-as-judge, loops de avaliação, rails de segurança
- **Medição causal** — Incrementalidade, experimentos geo, estimação de lift
- **Padrões de MLOps** — CI/CD/CT para modelos, desenvolvimento dirigido por contratos
- **Pensamento de plataforma** — Padrões de arquitetura que escalam equipes

**Frequência:** Publicado quando há algo que vale a pena compartilhar (tipicamente 1-2 posts por mês).

**Sem spam:** Apenas posts técnicos substantivos. Sem conteúdo promocional, sem link dumps.

---

## Posts recentes

{% for post in site.posts limit:5 %}
  {% if post.lang == "pt-br" %}
  <div style="margin-bottom: 1.5rem;">
    <h3 style="margin-bottom: 0.25rem;"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p style="color: #666; font-size: 0.9rem; margin: 0.25rem 0;">{{ post.date | date: "%d de %B de %Y" }}</p>
    {% if post.excerpt %}<p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>{% endif %}
  </div>
  {% endif %}
{% endfor %}

[Ver todos os posts →]({{ "/pt-br/blog/" | relative_url }})

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
