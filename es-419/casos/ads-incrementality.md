---
layout: single
title: "Incrementalidad de anuncios a escala"
permalink: /es-419/casos/ads-incrementality/
author_profile: false
lang: "es-419"
i18n_key: "case-ads"
ref: "case-ads"
description: "Estimación de lift con experimentos geo, simulaciones y pruebas creativas."
---

**Contexto:** Los equipos de anuncios necesitaban estimaciones confiables de lift en varios mercados sin frenar la entrega.

**Restricciones:** Oportunidades limitadas de control aleatorizado, presupuestos compartidos y sistemas de puja sensibles a latencia.

**Acciones y resultados**
- Plan de medición que combinó experimentos geo con ajustes CUPED y simulaciones contrafácticas.
- Checklists previos (solapamiento, potencia, guardrails) y monitoreo post-lanzamiento para decaimiento y spillover.
- Dashboards y plantillas que redujeron 30% el tiempo de preparación de experimentos mientras mejoraron los intervalos de confianza.

**Artefactos**
- Playbooks de experimentos geo y plantillas de QA de lift.
- Librerías para asignación de tratamiento, particionamiento y validación de métricas.
- Patrones documentados en el pilar [Medición causal para anuncios]({{ "/es-419/pilares/causal-measurement-for-ads/" | relative_url }}).
