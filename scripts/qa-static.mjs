#!/usr/bin/env node

// Verify the export that Cloudflare serves, without network or dependencies.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "out");
const origin = "https://marianabarrera.com";
const home = `${origin}/`;
const checks = [];
const read = (file) => fs.readFileSync(path.join(output, file), "utf8");
const check = (name, passed) => checks.push({ name, passed: Boolean(passed) });
const decode = (value = "") => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const text = (html) => decode(html.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
const attributes = (tag) => Object.fromEntries(
  Array.from(tag.matchAll(/([\w:-]+)="([^"]*)"/g), ([, key, value]) => [key.toLowerCase(), decode(value)]),
);
const tags = (html, tag) => Array.from(html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi")), ([match]) => attributes(match));
const isProductionUrl = (value) => {
  try { return new URL(value).origin === origin; } catch { return false; }
};
const assetExists = (url) => {
  if (typeof url !== "string" || !url) return false;
  try {
    const resolved = new URL(url, origin);
    return resolved.origin === origin && fs.existsSync(path.join(output, decodeURIComponent(resolved.pathname)));
  } catch { return false; }
};

if (!fs.existsSync(path.join(output, "index.html"))) {
  console.error("Falta out/index.html. Ejecuta npm run build antes de la revisión SEO.");
  process.exit(1);
}

const html = read("index.html");
const markup = html.replace(/<script\b[\s\S]*?<\/script>/gi, "");
const visibleText = text(markup);
const meta = tags(html, "meta");
const links = tags(html, "link");
const metaValue = (name) => meta.find((tag) => tag.name === name || tag.property === name)?.content;
const title = text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
const h1s = Array.from(markup.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi), ([, value]) => text(value));
const canonicals = links.filter((link) => link.rel === "canonical");

check("HTML en español de México", tags(html, "html")[0]?.lang === "es-MX");
check("Título identifica persona y servicio", title.startsWith("Mariana Barrera") && title.includes("autobuses Mercedes-Benz"));
check("Descripción única e identifica a Mariana", meta.filter((tag) => tag.name === "description").length === 1 && metaValue("description")?.includes("Mariana Barrera") && metaValue("description")?.includes("Zapata Camiones"));
check("Un H1 con el servicio principal", h1s.length === 1 && /venta de autobuses Mercedes-Benz/i.test(h1s[0]));
check("Nombre en encabezado visible", /<h2\b[^>]*>Mariana Barrera<\/h2>/.test(markup));
check("Canonical único de producción", canonicals.length === 1 && canonicals[0].href === home);
check("Indexación e imágenes grandes permitidas", metaValue("robots")?.includes("index, follow") && metaValue("robots")?.includes("max-image-preview:large"));
check("Sin directivas que bloqueen Google", !meta.filter((tag) => ["robots", "googlebot"].includes(tag.name)).some((tag) => /noindex|nofollow|none|noimageindex|nosnippet/.test(tag.content ?? "")));
check("Open Graph coincide con canonical y título", metaValue("og:url") === home && metaValue("og:title") === title);
check("Imagen social absoluta y publicada", isProductionUrl(metaValue("og:image")) && assetExists(metaValue("og:image")));
check("Twitter usa la misma imagen", metaValue("twitter:card") === "summary_large_image" && metaValue("twitter:image") === metaValue("og:image"));
check("Favicon publicado", links.some((link) => link.rel === "icon" && assetExists(link.href)));
check("Ícono para iPhone publicado", links.some((link) => link.rel === "apple-touch-icon" && assetExists(link.href)));
check("Contenido no oculto hasta hidratar JavaScript", !/style="[^"]*opacity:\s*0(?:[;"\s])/.test(markup));
check("Hero tiene variante móvil", /<source\b[^>]*srcSet="\/images\/hero-[\w-]*800\.webp"/i.test(markup));
const images = tags(markup, "img");
const hero = images.find((image) => /^\/images\/hero-[\w-]+\.webp$/.test(image.src ?? ""));
check("Hero se carga con prioridad", hero?.loading === "eager" && hero.fetchpriority === "high");
check("Imágenes existen y tienen alt", images.every((image) => assetExists(image.src) && Object.hasOwn(image, "alt")));
check("Solo portadas de carruseles en carga inicial", images.filter((image) => /\/uso-/.test(image.src)).length === 4);
const anchors = tags(markup, "a");
const ids = new Set(Array.from(markup.matchAll(/\bid="([^"]+)"/g), ([, id]) => id));
check("Enlaces internos tienen destino", anchors.filter((anchor) => anchor.href?.startsWith("#")).every((anchor) => ids.has(anchor.href.slice(1))));
// Root-relative links (footer, legal page) must point at an exported page and,
// when they carry a hash, at an id that exists on that page.
const pageIds = (file) => new Set(Array.from(read(file).matchAll(/\bid="([^"]+)"/g), ([, id]) => id));
const resolvesLocally = (href) => {
  const [pathname, hash] = href.split("#");
  const file = pathname === "/" ? "index.html" : `${pathname.replace(/^\/+|\/+$/g, "")}/index.html`;
  return fs.existsSync(path.join(output, file)) && (!hash || pageIds(file).has(hash));
};
check("Enlaces a otras páginas tienen destino", anchors.filter((anchor) => /^\/(?!\/|images\/)/.test(anchor.href ?? "")).every((anchor) => resolvesLocally(anchor.href)));
check("Aviso legal y de privacidad enlazados desde la home", anchors.some((anchor) => anchor.href === "/aviso-legal/") && anchors.some((anchor) => anchor.href === "/aviso-legal/#privacidad"));
check("Contacto disponible en HTML", anchors.some((anchor) => anchor.href === "tel:+525550071752") && anchors.some((anchor) => anchor.href === "mailto:nbarrera@zapata.com.mx") && anchors.some((anchor) => anchor.href?.startsWith("https://wa.me/525550071752")));

const scripts = Array.from(html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi), ([, value]) => value);
let graph = [];
try {
  const ld = JSON.parse(scripts[0]);
  const valid = scripts.length === 1 && ld["@context"] === "https://schema.org" && Array.isArray(ld["@graph"]);
  if (valid) graph = ld["@graph"];
  check("Un grafo JSON-LD válido", valid);
} catch { check("Un grafo JSON-LD válido", false); }
const node = (type) => graph.find((item) => item["@type"] === type);
const entityIds = new Set(graph.map((item) => item["@id"]));
check("Identificadores únicos y de producción", entityIds.size === graph.length && graph.length >= 6 && [...entityIds].every(isProductionUrl));
const references = [];
const collectReferences = (value) => {
  if (!value || typeof value !== "object") return;
  if (value["@id"] && !value["@type"]) references.push(value["@id"]);
  Object.values(value).forEach(collectReferences);
};
graph.forEach(collectReferences);
check("Referencias JSON-LD resueltas", references.length > 0 && references.every((id) => entityIds.has(id)));
check("Empresa enlazada a su sitio oficial", node("Organization")?.url === "https://www.zapata.com.mx/");
check("Persona con perfil, foto y empresa", node("Person")?.name === "Mariana Barrera" && node("Person")?.url === `${home}#mariana-barrera` && assetExists(node("Person")?.image) && node("Person")?.worksFor?.["@id"] === node("Organization")?.["@id"]);
check("Nombre del sitio coherente", node("WebSite")?.name === "Mariana Barrera" && node("WebSite")?.url === home);
check("Página y servicio identifican a la asesora", node("WebPage")?.url === home && node("WebPage")?.author?.["@id"] === node("Person")?.["@id"] && node("Service")?.provider?.["@id"] === node("Person")?.["@id"]);
check("Imagen principal estructurada existe", assetExists(node("ImageObject")?.contentUrl));
check("Redes estructuradas enlazadas en HTML", node("Person")?.sameAs?.length > 0 && node("Person").sameAs.every((href) => anchors.some((anchor) => anchor.href === href)));
const faq = node("FAQPage")?.mainEntity ?? [];
check("FAQ estructuradas coinciden con las legibles", faq.length === tags(markup, "details").length && faq.length > 0 && faq.every((item) => visibleText.includes(item.name) && visibleText.includes(item.acceptedAnswer.text)));
check("Sin marcado de precios ni reseñas inventadas", !graph.some((item) => ["Product", "Offer", "AggregateRating", "Review", "AutoDealer"].includes(item["@type"])));

const robots = read("robots.txt");
const sitemap = read("sitemap.xml");
check("Robots permite rastreo y anuncia sitemap", /User-Agent: \*/i.test(robots) && /Allow: \/\s/.test(robots) && !/Disallow: \/\s/.test(robots) && robots.includes(`Sitemap: ${origin}/sitemap.xml`));
const sitemapUrls = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), ([, url]) => decode(url));
const legalUrl = `${origin}/aviso-legal/`;
check("Sitemap solo incluye rutas canónicas publicadas", sitemapUrls.length === 2 && sitemapUrls.includes(home) && sitemapUrls.includes(legalUrl) && sitemapUrls.every((url) => resolvesLocally(new URL(url).pathname)));
const sitemapImages = Array.from(sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g), ([, url]) => decode(url));
check("Sitemap de imágenes con assets reales", sitemapImages.length > 0 && new Set(sitemapImages).size === sitemapImages.length && sitemapImages.every((url) => isProductionUrl(url) && assetExists(url)));
check("404 fuera del índice", /name="robots" content="[^"]*noindex/.test(read("404.html")));
const legalHtml = read("aviso-legal/index.html");
const legalLinks = tags(legalHtml, "link");
const legalMeta = tags(legalHtml, "meta");
check("Aviso legal con canonical propio", legalLinks.filter((link) => link.rel === "canonical").length === 1 && legalLinks.find((link) => link.rel === "canonical")?.href === legalUrl);
check("Aviso legal con título y descripción propios", text(legalHtml.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").startsWith("Aviso legal") && legalMeta.find((tag) => tag.name === "description")?.content !== metaValue("description"));
check("Aviso de privacidad con sección ARCO", /\bid="privacidad"/.test(legalHtml) && /Derechos ARCO/.test(legalHtml));
const headers = read("_headers").split("\n").filter((line) => !line.trim().startsWith("#")).join("\n");
check("Caché inmutable para archivos con hash", /\/_next\/static\/\*\n\s+Cache-Control: public, max-age=31536000, immutable/.test(headers));
check("Noindex de previews limitado al host", /https:\/\/:worker\.:account\.workers\.dev\/\*\n\s+X-Robots-Tag: noindex/.test(headers) && !/^\/\*\n\s+X-Robots-Tag:.*noindex/m.test(headers));

const failures = checks.filter((item) => !item.passed);
console.log(`SEO de la exportación: ${checks.length - failures.length}/${checks.length} comprobaciones correctas.`);
for (const failure of failures) console.error(`FAIL: ${failure.name}`);
if (process.env.QA_OUTPUT_DIR) {
  fs.mkdirSync(process.env.QA_OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(process.env.QA_OUTPUT_DIR, "static-report.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), ok: failures.length === 0, checks, failures }, null, 2)}\n`);
}
if (failures.length) process.exitCode = 1;
