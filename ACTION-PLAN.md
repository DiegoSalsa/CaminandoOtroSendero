# Plan de acción SEO — Caminando Otro Sendero

**Objetivo:** mover el sitio desde una base técnicamente sana hacia mayor autoridad, captación cualificada y medición verificable.  
**Punto de partida:** SEO Health Score provisional 78/100; 0 bloqueos críticos de indexación.

## Principios

- No crear texto para alcanzar un conteo: cubrir preguntas reales, decisiones y riesgos del comprador.
- No inventar reseñas, cifras, casos, direcciones, años o credenciales.
- Confirmar la historia legal antes de modificar `SPA`, `E.I.R.L.` o foundingDate.
- Medir antes/después con GSC, GA4, GBP y CWV.

## Restricciones aprobadas de implementación

- El diseño y el contenido visible de las páginas existentes se conserva como la versión aprobada antes de las fases 1 y 2.
- Las fichas individuales, Experiencias y Privacidad se acceden sólo desde el pie de página; no se enlazan desde tarjetas, contenido ni navegación principal.
- No se publican notas editoriales, captions interpretativos ni contenido técnico nuevo sin información aprobada por el cliente.

## Fase 1 — 0 a 7 días

| Prioridad | Acción | Responsable sugerido | Esfuerzo | Criterio de aceptación |
|---|---|---|---:|---|
| Alta | Publicar política de privacidad desde el pie de página | Legal + web | M | El pie de página enlaza una política que identifica responsable, finalidad, conservación y derechos. |
| Alta | Mantener las fichas de servicio sólo en el pie de página | Web | S | Las tarjetas describen las capacidades sin enlazar a fichas individuales; el acceso a esas fichas se conserva exclusivamente en el pie de página. |
| Alta | Mantener CTA y formulario del diseño aprobado | UX + web | S | Las llamadas a la acción y el formulario conservan el flujo y la presentación aprobados por el cliente. |
| Alta | Verificar identidad legal y fecha de inicio | Dirección | S | Documento interno confirma nombre actual, anterior si aplica, fecha de transformación y fecha de inicio; no se publica nada contradictorio. |
| Alta | Añadir headers defensivos | Web/infra | M | CSP report-only probada; `nosniff`, referrer policy, permissions policy y frame protection presentes sin romper formulario, fuentes o scripts. |
| Media | Ajustes móviles | Web/CSS | S | Body ≥16 px; menú y paginación ≥48×48 px; test visual 375×812 sin overflow. |

### Estado de ejecución — 2 de septiembre de 2026

- [x] Política de privacidad publicada y accesible sólo desde los pies de página.
- [x] Las seis fichas de servicio se encuentran sólo en los pies de página, conforme a la regla de navegación indicada por el cliente.
- [x] CTA y formulario restituidos a su presentación aprobada.
- [x] Identidad vigente confirmada por el titular y normalizada como **Caminando Otro Sendero SpA**, RUT **76.932.987-0**, con base en Talcahuano.
- [x] Headers defensivos configurados; CSP desplegable inicialmente en modo report-only.
- [ ] Consentimiento explícito en formulario: pospuesto para preservar el flujo y la presentación aprobados.
- [ ] Ajustes de tipografía móvil: pospuestos para preservar el diseño aprobado.
- [ ] Historia societaria cerrada. Aún falta la fecha/documento de una eventual transformación desde E.I.R.L.; esta incertidumbre histórica no afecta la identidad vigente ya confirmada. Véase `IDENTITY-VERIFICATION.md`.

## Fase 2 — 2 a 4 semanas

