# SEO de Mariana Barrera / Zapata Camiones

Este proyecto concentra los datos públicos de la landing en
[`src/lib/site.ts`](../src/lib/site.ts). El archivo es la fuente para el copy
visible, los metadatos, el enlace de WhatsApp y el JSON-LD.
[`src/lib/content.ts`](../src/lib/content.ts) arma, a partir de esa fuente, el
contrato de datos que consume la vista: `photos`, `uses`, `bodyworks`, `seats`
y `faqs`.

**Dominio de producción confirmado:** `https://marianabarrera.com` (ya dado de
alta en Cloudflare). Ver la sección siguiente para cómo se usa.

## Contrato para la implementación

- H1 único: **Autobuses Mercedes-Benz** (coincide con `landingContent.hero.heading`).
- El texto visible debe mencionar de forma natural transporte urbano, de
  personal, escolar y turismo; las carrocerías Ayco Zafiro, Ayco Cosmopolitan,
  Beccar, Urviabus y Marcopolo; las configuraciones de asientos en
  `site.product`; y la configuración de accesibilidad (rampa y espacio para
  silla de ruedas) en `landingContent.accessibility`.
- La zona principal es Ciudad de México, Estado de México y área metropolitana.
  Hay oficinas en Texcoco de Mora, Estado de México. La frase de alcance debe
  decir que se reciben consultas de toda la República Mexicana; no debe
  prometer entrega, cobertura logística o disponibilidad nacional.
- Usa `site.phoneDisplay`, `site.phoneHref`, `site.email` y
  `createWhatsAppHref()` para que teléfono, correo y WhatsApp siempre sean
  consistentes.
- Las fotos deben llevar `alt` descriptivo y verdadero. No atribuyas una
  carrocería a una imagen si el archivo no permite identificarla. Los cinco
  `alt` de `bodyworks` en `content.ts` asumen que cada archivo
  `carroceria-*.webp` muestra la carrocería que su nombre indica; si el agente
  de assets no puede confirmar alguna por emblema, ese `name`/`blurb`/`alt`
  debe volverse genérico en lugar de mantener la atribución.
- La accesibilidad se describe como una configuración que se puede consultar
  (rampa y espacio para silla de ruedas), no como un equipamiento presente en
  todas las unidades.
- `faqs` solo puede pasar a `getStructuredData({ includeFaq: true })` cuando las
  mismas preguntas y respuestas están visibles en el HTML.

El copy evita precios, inventario, promociones, financiamiento, testimonios,
ratings, años de experiencia y especificaciones que el cliente no confirmó. Los
cinco blurbs de carrocería describen marca y contexto general (a qué fabricante
corresponde el nombre), nunca motor, capacidad o dimensiones que la clienta no
dio.

## URL de producción, canonical y Open Graph

`getSiteUrl()` ya no depende de que exista una variable de entorno: su valor
por defecto es el dominio real de producción.

```ts
export const PRODUCTION_SITE_URL = "https://marianabarrera.com";
```

`NEXT_PUBLIC_SITE_URL` (o `SITE_URL`, para hosts que no exponen variables
públicas de Next.js) sigue existiendo, pero ahora es solo un override para
despliegues de preview (por ejemplo, una rama en Cloudflare Pages/Workers):

```bash
NEXT_PUBLIC_SITE_URL=https://preview-branch.marianabarrera.pages.dev
```

Reglas de validación (sin cambios de fondo, solo el fallback cambió):

- Debe ser una URL absoluta con `http://` o `https://`; cualquier otro
  protocolo se ignora y cae al dominio de producción.
- Un hostname `localhost` / `127.0.0.1` / `0.0.0.0` / `::1` se ignora siempre
  (no solo en `NODE_ENV=production`), para que un `.env` local mal copiado
  nunca se filtre al canonical o al `og:image` de un build real.
- Se limpia el trailing slash, el query string y el hash antes de usarla como
  origen.

