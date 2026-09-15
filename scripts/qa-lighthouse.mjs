#!/usr/bin/env node

/**
 * Lighthouse mobile audit for the static export served from `out`.
 * Lighthouse is installed outside this repository; see docs/QA.md.
 */

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const toolingDir = path.resolve(process.env.QA_TOOLING_DIR ?? "/private/tmp/mariana-qa");
const outputDir = path.resolve(
  process.env.QA_OUTPUT_DIR ?? "/private/tmp/mariana-qa/evidence",
);
const url = process.env.QA_BASE_URL ?? "http://127.0.0.1:4173";
const chromePath =
  process.env.QA_CHROME_EXECUTABLE ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function loadPackage(name) {
  const require = createRequire(path.join(toolingDir, "package.json"));
  try {
    return require(name);
  } catch (error) {
    throw new Error(
      `No se encontró ${name} en ${toolingDir}. ` +
        "Instala el tooling externo según docs/QA.md. " +
        `Detalle: ${error.message}`,
    );
  }
}

async function run() {
  if (!fs.existsSync(path.join(repoRoot, "out")) && !process.env.QA_ALLOW_NONSTATIC) {
    throw new Error("No existe out/. Ejecuta npm run build antes de Lighthouse y sirve ese directorio.");
  }

  const lighthouseModule = loadPackage("lighthouse");
  const lighthouse = lighthouseModule.default ?? lighthouseModule;
  const chromeLauncher = loadPackage("chrome-launcher");
  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      formFactor: "mobile",
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
        deviceScaleFactor: 1,
        disabled: false,
      },
    });

    if (!result?.lhr) throw new Error("Lighthouse no devolvió un reporte.");
    const { lhr } = result;
    const categories = Object.fromEntries(
      Object.entries(lhr.categories ?? {}).map(([name, category]) => [name, category.score]),
    );
    const audits = Object.fromEntries(
      Object.entries(lhr.audits ?? {})
        .filter(([, audit]) => ["error", "fail", "warn"].includes(audit.scoreDisplayMode) || audit.score < 1)
        .map(([id, audit]) => [id, {
          title: audit.title,
          score: audit.score,
          displayValue: audit.displayValue,
          description: audit.description,
        }]),
    );
    const metrics = {
      firstContentfulPaint: lhr.audits["first-contentful-paint"]?.numericValue,
      largestContentfulPaint: lhr.audits["largest-contentful-paint"]?.numericValue,
      totalBlockingTime: lhr.audits["total-blocking-time"]?.numericValue,
      cumulativeLayoutShift: lhr.audits["cumulative-layout-shift"]?.numericValue,
      speedIndex: lhr.audits["speed-index"]?.numericValue,
      interactive: lhr.audits.interactive?.numericValue,
    };
    const report = {
      generatedAt: new Date().toISOString(),
      url,
      staticExport: true,
      formFactor: "mobile",
      viewport: { width: 390, height: 844 },
      categories,
      metrics,
      audits,
    };
    fs.mkdirSync(outputDir, { recursive: true });
    const reportPath = path.join(outputDir, "lighthouse-mobile.json");
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`Lighthouse report: ${reportPath}`);
    console.log(JSON.stringify({ categories, metrics }, null, 2));
  } finally {
    await chrome.kill();
  }
}

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
