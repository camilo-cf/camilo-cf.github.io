---
title: "Auction and pacing simulations for ads lift"
description: "Counterfactual simulations that stress pacing, budgets, and auction dynamics before running expensive experiments."
date: 2025-02-18
categories:
  - causal-measurement-for-ads
tags:
  - simulations
  - lift
  - auctions
  - pacing
permalink: /en/blog/ads-lift-simulations/
lang: "en"
i18n_key: "post-ads-simulations"
ref: "ads-lift-simulations"
show_ads: true
show_cta: true
---

Simulations make lift estimates cheaper by testing policies before we spend budget. They are especially useful when experimentation cycles are long or randomized control is limited.

### What to simulate
- **Auction outcomes:** bid distributions, win rates, and clearing prices under new models.
- **Pacing and budgets:** how new policies change spend velocity and delivery profiles.
- **Creative selection:** whether creative policies skew delivery to certain cohorts or geos.

### How to keep simulations honest
- Replay production traffic with realistic throttling and consent-aware analytics.
- Compare counterfactuals against holdout policies; calibrate against recent experiments.
- Capture guardrails (CPC, CPA, ROI) with the same thresholds used in rollout gates.

### Related reading
- Foundational approach: [Geo experiments for ads lift without slowing delivery]({{ "/en/blog/geo-experiments-for-ads-lift/" | relative_url }}).
- Deployment perspective: [Ads ML as a subtopic of production ML systems]({{ "/en/blog/ads-ml-as-a-subtopic/" | relative_url }}).
- Pillar hub: [Causal measurement for ads]({{ "/en/pillars/causal-measurement-for-ads/" | relative_url }}).
