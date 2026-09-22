import type { Metadata } from "next";

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
  employerUrl: string;
  siteName: string;
  personName: string;
  jobTitle: string;
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
  portraitImagePath: string;
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
  employerUrl: "https://www.zapata.com.mx/",
  siteName: "Mariana Barrera | Zapata Camiones",
  personName: "Mariana Barrera",
  jobTitle: "Asesora de ventas de autobuses en Zapata Camiones",
  locale: "es-MX",
  language: "es-MX",
  title: "Mariana Barrera | Venta de autobuses Mercedes-Benz",
  description:
    "Mariana Barrera, asesora de Zapata Camiones en Texcoco. Cotiza autobuses Mercedes-Benz para transporte urbano, personal, escolar y turismo en CDMX y Edomex.",
  phoneDisplay: "+52 55 5007 1752",
  phoneE164: "+525550071752",
  phoneHref: "tel:+525550071752",
  email: "nbarrera@zapata.com.mx",
  whatsappNumber: "525550071752",
  // Keep this path stable so metadata and social previews share one contract.
  // The asset pipeline writes the 1200x630 asset to this exact path.
  socialImagePath: "/images/og.jpg",
  portraitImagePath: "/images/retrato-mariana.webp",
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
      href: "https://www.tiktok.com/@marianazapatacam1",
    },
  ],
  product: {
    brand: "Mercedes-Benz",
    bodyStyles: [
      "Ayco Zafiro",
      "Toreto",
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
        description: "Para rutas y corredores de transporte público. Revisamos carrocería, asientos y acceso según tu ruta.",
      },
      {
        id: "personal",
        title: "Transporte de personal",
        description: "Para mover al personal de tu empresa o planta en sus turnos. Revisamos capacidad y tipo de asiento.",
      },
      {
        id: "escolar",
        title: "Transporte escolar",
        description: "Para escuelas y transportistas escolares. Elegimos la configuración según tus rutas y alumnos.",
      },
      {
        id: "turismo",
        title: "Turismo",
        description: "Para excursiones, recorridos y viajes largos, con opción de asientos reclinables.",
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
    eyebrow: "Mariana Barrera · Zapata Camiones",
    // Rendered as one H1: a smaller lead line above the brand line, so the
    // heading stays within two lines at every breakpoint.
    headingLead: "Venta de autobuses",
    headingMain: "Mercedes-Benz",
    body:
      "Soy Mariana Barrera, asesora de Zapata Camiones. Te ayudo a elegir y cotizar el autobús para tu ruta, tu empresa, tu escuela o tus viajes de turismo.",
    location:
      "Oficinas en Texcoco de Mora. Atención en CDMX, Estado de México y toda la República.",
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
      "Puedes cotizar conmigo cualquiera de estas seis carrocerías Mercedes-Benz. Abajo ves algunas unidades reales.",
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
  profile: {
    heading: site.personName,
    role: site.jobTitle,
    body:
      "Soy Mariana Barrera, asesora de ventas en Zapata Camiones. Llevo más de quince años acompañando compras de autobuses Mercedes-Benz para rutas urbanas, transporte de personal, escuelas y turismo. Te ayudo a comparar carrocerías y asientos según tu operación.",
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
    question: "¿Quién es Mariana Barrera?",
    answer:
      "Mariana Barrera es asesora de ventas de autobuses Mercedes-Benz en Zapata Camiones, con más de quince años de experiencia. Sus oficinas están en Texcoco de Mora y atiende consultas de CDMX, Estado de México y toda la República Mexicana.",
  },
  {
    question: "¿Qué autobuses ofrece Mariana Barrera?",
    answer:
      "Mariana asesora opciones de autobuses Mercedes-Benz con carrocerías Ayco Zafiro, Toreto, Ayco Cosmopolitan, Beccar, Urviabus y Marcopolo.",
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
  {
    question: "¿Cómo puedo cotizar un autobús con Mariana Barrera?",
    answer:
      `Puedes llamar o escribir por WhatsApp al ${site.phoneDisplay}, o enviar un correo a ${site.email}. Indica si necesitas transporte urbano, de personal, escolar o turismo, y qué carrocería y asientos te interesa revisar.`,
  },
];

export const whatsappHref = createWhatsAppHref();

/** Return a WhatsApp click-to-chat URL with an optional prefilled message. */
export function createWhatsAppHref(message = site.defaultWhatsAppMessage): string {
  const cleanMessage = message.trim() || site.defaultWhatsAppMessage;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(cleanMessage)}`;
}

/**
 * This site has one public origin. Preview builds must also point their
 * canonical, sitemap and entity identifiers at the production domain.
 */
export const PRODUCTION_SITE_URL = "https://marianabarrera.com";

/**
 * Do not infer identity from deployment URLs or environment overrides.
 * Host-specific X-Robots-Tag rules keep workers.dev previews out of the index.
 */
export function getSiteUrl(): string {
  return PRODUCTION_SITE_URL;
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

export function getAbsoluteAssetUrl(path: string, origin = getSiteUrl()): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin}${normalizeAssetPath(path)}`;
}

/** Metadata shape compatible with Next App Router's Metadata object. */
export function getSiteMetadata(path = "/"): Metadata {
  const origin = getSiteUrl();
  const canonical = getCanonicalUrl(path);
  const image = getAbsoluteAssetUrl(site.socialImagePath, origin);
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    title: site.title,
    description: site.description,
    metadataBase: new URL(origin),
    alternates: { canonical },
    authors: [{ name: site.personName, url: `${getCanonicalUrl()}#mariana-barrera` }],
    creator: site.personName,
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
    openGraph: {
      type: "website",
      locale: site.locale.replace("-", "_"),
      url: canonical,
      siteName: site.personName,
      title: site.title,
      description: site.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Mariana Barrera, asesora de ventas de autobuses Mercedes-Benz en Zapata Camiones",
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
      "max-image-preview": "large",
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
  const homeUrl = getCanonicalUrl();
  const personId = `${homeUrl}#person`;
  const organizationId = `${homeUrl}#organization`;
  const websiteId = `${homeUrl}#website`;
  const webpageId = `${canonical}#webpage`;
  const serviceId = `${homeUrl}#service`;
  const imageId = `${canonical}#primaryimage`;
  const faqId = `${canonical}#faq`;

  const person: JsonLd = {
    "@type": "Person",
    "@id": personId,
    name: site.personName,
    jobTitle: site.jobTitle,
    url: `${homeUrl}#mariana-barrera`,
    image: getAbsoluteAssetUrl(site.portraitImagePath),
    description: landingContent.profile.body,
    email: site.email,
    telephone: site.phoneE164,
    worksFor: { "@id": organizationId },
    sameAs: site.socials.map((social) => social.href),
  };

  const organization: JsonLd = {
    "@type": "Organization",
    "@id": organizationId,
    name: site.brandName,
    url: site.employerUrl,
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
    name: site.personName,
    alternateName: site.siteName,
    inLanguage: site.language,
    publisher: { "@id": personId },
    url: homeUrl,
  };

  const webpage: JsonLd = {
    "@type": "WebPage",
    "@id": webpageId,
    name: options.title ?? site.title,
    description: options.description ?? site.description,
    inLanguage: site.language,
    isPartOf: { "@id": websiteId },
    author: { "@id": personId },
    mainEntity: { "@id": serviceId },
    about: [{ "@id": personId }, { "@id": serviceId }],
    primaryImageOfPage: { "@id": imageId },
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
    url: `${homeUrl}#opciones`,
    brand: {
      "@type": "Brand",
      name: site.product.brand,
    },
    areaServed: site.primaryServiceAreas.map((name) => ({
      "@type": "Place",
      name,
    })),
  };

  const primaryImage: JsonLd = {
    "@type": "ImageObject",
    "@id": imageId,
    url: image,
    contentUrl: image,
    width: 1200,
    height: 630,
    caption: "Autobuses Mercedes-Benz con Mariana Barrera, Zapata Camiones",
  };

  const graph: JsonLd[] = [person, organization, website, webpage, service, primaryImage];

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
