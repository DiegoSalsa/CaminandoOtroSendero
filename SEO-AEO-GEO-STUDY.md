# Estudio SEO, AEO y GEO — Caminando Otro Sendero

Actualizado el 1 de septiembre de 2026.

## Resumen ejecutivo

La oportunidad principal no es añadir más etiquetas, sino consolidar tres capas de autoridad:

1. **Indexación y entidad:** un único dominio canónico, sitemap enviado, datos consistentes y perfiles oficiales enlazados.
2. **Demanda comercial local:** Perfil de Negocio de Google completo, reseñas auténticas y una página local útil para Concepción, Talcahuano y Biobío.
3. **Autoridad temática citable:** respuestas expertas, publicaciones, casos reales, metodología, autoría y referencias oficiales para que buscadores y asistentes puedan citar el sitio.

El dominio propio es reciente en Search Console y sus informes aún están procesando datos. En las búsquedas revisadas, el sitio todavía no aparece; la marca sí tiene señales externas claras en YouTube, Instagram, LinkedIn, publicaciones científicas y directorios empresariales. El trabajo inmediato consiste en conectar esas señales con el nuevo dominio e iniciar el rastreo.

## Hallazgos de búsqueda

### Consulta local: “consultora ambiental concepcion”

Google muestra primero un paquete local. Los negocios visibles destacan por:

- Perfil de Negocio de Google completo.
- Entre 36 y 40 reseñas en los dos primeros resultados observados.
- Categoría precisa de consultor ambiental.
- Teléfono, horario, servicios presenciales y citas en línea.
- Sitios que repiten de forma natural “consultora ambiental”, “Concepción” y sus servicios principales.

**Implicación:** para esta consulta, el Perfil de Negocio, las reseñas y la coherencia de nombre, teléfono, zona de servicio y web son tan importantes como la optimización de la página.

### Consulta técnica: “linea base fauna SEIA Chile”

Los primeros resultados observados pertenecen sobre todo al SEA, MMA, SAG y bibliotecas públicas. El primer resultado comercial aparece después de varias fuentes oficiales.

**Implicación:** una página puramente comercial tendrá dificultades para encabezar esta intención. La estrategia adecuada es publicar contenido experto que explique el proceso, cite guías vigentes y conecte esa información con el servicio. Esto permite competir en consultas más específicas y ser una fuente para respuestas generadas por IA.

### Consulta de marca: “Caminando Otro Sendero Talcahuano”

Google ya relaciona la marca con:

- El canal de YouTube y videos de educación ambiental.
- Instagram y LinkedIn del responsable técnico.
- Una publicación científica indexada en PubMed.
- Registros empresariales que vinculan la razón social con Talcahuano.

El sitio propio aún no aparece en la consulta observada. La causa más probable es su incorporación reciente al dominio propio y a Search Console, no una falta total de entidad.

## Qué funciona para Google y Google AI

Google indica que sus prácticas SEO habituales siguen siendo válidas para AI Overviews y Modo IA; no exige archivos especiales ni un schema exclusivo para IA. Para aparecer como fuente, una página debe estar indexada, poder mostrar un fragmento y ofrecer contenido accesible en texto. También recomienda enlaces internos rastreables, buena experiencia de página, imágenes útiles, datos estructurados coherentes con el contenido visible y un Perfil de Negocio actualizado.

