---
layout: single
title: "Charlas y Media Kit"
permalink: /es-419/charlas/
author_profile: true
lang: "es-419"
i18n_key: "speaking"
ref: "speaking"
description: "Reserva a Camilo para charlas sobre ML en producción, evaluación de GenAI, medición causal de anuncios y MLOps. Conferencista y facilitador de talleres."
excerpt: "Charlas en conferencias, talleres y sesiones técnicas sobre sistemas de ML en producción, GenAI y MLOps."
---

Participo en conferencias, eventos corporativos y talleres sobre sistemas de ML en producción, evaluación de GenAI, medición causal y pensamiento de plataforma. Mis charlas combinan patrones de arquitectura, experiencias reales y marcos de trabajo que los equipos pueden aplicar de inmediato.

## Reserva para tu evento

Disponible para:
- Keynotes y tracks técnicos en conferencias
- Talleres corporativos y charlas técnicas
- Paneles sobre liderazgo en ML/IA
- Podcasts y entrevistas

**Contacto:** [LinkedIn]({{ site.contact.linkedin_url }}) o [revelar email]({{ "/es-419/contacto/" | relative_url }})

---

## Propuestas de charlas

### 1. Runbooks de reversión: Sistemas de ML reversibles a escala

**Resumen:** La mayoría de equipos de ML se enfocan en desplegar modelos. Pocos invierten en infraestructura de reversión—hasta que un modelo malo llega a producción. Esta charla cubre la anatomía de las reversiones de ML: planos de control para dirigir tráfico, suites de pruebas doradas para detectar regresiones, y patrones de observabilidad que detectan problemas antes que los clientes.

**Aprendizajes clave:**
- Patrones de despliegue sombra para validación sin riesgo
- Testing basado en contratos entre datos/modelos/servicios
- Plantillas de runbooks para reversión y failover de tráfico
- Observabilidad por defecto que detecta drift antes de incidentes

**Audiencia:** Ingenieros de ML, equipos de plataforma, SREs
**Nivel:** Intermedio a avanzado
**Duración:** 45 min charla o taller de 2 horas
**Formato:** Slides + diagramas de arquitectura + walkthrough de runbook

---

### 2. Ciclos de evaluación de GenAI: De vibes a métricas

**Resumen:** Los copilotos de IA generativa son fáciles de demostrar, difíciles de lanzar con seguridad. Sin evaluación estructurada, los equipos confían en "vibe checks" y esperanza. Esta charla introduce ciclos de evaluación para sistemas basados en LLM: cómo definir métricas relevantes, construir cadenas de evaluadores (LLM-as-judge + reglas + humanos), e integrarlos en CI/CD.

**Aprendizajes clave:**
- Diseño de métricas de eval para retrieval, generación y seguridad
- Patrones LLM-as-judge: cuándo funcionan, cuándo fallan
- Integración de feedback humano en el loop
- Trade-offs costo/calidad en evaluadores de producción

**Audiencia:** Ingenieros de ML/IA, equipos de producto lanzando GenAI
**Nivel:** Intermedio
**Duración:** 40 min
**Formato:** Slides + snippets de código + plantillas de frameworks de evaluación

---

### 3. Medición causal para anuncios: Más allá de la correlación

**Resumen:** Atribución e incrementalidad son los problemas más difíciles en ML de anuncios. Los clics correlacionan con compras, ¿pero los anuncios las causan? Esta charla cubre frameworks de medición causal para publicidad digital: experimentos geo para estimación de lift, CUPED para reducción de varianza, controles sintéticos para contrafácticos, y cómo comunicar incertidumbre a stakeholders de negocio que quieren certeza.

**Aprendizajes clave:**
- Diseño de experimentos geo para incrementalidad de anuncios
- Técnicas de reducción de varianza (CUPED, estratificación)
- Bosques causales para efectos de tratamiento heterogéneos
- Comunicación de estimaciones de lift e intervalos de confianza

**Audiencia:** Data scientists, ingenieros de ML en ads/growth/marketplaces
**Nivel:** Avanzado
**Duración:** 50 min
**Formato:** Slides + ejemplos prácticos + notebooks de simulación

---

### 4. Pensamiento de plataforma para equipos de ML: Contratos sobre caos

**Resumen:** La mayoría de equipos de ML construyen pipelines únicos. Los equipos maduros construyen plataformas. Pero pensar en plataforma no es solo código reutilizable—es sobre contratos, observabilidad por defecto, y mecanismos que previenen regresiones. Esta charla cubre contratos de esquema para APIs de datos/modelos, CI/CD/CT para ML, y patrones de gobierno que escalan sin bloquear velocidad.

**Aprendizajes clave:**
- Desarrollo dirigido por contratos para pipelines de ML
- Patrones CI/CD/CT: entrenamiento continuo sin incendios continuos
- Gobierno de feature stores que no frena equipos
- APIs de plataforma vs. scripts únicos: cuándo abstraer

**Audiencia:** Ingenieros de plataforma ML, tech leads, managers de ingeniería
**Nivel:** Intermedio
**Duración:** 45 min o taller de 3 horas
**Formato:** Slides + diagramas de arquitectura + plantillas de contratos

---

### 5. Experimentación fast-fail: Matando malas ideas más rápido

