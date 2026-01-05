---
layout: archive
title: "CV"
permalink: /en/cv/
author_profile: true
lang: "en"
i18n_key: "cv"
ref: "cv"
description: "Staff ML Engineer & AI Architect with production GenAI, MLOps, and causal ads experience at scale. Ph.D. in Mechatronics, EMBA in Strategic Leadership."
---

{% include base_path %}

**Staff ML Engineer & AI Architect** focused on production systems for ads, marketplaces, personalization, and GenAI. I align architecture, experimentation, and delivery so teams can ship safely at scale.

## Current scope
- **Staff ML Engineer / Data Science Expert — Mercado Libre:** Lead ML components for the DSP, design control planes for model rollout/rollback, and coach teams on contracts between data, models, and services. Balance latency, cost, and compliance constraints while keeping observability-by-default.
- **Advisor / Principal engagements:** Standardized ML architecture, CI/CD/CT for models, and feature-store governance. Delivered GenAI evaluators and safety rails for copilots; led uplift experiments and counterfactual simulations for ads measurement.

## Focused outcomes
- **Reliability:** Rollback runbooks, shadow deployments, and golden tests to prevent regressions in ranking and ads bidding.
- **Measurement:** Lift estimation frameworks (geo-experiments, CUPED, causal forests) and dashboards for experimentation hygiene.
- **Platforms:** Templates for design docs, schema contracts, and runtime quality gates; reusable pipelines for model delivery and monitoring.

## Education
- EMBA (Strategic Leadership), Valar Institute.
- Ph.D. and M.Eng. in Mechanical Engineering (Mechatronics), UNICAMP.
- B.S. in Mechatronics Engineering, Military University Nueva Granada.

## Skills snapshot
- **Architecture & MLOps:** CI/CD/CT for ML, observability, lineage, governance, and platform APIs.
- **Modeling:** Causal inference, uplift/ads experimentation, GNNs, recommender systems, and GenAI evaluation.
- **Leadership:** Technical direction, standards, mentoring, and exec-facing roadmaps.

## Selected case studies
- [Platform guardrails for ML services]({{ "/en/case-studies/platform-guardrails/" | relative_url }}) — introduced delivery contracts, observability defaults, and rollback playbooks.
- [Ads incrementality at scale]({{ "/en/case-studies/ads-incrementality/" | relative_url }}) — lift measurement with geo experiments, simulations, and creative experimentation.

## Publications, talks, and teaching
<ul>{% for post in site.publications %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>

### Talks
<ul>{% for post in site.talks %}
  {% include archive-single-talk-cv.html %}
{% endfor %}</ul>

### Teaching
<ul>{% for post in site.teaching %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>
