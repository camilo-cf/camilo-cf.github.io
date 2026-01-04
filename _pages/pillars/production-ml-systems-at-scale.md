---
layout: single
title: "Production ML Systems at Scale"
permalink: /pillars/production-ml-systems-at-scale/
redirect_from:
  - /pillars/ads-ml-systems-at-scale/
author_profile: false
---

Building reliable ML systems that power personalization, marketplaces, ranking, forecasting, and ads requires shared architectural patterns. This pillar collects posts on production ML systems at scale, with ads treated as one of several demanding domains.

## Recommended reading order
1. Start with end-to-end system architecture and control planes.
2. Move into deployment, monitoring, rollback, and capacity management.
3. Finish with case studies that span personalization, marketplaces, ranking, forecasting, and ads.

## Posts in this pillar
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'production-ml-systems-at-scale'" | sort: "date" | reverse %}
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
