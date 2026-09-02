# Plan de acción SEO — Caminando Otro Sendero

**Objetivo:** mover el sitio desde una base técnicamente sana hacia mayor autoridad, captación cualificada y medición verificable.  
**Punto de partida:** SEO Health Score provisional 78/100; 0 bloqueos críticos de indexación.

## Principios

- No crear texto para alcanzar un conteo: cubrir preguntas reales, decisiones y riesgos del comprador.
- No inventar reseñas, cifras, casos, direcciones, años o credenciales.
- Confirmar la historia legal antes de modificar `SPA`, `E.I.R.L.` o foundingDate.
- Medir antes/después con GSC, GA4, GBP y CWV.

## Fase 1 — 0 a 7 días

| Prioridad | Acción | Responsable sugerido | Esfuerzo | Criterio de aceptación |
|---|---|---|---:|---|
| Alta | Publicar política de privacidad y aviso/consentimiento junto al formulario | Legal + web | M | Footer y formulario enlazan una política que identifica responsable, finalidad, conservación y derechos. |
| Alta | Enlazar las 6 fichas desde `/pages/servicios` | Web | S | Las seis tarjetas son enlaces descriptivos; todas las fichas quedan a ≤2 clics de inicio. |
| Alta | Contextualizar CTA y formulario | UX + web | M | Cada servicio tiene CTA en hero; `?servicio=` preselecciona opción; incluye capacitaciones, monitoreo y taxonomía; se explica respuesta/siguiente paso. |
| Alta | Verificar identidad legal y fecha de inicio | Dirección | S | Documento interno confirma nombre actual, anterior si aplica, fecha de transformación y fecha de inicio; no se publica nada contradictorio. |
| Alta | Añadir headers defensivos | Web/infra | M | CSP report-only probada; `nosniff`, referrer policy, permissions policy y frame protection presentes sin romper formulario, fuentes o scripts. |
| Media | Ajustes móviles | Web/CSS | S | Body ≥16 px; menú y paginación ≥48×48 px; test visual 375×812 sin overflow. |

### Estado de ejecución — 2 de septiembre de 2026

- [x] Política de privacidad publicada y enlazada desde el formulario y los pies de página.
- [x] Consentimiento requerido y validado tanto en navegador como en la API.
- [x] Las seis fichas de servicio están enlazadas desde el hub de servicios.
- [x] CTA contextual en hero y contenido, con preselección por `?servicio=` y plazo de respuesta visible.
- [x] Identidad vigente confirmada por el titular y normalizada como **Caminando Otro Sendero SpA**, RUT **76.932.987-0**, con base en Talcahuano.
- [x] Headers defensivos configurados; CSP desplegable inicialmente en modo report-only.
- [x] Tipografía móvil y controles principales ajustados a los mínimos definidos.
- [ ] Historia societaria cerrada. Aún falta la fecha/documento de una eventual transformación desde E.I.R.L.; esta incertidumbre histórica no afecta la identidad vigente ya confirmada. Véase `IDENTITY-VERIFICATION.md`.

## Fase 2 — 2 a 4 semanas

| Prioridad | Acción | Responsable sugerido | Esfuerzo | Criterio de aceptación |
|---|---|---|---:|---|
| Alta | Elevar 5 fichas al estándar de artrópodos | Especialista + contenido | L | Cada página cubre alcance, entradas, método, límites, QA/QC, entregables, responsable, fuentes y siguiente paso; revisión humana firmada. |
| Alta | Publicar 3 casos de estudio | Dirección + contenido | L | Cada caso incluye contexto, territorio, objetivo, método, esfuerzo, entregable, resultado permitido, limitación y 2–4 fotos autorizadas. |
| Alta | Resolver el grafo de entidad | Web + dirección | M | `Organization` tiene un núcleo idéntico en todo el sitio; LinkedIn personal sólo en `Person`; transición legal explicada sólo si está validada. |
| Media | Completar `Service` schema | Web | M | Seis servicios con `url`, `description`, `provider`, `areaServed` y `WebPage.mainEntity`; validan en Schema.org/Rich Results donde aplique. |
| Media | Firmas, fechas y fuentes inline | Especialista + contenido | M | Toda ficha técnica muestra autor/revisor, credencial, fecha de actualización y fuente primaria junto a afirmaciones principales. |
| Media | Convertir galerías en evidencia | Contenido | M | Cada foto prioritaria tiene caption visible: actividad, región/ecosistema, período, método y enlace a servicio/caso. |
| Media | Expandir Sobre nosotros y Publicaciones | Dirección + contenido | M | Biografía verificable; publicaciones con año, DOI/permalink, resumen y relación con servicios. |

