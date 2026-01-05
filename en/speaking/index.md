---
layout: single
title: "Speaking & Media Kit"
permalink: /en/speaking/
author_profile: true
lang: "en"
i18n_key: "speaking"
ref: "speaking"
description: "Book Camilo for talks on production ML, GenAI evaluation, causal ads measurement, and MLOps. Conference speaker and workshop facilitator."
excerpt: "Conference talks, workshops, and technical sessions on production ML systems, GenAI, and MLOps."
---

I speak at conferences, company events, and workshops about production ML systems, GenAI evaluation, causal measurement, and platform thinking. My talks combine architecture patterns, real-world war stories, and actionable frameworks teams can apply immediately.

## Book me for your event

I'm available for:
- Conference keynotes and technical tracks
- Corporate workshops and tech talks
- Panel discussions on ML/AI leadership
- Podcast and interview appearances

**Contact:** [LinkedIn]({{ site.contact.linkedin_url }}) or [reveal email]({{ "/en/contact/" | relative_url }})

---

## Talk proposals

### 1. Rollback Runbooks: Making ML Systems Reversible at Scale

**Abstract:** Most ML teams focus on deploying models. Few invest in rollback infrastructure—until a bad model hits production. This talk covers the anatomy of ML rollbacks: control planes for traffic shifting, golden test suites for regression detection, and observability patterns that surface issues before customers do. You'll learn how to design ML services that can fail safely, revert quickly, and maintain trust under pressure.

**Key takeaways:**
- Shadow deployment patterns for risk-free validation
- Contract-based testing between data/models/services
- Runbook templates for model rollback and traffic failover
- Observability defaults that catch drift before incidents

**Audience:** ML engineers, platform teams, SREs
**Level:** Intermediate to advanced
**Duration:** 45 min talk or 2-hour workshop
**Format:** Slides + architecture diagrams + live runbook walkthrough

---

### 2. GenAI Evaluation Loops: From Vibes to Metrics

**Abstract:** Generative AI copilots are easy to demo, hard to ship safely. Without structured evaluation, teams rely on "vibe checks" and hope. This talk introduces evaluation loops for LLM-based systems: how to define metrics that matter, build evaluator chains (LLM-as-judge + rules + human), and integrate them into CI/CD. Real examples from ads creative generation and product Q&A bots.

**Key takeaways:**
- Designing eval metrics for retrieval, generation, and safety
- LLM-as-judge patterns: when they work, when they fail
- Human-in-the-loop feedback integration
- Cost/quality trade-offs in production evaluators

**Audience:** ML/AI engineers, product teams shipping GenAI
**Level:** Intermediate
**Duration:** 40 min
**Format:** Slides + code snippets + evaluation framework templates

---

### 3. Causal Measurement for Ads: Beyond Correlation

**Abstract:** Attribution and incrementality are the hardest problems in ads ML. Clicks correlate with purchases, but do ads cause them? This talk covers causal measurement frameworks for digital advertising: geo experiments for lift estimation, CUPED for variance reduction, synthetic controls for counterfactuals, and how to communicate uncertainty to business stakeholders who want certainty.

**Key takeaways:**
- Geo-based experiment design for ads incrementality
- Variance reduction techniques (CUPED, stratification)
- Causal forests for heterogeneous treatment effects
- Communicating lift estimates and confidence intervals to non-technical partners

**Audience:** Data scientists, ML engineers in ads/growth/marketplaces
**Level:** Advanced
**Duration:** 50 min
**Format:** Slides + worked examples + simulation notebooks

---

### 4. Platform Thinking for ML Teams: Contracts Over Chaos

**Abstract:** Most ML teams build one-off pipelines. Mature teams build platforms. But platform thinking isn't just about reusable code—it's about contracts, observability-by-default, and forcing functions that prevent regressions. This talk covers schema contracts for data/model APIs, CI/CD/CT for ML, and governance patterns that scale without blocking velocity.

**Key takeaways:**
- Contract-driven development for ML pipelines
- CI/CD/CT patterns: continuous training without continuous fires
- Feature store governance that doesn't slow teams down
- Platform APIs vs. one-off scripts: when to abstract

**Audience:** ML platform engineers, tech leads, engineering managers
**Level:** Intermediate
**Duration:** 45 min or 3-hour workshop
**Format:** Slides + architecture diagrams + contract templates

---

### 5. Fast-Fail Experimentation: Killing Bad Ideas Faster

