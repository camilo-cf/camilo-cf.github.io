---
layout: single
title: "Sistemas de ML en producción a escala"
permalink: /es-419/pilares/production-ml-systems-at-scale/
author_profile: false
lang: "es-419"
i18n_key: "pillar-production"
---
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'production-ml-systems-at-scale'" | where: "lang", page.lang | sort: "date" | reverse %}

Construir sistemas confiables de ML para personalización, marketplaces, ranking, forecasting y ads requiere patrones compartidos. Este pilar trata Ads como subtema dentro de la arquitectura de producción.

## Orden sugerido
1. Empieza con el plano de control en **Sistemas de ML en producción: planos de control, contratos y redes de seguridad**.
2. Sigue con el panorama de **Ads ML como subtópico** para ver cómo pujas y restricciones de marketplace caben en la misma arquitectura.
3. Amplía con casos y checklists de observabilidad; luego planes de capacidad y rollback.

{% assign start_here = pillar_posts | slice: 0,3 %}
{% if start_here.size > 0 %}
### Empieza aquí
<ol>
  {% for post in start_here %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a>{% if post.description %} — {{ post.description }}{% endif %}</li>
  {% endfor %}
</ol>
{% endif %}

## Entradas del pilar
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
<p>Próximamente.</p>
{% endif %}
