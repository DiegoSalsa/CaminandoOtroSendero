# Retiro de la oferta de vertebrados

Fecha: 15 de octubre de 2026 (America/Santiago).

## Alcance aplicado

Se eliminó la tarjeta de línea base de vertebrados y la ficha general `pages/servicios/linea-base-terrestre.html`. Se retiraron sus enlaces del sitio, del componente de navegación reutilizable, de `llms.txt` y del sitemap. Las menciones comerciales amplias de línea base de fauna se precisaron como artrópodos; la página de monitoreo y el formulario delimitan su alcance a invertebrados. Las publicaciones históricas conservan sus antecedentes científicos.

La ruta `/pages/servicios/linea-base-terrestre` tiene una redirección permanente a `/pages/servicios/linea-base-artropodos` en `vercel.json`. Para la variante `.html`, Vercel aplica primero la normalización de `cleanUrls` y luego esta redirección; ambas respuestas son HTTP 308. Se conserva la configuración global de URLs y no se añade una regla redundante con extensión. El componente de invertebrados terrestres de la ficha retirada ya está cubierto por la página de artrópodos. No se creó una segunda ficha para esa intención de búsqueda.

Se agregaron enlaces directos a la página de artrópodos desde las tarjetas pertinentes de servicios, capacitación y taxonomía acuática. El formulario conserva la opción de artrópodos, usa «Monitoreo de invertebrados» y valida también su opción existente «Identificación taxonómica» en el servidor.

## Protección de la página de artrópodos

La posición 1 es un antecedente comunicado por el cliente; no se midió en esta tarea y no se garantiza su permanencia. La implementación conserva:

- La URL existente, su canonical y sus directivas de indexación.
- El título «Línea base de artrópodos en Chile | Consultoría SEIA».
- La descripción, el H1 «Línea base de artrópodos terrestres en Chile» y los datos estructurados.
- Toda la cabecera HTML y todo el contenido principal anterior a «Servicios relacionados», comparados byte por byte con una copia previa a la edición.
- Imágenes, CSS, JavaScript de la página y su entrada del sitemap, incluida la fecha original.
- Los enlaces internos existentes a la página de artrópodos.

Los únicos cambios en esa página son la sustitución de una tarjeta que ofrecía vertebrados por taxonomía acuática y el retiro del enlace del footer a la ficha eliminada.

Además de la comparación local, una lectura HTTP de la página publicada confirmó que título, descripción, canonical, robots, H1 y JSON-LD coinciden exactamente con la versión preparada.

Huellas SHA-256 de la página protegida:

- Cabecera HTML: `1c630418302a6349f481848905696748889994c5b8eef7256adc34dbad934a0f`.
- Contenido principal previo a servicios relacionados: `ec16532f8031f9a6ae926de0a59c7338b3008f8d08d78d765c7bd6a4eb5aee55`.

## Verificación

- `npm run seo:audit`: 26 páginas indexables y 28 archivos HTML; metadatos, JSON-LD, enlaces locales y sitemaps válidos. Se actualizó el comprobador para considerar el sitemap complementario de recursos, que ya existía, y las cinco fichas de servicio restantes.
- Redirecciones: la ruta limpia retirada responde con HTTP 308 directamente a artrópodos; la variante `.html` pasa antes por la normalización de Vercel. El destino responde HTTP 200 sin redirección.
- Formulario: seis servicios visibles aceptados y dos etiquetas retiradas rechazadas. Se ejecutó el handler real con Resend simulado; no se enviaron correos reales.
- Doce revisiones de navegador: inicio, servicios, artrópodos, monitoreo, Concepción y contacto en escritorio (1440 px) y móvil (390 px). Un H1 por página, sin desbordamiento horizontal, imágenes rotas, enlaces retirados ni errores de JavaScript.
- La primera pantalla de artrópodos resultó visualmente idéntica antes y después en ambos tamaños.
- Evidencia y capturas locales: `.seo-cache/vertebrate-removal/verification.json`, `live-protection.json` y archivos PNG en la misma carpeta. La caché está excluida de Git.

Los manifiestos históricos de congelación documentan una entrega anterior y no se sobrescribieron para hacerlos coincidir con esta modificación autorizada.

## Estado previo a la publicación

La implementación se verificó primero localmente. El usuario autorizó posteriormente su publicación. El resultado del despliegue y las comprobaciones HTTP en producción se registrarán en un informe posterior; la vista previa local comprueba las reglas configuradas y no sustituye esa comprobación en Vercel.

Después de publicar, corresponde revisar indexación y evolución de consultas en Search Console. No se creó una automatización ni se solicitaron retiradas de URLs en Google.

Referencias técnicas: [redirecciones permanentes en Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects) y [redirecciones de Vercel](https://vercel.com/docs/routing/redirects).
