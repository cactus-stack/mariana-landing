#!/usr/bin/env node

/**
 * Source and asset QA that can run before the application is browser-ready.
 * It reports integration risks without editing production files.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.resolve(
  process.env.QA_OUTPUT_DIR ?? "/private/tmp/mariana-qa/evidence",
);
const errors = [];
const warnings = [];
const checks = [];

function check(name, passed, details = "", severity = "error") {
  const result = { name, passed, details };
  checks.push(result);
  if (!passed) (severity === "warning" ? warnings : errors).push(result);
  return passed;
}

function read(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : "";
}

function has(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function listImages(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) return [];
  return fs
    .readdirSync(absolutePath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(?:avif|gif|jpe?g|png|webp)$/iu.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

function count(text, expression) {
  return text.match(expression)?.length ?? 0;
}

const site = read("src/lib/site.ts");
const content = read("src/lib/content.ts");
const layout = read("app/layout.tsx");
const nextConfig = read("next.config.ts");
const seo = read("docs/SEO.md");
const appFiles = fs.existsSync(path.join(repoRoot, "app"))
  ? fs
      .readdirSync(path.join(repoRoot, "app"), { recursive: true })
      .filter((file) => typeof file === "string" && /\.(?:tsx|ts|jsx|js)$/u.test(file))
      .map((file) => path.join("app", file))
  : [];
const appSource = appFiles.map(read).join("\n");

check("src/lib/site.ts existe", Boolean(site));
check("site.ts contiene los datos de contacto confirmados", [
  "+525550071752",
  "nbarrera@zapata.com.mx",
  "facebook.com/share/14rqv3bSemJ",
  "tiktok.com/@marianazapatacam1",
].every((value) => site.includes(value)));
check("site.ts contiene los cinco tipos de carrocería", [
  "Ayco Zafiro",
  "Ayco Cosmopolitan",
  "Beccar",
  "Urviabus",
  "Marcopolo",
].every((value) => site.includes(value)));
check("site.ts contiene los cuatro usos confirmados", [
  "Transporte urbano",
  "Transporte de personal",
  "Transporte escolar",
  "Turismo",
].every((value) => site.includes(value)));
check(
  "site.ts evita localhost como origen predeterminado",
  !/(localhost|127\.0\.0\.1)/iu.test(site),
  "",
);
check(
  "site.ts limpia URL y omite origen sin configuración",
  site.includes("NEXT_PUBLIC_SITE_URL") &&
    site.includes("return undefined") &&
    site.includes("getSitemapEntries"),
);

const duplicateValues = [
  "+525550071752",
  "nbarrera@zapata.com.mx",
  "facebook.com/share/14rqv3bSemJ",
  "tiktok.com/@marianazapatacam1",
];
const duplicatedInLegacyContent = duplicateValues.filter((value) => content.includes(value));
check(
  "no hay datos públicos duplicados en content.ts",
  duplicatedInLegacyContent.length === 0,
  duplicatedInLegacyContent.join(", "),
  "warning",
);
check(
  "la página importa la fuente site.ts o sus exportaciones",
  !appSource || /(?:from|import)\s+["'][^"']*src\/lib\/site|(?:from|import)\s+["'][^"']*\.\.\/src\/lib\/site/iu.test(appSource),
  appFiles.length ? appFiles.join(", ") : "app aún no tiene archivos de página",
  "warning",
);

check(
  "layout usa metadatos centralizados",
  !layout || layout.includes("getSiteMetadata") || layout.includes("site.title"),
  layout ? "layout aún contiene metadata literal si falla" : "layout aún no está disponible",
  "warning",
);
check(
  "layout no repite varios JSON-LD",
  count(layout, /application\/ld\+json/gu) <= 1,
  `application/ld+json=${count(layout, /application\/ld\+json/gu)}`,
);
check(
  "existen robots y sitemap",
  has("app/robots.ts") && has("app/sitemap.ts"),
  "Se requieren ambos archivos para el contrato SEO.",
  "warning",
);
check(
  "next export está configurado",
  nextConfig.includes('output: "export"') || nextConfig.includes("output: 'export'"),
  nextConfig ? "" : "next.config.ts no está disponible",
);
check(
  "next config deja imágenes sin optimizador para export estático",
  nextConfig.includes("unoptimized: true"),
  "",
  "warning",
);
check(
  "SEO docs exigen FAQ visible cuando se genera FAQ JSON-LD",
  seo.includes("faqs") && seo.includes("visibles en el HTML"),
  "",
  "warning",
);
check(
  "no hay em dash en copy fuente",
  !/[—–]/u.test(`${site}\n${content}\n${layout}`),
  "Se encontró un guion largo en fuentes públicas.",
);

const publicImages = listImages("public/images");
check(
  "existe el OG real con ruta estable",
  publicImages.includes("og-zapata-camiones.jpg") && site.includes("/images/og-zapata-camiones.jpg"),
  publicImages.join(", "),
);
check(
  "hay varias fotos optimizadas para la landing",
  publicImages.length >= 10,
  `public/images=${publicImages.length}`,
  "warning",
);
check(
  "no hay referencias localhost en el código de app",
  !/(localhost|127\.0\.0\.1)/iu.test(appSource),
  "El origen local solo debe aparecer en comandos de QA.",
);

fs.mkdirSync(outputDir, { recursive: true });
const report = {
  generatedAt: new Date().toISOString(),
  checks,
  errors,
  warnings,
  ok: errors.length === 0,
  appFiles,
  publicImages,
};
const reportPath = path.join(outputDir, "static-report.json");
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`QA static report: ${reportPath}`);
console.log(`Checks: ${checks.filter((item) => item.passed).length}/${checks.length} passed`);
console.log(`Errors: ${errors.length}; warnings: ${warnings.length}`);
if (errors.length) process.exitCode = 1;
