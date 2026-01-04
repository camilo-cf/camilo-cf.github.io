---
layout: single
title: "Incrementalidade de anúncios em escala"
permalink: /pt-br/casos/ads-incrementality/
author_profile: false
lang: "pt-br"
i18n_key: "case-ads"
ref: "case-ads"
description: "Estimativa de lift com experimentos geo, simulações e testes criativos."
---

**Contexto:** Times de ads precisavam de estimativas confiáveis de lift em vários mercados sem desacelerar a entrega.

**Restrições:** Poucas oportunidades de controle aleatorizado, orçamentos compartilhados e sistemas de leilão sensíveis à latência.

**Ações e resultados**
- Plano de medição combinando experimentos geo com ajustes CUPED e simulações contrafactuais.
- Checklists de pré-lançamento (sobreposição, poder, guardrails) e monitoramento pós-lançamento para decaimento e spillover.
- Dashboards e modelos que reduziram em 30% o tempo de preparação de experimentos e melhoraram os intervalos de confiança.

**Artefatos**
- Playbooks de experimentos geo e templates de QA de lift.
- Bibliotecas para alocação de tratamento, particionamento e validação de métricas.
- Padrões documentados no pilar [Medição causal para anúncios]({{ "/pt-br/pilares/causal-measurement-for-ads/" | relative_url }}).
