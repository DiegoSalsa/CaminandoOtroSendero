# Implementación SEO / GEO / AEO — Caminando Otro Sendero SpA

Estado: **implementación local terminada; no desplegada**. Inicio el 3 y QA el 4 de septiembre de 2026 (America/Santiago). No se ejecutó push, deploy, envío a Search Console, modificación de cuentas externas ni outreach.

## A. Nuevas URLs

Todas responden 200 en el preview que reproduce `cleanUrls` y son indexables por sus directivas. Esto no significa que ya estén publicadas o indexadas por Google.

1. `/pages/recursos`
2. `/pages/recursos/entomofauna`
3. `/pages/recursos/insectos-estudios-ambientales`
4. `/pages/recursos/aracnidos-estudios-ambientales`
5. `/pages/recursos/muestreo-entomofauna`
6. `/pages/recursos/macroinvertebrados-bentonicos`
7. `/pages/recursos/macroinvertebrados-bioindicadores`
8. `/pages/recursos/identificacion-taxonomica-macroinvertebrados`
9. `/pages/recursos/autores`
10. `/pages/recursos/autores/luis-carrera-suarez`

Las 10 se alcanzan mediante Footer → Centro de conocimiento. Los siete recursos enlazan al servicio pertinente, a otros recursos, al hub y a la ficha documentada. No hay categorías vacías, nuevas páginas comerciales, landings locales ni una segunda ola automática.

## B. Archivos nuevos

Inventario exhaustivo: `new-files.csv` (incluye evidencias visuales locales). Componentes principales:

- `pages/recursos.html`, siete HTML de artículos y dos HTML de autores.
- `css/recursos.css`: estilos aislados; solo se carga en las páginas nuevas.
- `content/recursos/`: siete documentos de contenido y `sources.json`.
- `scripts/build-resources.py`: genera únicamente la sección nueva, sitemap complementario e inventarios. No escribe footer ni archivos legacy.
- `scripts/check-legacy-freeze.mjs`, `test-legacy-freeze.mjs`, `check-resources.mjs`, `seo-preview.mjs`, `seo-visual-qa.mjs`, `compare-legacy-visual.py`, `check-footer-mobile.mjs`, `seo-regression.py`, `measure-resources.mjs`, `document-seo-research.py`.
- `sitemap-recursos.xml`: las 10 URLs nuevas. No altera el sitemap original.
- `docs/seo/`: baseline, manifiesto, mapas CSV, inventarios, criterios de entidad y servicios, clasificación offpage, fuentes e informes de QA.
- `screenshots/seo-freeze/` y `screenshots/seo-resources/`: capturas locales, excluidas del despliegue por la configuración existente. Los reportes Lighthouse completos quedan en `.seo-cache/lighthouse-resources/`; las métricas resumidas están versionadas en `performance-results.json`.

## C. Archivos legacy modificados

Solo los fragmentos de footer de los siguientes archivos:

`index.html`, `pages/casos.html`, `pages/consultora-ambiental-concepcion.html`, `pages/contacto.html`, `pages/galeria-2.html`, `pages/galeria.html`, `pages/privacidad.html`, `pages/publicaciones.html`, `pages/servicios.html`, `pages/sobre-nosotros.html`, `pages/servicios/capacitaciones.html`, `pages/servicios/educacion-ambiental.html`, `pages/servicios/linea-base-artropodos.html`, `pages/servicios/linea-base-terrestre.html`, `pages/servicios/monitoreo-biodiversidad.html`, `pages/servicios/taxonomia-acuatica.html`.

Particularidad técnica documentada antes de editar: el sitio publicado no tiene un footer compartido; el componente está repetido en esos 16 HTML. No se autorizó editar el archivo completo: el guardrail retira el literal exacto del enlace nuevo y exige el hash original de todo el resto. Se mantienen los 198 hashes de partida. La colocación del enlace utiliza exclusivamente estilo sobre el elemento nuevo para evitar desplazar los enlaces y el contenido existentes.

## D. Cambios sobre páginas existentes

**Ninguno, aparte del enlace autorizado en footer.**

No se cambiaron textos, títulos, H1, metadata, canonical, schema, imágenes, CSS/JS global, header, navegación principal, URLs, sitemap original, robots, privacidad, enlaces SEA, galerías ni LCP legacy. `pages/blog.html` conserva su redirección. El preview local no modifica configuración del despliegue.

## E. Tests y regresión

Resultados detallados en `qa-report.md` y JSON asociados:

- Guardrail: 198 archivos; 16 inserciones exactas; cero cambios adicionales.
- Pruebas negativas del guardrail: siete casos, incluidos cambio de contenido, enlace fuera del footer y duplicación.
- Regresión HTTP local: 17/17 HTML, incluida la redirección histórica.
- Regresión remota: 22/22 URLs del export; mismos estados, redirecciones y bytes que al iniciar. La producción no se desplegó.
- Visual desktop: 16/16 documentos con DOM y píxeles idénticos, ignorando solo el rectángulo del enlace añadido. La referencia estable se reconstruye desde bytes verificados contra los hashes iniciales y espera decodificación de imágenes.
- Footer responsive: 48 comprobaciones, 16 páginas × 320/390/768 px; enlace visible y sin superposición.
- Nuevas páginas: 10/10 HTTP 200 y alcanzables; 20 destinos locales comprobados; sin fragmentos rotos ni errores de consola; metadata/H1 únicos, canonical propio, jerarquía y JSON-LD válidos.
- Axe WCAG 2 A/AA y 2.1 AA: sin infracciones automatizadas detectadas. Capturas nuevas a 390 y 1440 px, sin desbordamiento a 320/390/1440 px. No es una certificación de accesibilidad.
- Build nuevo determinista: `python scripts/build-resources.py --check`. Sintaxis Python/JS comprobada. El proyecto original no tiene scripts build/lint/test.