### Estado de ejecución — 2 de septiembre de 2026

- [x] Las seis fichas de servicio alcanzan el estándar editorial: alcance, entradas, método, QA/QC, entregables, límites, responsable, fecha, fuentes y siguiente paso.
- [x] Publicados tres casos documentales con evidencia original, contexto, territorio, objetivo, método, esfuerzo disponible, entregable, resultado permitido y limitaciones explícitas.
- [x] Grafo de entidad consolidado: los cuatro nodos corporativos comparten un núcleo idéntico; LinkedIn permanece sólo en `Person`; no se publica una transición societaria histórica no documentada.
- [x] `Service` schema completo para los seis servicios, enlazado como `WebPage.mainEntity` y comprobado por la auditoría local.
- [x] Firmas, fechas y fuentes primarias incorporadas en las seis fichas técnicas.
- [x] Galerías ampliadas con captions de evidencia y corregidas las descripciones cruzadas detectadas en la segunda página.
- [x] Ampliadas las páginas “Sobre nosotros” y “Publicaciones” con biografía verificable, DOI/permalinks, resúmenes y vínculos hacia los servicios.

## Fase 3 — Medición y SEO local, 2 a 6 semanas

| Prioridad | Acción | Responsable sugerido | Esfuerzo | Criterio de aceptación |
|---|---|---|---:|---|
| Alta | Conectar GSC y GA4 | Analítica | M | Propiedad verificada, sitemap enviado, conversiones de formulario/WhatsApp/teléfono configuradas y dashboard base. |
| Alta | Verificar/optimizar GBP | Dirección + marketing | M | Ficha reclamada, categoría real, URL/teléfono coherentes, modalidad SAB correcta y UTM configurada; no se publica domicilio privado. |
| Alta | Programa ético de reseñas | Dirección | M | Solicitud no condicionada tras trabajos reales; registro de recencia y respuestas; cero reseñas incentivadas o filtradas. |
| Media | Auditoría NAP/citaciones | Marketing | M | GBP, Bing Places, Apple Business Connect, LinkedIn empresa y citaciones sectoriales legítimas usan identidad coherente. |
| Media | Baseline CWV | Web | M | PSI/CrUX móvil y desktop para home, hub, ficha extensa y galerías; si no hay CrUX, 3 Lighthouse y mediana documentada. |
| Media | Baseline backlinks | SEO | M | Export GSC/Bing + proveedor opcional; dominios referentes, anchors, enlaces perdidos y páginas destino documentados sin depender de una sola métrica. |

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

## KPI de los primeros 90 días

| KPI | Baseline | Meta inicial |
|---|---|---|
| URL válidas en sitemap | 14/14 | Mantener 100% |
| Servicios enlazados desde hub | 1/6 | 6/6 |
| Páginas comerciales con estándar editorial completo | 1/6 | 6/6 |
| Casos publicados | 0 | 3 |
| Formularios con privacidad visible | 0/1 | 1/1 |
| CWV p75 | No disponible | Baseline + plan; luego LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 |
| GSC/GA4/GBP | No verificables | Conectados y con eventos/UTM |
| Conversiones orgánicas | No disponible | Baseline y tendencia mensual, sin meta arbitraria previa |

## Orden recomendado

1. Privacidad y confianza.
2. Hub + CTA + formulario contextual.
3. Validación y consolidación de entidad.
4. Casos y profundidad técnica.
5. Datos estructurados y citabilidad.
6. Medición de GSC/GA4/GBP/CWV/backlinks.
7. Optimización basada en datos.
