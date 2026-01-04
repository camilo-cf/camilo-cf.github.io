---
layout: archive
title: "CV"
permalink: /es-419/cv/
author_profile: true
lang: "es-419"
i18n_key: "cv"
ref: "cv"
description: "Staff ML Engineer y arquitecto de IA con experiencia en GenAI, MLOps y medición causal para anuncios a escala. Ph.D. en Mecatrónica, EMBA en Liderazgo Estratégico."
redirect_from:
  - /es/cv/
---

{% include base_path %}

**Staff ML Engineer y arquitecto de IA** enfocado en sistemas de producción para anuncios, marketplaces, personalización y GenAI. Alineo arquitectura, experimentación y entrega para lanzar con seguridad.

## Alcance actual
- **Staff ML Engineer / Data Science Expert — Mercado Libre:** Componentes de ML para el DSP, planos de control para despliegues y coaching sobre contratos entre datos, modelos y servicios. Equilibrio entre latencia, costo y cumplimiento con observabilidad por defecto.
- **Asesor / Principal:** Estandarización de arquitectura de ML, CI/CD/CT para modelos y gobierno de feature stores. Evaluadores de GenAI y rails de seguridad; experimentos de lift y simulaciones contrafácticas para medición de anuncios.

## Resultados
- **Confiabilidad:** Runbooks de reversión, despliegues sombra y pruebas doradas para evitar regresiones.
- **Medición:** Marcos de estimación de lift (experimentos geo, CUPED, bosques causales) y tableros para higiene experimental.
- **Plataformas:** Plantillas para documentos de diseño, contratos de esquema y validaciones en runtime.

## Educación
- EMBA (Liderazgo Estratégico), Valar Institute.
- Ph.D. y M.Eng. en Ingeniería Mecánica (Mecatrónica), UNICAMP.
- B.S. en Ingeniería Mecatrónica, UMNG.

## Habilidades
- **Arquitectura y MLOps:** CI/CD/CT para ML, observabilidad, trazabilidad y APIs de plataforma.
- **Modelado:** Inferencia causal, experimentación de anuncios, GNNs, recomendadores y evaluación de GenAI.
- **Liderazgo:** Dirección técnica, estándares, mentoría y roadmaps ejecutivos.

## Casos de estudio
- [Guardrails de plataforma para servicios de ML]({{ "/es-419/casos/platform-guardrails/" | relative_url }})
- [Incrementalidad de anuncios a escala]({{ "/es-419/casos/ads-incrementality/" | relative_url }})

## Publicaciones, charlas y docencia
<ul>{% for post in site.publications %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>

### Charlas
<ul>{% for post in site.talks %}
  {% include archive-single-talk-cv.html %}
{% endfor %}</ul>

### Docencia
<ul>{% for post in site.teaching %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>
