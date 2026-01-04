---
layout: single
title: "Production ML Systems at Scale"
permalink: /en/pillars/production-ml-systems-at-scale/
redirect_from:
  - /pillars/ads-ml-systems-at-scale/
  - /pillars/production-ml-systems-at-scale/
  - /en/pilares/production-ml-systems-at-scale/
author_profile: false
lang: "en"
i18n_key: "pillar-production"
---

{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'production-ml-systems-at-scale'" | where: "lang", page.lang | sort: "date" | reverse %}

Building reliable ML systems that power personalization, marketplaces, ranking, forecasting, and ads requires shared architectural patterns. This pillar collects posts on production ML systems at scale, with ads treated as a demanding subtopic rather than a separate pillar.

## Recommended reading order
1. Start with the control-plane view in **Production ML systems at scale: control planes, contracts, and safety nets**.
2. Follow with the **Ads ML as a subtopic** primer to see how bidding and marketplace constraints fit the same architecture.
3. Expand with case studies and observability checklists; then layer in capacity planning and rollback playbooks.

{% assign start_here = pillar_posts | sort: "date" | reverse | slice: 0,3 %}
{% if start_here.size > 0 %}
### Start here
<ol>
  {% for post in start_here %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a>{% if post.description %} — {{ post.description }}{% endif %}</li>
  {% endfor %}
</ol>
{% endif %}

## Posts in this pillar
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
