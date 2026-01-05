---
layout: single
title: "Newsletter"
permalink: /en/newsletter/
author_profile: false
lang: "en"
i18n_key: "newsletter"
ref: "newsletter"
description: "Subscribe to ML and AI insights via RSS or email. Production ML systems, GenAI, MLOps, and causal measurement updates."
excerpt: "Get updates on production ML, GenAI, and MLOps insights."
---

<div class="newsletter-hero">
  <h2 style="color: white; margin-top: 0;">Stay updated on production ML & GenAI</h2>
  <p style="margin-bottom: 0;">Deep dives on ML systems, causal measurement, MLOps patterns, and GenAI safety. Written for engineers who ship to production.</p>
</div>

<section class="newsletter-primary">
  <h2>📡 RSS / Atom (Recommended)</h2>
  <p>No email required. Get updates in your favorite RSS reader:</p>
  <p><a class="btn btn--primary btn--large" href="{{ "/feed.xml" | relative_url }}">Subscribe via RSS</a></p>
  <p class="newsletter-note">Recommended readers: <a href="https://feedly.com" rel="noopener">Feedly</a>, <a href="https://www.inoreader.com" rel="noopener">Inoreader</a>, <a href="https://netnewswire.com" rel="noopener">NetNewsWire</a></p>
</section>

{% if site.newsletter.embed_html or site.newsletter.form_action %}
<section class="newsletter-optional">
  <h2>📧 Email (Optional)</h2>
  <p>Prefer email? Subscribe below. Privacy-first: no tracking, unsubscribe anytime.</p>

  {% if site.newsletter.embed_html %}
    <div class="newsletter-embed">
      {{ site.newsletter.embed_html }}
    </div>
  {% elsif site.newsletter.form_action %}
    <form action="{{ site.newsletter.form_action }}" method="post" class="newsletter-form">
      <label for="newsletter-email">Email</label>
      <input id="newsletter-email" type="email" name="email" required>
      <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
      <div class="newsletter-form__hint">Double opt-in recommended. Check your inbox for confirmation.</div>
      <button type="submit" class="btn btn--primary">Subscribe</button>
    </form>
  {% endif %}

  <p class="newsletter-note">Email signups handled by {{ site.newsletter.provider | default: "the configured provider" }}. This site does not store your email.</p>
</section>
{% endif %}

## What you'll get

**Topics covered:**
- **Production ML systems** — Control planes, rollback patterns, observability-by-default
- **GenAI evaluation & safety** — LLM-as-judge, evaluation loops, safety rails
- **Causal measurement** — Incrementality, geo experiments, lift estimation
- **MLOps patterns** — CI/CD/CT for models, contract-driven development
- **Platform thinking** — Architecture patterns that scale teams

**Frequency:** Published when there's something worth sharing (typically 1-2 posts per month).

**No spam:** Only substantive technical posts. No promotional content, no link dumps.

---

## Recent posts

{% for post in site.posts limit:5 %}
  {% if post.lang == "en" or post.lang == nil %}
  <div style="margin-bottom: 1.5rem;">
    <h3 style="margin-bottom: 0.25rem;"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p style="color: #666; font-size: 0.9rem; margin: 0.25rem 0;">{{ post.date | date: "%B %d, %Y" }}</p>
    {% if post.excerpt %}<p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>{% endif %}
  </div>
  {% endif %}
{% endfor %}

[See all posts →]({{ "/en/blog/" | relative_url }})

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
