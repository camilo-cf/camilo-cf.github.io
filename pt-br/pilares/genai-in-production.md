---
layout: single
title: "GenAI em produção"
permalink: /pt-br/pilares/genai-in-production/
author_profile: false
lang: "pt-BR"
i18n_key: "pillar-genai"
---
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'genai-in-production'" | where: "lang", page.lang | sort: "date" | reverse %}

GenAI aplicado precisa de trilhos de segurança, ciclos de avaliação e uma rota clara do protótipo à produção.

## Ordem recomendada
1. Arquitetura e estratégias de prompting.
2. Avaliação, red-teaming e observabilidade.
3. Deploy e gestão do ciclo de vida.

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
