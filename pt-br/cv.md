---
layout: archive
title: "CV"
permalink: /pt-br/cv/
author_profile: true
lang: "pt-br"
i18n_key: "cv"
ref: "cv"
description: "Staff ML Engineer e arquiteto de IA com experiência em GenAI, MLOps e medição causal para anúncios em escala. Ph.D. em Mecatrônica, EMBA em Liderança Estratégica."
redirect_from:
  - /pt/cv/
---

{% include base_path %}

**Staff ML Engineer e arquiteto de IA** para sistemas de produção em anúncios, marketplaces, personalização e GenAI. Alinho arquitetura, experimentação e entrega para lançar com segurança.

## Escopo atual
- **Staff ML Engineer / Data Science Expert — Mercado Libre:** Componentes de ML para o DSP, planos de controle para rollout/rollback e coaching sobre contratos de dados-modelo-serviço. Equilíbrio entre latência, custo e compliance com observabilidade padrão.
- **Assessor / Principal:** Padrões de arquitetura, CI/CD/CT para modelos e governança de feature stores. Avaliadores de GenAI e rails de segurança; experimentos de lift e simulações contrafactuais para medição de anúncios.

## Resultados
- **Confiabilidade:** Runbooks de rollback, deploy sombra e testes dourados para evitar regressões.
- **Medição:** Estimativa de lift (experimentos geo, CUPED, florestas causais) e dashboards para higiene experimental.
- **Plataformas:** Modelos de design doc, contratos de esquema e gates de qualidade em runtime.

## Educação
- EMBA (Liderança Estratégica), Valar Institute.
- Ph.D. e M.Eng. em Engenharia Mecânica (Mecatrônica), UNICAMP.
- B.S. em Engenharia Mecatrônica, UMNG.

## Habilidades
- **Arquitetura e MLOps:** CI/CD/CT para ML, observabilidade, rastreabilidade e APIs de plataforma.
- **Modelagem:** Inferência causal, experimentação de anúncios, GNNs, recomendadores e avaliação de GenAI.
- **Liderança:** Direção técnica, padrões, mentoria e roadmaps executivos.

## Atividade e Contribuições no GitHub

{% include github_stats.html %}

## Estudos de caso
- [Guardrails de plataforma para serviços de ML]({{ "/pt-br/casos/platform-guardrails/" | relative_url }})
- [Incrementalidade de anúncios em escala]({{ "/pt-br/casos/ads-incrementality/" | relative_url }})

## Publicações, palestras e ensino
<ul>{% for post in site.publications %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>

### Palestras
<ul>{% for post in site.talks %}
  {% include archive-single-talk-cv.html %}
{% endfor %}</ul>

### Ensino
<ul>{% for post in site.teaching %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>
