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

<div class="newsletter-hero">
  <p class="newsletter-hero__intro">{{ locale_copy.intro }}</p>
</div>

<section class="newsletter-primary">
  <h2>📡 RSS / Atom (Primary)</h2>
  <p>No email required. Get updates in your favorite RSS reader:</p>
  <p><a class="btn btn--primary btn--large" href="{{ "/feed.xml" | relative_url }}">{{ locale_copy.rss_label }}</a></p>
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