Fuente oficial: [Funciones potenciadas por IA y tu sitio web](https://developers.google.com/search/docs/appearance/ai-features?hl=es-419)

## Qué funciona para ChatGPT Search

OpenAI indica que `OAI-SearchBot` se usa para mostrar sitios en los resultados de búsqueda de ChatGPT. El sitio debe permitir ese robot y las solicitudes de sus rangos publicados. `GPTBot` se relaciona con entrenamiento y es una decisión separada; permitir `OAI-SearchBot` no obliga a permitir entrenamiento.

Fuente oficial: [Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)

## Arquitectura de demanda y páginas

| Intención | Página prioritaria | Objetivo |
| --- | --- | --- |
| consultora ambiental Chile | `/` y `/pages/servicios` | Descubrimiento comercial nacional |
| consultora ambiental Concepción, Talcahuano, Biobío | `/pages/consultora-ambiental-concepcion` | Demanda local y Perfil de Negocio |
| línea base de fauna para SEIA | `/pages/servicios/linea-base-terrestre` | Servicio técnico y respuestas expertas |
| monitoreo de biodiversidad o fauna | `/pages/servicios/monitoreo-biodiversidad` | Seguimiento ambiental |
| taxonomía acuática y macroinvertebrados | `/pages/servicios/taxonomia-acuatica` | Especialidad diferencial |
| educación ambiental | `/pages/servicios/educacion-ambiental` | Establecimientos y comunidades |
| capacitación ambiental para empresas | `/pages/servicios/capacitaciones` | Demanda B2B |
| experiencia, autor y evidencia científica | `/pages/sobre-nosotros` y `/pages/publicaciones` | Confianza y citabilidad |

## Implementación realizada

- Dominio canónico unificado en `https://www.caminandootrosendero.cl`.
- Redirección permanente prevista para el dominio temporal de Vercel.
- `robots.txt`, sitemap, Open Graph, hreflang, JSON-LD y `llms.txt` alineados con el dominio propio.
- Reglas explícitas para Googlebot, Bingbot, OAI-SearchBot y ChatGPT-User.
- Identidad empresarial corregida a Caminando Otro Sendero SPA.
- YouTube añadido como perfil oficial de la entidad.
- Respuestas visibles y schema FAQ para preguntas comerciales observadas en Google.
- Páginas con respuesta directa, autoría, revisión técnica, servicios relacionados y referencias oficiales.
- Auditoría automática ejecutable con `npm run seo:audit`.

`llms.txt` se mantiene como ayuda experimental para sistemas que decidan leerlo. No sustituye la indexación ni se considera un requisito de Google.

## Prioridades externas

### Prioridad 1 — esta semana

1. Publicar los cambios y enviar `/sitemap.xml` en Search Console.
2. Solicitar indexación de la portada, la página local y las páginas de línea base, monitoreo y taxonomía.
3. Crear o completar el Perfil de Negocio de Google con la categoría real, zona de servicio, teléfono, horario, descripción, fotos propias y el dominio oficial.
4. Alinear el enlace del sitio en YouTube, Instagram y LinkedIn con el dominio propio.
5. Verificar Bing Webmaster Tools e importar la propiedad desde Search Console cuando esté disponible.

### Prioridad 2 — próximos 30 días

1. Conseguir reseñas auténticas de clientes o participantes; no comprar ni fabricar reseñas.
2. Publicar un caso de estudio autorizado con problema, territorio, metodología, responsable, resultados y fotografías propias.
3. Publicar una guía experta sobre qué incluye una línea base de fauna para el SEIA, revisada por Luis E. Carrera Suárez y enlazada a fuentes vigentes.
4. Añadir enlaces al sitio desde perfiles profesionales, publicaciones, organizaciones colaboradoras y actividades documentadas.
5. Configurar Analytics o una medición equivalente para formulario, teléfono y WhatsApp.

### Prioridad 3 — 30 a 90 días

Publicar una pieza original cada dos o tres semanas, priorizando:

- Diferencia entre línea base y plan de seguimiento ambiental.
- Cómo se define el alcance y la temporalidad de una campaña de fauna.
- Macroinvertebrados acuáticos y su utilidad como bioindicadores.
- Qué información se necesita para cotizar un monitoreo de biodiversidad.
- Casos autorizados de educación ambiental en Talcahuano y Biobío.
- Fichas de publicaciones científicas con resumen comprensible, aporte y enlace a la fuente.

Cada contenido debe tener autor, fecha de revisión, experiencia propia, fotografías o datos cuando existan, referencias y un siguiente paso claro.

## Indicadores

- URLs indexadas y errores de cobertura.
- Impresiones y clics por consultas no asociadas a la marca.
- Aparición de la web en la consulta de marca.
- Posiciones para los clústeres local, línea base, monitoreo y taxonomía.
- Visibilidad del Perfil de Negocio, llamadas y solicitudes de ruta.
- Formularios, clics a WhatsApp y llamadas atribuibles a búsqueda orgánica.
- Nuevos dominios relevantes que enlazan o mencionan a la empresa.
- Páginas citadas por AI Overviews, Modo IA, ChatGPT u otros asistentes en pruebas periódicas documentadas.

## Límites y criterio

Nadie puede garantizar una posición o una cita en una respuesta de IA. La indexación tampoco está garantizada. El objetivo medible es aumentar elegibilidad, autoridad y probabilidad de citación mediante contenido original y verificable, consistencia de entidad, rastreo correcto y reputación externa.
