import { faqs as siteFaqs, site } from "./site";

// Re-exported for convenience; site.ts remains the single source of truth.
export const phone = site.phoneE164;
export const displayPhone = site.phoneDisplay;
export const email = site.email;
export const socialLinks = site.socials;
export const whatsappBase = `https://wa.me/${site.whatsappNumber}`;

// NOTE: there is no dedicated photo per confirmed bodywork (Ayco Zafiro,
// Ayco Cosmopolitan, Beccar, Urviabus, Marcopolo). Forcing a specific photo
// onto a bodywork name we cannot verify on that unit is dishonest, so the
// asset pipeline replaced that approach with a gallery of real, emblem
// verified units (see docs/ASSETS.md, "Tabla de derivados"). `bodyworks`
// below lists the five confirmed names as text; `unitGallery` carries the
// real photos, each one named for what its own emblem actually reads.
//
// DO NOT re-add per-bodywork images here without checking with team-lead
// first (see mariana-content/team-lead thread): this file has been
// overwritten multiple times with a 6-item version that (a) shows
// unidad-ayco-zafiro-gt.webp, the only two "Zafiro GT" units found, both
// marked "VENDIDO" in every available photo, as if it were the client's
// "Ayco Zafiro" catalog entry (it is also a smaller Sprinter-chassis vehicle,
// not the coach-type unit a buyer would expect from that name), and
// (b) adds "Ayco Sigma OF" as a sixth sales item, which mariana-assets
// confirmed is a real emblem on a real photo but NOT a bodywork the client
// has confirmed she sells. Both are pending decisions for team-lead / the
// client, not something to resolve by editing this file.
//
// retrato-mariana.webp is also intentionally not wired in: provenance and
// usage rights are unconfirmed per docs/ASSETS.md.
export const photos = {
  hero: "/images/hero-1600.webp",
  heroSmall: "/images/hero-800.webp",
  usoUrbano1: "/images/uso-urbano-1.webp",
  usoUrbano2: "/images/uso-urbano-2.webp",
  usoUrbano3: "/images/uso-urbano-3.webp",
  usoPersonal1: "/images/uso-personal-1.webp",
  usoPersonal2: "/images/uso-personal-2.webp",
  usoPersonal3: "/images/uso-personal-3.webp",
  usoEscolar1: "/images/uso-escolar-1.webp",
  usoEscolar2: "/images/uso-escolar-2.webp",
  usoEscolar3: "/images/uso-escolar-3.webp",
  usoTurismo1: "/images/uso-turismo-1.webp",
  usoTurismo2: "/images/uso-turismo-2.webp",
  usoTurismo3: "/images/uso-turismo-3.webp",
  unidadAycoZafiroGt: "/images/unidad-ayco-zafiro-gt.webp",
  unidadToreto: "/images/unidad-toreto.webp",
  unidadAycoCosmopolitan: "/images/unidad-ayco-cosmopolitan.webp",
  unidadBeccar: "/images/unidad-beccar.webp",
  unidadUrviabusMt: "/images/unidad-urviabus-mt.webp",
  unidadMarcopoloTorino: "/images/unidad-marcopolo-torino.webp",
  unidadAycoSigmaOf: "/images/unidad-ayco-sigma-of.webp",
  interiorTela: "/images/interior-tela.webp",
  interiorPlastico: "/images/interior-plastico.webp",
  interiorReclinable: "/images/interior-reclinable.webp",
  accesibilidad: "/images/accesibilidad.webp",
  retratoMariana: "/images/retrato-mariana.webp",
  logo: "/images/logo.webp",
} as const;

// Media paired to each confirmed use case, keyed by site.product.useCases id.
// Several angles of the SAME physical unit per use case, so the card reads as
// "this bus, from a few sides" rather than as a carousel of different buses.
// The first entry is the one shown at rest and is always a front or
// three-quarter front view, which is what a buyer wants to see first.
const useMedia: Record<string, readonly { src: string; alt: string }[]> = {
  urbano: [
    {
      src: photos.usoUrbano1,
      alt: "Autobús Mercedes-Benz Toreto morado de Corredor 25, completo, de tres cuartos frontal con la puerta abierta.",
    },
    {
      src: photos.usoUrbano2,
      alt: "La misma unidad Toreto morada, vista lateral completa.",
    },
    {
      src: photos.usoUrbano3,
      alt: "Interior de la misma unidad, con los asientos aún cubiertos con plástico de fábrica y barras amarillas.",
    },
  ],
  personal: [
    {
      src: photos.usoPersonal1,
      alt: "Autobús Mercedes-Benz AYCO Cosmopolitan blanco, completo, de tres cuartos frontal.",
    },
    {
      src: photos.usoPersonal2,
      alt: "La misma unidad AYCO blanca, vista trasera completa.",
    },
    {
      src: photos.usoPersonal3,
      alt: "Interior de la misma unidad, con asientos de plástico duro gris y azul y pasillo central.",
    },
  ],
  escolar: [
    {
      src: photos.usoEscolar1,
      alt: "Autobús Mercedes-Benz AYCO Sigma OF azul, completo, de tres cuartos frontal.",
    },
    {
      src: photos.usoEscolar2,
      alt: "La misma unidad azul, vista de tres cuartos trasero.",
    },
    {
      src: photos.usoEscolar3,
      alt: "Acceso de la misma unidad, con la puerta abierta y los escalones a la vista.",
    },
  ],
  turismo: [
    {
      src: photos.usoTurismo1,
      alt: "Autobús Beccar Urviabus MT blanco de parabrisas panorámico, completo, de tres cuartos frontal.",
    },
    {
      src: photos.usoTurismo2,
      alt: "La misma unidad blanca, vista lateral completa.",
    },
    {
      src: photos.usoTurismo3,
      alt: "Interior de la misma unidad, con asientos reclinables, cortinas y portaequipaje.",
    },
  ],
};

