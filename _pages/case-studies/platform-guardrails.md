---
layout: single
title: "Platform guardrails for ML services"
permalink: /en/case-studies/platform-guardrails/
author_profile: false
lang: "en"
i18n_key: "case-guardrails"
ref: "case-guardrails"
description: "How we introduced delivery contracts, observability defaults, and rollback playbooks for ML services."
---

**Context:** Multiple teams shipped ranking and ads models independently, causing inconsistent rollout quality, missing metrics, and slow incident response.

**Constraints:** Strict latency budgets, shared runtime dependencies, and a need to keep delivery velocity while adding safety nets.

**Actions and outcomes**
- Designed a control-plane contract covering schemas, validation steps, and rollout states (shadow, canary, full).
- Added golden tests, production backtests, and automated rollback triggers tied to business guardrails.
- Shipped dashboards and runbooks that reduced time-to-detect by 45% and enabled same-day rollbacks without on-call escalation.

**Artifacts**
- Reusable templates for design docs and schema contracts.
- Runbooks and dashboards now used across ads, search, and recommendations services.
- Patterns documented in the [Practical MLOps pillar]({{ "/en/pillars/practical-mlops/" | relative_url }}).
