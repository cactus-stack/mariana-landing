#!/usr/bin/env node

/**
 * Browser QA for the Mariana Barrera landing page.
 *
 * This script intentionally keeps Playwright outside the application
 * dependencies. Install it in /private/tmp/mariana-qa and point
 * QA_TOOLING_DIR there (see docs/QA.md). It may submit an InquiryForm locally
 * to exercise its in-memory href generation, but it never follows WhatsApp or
 * opens a messaging composer.
 */

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.resolve(
  process.env.QA_OUTPUT_DIR ?? "/private/tmp/mariana-qa/evidence",
);
const baseUrl = (process.env.QA_BASE_URL ?? "http://127.0.0.1:3000").replace(
  /\/$/u,
  "",
);
const toolingDir = path.resolve(
  process.env.QA_TOOLING_DIR ?? "/private/tmp/mariana-qa",
);
const screenshotsEnabled = !process.argv.includes("--no-screenshots");
const interactionEnabled = !process.argv.includes("--no-interactions");
const expectedProductionOrigin = process.env.QA_EXPECT_SITE_URL?.replace(
  /\/$/u,
  "",
);
const chromeExecutable =
  process.env.QA_CHROME_EXECUTABLE ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1024", width: 1024, height: 768 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-320", width: 320, height: 800 },
  { name: "tablet-768", width: 768, height: 900 },
];

const modes = [
  { name: "light", colorScheme: "light", reducedMotion: "no-preference" },
  { name: "dark", colorScheme: "dark", reducedMotion: "no-preference" },
  { name: "reduced-motion", colorScheme: "light", reducedMotion: "reduce" },
];

const expected = {
  phoneDisplay: "+52 55 5007 1752",
  phoneHref: "tel:+525550071752",
  email: "nbarrera@zapata.com.mx",
  whatsappNumber: "525550071752",
  facebook: "https://www.facebook.com/share/14rqv3bSemJ/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@marianazapatacam1?_r=1&_t=ZS-99lQY9ak6mV",
  whatsappText: "Hola Mariana, me interesa conocer opciones de autobuses Mercedes-Benz.",
};

const report = {
  startedAt: new Date().toISOString(),
  baseUrl,
  viewports,
  modes,
  checks: [],
  pages: [],
  interactions: [],
  axe: [],
  screenshots: [],
  errors: [],
  warnings: [],
};

function addCheck(name, passed, details = "", severity = "error") {
  const check = { name, passed, details };
  report.checks.push(check);
  if (!passed) {
    if (severity === "warning") report.warnings.push(check);
    else report.errors.push(check);
  }
  return passed;
}

function addInteraction(name, passed, details = "", severity = "error") {
  const interaction = { name, passed, details };
  report.interactions.push(interaction);
  if (!passed) {
    if (severity === "warning") report.warnings.push(interaction);
    else report.errors.push(interaction);
  }
  return passed;
}

function requirePlaywright() {
  try {
    const require = createRequire(path.join(toolingDir, "package.json"));
    return require("playwright");
  } catch (error) {
    const message =
      `No se encontró Playwright en ${toolingDir}. ` +
      "Instálalo con `npm install --prefix /private/tmp/mariana-qa playwright`.";
    throw new Error(`${message} (${error.message})`);
  }
}

function safeFileName(value) {
  return value.replace(/[^a-z0-9.-]+/giu, "-").replace(/^-|-$/gu, "");
}

function maybeAbsoluteHref(href) {
  try {
    return new URL(href, baseUrl);
  } catch {
    return undefined;
  }
}