**Compatibilidad del auditor antiguo:** `npm run seo:audit` pasó antes de los cambios. Al terminar señala exactamente 10 ausencias en `sitemap.xml`, porque solo conoce ese sitemap. Se deja intacto conforme al freeze. El sitemap complementario tiene las 10 rutas y el nuevo verificador las recorre. No se presenta el auditor antiguo como aprobado tras la ampliación.

## F. Rendimiento

Lighthouse 13.4.1, preview local, móvil simulado: **100 rendimiento / 100 accesibilidad / 100 SEO / 100 buenas prácticas** en las 10 páginas. LCP 0,96–1,26 s; CLS 0; TBT 0 ms. Ver resultados por página en `qa-report.md`.

El contenido es HTML estático, sin JavaScript de aplicación ni scripts externos. El único recurso de imagen es el logo existente, dimensionado. No se midió INP de usuarios reales ni CWV de producción. Los resultados de laboratorio no garantizan rendimiento de campo.

El CLI guardó informes completos y luego devolvió EPERM al limpiar perfiles temporales de Chrome en Windows. Se recuperaron esos informes sin repetir las mediciones; no contienen `runtimeError` ni advertencias de ejecución de Lighthouse. Se informa la incidencia de entorno en `performance-results.json`. Las recomendaciones de caché, logo y CSS no impiden alcanzar los objetivos; no se modificó configuración legacy por ellas.

## G. Contenido y evidencia

Registro completo: `source-verification.md` y `content/recursos/sources.json`. Fuentes: SEA 2025, EPA, USGS, Smithsonian, FAO, National Park Service, artículo de Figueroa et al. en SciELO y PeerJ vía texto íntegro archivado en PubMed Central/Europe PMC.

Cada introducción responde al tema en 40–80 palabras. Se incluyen limitaciones, ejemplos hipotéticos identificados, preguntas frecuentes visibles y referencias por sección. Se usa `TechArticle`, `BreadcrumbList`, `Organization`, `ProfilePage`, `Person` y `ScholarlyArticle` según el documento. No se añadió FAQPage para prometer resultados enriquecidos.

La organización asume responsabilidad editorial; no se simula revisión científica de Luis. Su ficha usa el vínculo institucional publicado y una obra verificada con tres coautores. Se conserva la afiliación histórica E.I.R.L. sin afirmar transformación jurídica. Se omiten ORCID, grados, acreditaciones, instalaciones, plazos, listas de especies, clientes, proyectos o métodos propios no comprobados. La educación ambiental y limnología quedan fuera de esta primera ola.

Los archivos Semrush se consultaron antes de implementar: `master-keywords.csv` y Position Tracking. `keyword-map.csv` separa ambas fuentes: por ejemplo, KD 14 en el master y KD 16 en Tracking para línea base entomofauna; no se mezclan las mediciones. La URL de «estudio entomofauna» registrada es publicaciones y debe seguirse tras indexar. La coincidencia temática no se interpreta como canibalización resuelta: se conserva intención informativa y se monitorea.

Se clasificaron 616 dominios como triaje de la exportación. Los candidatos no se presentan como vínculos confirmados ni partners. No hubo contacto externo ni compra de enlaces.

## H. Próximo paso

Revisar el contenido técnico con un especialista y documentar su intervención si corresponde. Tras la decisión de publicación, desplegar solo el cambio revisado, comprobar las 10 URLs en producción y enviar `sitemap-recursos.xml` en Search Console. No hay envío automático ni fecha de publicación inventada: el inventario la deja vacía hasta el despliegue.

Medir indexación, impresiones, clics, CTR, consultas y posiciones por URL; distinguir recursos de páginas comerciales y registrar consultas cualificadas. Seguir especialmente línea base arácnidos (9), línea base entomofauna (14), línea base de insectos (45), estudio entomofauna (94), entomofauna y taxonomía. Son posiciones del export, no mediciones posteriores ni garantías. Evaluar la segunda ola solo cuando existan datos reales nuevos.

## Reproducir

Desde la raíz del repositorio, Node y Python:

```text
node scripts/seo-preview.mjs
python scripts/build-resources.py --check
node scripts/check-legacy-freeze.mjs --require-link
node scripts/test-legacy-freeze.mjs
node scripts/check-resources.mjs
node scripts/seo-visual-qa.mjs verified-before
node scripts/seo-visual-qa.mjs after
python scripts/compare-legacy-visual.py
node scripts/check-footer-mobile.mjs
python scripts/seo-regression.py
node scripts/measure-resources.mjs
```

QA de navegador requiere Playwright y Chromium; `PLAYWRIGHT_MODULE` permite señalar una instalación externa. `AXE_SCRIPT` debe apuntar a `axe-core/axe.min.js` para ejecutar accesibilidad. Lighthouse usa `LIGHTHOUSE_CLI` y opcionalmente `CHROME_PATH`. La comparación visual requiere Pillow y la regresión remota requests. Se utilizaron instalaciones disponibles fuera del proyecto sin modificar package.json ni lockfile. El servidor local se ejecuta en otra terminal y solo escucha en 127.0.0.1:4173.

Para editar contenido: modificar únicamente `content/recursos/*.json` o la plantilla nueva y regenerar. Actualizar la fecha editorial solo cuando corresponda a un cambio real. No regenerar hashes legacy para aceptar modificaciones.
