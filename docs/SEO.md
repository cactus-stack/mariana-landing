# SEO de Mariana Barrera

Dominio público: **https://marianabarrera.com/**. El objetivo principal es
identificar a Mariana Barrera como asesora de autobuses Mercedes-Benz de Zapata
Camiones, desde Texcoco de Mora, con atención en CDMX y Estado de México.
Los datos de negocio y el contenido están centralizados en `src/lib/site.ts`.

## Implementación

- Título con el nombre completo al principio, descripción específica y nombre
  consistente entre HTML, Open Graph y `WebSite`.
- Un H1 de servicio y un H2 que identifica a Mariana. Perfil con su experiencia,
  empleador, fotografía, contacto y zonas de atención. Enlace al perfil desde el pie.
- HTML estático legible sin JavaScript. Las animaciones se añaden después de la
  carga y nunca ocultan el contenido del servidor. La portada no espera animaciones.
- Imagen principal responsive: 800 px en móvil, 1600 px en escritorio, carga
  inmediata y prioridad alta. Las fotos alternativas de los carruseles se cargan
  al interactuar; el primer ángulo siempre existe en el HTML.
- Fuente Manrope local con precarga mediante `next/font/local`, sin consultar
  Google Fonts ni esperar a descubrir la fuente dentro de otra hoja de estilos.
- Canonical, sitemap, imágenes sociales e identificadores JSON-LD usan siempre
  HTTPS y el dominio público. `NEXT_PUBLIC_SITE_URL` y `SITE_URL` ya no modifican
  esa identidad: las copias de prueba no deben convertirse en la versión canónica.
- `robots.txt` permite rastreo; la home permite indexación y vistas previas de
  imágenes grandes. El sitemap incluye la home y sus fotografías reales, sin
  prioridades artificiales ni fechas de modificación que cambien en cada build.
- JSON-LD con `Person`, `Organization`, `WebSite`, `WebPage`, `Service`,
  `ImageObject` y las FAQ que realmente se pueden leer. Las referencias entre
  entidades se validan. No se inventan precios, stock, reseñas, calle ni horarios.
- `public/_headers` configura caché inmutable para `/_next/static/*`, cuyos
  nombres contienen hash, y `X-Robots-Tag: noindex` solo para hosts
  `:worker.:account.workers.dev`. HTML y fotografías sin versión conservan la
  revalidación predeterminada de Cloudflare. La copia de prueba debe permanecer
  rastreable para que el buscador pueda leer ese `noindex`.
- `npm run build` falla si el HTML exportado no supera `npm run seo:check`.
  Esta revisión inspecciona los archivos finales de `out/`, no solo el código fuente.

El marcado de FAQ describe el contenido; no se promete un resultado enriquecido.
Google limita esa presentación a sitios reconocidos de salud y gobierno. Tampoco
se marca esta landing comercial como `ProfilePage`, `AutoDealer` o `Product`:
esos tipos no representan la página y los datos disponibles.

## Activación en Google Search Console

Estos pasos requieren acceso a la propiedad. El código no demuestra que la
propiedad esté verificada ni que Google haya indexado la página.

1. Añadir la propiedad de dominio `marianabarrera.com` en
   [Search Console](https://search.google.com/search-console).
2. Copiar el registro TXT exacto que entregue Google a Cloudflare → DNS y
   verificar la propiedad. No borrar otros TXT ni modificar correo/MX.
3. En **Sitemaps**, enviar `https://marianabarrera.com/sitemap.xml`.
4. En **Inspección de URLs**, inspeccionar `https://marianabarrera.com/` y usar
   **Probar URL publicada**. Revisar acceso de Googlebot, indexación permitida,
   captura renderizada y URL canónica seleccionada por Google si ya está indexada.
5. Si la versión publicada es accesible, solicitar indexación una vez. Si aparece
   un error, atender el motivo concreto del informe; repetir la solicitud no
   acelera el rastreo.
6. Después de la publicación, seguir indexación, impresiones y consultas reales,
   en particular `Mariana Barrera`, `Mariana Barrera Zapata` y combinaciones de
   servicio/localidad. La prueba `site:` es orientativa; Search Console ofrece
   el diagnóstico de la URL.

Alternativa para una propiedad de **prefijo de URL**: definir la variable de
build `GOOGLE_SITE_VERIFICATION` con el contenido del token que entrega Google,
reconstruir y verificar. La etiqueta se omite si no hay token. La verificación por
DNS de una propiedad de dominio no necesita esa variable ni un cambio de código.

## Cloudflare: configuración y verificación después de publicar

La auditoría pública del 18 de septiembre de 2026 encontró la home, robots y
sitemap con HTTP 200; `www` redirigía al dominio principal. Sin embargo,
`http://marianabarrera.com/` respondía 200 en vez de redirigir a HTTPS.

1. Activar **SSL/TLS → Edge Certificates → Always Use HTTPS**. La configuración
   de `_headers` no sustituye este ajuste de la zona.
2. Conservar la redirección permanente de `www` al dominio principal.
3. Publicar `out/`, generado con `npm run build`, en el Worker configurado en
   `wrangler.jsonc`. El build incluye `_headers`, robots y sitemap.
4. Verificar HTTPS 200, HTTP→HTTPS, www→dominio principal, canonical y sitemap
   nuevos, ausencia de `noindex` en producción y presencia en el host de prueba.
5. Probar una ruta inexistente: debe devolver un 404 real, no la home con 200.
6. Confirmar acceso con **Probar URL publicada** de Search Console. Una petición
   que solo cambia su User-Agent a `Googlebot` no prueba acceso del robot real.

## Identidad y contenido fuera del repositorio

- Enlazar el dominio desde las biografías reales de Facebook y TikTok, usando
  el mismo nombre y actividad profesional.
- Confirmar una URL permanente del perfil de Facebook: el enlace facilitado
  actualmente es un enlace compartido; no se inventa un identificador de perfil.
- Si Zapata tiene una ficha pública de asesores, incorporar allí el enlace al
  sitio con autorización de la empresa.
- Añadir páginas de servicio solo cuando exista contenido propio suficiente:
  configuraciones confirmadas, fotos y respuestas a dudas reales. Repetir la
  misma landing cambiando el nombre de una ciudad no aporta esa información.

## Evidencia y límites

Ver `docs/QA.md` para reproducir build, revisión del HTML, navegador y Lighthouse.
Las métricas locales son mediciones de laboratorio; no equivalen a Core Web
Vitals de visitantes reales, posiciones en Google ni indexación confirmada.
El estado de publicación y las verificaciones de cuentas deben reportarse aparte.

## Fuentes oficiales

- [Títulos en Google](https://developers.google.com/search/docs/appearance/title-link)
- [Nombre del sitio](https://developers.google.com/search/docs/appearance/site-names)
- [Sitemap de imágenes](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [Directrices de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [FAQ y elegibilidad](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Inspección de URLs](https://support.google.com/webmasters/answer/9012289?hl=es)
- [Solicitar rastreo](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=es)
- [Headers de Workers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/)
