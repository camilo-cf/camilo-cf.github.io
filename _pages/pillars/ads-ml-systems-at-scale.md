---
layout: single
title: "Ads ML systems at scale"
permalink: /pillars/ads-ml-systems-at-scale/
author_profile: false
---

Building reliable ads and ranking systems is a multi-disciplinary challenge that combines model lifecycle rigor, experimentation, and platform-level observability. This pillar collects posts focused on production ML for ads and large-scale personalization.

## Recommended reading order
1. Start with high-level architecture pieces to understand the end-to-end flow.
2. Move into deployment, monitoring, and rollback mechanics.
3. Finish with postmortems and optimization stories.

## Posts in this pillar
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'ads-ml-systems-at-scale'" | sort: "date" | reverse %}
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