**Resumen:** La mayoría de charlas de A/B testing se enfocan en significancia estadística. Esta se enfoca en velocidad. ¿Cómo diseñas experimentos que fallan rápido, detectan efectos negativos temprano, y minimizan exposición de clientes a variantes malas? Cubre testing secuencial, reglas de parada temprana, métricas guardrail, y el cambio cultural de "corre 2 semanas" a "mata en 2 días si es malo."

**Aprendizajes clave:**
- Análisis secuencial para parada adaptativa
- Métricas guardrail y kill switches automáticos
- Diseño de dashboards de experimentos para triage rápido
- Patrones organizacionales: ¿quién tiene autoridad para detener un experimento?

**Audiencia:** Data scientists, product managers, equipos de growth
**Nivel:** Intermedio
**Duración:** 35 min
**Formato:** Slides + framework de decisión + ejemplos de dashboards

---

### 6. Historias de guerra de MLOps: Qué rompimos y cómo lo arreglamos

**Resumen:** Una colección de incidentes de ML en producción y los cambios arquitectónicos que forzaron. Picos de latencia en model serving por tuning de batch size. Drift silencioso de datos que corrompió pipelines de entrenamiento. Shadow deployments que no hacían shadow. Esta charla tiene poco de "mejores prácticas" y mucho de "esto salió mal y qué aprendimos." Formato Q&A interactivo bienvenido.

**Aprendizajes clave:**
- Modos comunes de falla de MLOps y sus soluciones
- Patrones de observabilidad que hubieran detectado problemas antes
- Plantillas de respuesta a incidentes para outages de ML
- Cultura de post-mortems: sin culpables, accionable, compartible

**Audiencia:** Ingenieros de ML, SREs, cualquiera que lance ML a producción
**Nivel:** Todos los niveles (historias accesibles, soluciones técnicas)
**Duración:** 30-45 min
**Formato:** Storytelling + Q&A + plantillas de reportes de incidentes

---

## Bio

### Corta (50 palabras)
Camilo es Staff ML Engineer y arquitecto de IA en Mercado Libre, liderando sistemas de producción para anuncios, GenAI y MLOps. Tiene Ph.D. en Mecatrónica de UNICAMP y EMBA en Liderazgo Estratégico. Habla y escribe sobre confiabilidad de ML, medición causal y pensamiento de plataforma.

### Media (100 palabras)
Camilo Cáceres es Staff ML Engineer y arquitecto de IA en Mercado Libre, donde lidera componentes de ML para display ads, rails de seguridad de GenAI y arquitectura de plataforma. Su trabajo abarca sistemas de ML en producción a escala: desde medición causal de incrementalidad para anuncios hasta CI/CD/CT para modelos y patrones de observabilidad por defecto. Previamente estandarizó prácticas de arquitectura y gobierno de ML en AB InBev y otros equipos empresariales. Tiene Ph.D. en Ingeniería Mecánica (Mecatrónica) de UNICAMP y EMBA en Liderazgo Estratégico. Le apasiona hacer sistemas de ML reversibles, medibles y aburridos.

### Larga (200 palabras)
Camilo Andrés Cáceres Flórez es Staff ML Engineer y arquitecto de IA enfocado en sistemas de producción para anuncios, marketplaces, personalización y GenAI. Actualmente en Mercado Libre, lidera componentes de ML para el DSP, diseña planos de control para rollout y rollback de modelos, y hace coaching a equipos sobre contratos entre datos, modelos y servicios en runtime. Su alcance equilibra restricciones de latencia, costo y cumplimiento manteniendo observabilidad por defecto.

Antes de Mercado Libre, Camilo impulsó estandarización de arquitectura de ML, despliegues de GNN y prácticas de CI/CD/CT como Principal Data Scientist & ML Engineer en AB InBev. Roles anteriores incluyen liderar mejoras de modelos SOTA e iniciativas de IA generativa, construir componentes reutilizables de MLOps, y entregar soluciones de data science en sectores público y privado.

La profundidad técnica de Camilo viene de raíces diversas: tiene Ph.D. en Ingeniería Mecánica (Mecatrónica) de UNICAMP, donde investigó IA y robótica asistiva, y EMBA en Liderazgo Estratégico del Valar Institute. Sus publicaciones abarcan robótica, optimización y ML aplicado. Habla y escribe sobre redes de seguridad de ML en producción, medición causal para anuncios, evaluación de GenAI y pensamiento de plataforma—ayudando a equipos a alinear narrativa, restricciones y resultados medibles.

---

## Assets para medios

**Foto de perfil:** [Descargar foto alta resolución]({{ "/images/Foto_Camilo_perfil.jpg" | absolute_url }})
**Slides y materiales:** Disponibles bajo solicitud para charlas pasadas
**Redes:** [LinkedIn](https://www.linkedin.com/in/camilocaceresf) | [GitHub](https://github.com/camilo-cf) | [Google Scholar](https://scholar.google.com/citations?user=325XocAAAAAJ)

---

## Apariciones recientes y próximas

### 2025
*Disponibilidad para temporada de conferencias (Q2-Q4 2025)*

### Archivo (2012-2017)
Presentaciones anteriores en conferencias académicas disponibles en la [página de archivo de charlas]({{ "/talks/" | relative_url }}).

---

**¿Listo para reservar?** Contacta vía [LinkedIn]({{ site.contact.linkedin_url }}) o la [página de contacto]({{ "/es-419/contacto/" | relative_url }}).
