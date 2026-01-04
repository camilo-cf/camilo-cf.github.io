---
title: "Backtesting ML pipelines before rollout"
description: "Golden runs, replay tests, and failure injection that catch regressions before canary."
date: 2025-03-18
categories:
  - practical-mlops
tags:
  - backtesting
  - testing
  - pipelines
  - ci-cd
permalink: /en/blog/mlops-backtesting/
lang: "en"
i18n_key: "post-mlops-backtesting"
ref: "mlops-backtesting"
show_ads: true
show_cta: true
---

Backtesting bridges the gap between offline metrics and production behavior. It prevents surprises by replaying real workloads through new code and models.

### Ingredients of a good backtest
- **Golden datasets:** curated inputs with expected outputs for core user journeys.
- **Replay harness:** stream historical traffic with time travel and deterministic feature pipelines.
- **Failure injection:** simulate nulls, outages, and schema drifts to validate resilience.

### When to run it
- Before every canary rollout and when dependencies change (feature store schemas, upstream services).
- As part of incident postmortems to codify new regression checks.
- On schedule for critical services (daily/weekly) with alerts when deltas breach thresholds.

### Related reading
- Guardrails to pair with backtests: [Platform guardrails that keep ML services shippable]({{ "/en/blog/mlops-platform-guardrails/" | relative_url }}).
- Ads angle: [Ads ML as a subtopic of production ML systems]({{ "/en/blog/ads-ml-as-a-subtopic/" | relative_url }}).
- Pillar hub: [Practical MLOps]({{ "/en/pillars/practical-mlops/" | relative_url }}).
