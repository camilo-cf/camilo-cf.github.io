---
layout: single
title: "Sistemas de ML em produção em escala"
permalink: /pt-br/pilares/production-ml-systems-at-scale/
author_profile: false
lang: "pt-BR"
i18n_key: "pillar-production"
ref: "pillar-production"
---
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'production-ml-systems-at-scale'" | where: "lang", page.lang | sort: "date" | reverse %}

Construir sistemas confiáveis de ML para personalização, marketplaces, ranking, forecasting e ads exige padrões compartilhados. Ads é tratado como subtópico dentro da arquitetura de produção.

## Ordem recomendada
1. Comece com o plano de controle em **Sistemas de ML em produção: planos de controle, contratos e redes de segurança**.
2. Em seguida, veja **Ads ML como subtópico** para entender como leilões e restrições de marketplace cabem na mesma arquitetura.
3. Expanda com casos e checklists de observabilidade; depois planejamento de capacidade e rollback.

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
