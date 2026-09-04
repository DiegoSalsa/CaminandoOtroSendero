# QA — Centro de conocimiento

Fecha: 2026-09-04. Entorno: Windows, Node 25.2.1, Python 3.12.4, Chromium 151, Lighthouse 13.4.1. Preview estático en 127.0.0.1:4173; sin despliegue.

## Resultado

PASS de la implementación nueva y de la regresión legacy. Auditor antiguo con incompatibilidad documentada: diez URLs ausentes de sitemap.xml; están en sitemap-recursos.xml, conservando ambos archivos legacy de descubrimiento. No hay scripts originales de build/lint/test.

| Comprobación | Resultado |
|---|---|
| Build nuevo reproducible | PASS, 10 HTML + 3 archivos de soporte |
| Sintaxis Python/JS nueva | PASS |
| Hashes legacy | PASS, 198; solo 16 inserciones exactas |
| Casos negativos guardrail | PASS, 7 |
| HTTP local legacy | PASS, 17/17 |
| URLs remotas Site Audit | PASS, 22/22 sin cambios |
| DOM y captura desktop legacy | PASS, 16/16; máscara solo sobre enlace nuevo |
| Footer responsive | PASS, 48 comprobaciones a 320/390/768 px |
| Nuevas páginas HTTP y alcance | PASS, 10/10 desde hub |
| Destinos internos | PASS, 20 destinos y sus fragmentos |
| Metadata, H1, canonical, schema | PASS, únicos y válidos |
| Axe WCAG 2/2.1 A/AA | 0 infracciones automatizadas detectadas |
| Consola páginas nuevas | 0 errores |
| Responsive nuevas páginas | Sin overflow a 320/390/1440 px |

## Rendimiento por página nueva

Laboratorio móvil simulado; una medición por URL, no datos de usuarios reales. No se midió INP de campo.

| Ruta bajo /pages/recursos | Performance | A11y | SEO | Best practices | LCP s | CLS | TBT ms | Transferencia KiB |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| / | 100 | 100 | 100 | 100 | 1.11 | 0 | 0 | 33.6 |
| /entomofauna | 100 | 100 | 100 | 100 | 1.11 | 0 | 0 | 38.6 |
| /insectos-estudios-ambientales | 100 | 100 | 100 | 100 | 1.11 | 0 | 0 | 38.6 |
| /aracnidos-estudios-ambientales | 100 | 100 | 100 | 100 | 1.11 | 0 | 0 | 38.1 |
| /muestreo-entomofauna | 100 | 100 | 100 | 100 | 1.11 | 0 | 0 | 37.8 |
| /macroinvertebrados-bentonicos | 100 | 100 | 100 | 100 | 1.11 | 0 | 0 | 39.0 |
| /macroinvertebrados-bioindicadores | 100 | 100 | 100 | 100 | 1.26 | 0 | 0 | 39.0 |
| /identificacion-taxonomica-macroinvertebrados | 100 | 100 | 100 | 100 | 1.26 | 0 | 0 | 39.1 |
| /autores/luis-carrera-suarez | 100 | 100 | 100 | 100 | 1.11 | 0 | 0 | 34.0 |
| /autores | 100 | 100 | 100 | 100 | 0.96 | 0 | 0 | 30.0 |

LCP ≤2,5 s, CLS <0,1 y TBT <200 ms en todas las URLs. Cero JS de aplicación y de terceros. Los informes completos se guardaron antes de un error EPERM de limpieza de perfiles temporales de Chrome; se recuperaron y no contienen runtimeError. Persisten observaciones de caché local, tamaño del logo y CSS bloqueante sin impacto en los objetivos; no se ajustó configuración global.

## Contenido

| Ruta | Palabras en main (incluye navegación editorial y referencias) | Palabras de introducción |
|---|---:|---:|
| /pages/recursos | 419 | 56 |
| /pages/recursos/entomofauna | 1014 | 56 |
| /pages/recursos/insectos-estudios-ambientales | 991 | 56 |
| /pages/recursos/aracnidos-estudios-ambientales | 955 | 56 |
| /pages/recursos/muestreo-entomofauna | 958 | 54 |
| /pages/recursos/macroinvertebrados-bentonicos | 991 | 56 |
| /pages/recursos/macroinvertebrados-bioindicadores | 1004 | 54 |
| /pages/recursos/identificacion-taxonomica-macroinvertebrados | 1037 | 55 |
| /pages/recursos/autores/luis-carrera-suarez | 463 | 53 |
| /pages/recursos/autores | 185 | 56 |

## Referencias externas

17 URLs comprobadas por GET. 13 respondieron 200; las siguientes bloquearon acceso automatizado con 403:

- https://doi.org/10.7717/peerj.15020
- https://peerj.com/articles/15020/
- https://stri.si.edu/story/spider-verse
- https://www.scielo.cl/scielo.php?pid=S0716-078X2003000200012&script=sci_arttext

No se encontró HTTP 404. Un 403 no se presenta como enlace validado por HTTP: PeerJ se verificó mediante texto íntegro en PubMed Central/Europe PMC; SciELO fue legible mediante la herramienta web y se contrastaron sus metadatos.

## Límites y entrega

No se verificó indexación real, resultados enriquecidos en producción ni métricas de campo. La validez de JSON-LD se comprueba sintáctica y estructuralmente, sin prometer elegibilidad de Google. Revisión científica nominativa pendiente; no se atribuye a Luis. La fecha de publicación queda vacía hasta el despliegue. Los 616 dominios tienen clasificación provisional de la exportación, no revisión web individual.

Las diferencias de carga tardía observadas en dos galerías durante la primera captura se resolvieron esperando la decodificación, sin modificar galerías. La diferencia de alto causada por el primer enlace se corrigió únicamente en el elemento añadido; las capturas definitivas y los hashes confirman la equivalencia.
