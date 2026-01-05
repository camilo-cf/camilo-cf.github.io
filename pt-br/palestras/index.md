---
layout: single
title: "Palestras e Media Kit"
permalink: /pt-br/palestras/
author_profile: true
lang: "pt-br"
i18n_key: "speaking"
ref: "speaking"
description: "Reserve Camilo para palestras sobre ML em produção, avaliação de GenAI, medição causal de anúncios e MLOps. Palestrante de conferências e facilitador de workshops."
excerpt: "Palestras em conferências, workshops e sessões técnicas sobre sistemas de ML em produção, GenAI e MLOps."
---

Participo em conferências, eventos corporativos e workshops sobre sistemas de ML em produção, avaliação de GenAI, medição causal e pensamento de plataforma. Minhas palestras combinam padrões de arquitetura, histórias de guerra e frameworks acionáveis que as equipes podem aplicar imediatamente.

## Reserve para seu evento

Disponível para:
- Keynotes e tracks técnicas em conferências
- Workshops corporativos e tech talks
- Painéis sobre liderança em ML/IA
- Podcasts e entrevistas

**Contato:** [LinkedIn]({{ site.contact.linkedin_url }}) ou [revelar email]({{ "/pt-br/contato/" | relative_url }})

---

## Propostas de palestras

### 1. Runbooks de rollback: Sistemas de ML reversíveis em escala

**Resumo:** A maioria das equipes de ML foca em fazer deploy de modelos. Poucas investem em infraestrutura de rollback—até que um modelo ruim chega à produção. Esta palestra cobre a anatomia de rollbacks de ML: planos de controle para shifting de tráfego, suites de testes dourados para detecção de regressões, e padrões de observabilidade que detectam problemas antes dos clientes.

**Pontos-chave:**
- Padrões de deploy sombra para validação sem riscos
- Testing baseado em contratos entre dados/modelos/serviços
- Templates de runbooks para rollback e failover de tráfego
- Observabilidade por padrão que detecta drift antes de incidentes

**Audiência:** Engenheiros de ML, equipes de plataforma, SREs
**Nível:** Intermediário a avançado
**Duração:** 45 min palestra ou workshop de 2 horas
**Formato:** Slides + diagramas de arquitetura + walkthrough de runbook

---

### 2. Loops de avaliação de GenAI: De vibes a métricas

**Resumo:** Copilotos de IA generativa são fáceis de demonstrar, difíceis de lançar com segurança. Sem avaliação estruturada, as equipes confiam em "vibe checks" e esperança. Esta palestra introduz loops de avaliação para sistemas baseados em LLM: como definir métricas relevantes, construir cadeias de avaliadores (LLM-as-judge + regras + humanos), e integrá-los no CI/CD.

**Pontos-chave:**
- Design de métricas de eval para retrieval, geração e segurança
- Padrões LLM-as-judge: quando funcionam, quando falham
- Integração de feedback humano no loop
- Trade-offs custo/qualidade em avaliadores de produção

**Audiência:** Engenheiros de ML/IA, equipes de produto lançando GenAI
**Nível:** Intermediário
**Duração:** 40 min
**Formato:** Slides + snippets de código + templates de frameworks de avaliação

---

### 3. Medição causal para anúncios: Além da correlação

**Resumo:** Atribuição e incrementalidade são os problemas mais difíceis em ML de anúncios. Cliques correlacionam com compras, mas os anúncios as causam? Esta palestra cobre frameworks de medição causal para publicidade digital: experimentos geo para estimativa de lift, CUPED para redução de variância, controles sintéticos para contrafactuais, e como comunicar incerteza para stakeholders de negócio que querem certeza.

**Pontos-chave:**
- Design de experimentos geo para incrementalidade de anúncios
- Técnicas de redução de variância (CUPED, estratificação)
- Florestas causais para efeitos de tratamento heterogêneos
- Comunicação de estimativas de lift e intervalos de confiança

**Audiência:** Data scientists, engenheiros de ML em ads/growth/marketplaces
**Nível:** Avançado
**Duração:** 50 min
**Formato:** Slides + exemplos práticos + notebooks de simulação

---

### 4. Pensamento de plataforma para equipes de ML: Contratos sobre caos

**Resumo:** A maioria das equipes de ML constrói pipelines únicos. Equipes maduras constroem plataformas. Mas pensar em plataforma não é apenas código reutilizável—é sobre contratos, observabilidade por padrão, e mecanismos que previnem regressões. Esta palestra cobre contratos de schema para APIs de dados/modelos, CI/CD/CT para ML, e padrões de governança que escalam sem bloquear velocidade.

**Pontos-chave:**
- Desenvolvimento dirigido por contratos para pipelines de ML
- Padrões CI/CD/CT: treinamento contínuo sem incêndios contínuos
- Governança de feature stores que não freia equipes
- APIs de plataforma vs. scripts únicos: quando abstrair

**Audiência:** Engenheiros de plataforma ML, tech leads, managers de engenharia
**Nível:** Intermediário
**Duração:** 45 min ou workshop de 3 horas
**Formato:** Slides + diagramas de arquitetura + templates de contratos

---

### 5. Experimentação fast-fail: Matando ideias ruins mais rápido

