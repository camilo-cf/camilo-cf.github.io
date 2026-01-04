---
layout: single
title: "Practical MLOps"
permalink: /pillars/practical-mlops/
author_profile: false
---

From reproducible pipelines to CI/CD/CT, this pillar shares practical guidance on MLOps and platform building blocks that keep shipping fast while staying reliable.

## Recommended reading order
1. Read the platform overview posts.
2. Move to deployment automation and validation steps.
3. Finish with observability and incident response.

## Posts in this pillar
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'practical-mlops'" | sort: "date" | reverse %}
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