Con esto, **un `npm run build` sin ninguna variable de entorno ya produce
`metadataBase`, `alternates.canonical`, Open Graph y Twitter completos**,
apuntando a `https://marianabarrera.com`. `site.socialImagePath` es
`/images/og.jpg`; el pipeline de assets debe escribir ahí la imagen 1200x630.

### Trailing slash: la forma canónica es con `/` final

`next.config.ts` tiene `trailingSlash: true`, así que el export estático sirve
cada ruta como `.../index.html` dentro de una carpeta con ese nombre. Para que
el canonical, el sitemap y lo que el servidor realmente entrega coincidan
siempre, `getCanonicalUrl()` normaliza toda ruta a la forma con `/` final:

- Home: `https://marianabarrera.com/` (no `https://marianabarrera.com`).
- Cualquier ruta futura: `https://marianabarrera.com/algo/`.

Esto aplica solo a canonical y sitemap (URLs de **ruta**). Los assets
(`site.socialImagePath`, imágenes de `content.photos`) nunca llevan slash
final agregado, porque son archivos, no rutas: `getSiteMetadata()` resuelve
`og:image` como `https://marianabarrera.com/images/og.jpg`, sin slash extra.

La home debe usar esos metadatos desde el layout raíz. Mantén el title y la
descripción en español, con una sola intención clara:

```text
Venta de autobuses Mercedes-Benz | Mariana Barrera
```

No añadas una lista de keywords repetidas al title o a la descripción. Google
puede reescribir el title o el snippet; estos valores son señales útiles, no
una garantía de cómo aparecerá el resultado.

## Robots y sitemap

`app/robots.ts` y `app/sitemap.ts` usan `getSiteUrl()` a través de
`getSitemapUrl()` y `getSitemapEntries(['/'])`; ninguno necesitó cambios de
implementación, porque ya consumían el contrato de `site.ts`. Con el dominio
por defecto:

- `robots.txt` permite `/` e incluye siempre `Sitemap: https://marianabarrera.com/sitemap.xml`.
- `sitemap.xml` contiene la home en su forma canónica (`https://marianabarrera.com/`).

Si algún día se agrega una ruta nueva, pásala a
`getSitemapEntries(['/', '/nueva-ruta'])`; la normalización de trailing slash
es automática.

Después de publicar, verifica `https://marianabarrera.com/robots.txt`,
`https://marianabarrera.com/sitemap.xml` y el canonical del HTML final.

## JSON-LD

`getStructuredData()` crea un grafo honesto de `Person`, `Organization`,
`WebSite`, `WebPage` y `Service` en español de México. Relaciona a Mariana
Barrera con Zapata Camiones mediante `worksFor` y registra la oficina solo a
nivel de localidad (`Texcoco de Mora`, `Estado de México`); no agrega calle,
número, coordenadas ni horarios no proporcionados.

Con el dominio ya resuelto por defecto, **todos los `@id` y `url` del grafo son
siempre absolutos** (antes, sin `NEXT_PUBLIC_SITE_URL`, caían a fragmentos
relativos tipo `#person`). Ya no existe esa rama: `getCanonicalUrl()` nunca
devuelve `undefined`, así que cada nodo usa
`https://marianabarrera.com/#person`, `#organization`, `#website`, `#webpage`,
`#service` y, si `includeFaq` está activo, `#faq`.

El servicio identifica la venta y asesoría sobre autobuses Mercedes-Benz y sus
áreas principales. No incluye `Offer`, precios, disponibilidad, ratings ni
reseñas. El `FAQPage` es opcional y debe corresponder exactamente al contenido
que una persona puede leer en la página.

Inserta una sola etiqueta `application/ld+json` en el layout o página:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(getStructuredData({ includeFaq: true })),
  }}