| Prioridad | Acción | Responsable sugerido | Esfuerzo | Criterio de aceptación |
|---|---|---|---:|---|
| Alta | Elevar 5 fichas al estándar de artrópodos | Especialista + contenido | L | Cada página cubre alcance, entradas, método, límites, QA/QC, entregables, responsable, fuentes y siguiente paso; revisión humana firmada. |
| Alta | Publicar 3 experiencias de trabajo | Dirección + contenido | L | Una sola página de experiencias, accesible sólo desde el pie de página, reúne tres trabajos con fotografías autorizadas y sin exponer antecedentes de clientes. |
| Alta | Resolver el grafo de entidad | Web + dirección | M | `Organization` tiene un núcleo idéntico en todo el sitio; LinkedIn personal sólo en `Person`; transición legal explicada sólo si está validada. |
| Media | Completar `Service` schema | Web | M | Seis servicios con `url`, `description`, `provider`, `areaServed` y `WebPage.mainEntity`; validan en Schema.org/Rich Results donde aplique. |
| Media | Firmas, fechas y fuentes inline | Especialista + contenido | M | Toda ficha técnica muestra autor/revisor, credencial, fecha de actualización y fuente primaria junto a afirmaciones principales. |
| Media | Convertir galerías en evidencia | Contenido | M | Cada foto prioritaria tiene caption visible: actividad, región/ecosistema, período, método y enlace a servicio/caso. |
| Media | Expandir Sobre nosotros y Publicaciones | Dirección + contenido | M | Biografía verificable; publicaciones con año, DOI/permalink, resumen y relación con servicios. |

### Estado de ejecución — 2 de septiembre de 2026

- [ ] Profundizar cinco fichas al estándar editorial: pendiente contar con información verificable y aprobación explícita, sin alterar diseño ni navegación.
- [x] Publicadas tres experiencias de trabajo en una única página accesible desde el pie de página, sin exponer antecedentes de clientes o proyectos que no corresponde publicar.
- [ ] Completar la verificación del grafo de entidad en producción: el schema local valida y `Service` referencia la entidad corporativa, pero la corroboración externa queda pendiente de que Google procese las URL.
- [x] `Service` schema completo para los seis servicios, enlazado como `WebPage.mainEntity` y comprobado por la auditoría local.
- [ ] Firmas, fechas y fuentes primarias visibles: sólo 2 de 6 fichas contienen esas señales; completar sólo con respaldo aprobado.
- [ ] Captions de evidencia en galerías: pendiente; las galerías mantienen la presentación aprobada sin captions editoriales.
- [ ] Ampliar “Sobre nosotros” y “Publicaciones”: pendiente contenido verificable y aprobación explícita; se conserva el contenido publicado previamente.

## Fase 3 — Medición y SEO local, 2 a 6 semanas

| Prioridad | Acción | Responsable sugerido | Esfuerzo | Criterio de aceptación |
|---|---|---|---:|---|
| Alta | Conectar GSC y GA4 | Analítica | M | Propiedad verificada, sitemap enviado, conversiones de formulario/WhatsApp/teléfono configuradas y dashboard base. |
| Alta | Verificar/optimizar GBP | Dirección + marketing | M | Ficha reclamada, categoría real, URL/teléfono coherentes, modalidad SAB correcta y UTM configurada; no se publica domicilio privado. |
| Alta | Programa ético de reseñas | Dirección | M | Solicitud no condicionada tras trabajos reales; registro de recencia y respuestas; cero reseñas incentivadas o filtradas. |
| Media | Auditoría NAP/citaciones | Marketing | M | GBP, Bing Places, Apple Business Connect, LinkedIn empresa y citaciones sectoriales legítimas usan identidad coherente. |
| Media | Baseline CWV | Web | M | PSI/CrUX móvil y desktop para home, hub, ficha extensa y galerías; si no hay CrUX, 3 Lighthouse y mediana documentada. |
| Media | Baseline backlinks | SEO | M | Export GSC/Bing + proveedor opcional; dominios referentes, anchors, enlaces perdidos y páginas destino documentados sin depender de una sola métrica. |

### Estado de ejecución — 2 de septiembre de 2026

