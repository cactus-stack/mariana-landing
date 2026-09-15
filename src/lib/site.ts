/**
 * Single source of truth for the landing page's public business information.
 *
 * Keep claims in this file tied to information supplied by the client. In
 * particular, do not add vehicle prices, inventory, ratings, financing,
 * delivery promises, or a street address until those details are confirmed.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export type UseCase = {
  id: string;
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type SiteConfig = {
  brandName: string;
  siteName: string;
  personName: string;
  locale: "es-MX";
  language: "es-MX";
  title: string;
  description: string;
  phoneDisplay: string;
  phoneE164: string;
  phoneHref: string;
  email: string;
  whatsappNumber: string;
  socialImagePath: string;
  office: {
    locality: string;
    region: string;
    country: string;
    countryCode: string;
  };
  primaryServiceAreas: readonly string[];
  inquiryScope: string;
  socials: readonly SocialLink[];
  product: {
    brand: string;
    bodyStyles: readonly string[];
    seatOptions: readonly string[];
    useCases: readonly UseCase[];
  };
  defaultWhatsAppMessage: string;
};

export const site: SiteConfig = {
  brandName: "Zapata Camiones",
  siteName: "Mariana Barrera | Zapata Camiones",
  personName: "Mariana Barrera",
  locale: "es-MX",
  language: "es-MX",
  title: "Venta de autobuses Mercedes-Benz | Mariana Barrera",
  description:
    "Venta de autobuses Mercedes-Benz con Mariana Barrera, de Zapata Camiones, para transporte urbano, de personal, escolar y turismo en Texcoco, CDMX y Edomex. Recibe consultas de todo México.",
  phoneDisplay: "+52 55 5007 1752",
  phoneE164: "+525550071752",
  phoneHref: "tel:+525550071752",
  email: "nbarrera@zapata.com.mx",
  whatsappNumber: "525550071752",
  // Keep this path stable so metadata and social previews share one contract.
  // The asset pipeline writes the 1200x630 asset to this exact path.
  socialImagePath: "/images/og.jpg",
  office: {
    locality: "Texcoco de Mora",
    region: "Estado de México",
    country: "México",
    countryCode: "MX",
  },
  primaryServiceAreas: [
    "Ciudad de México",
    "Estado de México",
    "Área Metropolitana de la Ciudad de México",
  ],
  inquiryScope:
    "Atención principal en Ciudad de México, Estado de México y el área metropolitana; recibe consultas de toda la República Mexicana.",
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/14rqv3bSemJ/?mibextid=wwXIfr",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@marianazapatacam1?_r=1&_t=ZS-99lQY9ak6mV",
    },
  ],
  product: {
    brand: "Mercedes-Benz",
    bodyStyles: [
      "Ayco Zafiro",
      "Ayco Cosmopolitan",
      "Beccar",
      "Urviabus",
      "Marcopolo",
    ],
    seatOptions: [
      "Asientos altos fijos en tela",
      "Asientos altos fijos en plástico",
      "Asientos reclinables",
    ],
    useCases: [
      {
        id: "urbano",
        title: "Transporte urbano",
        description: "Autobuses Mercedes-Benz para tu operación de transporte urbano de pasajeros.",
      },
      {
        id: "personal",
        title: "Transporte de personal",
        description: "Autobuses Mercedes-Benz para trasladar personal de empresas y operaciones industriales.",
      },
      {
        id: "escolar",
        title: "Transporte escolar",
        description: "Autobuses Mercedes-Benz para el transporte escolar de estudiantes.",
      },
      {
        id: "turismo",
        title: "Turismo",
        description: "Autobuses Mercedes-Benz para recorridos y viajes de turismo.",
      },
    ],
  },
  defaultWhatsAppMessage:
    "Hola Mariana, quiero cotizar un autobús Mercedes-Benz. ¿Me puedes orientar?",
};

/** Search themes to distribute naturally through visible copy and headings. */
export const seoTargetPhrases = [
  "venta de autobuses Mercedes-Benz",
  "autobuses para transporte urbano",
  "autobuses para transporte de personal",
  "autobuses para transporte escolar",
  "autobuses para turismo",
  "autobuses con accesibilidad para silla de ruedas",
  "Mariana Barrera",
  "Zapata Camiones",
  "Texcoco de Mora",
  "Ciudad de México",
  "Estado de México",
] as const;

/**
 * Copy contract for the page. The builder can render these values directly;
 * this keeps visible copy, FAQ markup and metadata aligned.
 */
