# Auditoría SEO integral — Caminando Otro Sendero

**Dominio:** https://www.caminandootrosendero.cl/  
**Fecha:** 2 de septiembre de 2026  
**Tipo detectado:** consultora ambiental B2B, negocio de área de servicio con base en Talcahuano/Biobío y cobertura nacional  
**Alcance:** 14 URL indexables, robots, sitemap, llms.txt, código desplegable, render desktop/móvil y señales externas disponibles

> **Actualización de implementación (2 de septiembre de 2026):** la Fase 1 del plan ya fue aplicada al código. Se resolvieron privacidad/consentimiento, enlaces del hub, CTA con contexto, normalización pública de entidad, headers defensivos y ajustes móviles. El titular confirmó la identidad vigente como Caminando Otro Sendero SpA, RUT 76.932.987-0; sólo permanece pendiente documentar una eventual transformación histórica desde E.I.R.L. El score 78/100 y los hallazgos siguientes se conservan como línea base previa.

## Resumen ejecutivo

### SEO Health Score: 78/100 — bueno, con brechas de crecimiento

El sitio tiene una base SEO técnica sólida. Las 14 URL descubiertas fueron rastreadas respetando `robots.txt`; las 14 respondieron 200, están en el sitemap, tienen canonical autorreferente, title y description únicos, un H1 y contenido renderizado en HTML. No se encontraron páginas huérfanas, enlaces internos rotos, `noindex` accidentales, canonical cruzadas, soft 404 ni dependencia de JavaScript para el contenido principal.

El freno no es la indexabilidad. Es la capacidad del sitio para demostrar autoridad, resolver completamente las dudas de compra y convertir esa confianza en consultas cualificadas. La mayoría de las páginas comerciales queda bajo los umbrales editoriales de cobertura; faltan casos de estudio, resultados, testimonios y contexto de proyectos; el hub de servicios enlaza sólo una de seis fichas; el formulario no muestra política de privacidad; y la identidad legal presenta una posible divergencia entre `SPA/2018` en el sitio y `E.I.R.L./2016` en fuentes externas que debe verificarse antes de corregir.

No hay datos de Search Console, GA4, GBP, CrUX ni Lighthouse. Por ello, visibilidad, tráfico, conversiones, backlinks, rankings locales y aprobación de Core Web Vitals quedan como **no verificados**. El score de performance y el score total son provisionales, no métricas de Google.

## Puntuación ponderada

| Categoría | Score | Peso | Aporte |
|---|---:|---:|---:|
| SEO técnico | 89 | 22% | 19,58 |
| Calidad de contenido | 70 | 23% | 16,10 |
| SEO on-page | 82 | 20% | 16,40 |
| Schema / datos estructurados | 82 | 10% | 8,20 |
| Performance / CWV | 60* | 10% | 6,00 |
| Preparación para AI Search | 74 | 10% | 7,40 |
| Imágenes | 84 | 5% | 4,20 |
| **Total** |  | **100%** | **77,88 → 78** |

\* Score heurístico con confianza baja por ausencia de CrUX/PSI/Lighthouse. No equivale a “PageSpeed 60”.

### Diagnósticos complementarios

| Área | Score | Lectura |
|---|---:|---|
| Sitemap y arquitectura | 89 | Cobertura perfecta; hub de servicios incompleto. |
| Experiencia visual | 89 | Portada y móvil sólidos; pequeños ajustes táctiles. |
| SXO | 68 | Buen ajuste informativo, conversión poco contextual. |
| SEO local | 45* | Landing útil; GBP, reseñas y citaciones no verificables. |
| Backlinks | Sin score | Datos insuficientes; no se inventaron métricas. |

\* “No verificable” no significa “inexistente”.

## Los cinco problemas prioritarios