**Abstract:** Most A/B testing talks focus on statistical significance. This one focuses on speed. How do you design experiments that fail fast, detect negative effects early, and minimize customer exposure to bad variants? Covers sequential testing, early stopping rules, guardrail metrics, and the cultural shift from "run for 2 weeks" to "kill in 2 days if it's bad."

**Key takeaways:**
- Sequential analysis for adaptive stopping
- Guardrail metrics and automatic kill switches
- Experiment dashboard design for fast triage
- Organizational patterns: who has the authority to stop an experiment?

**Audience:** Data scientists, product managers, growth teams
**Level:** Intermediate
**Duration:** 35 min
**Format:** Slides + decision framework + dashboard examples

---

### 6. MLOps War Stories: What We Broke and How We Fixed It

**Abstract:** A collection of production ML incidents and the architectural changes they forced. Model serving latency spikes from batch size tuning. Silent data drift that corrupted training pipelines. Shadow deployments that weren't actually shadowing. This talk is light on "best practices" and heavy on "here's what went wrong and what we learned." Interactive Q&A format welcome.

**Key takeaways:**
- Common MLOps failure modes and their fixes
- Observability patterns that would have caught issues earlier
- Incident response templates for ML-specific outages
- Post-mortem culture: blameless, actionable, sharable

**Audience:** ML engineers, SREs, anyone shipping ML to production
**Level:** All levels (stories are accessible, solutions are technical)
**Duration:** 30-45 min
**Format:** Storytelling + Q&A + incident report templates

---

## Bio

### Short (50 words)
Camilo is a Staff ML Engineer and AI Architect at Mercado Libre, leading production systems for ads, GenAI, and MLOps. He holds a Ph.D. in Mechatronics from UNICAMP and an EMBA in Strategic Leadership. He speaks and writes about ML reliability, causal measurement, and platform thinking.

### Medium (100 words)
Camilo Cáceres is a Staff ML Engineer and AI Architect at Mercado Libre, where he leads ML components for display ads, GenAI safety rails, and platform architecture. His work spans production ML systems at scale: from causal incrementality measurement for ads to CI/CD/CT for models and observability-by-default patterns. Previously, he standardized ML architecture and governance practices at AB InBev and other enterprise teams. He holds a Ph.D. in Mechanical Engineering (Mechatronics) from UNICAMP and an EMBA in Strategic Leadership. He's passionate about making ML systems reversible, measurable, and boring.

### Long (200 words)
Camilo Andrés Cáceres Flórez is a Staff ML Engineer and AI Architect focused on production systems for ads, marketplaces, personalization, and GenAI. Currently at Mercado Libre, he leads ML components for the DSP (demand-side platform), designs control planes for model rollout and rollback, and coaches teams on contracts between data, models, and runtime services. His scope balances latency, cost, and compliance constraints while keeping observability-by-default.

Before Mercado Libre, Camilo drove ML architecture standardization, GNN deployments, and CI/CD/CT practices as Principal Data Scientist & ML Engineer at AB InBev. Earlier roles include leading SOTA model improvements and generative AI initiatives, building reusable MLOps components, and delivering data science solutions across public and private sectors.

Camilo's technical depth comes from diverse roots: he holds a Ph.D. in Mechanical Engineering (Mechatronics) from UNICAMP, where he researched AI and assistive robotics, and an EMBA in Strategic Leadership from Valar Institute. His publications span robotics, optimization, and applied ML. He speaks and writes about production ML safety nets, causal measurement for ads, GenAI evaluation, and platform thinking—helping teams align narrative, constraints, and measurable outcomes.

---

## Media assets

**Headshot:** [Download high-res photo]({{ "/images/Foto_Camilo_perfil.jpg" | absolute_url }})
**Slides & materials:** Available upon request for past talks
**Social:** [LinkedIn](https://www.linkedin.com/in/camilocaceresf) | [GitHub](https://github.com/camilo-cf) | [Google Scholar](https://scholar.google.com/citations?user=325XocAAAAAJ)

---

## Recent & upcoming appearances

### 2025
*Availability for conference season (Q2-Q4 2025)*

### Archive (2012-2017)
Earlier academic conference presentations available on the [talks archive page]({{ "/talks/" | relative_url }}).

---

**Ready to book?** Reach out via [LinkedIn]({{ site.contact.linkedin_url }}) or the [contact page]({{ "/en/contact/" | relative_url }}).
