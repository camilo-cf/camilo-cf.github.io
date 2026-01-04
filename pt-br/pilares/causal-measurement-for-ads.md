---
layout: single
title: "Medição causal para anúncios"
permalink: /pt-br/pilares/causal-measurement-for-ads/
author_profile: false
lang: "pt-br"
i18n_key: "pillar-ads"
ref: "pillar-ads"
---
{% assign pillar_posts = site.posts | where_exp: "post", "post.categories contains 'causal-measurement-for-ads'" | where: "lang", page.lang | sort: "date" | reverse %}

Este pilar cobre inferência causal e experimentação para publicidade: uplift, experimentos geo e armadilhas ao escalar.

## Ordem recomendada
1. Revise fundamentos de medição e DAGs.
2. Escolha entre experimentos geo, leilões ou simulações de lance.
3. Aplique em produção monitorando sobreposição, decaimento de lift e mix de canais.

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
