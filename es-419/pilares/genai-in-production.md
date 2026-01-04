---
layout: single
title: "GenAI en producción"
permalink: /es-419/pilares/genai-in-production/
author_profile: false
lang: "es-419"
i18n_key: "pillar-genai"
ref: "pillar-genai"
---
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'genai-in-production'" | where: "lang", page.lang | sort: "date" | reverse %}

GenAI aplicado necesita rieles de seguridad, bucles de evaluación y una ruta clara de prototipo a producción.

## Orden sugerido
1. Arquitectura y estrategias de prompting.
2. Evaluación, red-teaming y observabilidad.
3. Despliegue y gestión del ciclo de vida.

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