export const uses: readonly {
  id: string;
  title: string;
  description: string;
  images: readonly { src: string; alt: string }[];
}[] = site.product.useCases.map((useCase) => ({
  ...useCase,
  images: useMedia[useCase.id],
}));

// The five bodyworks the client actually sells, as confirmed text. No photo
// is attached per item; see the note above `photos` for why.
// Gallery of units. Every name is read off an emblem visible in the photo.
// The five bodyworks the client sells are listed separately as text from
// site.product.bodyStyles, so this gallery never doubles as a sales catalogue.
export const bodyworks = [
  {
    name: "Ayco Zafiro GT",
    blurb: "Carrocería Ayco Zafiro GT para transporte urbano, sobre chasis Mercedes-Benz.",
    image: photos.unidadAycoZafiroGt,
    alt: "Autobús urbano blanco con carrocería Ayco Zafiro GT, completo y de tres cuartos frontal.",
  },
  {
    name: "Toreto",
    blurb: "Carrocería Toreto sobre chasis Mercedes-Benz, una de las más vendidas.",
    image: photos.unidadToreto,
    alt: "Autobús Mercedes-Benz blanco con carrocería Toreto, completo y de tres cuartos frontal, en sala de exhibición.",
  },
  {
    name: "Ayco Cosmopolitan",
    blurb: "Unidad blanca de piso alto, con puerta de servicio y escalón retráctil.",
    image: photos.unidadAycoCosmopolitan,
    alt: "Autobús Mercedes-Benz blanco con carrocería Ayco Cosmopolitan, completo y de tres cuartos.",
  },
  {
    name: "Beccar",
    blurb: "Frente Beccar sobre chasis Mercedes-Benz, en configuración de autobús blanco.",
    image: photos.unidadBeccar,
    alt: "Autobús Mercedes-Benz blanco con carrocería Beccar, completo y de tres cuartos frontal.",
  },
  {
    name: "Urviabus MT",
    blurb: "Modelo Urviabus MT de Beccar, parabrisas de dos piezas y ventanas con sección corrediza.",
    image: photos.unidadUrviabusMt,
    alt: "Autobús Mercedes-Benz blanco Beccar Urviabus MT, completo, dentro de una nave industrial.",
  },
  {
    name: "Marcopolo Torino",
    blurb: "Marcopolo Torino en configuración urbana, carrocería larga de piso alto.",
    image: photos.unidadMarcopoloTorino,
    alt: "Autobús Marcopolo Torino morado, completo y de tres cuartos frontal.",
  },
  {
    name: "Ayco Sigma OF",
    blurb: "Variante Ayco Sigma OF en azul, otra carrocería montada sobre chasis Mercedes-Benz.",
    image: photos.unidadAycoSigmaOf,
    alt: "Autobús Mercedes-Benz azul con carrocería Ayco Sigma OF, completo y de tres cuartos frontal.",
  },
] as const;

export const seats = [
  {
    name: "Asientos altos fijos en tela",
    description: "Respaldo alto tapizado en tela, en posición fija sin reclinado.",
    image: photos.interiorTela,
    alt: "Interior de autobús con asientos altos tapizados en tela de patrón geométrico.",
  },
  {
    name: "Asientos altos fijos en plástico",
    description: "Respaldo alto con cubierta de plástico, en posición fija sin reclinado.",
    image: photos.interiorPlastico,
    alt: "Interior de autobús con asientos altos y cubierta de plástico gris y azul.",
  },
  {
    name: "Asientos reclinables",
    description: "Respaldo reclinable, con ajuste de inclinación durante el recorrido.",
    image: photos.interiorReclinable,
    alt: "Interior de autobús con asientos reclinables de tela azul y cinturón de seguridad.",
  },
] as const;

export const faqs = siteFaqs;
