---
layout: single
title: "GenAI in production"
permalink: /pillars/genai-in-production/
author_profile: false
---

Applied GenAI work needs reliable safety rails, evaluation loops, and a clear delivery path from prototype to production. This pillar gathers posts that focus on building, shipping, and hardening GenAI systems.

## Recommended reading order
1. Begin with architecture and prompting strategies.
2. Continue with evaluation, red-teaming, and observability.
3. Close with deployment and lifecycle management practices.

## Posts in this pillar
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'genai-in-production'" | sort: "date" | reverse %}
{% if pillar_posts.size > 0 %}
<ul>
  {% for post in pillar_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      {% if post.description %} — {{ post.description }}{% endif %}
    </li>
  {% endfor %}
</ul>
{% else %}
<p>More posts coming soon.</p>
{% endif %}
