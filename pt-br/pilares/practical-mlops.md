---
layout: single
title: "MLOps prático"
permalink: /pt-br/pilares/practical-mlops/
author_profile: false
lang: "pt-BR"
i18n_key: "pillar-mlops"
ref: "pillar-mlops"
---
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'practical-mlops'" | where: "lang", page.lang | sort: "date" | reverse %}

Orientação prática sobre pipelines reproduzíveis, CI/CD/CT para modelos e blocos de plataforma que permitem lançar rápido com confiabilidade.

## Ordem recomendada
1. Leia a visão geral da plataforma.
2. Em seguida automação de deploy e validações.
3. Feche com observabilidade e resposta a incidentes.

{% assign start_here = pillar_posts | slice: 0,3 %}
{% if start_here.size > 0 %}
### Comece aqui
<ol>
  {% for post in start_here %}
    <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a>{% if post.description %} — {{ post.description }}{% endif %}</li>
  {% endfor %}
</ol>
{% endif %}

## Posts do pilar
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
<p>Em breve.</p>
{% endif %}
