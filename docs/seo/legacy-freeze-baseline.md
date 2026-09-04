# Legacy freeze — línea base

Fecha de inicio: 2026-09-03 (America/Santiago). Commit original: `4b999ae`.

Sitio estático: `index.html` y 16 HTML en `pages/`. `pages/blog.html` es una redirección histórica. Los otros 16 documentos contienen su propio `<footer class="site-footer">`. CSS activo: `css/client-redesign.css`; JS activo: `js/client-site.js`. `js/components.js` contiene un footer antiguo, pero las páginas publicadas no lo cargan.

## Particularidad técnica documentada ANTES de editar

No existe un archivo compartido que genere el footer publicado. La excepción visual autorizada se materializa exclusivamente insertando un enlace con texto «Centro de conocimiento» y destino `/pages/recursos` antes del cierre del `nav` del footer en las 16 páginas con ese componente. No se autoriza una edición general de esos archivos. El verificador retira una sola inserción exacta, comprueba su ubicación y exige el SHA-256 original de todos los bytes restantes. Así se protege también el header que comparte archivo con el footer. El manifiesto enumera los archivos y esta excepción por fragmento, no por archivo completo.

QA del 4 de septiembre: la primera inserción sin estilo hacía crecer dos footers y redistribuía enlaces existentes. Se añadió estilo únicamente al enlace nuevo (`position:absolute;align-self:flex-end;transform:translateY(28px)`) para ocupar el espacio inferior ya disponible, sin reflujo. El literal permitido se actualizó; los 198 hashes originales permanecen intactos. La comparación final enmascara exclusivamente el rectángulo del enlace nuevo, no el nav completo. Las imágenes se decodifican antes de capturar para evitar diferencias de carga tardía. `verified-before` reproduce en el navegador los bytes originales, comprobados contra el manifiesto, sin reescribir archivos legacy ni borrar la captura inicial.

Vercel ya tiene `cleanUrls: true` y `trailingSlash: false`: agregar HTML nuevos permite las rutas pedidas sin cambiar router, configuración, URLs ni redirecciones. No se modifica el sitemap legacy ni robots. El sitemap complementario nuevo se puede presentar posteriormente en Search Console.

## Estado inicial

- `npm run seo:audit`: PASS, 15 páginas indexables, 17 HTML.
- Build, lint y test: no hay scripts definidos en package.json; es un sitio estático. No se presentan como pruebas ejecutadas.
- Git: sin cambios tracked; ya existían el directorio Semrush y su ZIP sin seguimiento. No se incorporan al commit.
- Cache SEO de 2026-09-02 disponible; se usa como antecedente, no como medición actual.
- Las 22 URLs del Site Audit incluyen 16 páginas HTML, 3 redirecciones de dominio y 3 archivos de texto/XML; no son 22 páginas de contenido.

## Evidencia y comprobación

`legacy-freeze-manifest.json`: hashes de todos los archivos tracked originales y package-lock local. `legacy-page-inventory.json`: title, H1, metadata, canonical, texto, enlaces, imágenes, schema y hash estructural. `legacy-live-before.json`: las 22 URLs remotas antes de editar. `legacy-visual-baseline.json`: capturas y DOM local antes de editar.

Ejecutar `node scripts/check-legacy-freeze.mjs --require-link`. Nunca regenerar el manifiesto para aceptar cambios. Las capturas se guardan en `screenshots/seo-freeze/` (excluido del despliegue). No se cambian las incidencias históricas, afiliaciones ni los títulos bibliográficos del sitio legacy.