/>
```

El ejemplo con `includeFaq: true` solo es correcto si la sección de preguntas
se renderiza de forma visible. Valida el HTML final con el [Schema Markup
Validator](https://validator.schema.org/) y, cuando el sitio esté publicado,
con la [prueba de resultados enriquecidos de
Google](https://search.google.com/test/rich-results). Una validación correcta
no garantiza un resultado enriquecido ni posiciones concretas.

## Estado verificado (build real, sin variables de entorno)

Estos resultados se confirmaron con `grep` sobre una build de producción
(`npm run build`, sin `NEXT_PUBLIC_SITE_URL` ni `SITE_URL`). La build se
generó sobre una copia temporal del repo con dos líneas de `app/page.tsx`
parcheadas al vuelo, únicamente porque ese archivo todavía consume nombres de
`content.photos` anteriores al contrato nuevo (`interiorBlue`, `interiorOpen`,
`seatDetail`) y un componente en paralelo (`components/MobileMenu.tsx`) ya
pide `ctaLabel`/`ctaHref`; ninguno de esos archivos pertenece a este dominio y
no se tocaron en el repo real. `src/lib/site.ts` y `src/lib/content.ts` (los
archivos de este dominio) pasan `npm run typecheck` y `npm run lint` sin
parches.

| Verificación | Antes | Después |
|-|-|-|
| `<link rel="canonical">` | ausente | `https://marianabarrera.com/` |
| `og:url` | ausente | `https://marianabarrera.com/` |
| `og:image` | ausente | `https://marianabarrera.com/images/og.jpg` (absoluta) |
| `twitter:image` | ausente | `https://marianabarrera.com/images/og.jpg` (absoluta) |
| `application/ld+json` en el HTML | 1 etiqueta, ids relativos (`#person`, ...) | 1 etiqueta, ids absolutos (`https://marianabarrera.com/#person`, ...) |
| `out/sitemap.xml` | `<urlset ...></urlset>` vacío | contiene `<loc>https://marianabarrera.com/</loc>` |
| `out/robots.txt` | sin línea `Sitemap:` | `Sitemap: https://marianabarrera.com/sitemap.xml` |
| FAQ visibles vs `FAQPage.mainEntity` | 4 y 4 | 5 y 5 (se agregó la de accesibilidad) |

Con `NEXT_PUBLIC_SITE_URL=https://preview.marianabarrera.pages.dev/` se
confirmó también el camino de override: canonical y sitemap usan ese dominio
de preview, con el mismo trailing slash normalizado. Con un valor `localhost`
en esa variable, `getSiteUrl()` lo descarta y regresa al dominio de
producción.

## Lista de verificación antes de publicar

- [ ] El H1 aparece una sola vez y coincide con el title principal.
- [ ] Todo el contenido importante está en HTML renderizado; las imágenes no
      son el único lugar donde aparecen los términos de servicio.
- [ ] Cada imagen tiene un `alt` verdadero, no un nombre de archivo ni una
      cadena de keywords.
- [ ] WhatsApp usa `https://wa.me/525550071752` y el botón lateral funciona en
      móvil sin tapar el contenido.
- [ ] Teléfono, correo, Facebook y TikTok enlazan a los datos proporcionados.
- [ ] Si se define `NEXT_PUBLIC_SITE_URL`, es un dominio de preview real y no
      `localhost`; en producción, simplemente no se define y el sitio usa
      `https://marianabarrera.com` por defecto.
- [ ] Canonical, Open Graph, `robots.txt` y sitemap usan ese mismo origen.
- [ ] No hay datos inventados de precios, stock, cobertura, testimonios o
      especificaciones.
- [ ] Las cinco carrocerías en la sección `#carrocerias` tienen nombre real y
      una línea de contexto, no captions genéricos.
- [ ] Se revisan la home y el flujo de WhatsApp en un viewport móvil y uno
      desktop.

## Referencias oficiales

- [Google Search Central: enlaces de título](https://developers.google.com/search/docs/appearance/title-link)
- [Google Search Central: snippets y apariencia del sitio](https://developers.google.com/search/docs/appearance)
- [Google Search Central: canonicalización](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Google Search Central: crear y enviar un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Central: directrices generales para datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Schema.org: Person](https://schema.org/Person), [Organization](https://schema.org/Organization), [Service](https://schema.org/Service), [WebSite](https://schema.org/WebSite), [WebPage](https://schema.org/WebPage) y [FAQPage](https://schema.org/FAQPage)