1. **Confianza y privacidad insuficientes en el formulario — Alta.** Se recopilan nombre, empresa, correo y detalles de proyecto sin política de privacidad enlazada, finalidad, responsable ni aviso de consentimiento.
2. **Contenido comercial y prueba de experiencia incompletos — Alta.** Home: 313 palabras frente a un piso editorial de 500; hub: 510/800; cinco de seis servicios: 525–664/800. Más importante que el conteo: faltan casos, resultados, QA/QC, límites, ejemplos de entrega y evidencia contextual.
3. **Arquitectura de servicios y conversión fragmentadas — Alta.** `/pages/servicios` enlaza sólo la ficha de artrópodos. `capacitaciones` recibe un único inlink y queda a profundidad 3. Los CTA llevan a un formulario genérico que no conserva el servicio ni solicita antecedentes específicos.
4. **Entidad de marca potencialmente inconsistente — Alta, requiere validación.** El sitio usa `Caminando Otro Sendero SpA` y fundación 2018; fuentes externas relevantes presentan `Caminando Otro Sendero E.I.R.L.` y actividad desde 2016. Además, el LinkedIn personal del fundador aparece en `Organization.sameAs`. No cambiar datos legales hasta confirmar la historia societaria.
5. **Medición y SEO local sin evidencia operativa — Alta.** No se pudo validar GBP, reseñas, citaciones, posiciones, tráfico, conversiones ni CWV. Esto impide priorizar por impacto real y comprobar si la landing local compite en el local pack.

## Cinco quick wins

1. Enlazar desde el hub las seis fichas de servicio y reforzar `capacitaciones` desde páginas relacionadas.
2. Publicar y enlazar política de privacidad junto al formulario y en el footer.
3. Subir el texto móvil a 16 px y los controles interactivos a 48 × 48 px.
4. Añadir CTA en el hero de cada servicio con `?servicio=` preseleccionado y explicar el siguiente paso/tiempo de respuesta.
5. Tras validar los datos legales, eliminar LinkedIn personal de `Organization.sameAs`, unificar `Organization` y conservar ese LinkedIn sólo en `Person.sameAs`.

## 1. SEO técnico — 89/100

### Lo que funciona

- 14 URL descubiertas, 14 rastreadas, 14 con HTTP 200 y cero errores.
- `robots.txt`, `sitemap.xml` y `llms.txt` responden 200.
- HTTPS y HSTS activos; HTTPS sin `www` redirige 308 a la versión canónica.
- Canonical autorreferente, `index,follow` y un H1 en 14/14 páginas.
- `.html` y slash final se normalizan con 308; URL inexistente devuelve 404 real.
- Contenido, metadatos y JSON-LD presentes en HTML inicial.
- El control local `npm.cmd run seo:audit` pasó: metadatos, JSON-LD, sitemap y targets locales válidos.

### Problemas

- Faltan headers defensivos: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y protección explícita contra framing.
- `http://caminandootrosendero.cl/` requiere dos redirecciones antes de llegar a HTTPS `www`.
- Texto base móvil de 15,5 px y controles de 42–44 px.
- `.reveal` oculta contenido por defecto hasta ejecutar JS; Google ve el DOM, pero una falla de JS degrada la experiencia.
- CWV reales no medidos.

### Recomendación

Desplegar headers primero en modo report-only, corregir objetivos táctiles y fuente, reducir la cadena HTTP apex y establecer una baseline PSI/CrUX/Lighthouse. Mantener INP, no FID, como métrica de interacción.

## 2. Sitemap y arquitectura — 89/100

- XML válido, 14/14 URL HTTPS canónicas, indexables y con 200.
- Cobertura observada: 100%; sin faltantes, extras o redirects.
- `robots.txt` referencia correctamente el sitemap.
- `lastmod` uniforme 2026-09-01 coincide actualmente con Git, pero debe actualizarse por URL sólo ante cambios sustanciales.
- Sin páginas huérfanas; profundidad máxima 3.
- El hub de servicios enlaza sólo 1 de 6 fichas. `capacitaciones` y `galeria-2` tienen un único inlink; sólo el primero es una debilidad comercial.

## 3. SEO on-page — 82/100

- Titles: 14/14 únicos, 43–61 caracteres.
- Descriptions: 14/14 únicas, 130–156 caracteres.
- H1: 14/14 con exactamente uno.
- Canonicals y URLs finales: 14/14 coincidentes.
- Open Graph y Twitter Card: cobertura completa.
- Slugs limpios y coherentes.

Los H1 de Publicaciones, Galería, Nosotros y Contacto son expresivos, pero poco descriptivos fuera de contexto. Conviene mantener el tono y agregar el descriptor de búsqueda en el H1 o inmediatamente después. `sobre-nosotros` (61 caracteres) y `monitoreo-biodiversidad` (60) merecen comprobarse en snippets móviles, sin aplicar cortes mecánicos.