export const landingContent = {
  hero: {
    eyebrow: "Zapata Camiones",
    heading: "Autobuses Mercedes-Benz",
    body:
      "Cotiza tu autobús Mercedes-Benz con Mariana Barrera y elige una opción para tu operación de transporte.",
    location:
      "Atención en CDMX, Estado de México y área metropolitana. Oficinas en Texcoco de Mora.",
    primaryCta: "Cotizar autobús",
    secondaryCta: "Ver autobuses",
  },
  services: {
    heading: "Autobuses para cada servicio",
    body:
      "Cotiza una configuración Mercedes-Benz para transporte urbano, de personal, escolar o turismo.",
    items: site.product.useCases,
  },
  bodies: {
    heading: "Carrocerías disponibles",
    body:
      "Estas son las cinco carrocerías Mercedes-Benz que puedes cotizar con Mariana.",
    items: site.product.bodyStyles,
  },
  seats: {
    heading: "Configuraciones de asientos",
    body: "Define el tipo de asiento que necesitas: tela, plástico o reclinable.",
    items: site.product.seatOptions,
  },
  accessibility: {
    heading: "Accesibilidad para silla de ruedas",
    body: "Puedes consultar una configuración con espacio señalizado para silla de ruedas y asiento abatible.",
    alt: "Espacio interior señalizado con pictograma de silla de ruedas, junto a un asiento abatible.",
  },
  location: {
    heading: "Atención comercial desde Texcoco de Mora",
    body:
      "Solicita tu cotización desde CDMX, Estado de México o el área metropolitana. También se reciben consultas de toda la República Mexicana.",
    office: `${site.office.locality}, ${site.office.region}`,
  },
  contact: {
    heading: "Cotiza tu autobús",
    body:
      "Dime qué servicio necesitas y te ayudo a elegir una opción Mercedes-Benz para cotizar.",
    phoneLabel: site.phoneDisplay,
    emailLabel: site.email,
    whatsappLabel: "Escribir por WhatsApp",
  },
} as const;

export const faqs: readonly Faq[] = [
  {
    question: "¿Qué autobuses ofrece Mariana Barrera?",
    answer:
      "Mariana asesora opciones de autobuses Mercedes-Benz con carrocerías Ayco Zafiro, Ayco Cosmopolitan, Beccar, Urviabus y Marcopolo.",
  },
  {
    question: "¿Qué configuraciones de asientos hay?",
    answer:
      "Hay opciones de asientos altos fijos en tela, asientos altos fijos en plástico y asientos reclinables.",
  },
  {
    question: "¿Para qué servicios puedo consultar?",
    answer:
      "Puedes consultar opciones para transporte urbano, transporte de personal, transporte escolar y turismo.",
  },
  {
    question: "¿Dónde atiende Mariana?",
    answer:
      "La atención principal es en Ciudad de México, Estado de México y el área metropolitana. Las oficinas están en Texcoco de Mora y también se reciben consultas de toda la República Mexicana; las condiciones se revisan caso por caso.",
  },
  {
    question: "¿Hay autobuses con accesibilidad para silla de ruedas?",
    answer:
      "Sí, puedes consultar con Mariana una configuración con espacio señalizado para silla de ruedas y asiento abatible.",
  },
];

export const whatsappHref = createWhatsAppHref();

/** Return a WhatsApp click-to-chat URL with an optional prefilled message. */
export function createWhatsAppHref(message = site.defaultWhatsAppMessage): string {
  const cleanMessage = message.trim() || site.defaultWhatsAppMessage;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(cleanMessage)}`;
}

/**
 * Production origin for every build. NEXT_PUBLIC_SITE_URL (or SITE_URL, for
 * hosts that do not expose Next.js public env vars) can override it for a
 * preview deployment; see getSiteUrl() for the validation rules.
 */
export const PRODUCTION_SITE_URL = "https://marianabarrera.com";

const LOCALHOST_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

/**
 * Resolve the site origin. Defaults to the production domain so every build,
 * including one with no environment configured, emits real canonical and
 * Open Graph metadata. NEXT_PUBLIC_SITE_URL / SITE_URL can override it for a
 * preview deployment; an override that is not a valid http(s) URL, or that
 * points at localhost, is ignored and the production domain is used instead,
 * so a stray local env var can never leak into public metadata.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (!configured) return PRODUCTION_SITE_URL;

  try {
    const url = new URL(configured.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return PRODUCTION_SITE_URL;
    if (LOCALHOST_HOSTNAMES.has(url.hostname)) return PRODUCTION_SITE_URL;
    url.pathname = url.pathname.replace(/\/$/, "");
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return PRODUCTION_SITE_URL;
  }
}

/**
 * Normalize a route path to match next.config's `trailingSlash: true` output
 * (root stays "/", everything else ends in "/"), so canonical and sitemap
 * URLs always match what the static export actually serves.
 */
function normalizeRoutePath(path: string): string {
  const withoutQuery = path.split(/[?#]/, 1)[0] || "/";
  const trimmed = withoutQuery.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}/` : "/";
}

