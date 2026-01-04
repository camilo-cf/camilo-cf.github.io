---
layout: single
title: "Causal measurement for ads"
permalink: /pillars/causal-measurement-for-ads/
author_profile: false
---

This pillar focuses on causal inference and experimentation strategies for advertising. It highlights uplift modeling, geo experiments, and measurement pitfalls that surface at scale.

## Recommended reading order
1. Start with foundational measurement posts.
2. Dive into experimentation design and guardrails.
3. End with case studies on improving incrementality.

## Posts in this pillar
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'causal-measurement-for-ads'" | sort: "date" | reverse %}
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