## 4. Contenido y E-E-A-T — 70/100

### E-E-A-T: 72/100

| Factor | Score | Lectura |
|---|---:|---|
| Experiencia | 16/20 | Fotos propias, trabajo de campo, clientes y trayectoria; faltan casos y resultados. |
| Expertise | 20/25 | Fundador especialista y publicaciones; falta perfil curricular completo y QA/QC. |
| Autoridad | 17/25 | Literatura científica y fuentes oficiales; faltan testimonios y menciones contextuales. |
| Confianza | 19/30 | Contacto y razón social visibles; falta privacidad, términos y evidencia operativa. |

### Cobertura por tipo

- Home: 313/500 — insuficiente.
- Landing Concepción/Biobío: 535 — adecuada como landing local corta.
- Sobre nosotros: 396/~400 — al límite.
- Hub de servicios: 510/800 — insuficiente.
- Artrópodos: 1.026/800 — cumple y es el estándar interno.
- Fauna: 664/800; monitoreo: 614/800; educación: 612/800; taxonomía: 588/800; capacitaciones: 525/800 — insuficientes.
- Publicaciones: adecuada como colección, pero necesita resúmenes/hallazgos por trabajo.
- Galerías: evidencia visual valiosa con poco contexto semántico.

No se encontró duplicación literal relevante entre las fichas, pero sí una plantilla repetida. Ampliar con contenido específico: fauna (grupos/estacionalidad), monitoreo (indicadores/comparabilidad), taxonomía (preservación/QA), educación (resultados/logística) y capacitaciones (facilitador/temario/evaluación).

## 5. Schema — 82/100

- 14/14 páginas indexables con JSON-LD válido.
- 48 nodos y 13 breadcrumbs estructuralmente correctos.
- Sin Microdata/RDFa, placeholders ni tipos retirados.
- No se recomienda `HowTo`.
- Hay 8 `FAQPage`: válidos semánticamente, pero un sitio comercial no debe esperar rich results FAQ de Google. Seis bloques muestran diferencias de redacción con el texto visible.

### Prioridades

1. Quitar el LinkedIn personal de `Organization.sameAs` y dejarlo en `Person.sameAs`.
2. Unificar `Organization` (`name`, `legalName`, URL, logo, contacto y `@id`) tras verificar la historia legal.
3. Agregar `url` y `description` a los seis `Service`; conectar `WebPage.mainEntity` con cada servicio.
4. Usar `ProfessionalService` sólo si representa correctamente una ubicación física/operativa real. No inventar calle, horarios o coordenadas.
5. Modelar publicaciones como `ScholarlyArticle`/`CreativeWork` o `ItemList` con DOI, autor, fecha y revista.

## 6. Performance y Core Web Vitals — 60/100 provisional

No hay LCP, INP ni CLS medidos. El código contiene señales favorables: héroes WebP móvil/escritorio, preload por media, `fetchpriority="high"`, dimensiones en 86/88 imágenes, lazy loading amplio y JS pequeño con listeners optimizados. Los principales riesgos son héroes desktop de ~280–366 KB, CSS render-blocking, Google Fonts y galerías pesadas.

| Métrica | Estado | Objetivo |
|---|---|---:|
| LCP | No evaluable | ≤2,5 s p75 |
| INP | No evaluable | ≤200 ms p75 |
| CLS | No evaluable | ≤0,1 p75 |

Medir portada, hub, una ficha extensa y ambas galerías. Si CrUX no tiene suficiente tráfico, ejecutar tres Lighthouse por perfil y guardar la mediana; TBT es diagnóstico de laboratorio, no sustituto de INP.

## 7. Imágenes — 84/100

- 88 etiquetas `img`; 0 sin `alt`; 2 con `alt=""` son placeholders del lightbox.
- 86/88 con dimensiones; las dos excepciones son esos placeholders.
- 47 lazy y 13 héroes con prioridad alta.
- WebP generalizado y variantes responsive en héroes.
- La inspección visual confirmó que los 15 alt de `galeria-2` describen correctamente las fotos. Algunos nombres de archivo históricos están desalineados, lo que aumenta el riesgo de mantenimiento.