/** Normalize a static asset path. Assets are files, never trailing-slash routes. */
function normalizeAssetPath(path: string): string {
  const withoutQuery = path.split(/[?#]/, 1)[0] || "/";
  const trimmed = withoutQuery.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "/";
}

/** Build an absolute, trailing-slash-consistent canonical URL for a route. */
export function getCanonicalUrl(path = "/"): string {
  return `${getSiteUrl()}${normalizeRoutePath(path)}`;
}

/** Absolute sitemap URL for robots.txt. sitemap.xml is a file, not a route. */
export function getSitemapUrl(): string {
  return `${getSiteUrl()}/sitemap.xml`;
}

export type SitemapEntry = {
  url: string;
};

/** Build sitemap entries from canonical URLs. */
export function getSitemapEntries(paths: readonly string[] = ["/"]): SitemapEntry[] {
  return paths.map((path) => ({ url: getCanonicalUrl(path) }));
}

function getAbsoluteAssetUrl(path: string, origin = getSiteUrl()): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin}${normalizeAssetPath(path)}`;
}

export type SiteMetadata = {
  title: string;
  description: string;
  metadataBase?: URL;
  alternates?: {
    canonical: string;
  };
  openGraph: {
    type: "website";
    locale: string;
    url?: string;
    siteName: string;
    title: string;
    description: string;
    images?: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
    images?: string[];
  };
  robots: {
    index: boolean;
    follow: boolean;
  };
};

/** Metadata shape compatible with Next App Router's Metadata object. */
export function getSiteMetadata(path = "/"): SiteMetadata {
  const origin = getSiteUrl();
  const canonical = getCanonicalUrl(path);
  const image = getAbsoluteAssetUrl(site.socialImagePath, origin);

  return {
    title: site.title,
    description: site.description,
    metadataBase: new URL(origin),
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: site.locale.replace("-", "_"),
      url: canonical,
      siteName: site.siteName,
      title: site.title,
      description: site.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Autobús Mercedes-Benz para Zapata Camiones",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      images: [image],
    },
    // A public landing page should be crawlable now that a real origin exists.
    robots: {
      index: true,
      follow: true,
    },
  };
}

export type StructuredDataOptions = {
  path?: string;
  title?: string;
  description?: string;
  imagePath?: string;
  /** Set true only when the same FAQs are visible in the rendered page. */
  includeFaq?: boolean;
};

export type JsonLd = Record<string, unknown>;

/**
 * Build honest JSON-LD for the page. The graph describes the salesperson,
 * employer, site, page and service; it contains no fake offers or reviews.
 */
export function getStructuredData(options: StructuredDataOptions = {}): JsonLd {
  const path = options.path ?? "/";
  const canonical = getCanonicalUrl(path);
  const origin = getSiteUrl();
  const image = getAbsoluteAssetUrl(options.imagePath ?? site.socialImagePath, origin);
  const personId = `${canonical}#person`;
  const organizationId = `${canonical}#organization`;
  const websiteId = `${canonical}#website`;
  const webpageId = `${canonical}#webpage`;
  const serviceId = `${canonical}#service`;
  const faqId = `${canonical}#faq`;

  const person: JsonLd = {
    "@type": "Person",
    "@id": personId,
    name: site.personName,
    jobTitle: "Asesora de ventas de autobuses",
    email: site.email,
    telephone: site.phoneE164,
    worksFor: { "@id": organizationId },
    sameAs: site.socials.map((social) => social.href),
  };

  const organization: JsonLd = {
    "@type": "Organization",
    "@id": organizationId,
    name: site.brandName,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.office.locality,
      addressRegion: site.office.region,
      addressCountry: site.office.countryCode,
    },
  };

  const website: JsonLd = {
    "@type": "WebSite",
    "@id": websiteId,
    name: site.siteName,
    inLanguage: site.language,
    publisher: { "@id": personId },
    url: origin,
  };

  const webpage: JsonLd = {
    "@type": "WebPage",
    "@id": webpageId,
    name: options.title ?? site.title,
    description: options.description ?? site.description,
    inLanguage: site.language,
    isPartOf: { "@id": websiteId },
    about: [{ "@id": personId }, { "@id": serviceId }],
    primaryImageOfPage: image,
    url: canonical,
  };

  const service: JsonLd = {
    "@type": "Service",
    "@id": serviceId,
    name: "Venta de autobuses Mercedes-Benz",
    serviceType: "Venta de autobuses Mercedes-Benz",
    description:
      "Venta y asesoría comercial de autobuses Mercedes-Benz, carrocerías y configuraciones de asientos.",
    provider: { "@id": personId },
    brand: {
      "@type": "Brand",
      name: site.product.brand,
    },
    areaServed: site.primaryServiceAreas.map((name) => ({
      "@type": "Place",
      name,
    })),
  };

  const graph: JsonLd[] = [person, organization, website, webpage, service];

  if (options.includeFaq) {
    graph.push({
      "@type": "FAQPage",
      "@id": faqId,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
      url: `${canonical}#preguntas`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