**Resumo:** A maioria das palestras de testes A/B focam em significância estatística. Esta foca em velocidade. Como você projeta experimentos que falham rápido, detectam efeitos negativos cedo, e minimizam exposição de clientes a variantes ruins? Cobre testes sequenciais, regras de parada antecipada, métricas guardrail, e a mudança cultural de "roda 2 semanas" para "mata em 2 dias se for ruim."

**Pontos-chave:**
- Análise sequencial para parada adaptativa
- Métricas guardrail e kill switches automáticos
- Design de dashboards de experimentos para triagem rápida
- Padrões organizacionais: quem tem autoridade para parar um experimento?

**Audiência:** Data scientists, product managers, equipes de growth
**Nível:** Intermediário
**Duração:** 35 min
**Formato:** Slides + framework de decisão + exemplos de dashboards

---

### 6. Histórias de guerra de MLOps: O que quebramos e como consertamos

**Resumo:** Uma coleção de incidentes de ML em produção e as mudanças arquiteturais que forçaram. Picos de latência em model serving por tuning de batch size. Drift silencioso de dados que corrompeu pipelines de treinamento. Shadow deployments que não faziam shadow. Esta palestra tem pouco de "melhores práticas" e muito de "isso deu errado e o que aprendemos." Formato Q&A interativo bem-vindo.

**Pontos-chave:**
- Modos comuns de falha de MLOps e suas soluções
- Padrões de observabilidade que teriam detectado problemas antes
- Templates de resposta a incidentes para outages de ML
- Cultura de post-mortems: sem culpados, acionável, compartilhável

**Audiência:** Engenheiros de ML, SREs, qualquer um que lance ML para produção
**Nível:** Todos os níveis (histórias acessíveis, soluções técnicas)
**Duração:** 30-45 min
**Formato:** Storytelling + Q&A + templates de relatórios de incidentes

---

## Bio

### Curta (50 palavras)
Camilo é Staff ML Engineer e arquiteto de IA no Mercado Libre, liderando sistemas de produção para anúncios, GenAI e MLOps. Tem Ph.D. em Mecatrônica pela UNICAMP e EMBA em Liderança Estratégica. Fala e escreve sobre confiabilidade de ML, medição causal e pensamento de plataforma.

### Média (100 palavras)
Camilo Cáceres é Staff ML Engineer e arquiteto de IA no Mercado Libre, onde lidera componentes de ML para display ads, rails de segurança de GenAI e arquitetura de plataforma. Seu trabalho abrange sistemas de ML em produção em escala: desde medição causal de incrementalidade para anúncios até CI/CD/CT para modelos e padrões de observabilidade por padrão. Anteriormente padronizou práticas de arquitetura e governança de ML na AB InBev e outras equipes empresariais. Tem Ph.D. em Engenharia Mecânica (Mecatrônica) pela UNICAMP e EMBA em Liderança Estratégica. É apaixonado por fazer sistemas de ML reversíveis, mensuráveis e entediantes.

### Longa (200 palavras)
Camilo Andrés Cáceres Flórez é Staff ML Engineer e arquiteto de IA focado em sistemas de produção para anúncios, marketplaces, personalização e GenAI. Atualmente no Mercado Libre, lidera componentes de ML para o DSP, projeta planos de controle para rollout e rollback de modelos, e faz coaching de equipes sobre contratos entre dados, modelos e serviços em runtime. Seu escopo equilibra restrições de latência, custo e compliance mantendo observabilidade por padrão.

Antes do Mercado Libre, Camilo impulsionou padronização de arquitetura de ML, deploys de GNN e práticas de CI/CD/CT como Principal Data Scientist & ML Engineer na AB InBev. Funções anteriores incluem liderar melhorias de modelos SOTA e iniciativas de IA generativa, construir componentes reutilizáveis de MLOps, e entregar soluções de data science em setores público e privado.

A profundidade técnica de Camilo vem de raízes diversas: tem Ph.D. em Engenharia Mecânica (Mecatrônica) pela UNICAMP, onde pesquisou IA e robótica assistiva, e EMBA em Liderança Estratégica pelo Valar Institute. Suas publicações abrangem robótica, otimização e ML aplicado. Fala e escreve sobre redes de segurança de ML em produção, medição causal para anúncios, avaliação de GenAI e pensamento de plataforma—ajudando equipes a alinhar narrativa, restrições e resultados mensuráveis.

---

## Assets para mídia

**Foto de perfil:** [Baixar foto alta resolução]({{ "/images/Foto_Camilo_perfil.jpg" | absolute_url }})
**Slides e materiais:** Disponíveis sob solicitação para palestras passadas
**Redes:** [LinkedIn](https://www.linkedin.com/in/camilocaceresf) | [GitHub](https://github.com/camilo-cf) | [Google Scholar](https://scholar.google.com/citations?user=325XocAAAAAJ)

---

## Aparições recentes e próximas

### 2025
*Disponibilidade para temporada de conferências (Q2-Q4 2025)*

### Arquivo (2012-2017)
Apresentações anteriores em conferências acadêmicas disponíveis na [página de arquivo de palestras]({{ "/talks/" | relative_url }}).

---

**Pronto para reservar?** Entre em contato via [LinkedIn]({{ site.contact.linkedin_url }}) ou a [página de contato]({{ "/pt-br/contato/" | relative_url }}).