Optimizar los héroes grandes, usar AVIF + WebP cuando resulte conveniente, reservar `fetchpriority=high` al LCP y añadir captions visibles con actividad, región, fecha/período, método y servicio.

## 8. GEO / AI Search — 74/100

### Fortalezas

- Googlebot, Bingbot, OAI-SearchBot y ChatGPT-User permitidos explícitamente; ClaudeBot y PerplexityBot permitidos por comodín.
- `llms.txt` presente y útil.
- HTML estático, schema abundante, fuentes oficiales y publicaciones científicas.
- Entidad experta clara: Luis E. Carrera Suárez.

### Brechas

- Cero párrafos individuales de 134–167 palabras; muchos fragmentos dependen de su heading y pierden contexto al extraerse.
- Pocas cifras propias verificables y fuentes generalmente separadas de la afirmación.
- Fechas/byline visibles inconsistentes.
- Entidad legal divergente y contenido multimedia poco citable.
- RSL no detectado; definir política antes de publicar permisos de reutilización/entrenamiento.

Crear un bloque autosuficiente y firmado por servicio, con definición, método, entregable, territorio, credencial y fuente. El rango de palabras es una guía de empaquetado, no una cuota rígida.

## 9. SXO — 68/100

La debilidad sistémica es **Acción**: todos los perfiles terminan en un contacto genérico. Las páginas técnicas resuelven bien la consideración, especialmente artrópodos, pero el usuario no ve en el hero qué hacer, qué antecedentes enviar, quién responderá o cuánto tardará.

Prioridades:

- Hacer enlazables todas las tarjetas del hub.
- CTA contextual por servicio y formulario preseleccionado.
- Agregar `capacitaciones`, monitoreo y taxonomía acuática como opciones específicas.
- Publicar casos, extractos anonimizados de entregables y rutas por audiencia.
- En landing local, aclarar “base en Talcahuano; cobertura en Gran Concepción/Biobío” y añadir evidencia local real.

## 10. SEO local — 45/100, baja confianza

El sitio comunica correctamente base en Talcahuano, cobertura en Biobío/Chile, teléfono y correo. La landing local tiene 535 palabras, title/H1 geográficos, FAQ, servicios y CTA; no parece doorway. El schema `ProfessionalService` es razonable para un negocio de área de servicio, pero no se verificaron GBP, reseñas, categorías, horarios, citaciones o geo-grid.

Antes de afirmar que faltan, verificar/obtener acceso a:

- Google Business Profile y sus Insights.
- Bing Places y Apple Business Connect.
- Nombre, teléfono y configuración de negocio de área de servicio.
- Reseñas, recencia y respuestas.
- Citaciones chilenas/sectoriales legítimas.

No publicar una dirección privada ni inventar `aggregateRating`, horarios o coordenadas.

## 11. Backlinks — no puntuable

No hubo Moz, Bing Webmaster Tools ni DataForSEO. Common Crawl no respondió. Por rigor, no se reportan DA/PA/DR, dominios referentes, anchors o toxicidad. Las publicaciones académicas, perfiles y relaciones con clientes son oportunidades, no backlinks confirmados.

Conectar Search Console/Bing, exportar enlaces, validar menciones académicas y comparar 3–5 competidores reales antes de diseñar una campaña.

## Limitaciones de la auditoría

- Sin GSC, GA4, GBP, CrUX, PSI, Lighthouse, Moz, Bing Webmaster Tools o DataForSEO.
- El buscador externo no devolvió resultados útiles para algunas consultas; no se inventaron rankings ni volúmenes.
- La captura visual se realizó sobre el render local equivalente al desplegado porque la captura directa fue bloqueada por el entorno.
- Los scores son diagnósticos reproducibles, no puntuaciones emitidas por Google ni garantías de ranking.
- La posible inconsistencia legal debe verificarse con documentación del negocio antes de editar el sitio o perfiles externos.

## Evidencia generada

- `.seo-cache/live-crawl.json`: rastreo completo de 14 URL.
- `.seo-cache/agents/`: informes técnicos, contenido, schema, sitemap, performance, visual, imágenes, GEO, SXO, local y backlinks.
- `screenshots/`: portada desktop/móvil, menú móvil y galería 2 desktop/móvil.
- `ACTION-PLAN.md`: hoja de ruta priorizada con responsables, esfuerzo y criterios de aceptación.