- [x] Search Console verificado y sitemap enviado: `Success`, 15 URL descubiertas; el informe de indexación aún procesa datos.
- [~] GA4: propiedad **Caminando Otro Sendero** y flujo web creados (stream `15658308396`). La etiqueta y las conversiones quedan pendientes de un mecanismo de consentimiento compatible con la regla de no alterar páginas existentes; no se activa recolección sin ese paso.
- [ ] GBP, reseñas éticas y auditoría NAP/citaciones: sin verificar.
- [x] Baseline CWV de laboratorio: tres corridas Lighthouse móvil por plantilla, con mediana de 87/3,35 s LCP en inicio; 88/3,28 s en servicios; 91/2,86 s en la ficha extensa; y 82/4,12 s en galería. No hay datos CrUX ni INP de campo aún. Galería es la prioridad para una traza posterior sin modificar el diseño a ciegas.
- [ ] Baseline de backlinks: no hay export GSC/Bing ni proveedor conectado. La búsqueda pública detectó menciones académicas y perfiles históricos, pero no constituye una línea base de enlaces hacia el dominio.

## Fase 4 — 1 a 3 meses

| Prioridad | Acción | Responsable sugerido | Esfuerzo | Criterio de aceptación |
|---|---|---|---:|---|
| Media | Contenido por preguntas e intención | Especialista + SEO | L | Bloques autosuficientes y citables, sin repetición; páginas priorizadas por consultas de GSC/SERP real. |
| Media | Activos enlazables | Especialista | L | Guías, checklist o datos propios con metodología, autor, fecha y fuentes; outreach sólo a entidades relevantes. |
| Media | Optimizar performance según trazas | Web | L | CWV buenos o mejoras medidas; hero, CSS, fuentes y galerías optimizados según waterfall, no por suposición. |
| Baja | Política de crawlers/licenciamiento | Dirección + legal | M | Decisión explícita para search bots vs training bots; robots/RSL/términos coherentes. |
| Baja | Automatizar controles | Web | M | CI falla ante metadata, canonical, sitemap, links o JSON-LD inválidos; IndexNow se envía sólo cuando cambian URL indexables. |

## Backlog técnico específico

- Reducir `http://apex` a una sola redirección hacia HTTPS `www`.
- Hacer `.reveal` visible por defecto y animarlo sólo bajo progressive enhancement.
- Probar AVIF + WebP, `srcset/sizes` y presupuestos: hero móvil ≤150 KB, desktop ≤250 KB cuando la calidad lo permita.
- Añadir `og:image:width`, `og:image:height` y `og:image:type`.
- Mantener `lastmod` por URL sólo ante cambios sustanciales.
- Renombrar de forma controlada activos históricos de `galeria-2` o mantener un mapa archivo→escena.
- IndexNow enviado el 2 de septiembre de 2026: las 15 URL fueron aceptadas con HTTP 200. Reenviar sólo después de cambios en URL indexables.

## KPI de los primeros 90 días

| KPI | Baseline | Meta inicial |
|---|---|---|
| URL descubiertas en sitemap | 15/15 | Mantener 100% |
| Fichas de servicio accesibles desde footer | 6/6 | Mantener 6/6 según regla de navegación |
| Páginas comerciales con estándar editorial completo | 1/6 | 6/6 |
| Casos publicados | 0 | 3 |
| Política de privacidad accesible desde footer | 1/1 | Mantener 1/1 |
| Formularios con consentimiento visible | 0/1 | Pospuesto por diseño aprobado |
| CWV p75 | No disponible | Baseline + plan; luego LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 |
| GSC/GA4/GBP | GSC y sitemap verificados; GA4 con propiedad y flujo creados, sin etiqueta; GBP pendiente | Conectados y con eventos/UTM |
| Conversiones orgánicas | No disponible | Baseline y tendencia mensual, sin meta arbitraria previa |

## Orden recomendado

1. Privacidad y confianza.
2. Hub + CTA + formulario contextual.
3. Validación y consolidación de entidad.
4. Casos y profundidad técnica.
5. Datos estructurados y citabilidad.
6. Medición de GSC/GA4/GBP/CWV/backlinks.
7. Optimización basada en datos.