async function inspectPage(page, viewport, mode) {
  await page.waitForLoadState("domcontentloaded");
  await page
    .waitForFunction(
      () => Array.from(document.images).every((image) => image.complete),
      undefined,
    )
    .catch(() => undefined);

  const data = await page.evaluate(() => {
    const visible = (element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number.parseFloat(style.opacity || "1") > 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const parseJsonLd = (script) => {
      try {
        return JSON.parse(script.textContent || "null");
      } catch {
        return { parseError: true };
      }
    };
    const bodyStyle = window.getComputedStyle(document.body);
    const htmlStyle = window.getComputedStyle(document.documentElement);
    const h1 = document.querySelector("h1");
    const h1Style = h1 ? window.getComputedStyle(h1) : undefined;
    const h1LineHeight = h1Style
      ? Number.parseFloat(h1Style.lineHeight) || Number.parseFloat(h1Style.fontSize) * 1.2
      : 0;
    const faqQuestions = Array.from(
      document.querySelectorAll("details summary, [data-faq-question], .faq-question"),
    )
      .filter(visible)
      .map((element) => element.textContent?.trim())
      .filter(Boolean);
    const jsonLdScripts = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]'),
    ).map(parseJsonLd);
    const anchors = Array.from(document.querySelectorAll("a[href]"))
      .filter(visible)
      .map((anchor) => ({
        text: anchor.textContent?.trim() || "",
        href: anchor.getAttribute("href") || "",
      }));
    const images = Array.from(document.images).map((image) => ({
      src: image.currentSrc || image.src,
      srcset: image.getAttribute("srcset") || "",
      sizes: image.getAttribute("sizes") || "",
      alt: image.getAttribute("alt"),
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      visible: visible(image),
      objectFit: window.getComputedStyle(image).objectFit,
      renderedWidth: image.getBoundingClientRect().width,
      renderedHeight: image.getBoundingClientRect().height,
    }));
    const visibleButtons = Array.from(document.querySelectorAll("button"))
      .filter(visible)
      .map((button) => ({
        text: button.textContent?.trim() || "",
        ariaLabel: button.getAttribute("aria-label") || "",
        ariaExpanded: button.getAttribute("aria-expanded"),
        ariaControls: button.getAttribute("aria-controls"),
      }));
    const fonts = document.fonts
      ? { status: document.fonts.status, count: document.fonts.size }
      : { status: "unsupported", count: 0 };
    const fontFaces = document.fonts
      ? Array.from(document.fonts).map((font) => ({
          family: font.family,
          status: font.status,
          weight: font.weight,
        }))
      : [];
    const canonical = document.querySelector('link[rel="canonical"]')?.href || "";
    const ogUrl =
      document.querySelector('meta[property="og:url"]')?.getAttribute("content") || "";
    const ogImage =
      document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";
    const socialMeta = {
      title: document.querySelector('meta[property="og:title"]')?.content || "",
      description:
        document.querySelector('meta[property="og:description"]')?.content || "",
      image: ogImage,
    };

    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || "",
      canonical,
      ogUrl,
      socialMeta,
      h1Count: document.querySelectorAll("h1").length,
      h1Text: h1?.textContent?.trim() || "",
      h1Lines: h1 && h1LineHeight ? Math.ceil(h1.getBoundingClientRect().height / h1LineHeight) : 0,
      bodyFont: bodyStyle.fontFamily,
      htmlFont: htmlStyle.fontFamily,
      fonts,
      fontFaces,
      manropeCheck: document.fonts?.check('16px "Manrope"') ?? false,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      scrollHeight: document.documentElement.scrollHeight,
      bodyText: document.body.innerText,
      bodyContent: document.body.textContent || "",
      anchors,
      images,
      visibleButtons,
      faqQuestions,
      jsonLdScripts,
      detailsCount: document.querySelectorAll("details").length,
      summaryCount: document.querySelectorAll("details summary").length,
      formsCount: document.querySelectorAll("form").length,
      selectsCount: document.querySelectorAll("select").length,
      tabsCount: document.querySelectorAll('[role="tab"]').length,
      navLinksCount: document.querySelectorAll("nav a[href]").length,
    };
  });

  const pageRecord = {
    viewport: viewport.name,
    width: viewport.width,
    height: viewport.height,
    mode: mode.name,
    ...data,
  };
  report.pages.push(pageRecord);

  addCheck(
    `${viewport.name}/${mode.name}: no overflow horizontal`,
    data.scrollWidth <= data.innerWidth + 1,
    `scrollWidth=${data.scrollWidth}, innerWidth=${data.innerWidth}`,
  );
  addCheck(
    `${viewport.name}/${mode.name}: H1 único`,
    data.h1Count === 1,
    `h1Count=${data.h1Count}${data.h1Text ? `, text="${data.h1Text}"` : ""}`,
  );
  addCheck(
    `${viewport.name}/${mode.name}: title y description presentes`,
    Boolean(data.title && data.description),
    `title=${Boolean(data.title)}, description=${Boolean(data.description)}`,
  );
  addCheck(
    `${viewport.name}/${mode.name}: H1 no supera dos líneas en desktop`,
    viewport.width < 1024 || data.h1Lines <= 2,
    `h1Lines=${data.h1Lines}`,
    "warning",
  );
  addCheck(
    `${viewport.name}/${mode.name}: todas las imágenes cargan`,
    data.images.every(
      (image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0,
    ),
    data.images.length
      ? data.images
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.src)
          .join(", ")
      : "No hay imágenes en el documento",
  );
  addCheck(
    `${viewport.name}/${mode.name}: imágenes con alt`,
    data.images.every((image) => image.alt?.trim()),
    data.images
      .filter((image) => !image.alt?.trim())
      .map((image) => image.src)
      .join(", "),
  );
  const responsiveImages = data.images.filter(
    (image) => image.srcset || image.src.includes("-800.") || image.src.includes("-900."),
  );
  addCheck(
    `${viewport.name}/${mode.name}: imágenes tienen estrategia responsive`,
    viewport.width >= 768 || responsiveImages.length > 0,
    data.images.map((image) => `${image.src} srcset=${Boolean(image.srcset)}`).join(" | "),
    "warning",
  );
  const mobileLargeAssets = data.images.filter(
    (image) =>
      viewport.width < 768 &&
      image.visible &&
      image.naturalWidth > 1600 &&
      !image.srcset,
  );
  addCheck(
    `${viewport.name}/${mode.name}: móvil no carga fotos originales gigantes`,
    mobileLargeAssets.length === 0,
    mobileLargeAssets.map((image) => `${image.src} ${image.naturalWidth}px`).join(" | "),
    "warning",
  );
  const cropRiskImages = data.images.filter((image) => {
    if (!image.visible || image.objectFit !== "cover" || !image.naturalWidth || !image.naturalHeight) return false;
    const sourceRatio = image.naturalWidth / image.naturalHeight;
    const renderedRatio = image.renderedWidth / Math.max(image.renderedHeight, 1);
    return sourceRatio >= 1.15 && renderedRatio >= sourceRatio * 1.35;
  });
  addCheck(
    `${viewport.name}/${mode.name}: fotos de autobuses no se recortan con ratio extremo`,
    cropRiskImages.length === 0,
    cropRiskImages.map((image) => `${image.src} object-fit=${image.objectFit}`).join(" | "),
    "warning",
  );
  addCheck(
    `${viewport.name}/${mode.name}: fuentes listas`,
    data.fonts.status === "loaded",
    `document.fonts.status=${data.fonts.status}, count=${data.fonts.count}`,
    "warning",
  );
  const exactFontFamily = data.fontFaces.some(
    (font) => font.family.replace(/["']/gu, "").trim() === "Manrope" && font.status === "loaded",
  );
  addCheck(
    `${viewport.name}/${mode.name}: fuente Manrope coincide con CSS y está cargada`,
    /(^|,\s*)["']?Manrope["']?(,|$)/u.test(data.bodyFont) &&
      exactFontFamily &&
      data.manropeCheck,
    `body=${data.bodyFont}, manropeCheck=${data.manropeCheck}, families=${data.fontFaces.map((font) => `${font.family}:${font.status}`).join(" | ")}`,
    "warning",
  );
  addCheck(
    `${viewport.name}/${mode.name}: no cae en fuente Times/serif predeterminada`,
    !/(Times|serif)/iu.test(`${data.bodyFont} ${data.htmlFont}`),
    `body=${data.bodyFont}, html=${data.htmlFont}`,
    "warning",
  );
  addCheck(
    `${viewport.name}/${mode.name}: no hay em dash visible`,
    !/[—–]/u.test(data.bodyText),
    data.bodyText.match(/[—–]/u)?.[0] || "",
  );

  const allHrefs = data.anchors.map((anchor) => anchor.href);
  const whatsappLinks = allHrefs.filter((href) =>
    href.startsWith(`https://wa.me/${expected.whatsappNumber}`),
  );
  const whatsappHasExpectedText = whatsappLinks.some((href) => {
    const parsed = maybeAbsoluteHref(href);
    return parsed?.searchParams.get("text") === expected.whatsappText;
  });
  addCheck(
    `${viewport.name}/${mode.name}: WhatsApp correcto`,
    whatsappLinks.length > 0 && whatsappHasExpectedText,
    whatsappLinks.join(", "),
  );
  addCheck(
    `${viewport.name}/${mode.name}: teléfono y correo correctos`,
    allHrefs.includes(expected.phoneHref) &&
      allHrefs.some((href) => href.toLowerCase() === `mailto:${expected.email}`),
    `phone=${allHrefs.includes(expected.phoneHref)}, email=${allHrefs.some(
      (href) => href.toLowerCase() === `mailto:${expected.email}`,
    )}`,
  );
  addCheck(
    `${viewport.name}/${mode.name}: redes sociales correctas`,
    allHrefs.includes(expected.facebook) && allHrefs.includes(expected.tiktok),
    `facebook=${allHrefs.includes(expected.facebook)}, tiktok=${allHrefs.includes(
      expected.tiktok,
    )}`,
  );

  const forbiddenLocalhost = [data.canonical, data.ogUrl, data.socialMeta.image].filter(
    (value) => /(?:localhost|127\.0\.0\.1)/iu.test(value),
  );
  addCheck(
    `${viewport.name}/${mode.name}: no emite URL localhost`,
    forbiddenLocalhost.length === 0,
    forbiddenLocalhost.join(", "),
  );
  if (expectedProductionOrigin) {
    const expectedCanonical = `${expectedProductionOrigin}/`;
    addCheck(
      `${viewport.name}/${mode.name}: canonical de producción`,
      data.canonical === expectedCanonical,
      `esperado=${expectedCanonical}, actual=${data.canonical || "ausente"}`,
    );
    addCheck(
      `${viewport.name}/${mode.name}: Open Graph usa producción`,
      data.ogUrl === expectedCanonical &&
        data.socialMeta.image.startsWith(expectedProductionOrigin),
      `og:url=${data.ogUrl}, og:image=${data.socialMeta.image}`,
    );
  } else {
    addCheck(
      `${viewport.name}/${mode.name}: canonical omitido sin origen configurado`,
      !data.canonical && !data.ogUrl,
      `canonical=${data.canonical || "ausente"}, og:url=${data.ogUrl || "ausente"}`,
      "warning",
    );
  }

  const jsonLd = data.jsonLdScripts;
  const graph = jsonLd[0]?.["@graph"];
  const graphItems = Array.isArray(graph) ? graph : [];
  const faqItem = graphItems.find((item) => item?.["@type"] === "FAQPage");
  const faqNames = Array.isArray(faqItem?.mainEntity)
    ? faqItem.mainEntity.map((item) => item?.name).filter(Boolean)
    : [];
  const visibleText = data.bodyText;
  const faqAnswers = Array.isArray(faqItem?.mainEntity)
    ? faqItem.mainEntity.map((item) => item?.acceptedAnswer?.text).filter(Boolean)
    : [];
  const faqVisible =
    faqNames.every((name) => visibleText.includes(name)) &&
    faqAnswers.every((answer) => data.bodyContent.includes(answer));
  addCheck(
    `${viewport.name}/${mode.name}: JSON-LD único y válido`,
    jsonLd.length === 1 && !jsonLd.some((item) => item?.parseError) && graphItems.length >= 5,
    `scripts=${jsonLd.length}, graphItems=${graphItems.length}`,
  );
  addCheck(
    `${viewport.name}/${mode.name}: FAQ JSON-LD coincide con contenido visible`,
    Boolean(faqItem) && faqNames.length > 0 && faqVisible,
    `faqItems=${faqNames.length}, visibleQuestions=${faqNames.filter((name) => visibleText.includes(name)).length}, visibleAnswers=${faqAnswers.filter((answer) => data.bodyContent.includes(answer)).length}`,
  );

  if (screenshotsEnabled) {
    const stem = safeFileName(`${viewport.name}-${mode.name}`);
    const firstViewPath = path.join(outputDir, `${stem}-hero.png`);
    const fullPagePath = path.join(outputDir, `${stem}-full.png`);
    await page.screenshot({ path: firstViewPath, fullPage: false });
    await page.screenshot({ path: fullPagePath, fullPage: true });
    report.screenshots.push({ viewport: viewport.name, mode: mode.name, firstViewPath, fullPagePath });
  }
}

async function inspectAxe(page, viewport, mode) {
  if (mode.name !== "light" || !["desktop-1440", "mobile-390"].includes(viewport.name)) return;
  const axePath = process.env.QA_AXE_PATH ?? path.join(toolingDir, "node_modules/axe-core/axe.min.js");
  if (!fs.existsSync(axePath)) {
    addCheck(
      `${viewport.name}/${mode.name}: axe disponible`,
      false,
      `No se encontró ${axePath}`,
      "warning",
    );
    return;
  }
  await page.addScriptTag({ path: axePath });
  const result = await page.evaluate(async () => {
    if (!window.axe) return { error: "axe no quedó disponible" };
    return window.axe.run(document, {
      resultTypes: ["violations", "incomplete"],
      rules: { "color-contrast": { enabled: true } },
    });
  });
  const violations = result.violations ?? [];
  report.axe.push({ viewport: viewport.name, mode: mode.name, violations, incomplete: result.incomplete ?? [] });
  addCheck(
    `${viewport.name}/${mode.name}: axe sin violaciones`,
    !result.error && violations.length === 0,
    result.error || violations.map((violation) => `${violation.id}: ${violation.help}`).join(" | "),
    "warning",
  );
}

async function inspectMenu(page, viewport) {
  if (viewport.width >= 768) return;
  const menuCandidates = page.getByRole("button", { name: /men[uú]|navegaci[oó]n|menu/iu });
  const count = await menuCandidates.count();
  if (!count) {
    addInteraction(
      `${viewport.name}: menú móvil disponible`,
      false,
      "No se encontró un botón con nombre accesible de menú/navegación",
      "warning",
    );
    return;
  }
  const button = menuCandidates.first();
  await button.focus();
  const before = await button.getAttribute("aria-expanded");
  await button.click();
  const afterOpen = await button.getAttribute("aria-expanded");
  const openVisible = await page.evaluate(() => {
    const candidates = [
      ...document.querySelectorAll('[data-mobile-menu], [role="dialog"], nav'),
    ];
    return candidates.some((element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.height > 0;
    });
  });
  addInteraction(
    `${viewport.name}: menú móvil abre`,
    afterOpen === "true" || openVisible,
    `aria-expanded antes=${before}, después=${afterOpen}, visible=${openVisible}`,
  );

  const menuLinks = await page.locator("nav a[href], [data-mobile-menu] a[href]").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href") || ""),
  );
  const missingTargets = await page.evaluate((hrefs) => {
    return hrefs.filter((href) => {
      if (!href.startsWith("#") || href === "#") return false;
      return !document.getElementById(href.slice(1));
    });
  }, menuLinks);
  addInteraction(
    `${viewport.name}: enlaces del menú apuntan a destinos existentes`,
    missingTargets.length === 0,
    missingTargets.join(", "),
  );

  await page.keyboard.press("Escape");
  const afterEscape = await button.getAttribute("aria-expanded");
  const controlledId = await button.getAttribute("aria-controls");
  const closedState = await page.evaluate((id) => {
    const candidates = [
      ...(id && document.getElementById(id) ? [document.getElementById(id)] : []),
      ...document.querySelectorAll('[data-mobile-menu], [role="dialog"], .mobile-nav'),
    ];
    const uniqueCandidates = Array.from(new Set(candidates.filter(Boolean)));
    const closed = uniqueCandidates.every((element) => {
      const style = window.getComputedStyle(element);
      return style.display === "none" || style.visibility === "hidden" || element.getAttribute("hidden") !== null;
    });
    const closedContainer = uniqueCandidates.find((element) => {
      const style = window.getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden" && !element.hasAttribute("hidden");
    });
    const focusable = closedContainer
      ? Array.from(closedContainer.querySelectorAll("a, button, input, select, textarea"))
          .filter((element) => !element.hasAttribute("disabled"))
          .filter((element) => Number.parseInt(element.getAttribute("tabindex") || "0", 10) >= 0)
          .map((element) => element.textContent?.trim() || element.getAttribute("aria-label") || element.tagName)
      : [];
    const activeElementIsButton = document.activeElement === document.querySelector('button[aria-expanded]');
    return {
      closed,
      focusable,
      activeElementIsButton,
      ariaHidden: closedContainer?.getAttribute("aria-hidden") || null,
      inert: closedContainer?.hasAttribute("inert") || false,
    };
  }, controlledId);
  addInteraction(
    `${viewport.name}: Escape cierra menú móvil`,
    afterEscape === "false" || closedState.closed,
    `aria-expanded=${afterEscape}, cerrado=${closedState.closed}`,
  );
  addInteraction(
    `${viewport.name}: menú cerrado no deja enlaces en el foco`,
    closedState.closed ||
      (closedState.focusable.length === 0 &&
        (closedState.ariaHidden === "true" || closedState.inert)),
    `closed=${closedState.closed}, focusables=${closedState.focusable.length}, aria-hidden=${closedState.ariaHidden}, inert=${closedState.inert}`,
  );
  addInteraction(
    `${viewport.name}: Escape devuelve el foco al botón de menú`,
    closedState.activeElementIsButton || closedState.closed,
    `activeElementIsButton=${closedState.activeElementIsButton}`,
    "warning",
  );
}

async function inspectFaq(page, viewport) {
  const summaries = page.locator("details summary");
  const summaryCount = await summaries.count();
  if (summaryCount) {
    // The first item is often SSR-open. Choose a closed item so Enter can
    // prove the open transition and Space can prove the close transition.
    const summary = summaries.nth(summaryCount > 1 ? 1 : 0);
    await summary.focus();
    const before = await summary.evaluate((element) => element.parentElement?.hasAttribute("open"));
    await page.keyboard.press("Enter");
    const afterEnter = await summary.evaluate((element) => element.parentElement?.hasAttribute("open"));
    addInteraction(
      `${viewport.name}: FAQ abre con teclado`,
      before !== afterEnter && afterEnter === true,
      `antes=${before}, después de Enter=${afterEnter}`,
    );
    await page.keyboard.press("Space");
    const afterSpace = await summary.evaluate((element) => element.parentElement?.hasAttribute("open"));
    addInteraction(
      `${viewport.name}: FAQ responde a Space`,
      afterSpace === false,
      `después de Space=${afterSpace}`,
    );
    return;
  }

  const expandedButtons = page.locator('button[aria-expanded]');
  const count = await expandedButtons.count();
  for (let index = 0; index < count; index += 1) {
    const candidate = expandedButtons.nth(index);
    const label = `${(await candidate.innerText().catch(() => ""))} ${(await candidate.getAttribute("aria-label")) || ""}`;
    const context = await candidate.evaluate((element) => element.parentElement?.innerText || "");
    if (!/(faq|pregunta|qu[eé])|\?/iu.test(`${label} ${context}`)) continue;
    await candidate.focus();
    const before = await candidate.getAttribute("aria-expanded");
    await page.keyboard.press("Enter");
    const afterEnter = await candidate.getAttribute("aria-expanded");
    addInteraction(
      `${viewport.name}: FAQ personalizado abre con teclado`,
      before !== afterEnter && afterEnter === "true",
      `antes=${before}, después=${afterEnter}`,
    );
    await page.keyboard.press("Space");
    const afterSpace = await candidate.getAttribute("aria-expanded");
    addInteraction(
      `${viewport.name}: FAQ personalizado responde a Space`,
      afterSpace === "false",
      `después=${afterSpace}`,
    );
    return;
  }

  addInteraction(
    `${viewport.name}: FAQ interactivo disponible`,
    false,
    "No se encontraron details/summary ni botones aria-expanded asociados a preguntas",
    "warning",
  );
}

async function inspectGalleryOrSelector(page, viewport) {
  const selectors = page.locator("select");
  const selectorCount = await selectors.count();
  if (selectorCount) {
    const select = selectors.first();
    const options = await select.locator("option").count();
    if (options > 1) {
      const before = await select.inputValue();
      await select.selectOption({ index: 1 });
      const after = await select.inputValue();
      addInteraction(
        `${viewport.name}: selector cambia opción`,
        before !== after,
        `antes=${before}, después=${after}`,
      );
    } else {
      addInteraction(
        `${viewport.name}: selector tiene opciones suficientes`,
        false,
        `options=${options}`,
        "warning",
      );
    }
    return;
  }

  const tabCount = await page.locator('[role="tab"]').count();
  if (tabCount > 1) {
    const tab = page.locator('[role="tab"]').nth(1);
    await tab.focus();
    await page.keyboard.press("Enter");
    const selected = await tab.getAttribute("aria-selected");
    addInteraction(
      `${viewport.name}: galería/tabs responde al teclado`,
      selected === "true" || (await tab.getAttribute("data-state")) === "active",
      `aria-selected=${selected}`,
    );
    return;
  }

  const galleryButtons = page.getByRole("button", {
    name: /siguiente|anterior|previous|next|galer[ií]a|gallery/iu,
  });
  if ((await galleryButtons.count()) > 0) {
    await galleryButtons.first().click();
    addInteraction(`${viewport.name}: galería responde al clic`, true);
    return;
  }

  addInteraction(
    `${viewport.name}: selector o galería disponible`,
    false,
    "No se encontró select, role=tab ni controles de galería",
    "warning",
  );
}

async function inspectForms(page, viewport) {
  const forms = page.locator("form");
  const count = await forms.count();
  if (!count) {
    addInteraction(
      `${viewport.name}: formulario`,
      true,
      "No hay formulario implementado; se omite envío",
      "warning",
    );
    return;
  }
  for (let index = 0; index < count; index += 1) {
    const form = forms.nth(index);
    const action = await form.getAttribute("action");
    const method = (await form.getAttribute("method")) || "get";
    const fields = form.locator("input, textarea, select");
    const fieldCount = await fields.count();
    addInteraction(
      `${viewport.name}: formulario no envía a destino externo`,
      !action || action.startsWith("#") || action.startsWith(baseUrl),
      `action=${action || "(actual)"}, method=${method}`,
    );
    addInteraction(
      `${viewport.name}: formulario tiene campos`,
      fieldCount > 0,
      `fields=${fieldCount}`,
    );
    const nameField = form.locator("#name");
    const useCaseField = form.locator("#use-case");
    const detailsField = form.locator("#details");
    const isInquiryForm =
      (await nameField.count()) > 0 &&
      (await useCaseField.count()) > 0 &&
      (await detailsField.count()) > 0;

    if (isInquiryForm) {
      const submit = form.locator('button[type="submit"]');
      await submit.click();
      const emptyError = form.locator('[role="alert"]');
      addInteraction(
        `${viewport.name}: consulta vacía muestra error`,
        (await emptyError.count()) > 0 && (await emptyError.first().isVisible()),
        await emptyError.first().innerText().catch(() => "Sin mensaje de error"),
      );

      await nameField.fill("Ana QA");
      const options = useCaseField.locator("option");
      const optionCount = await options.count();
      if (optionCount > 1) {
        await useCaseField.selectOption({ index: 1 });
      }
      await detailsField.fill("Necesito revisar una unidad para transporte de personal.");
      await submit.click();
      const result = form.locator('[role="status"]');
      const resultLink = result.locator('a[href^="https://wa.me/"]');
      const resultHref = (await resultLink.count()) ? (await resultLink.getAttribute("href")) || "" : "";
      const resultUrl = maybeAbsoluteHref(resultHref);
      const resultMessage = resultUrl?.searchParams.get("text") || "";
      addInteraction(
        `${viewport.name}: consulta válida prepara WhatsApp localmente`,
        (await result.count()) > 0 &&
          (await result.isVisible()) &&
          resultHref.startsWith(`https://wa.me/${expected.whatsappNumber}`) &&
          resultMessage.includes("Ana QA") &&
          resultMessage.includes("Esta es mi consulta") &&
          resultMessage.includes("transporte") &&
          resultMessage.includes("Necesito revisar una unidad"),
        `href=${resultHref}, message=${resultMessage}`,
      );

      await detailsField.fill("Edición posterior antes de enviar.");
      addInteraction(
        `${viewport.name}: editar consulta reinicia estado preparado`,
        !(await form.locator('[role="status"]').count()) &&
          (await form.locator('button[type="submit"]').count()) > 0,
        "El enlace preparado debe desaparecer al editar cualquier campo.",
      );
      continue;
    }

    const firstTextField = form.locator('input:not([type="hidden"]):not([type="submit"]), textarea').first();
    if (await firstTextField.count()) {
      await firstTextField.fill("QA sin envío");
      addInteraction(`${viewport.name}: campos permiten captura sin enviar`, true);
    }
  }
}

async function run() {
  fs.mkdirSync(outputDir, { recursive: true });
  const { chromium } = requirePlaywright();
  const browser = await chromium.launch({
    headless: process.env.QA_HEADLESS !== "false",
    executablePath: chromeExecutable,
    args: ["--disable-gpu", "--no-sandbox"],
  });

  for (const viewport of viewports) {
    for (const mode of modes) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        colorScheme: mode.colorScheme,
        reducedMotion: mode.reducedMotion,
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      const failedRequests = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      page.on("requestfailed", (request) => {
        const url = request.url();
        if (!url.startsWith("data:")) failedRequests.push(`${request.method()} ${url}`);
      });
      try {
        await page.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 30_000 });
      } catch (error) {
        await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded", timeout: 15_000 });
        report.errors.push({
          name: `${viewport.name}/${mode.name}: navegación networkidle`,
          passed: false,
          details: error.message,
        });
      }
      await inspectPage(page, viewport, mode);
      await inspectAxe(page, viewport, mode);
      if (interactionEnabled && mode.name === "light") {
        await inspectMenu(page, viewport);
        await inspectFaq(page, viewport);
        await inspectGalleryOrSelector(page, viewport);
        await inspectForms(page, viewport);
      }
      addCheck(
        `${viewport.name}/${mode.name}: sin errores de consola`,
        consoleErrors.length === 0 && pageErrors.length === 0,
        [...consoleErrors, ...pageErrors].join(" | "),
        "warning",
      );
      addCheck(
        `${viewport.name}/${mode.name}: sin solicitudes fallidas`,
        failedRequests.length === 0,
        failedRequests.join(" | "),
        "warning",
      );
      await context.close();
    }
  }

  const noJsContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: "light",
    reducedMotion: "reduce",
    javaScriptEnabled: false,
  });
  const noJsPage = await noJsContext.newPage();
  try {
    await noJsPage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded", timeout: 30_000 });
    const noJsData = await noJsPage.evaluate(() => ({
      h1Count: document.querySelectorAll("h1").length,
      bodyTextLength: document.body.textContent?.trim().length || 0,
      faqCount: document.querySelectorAll("details summary").length,
      ctaCount: document.querySelectorAll('a[href^="https://wa.me/"], a[href^="tel:"], a[href^="mailto:"]').length,
      visibleFaqText: document.querySelector("#preguntas")?.textContent?.trim().length || 0,
    }));
    addCheck(
      "sin JavaScript: HTML base conserva H1, contenido, FAQ y CTAs",
      noJsData.h1Count === 1 &&
        noJsData.bodyTextLength > 500 &&
        noJsData.faqCount >= 4 &&
        noJsData.ctaCount >= 3 &&
        noJsData.visibleFaqText > 100,
      JSON.stringify(noJsData),
    );
    if (screenshotsEnabled) {
      const noJsPath = path.join(outputDir, "mobile-390-no-js.png");
      await noJsPage.screenshot({ path: noJsPath, fullPage: false });
      report.screenshots.push({ viewport: "mobile-390", mode: "no-js", firstViewPath: noJsPath });
    }
  } finally {
    await noJsContext.close();
  }

  report.finishedAt = new Date().toISOString();
  report.ok = report.errors.length === 0;
  const reportPath = path.join(outputDir, "runtime-report.json");
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`QA runtime report: ${reportPath}`);
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Checks: ${report.checks.filter((check) => check.passed).length}/${report.checks.length} passed`);
  console.log(`Interactions: ${report.interactions.filter((check) => check.passed).length}/${report.interactions.length} passed`);
  console.log(`Errors: ${report.errors.length}; warnings: ${report.warnings.length}`);
  if (report.screenshots.length) console.log(`Screenshots: ${outputDir}`);
  await browser.close();
  if (!report.ok) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
