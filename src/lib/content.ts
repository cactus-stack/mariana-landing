import { faqs as siteFaqs, site } from "./site";

// Re-exported for convenience; site.ts remains the single source of truth.
export const phone = site.phoneE164;
export const displayPhone = site.phoneDisplay;
export const email = site.email;
export const socialLinks = site.socials;
export const whatsappBase = `https://wa.me/${site.whatsappNumber}`;

// Photo policy (see docs/ASSETS.md): every unit photo is named after the
// emblem that is legible in that photo, and the gallery only shows units of a
// bodywork the client confirmed she sells (site.product.bodyStyles). Ayco
// Zafiro stays text-only: the only real Zafiro GT units found were marked
// "VENDIDO", and the catalogue render that was used instead has no confirmed
// source. Ayco Sigma OF is a real unit but not a confirmed sales item, so it is
// not shown either. Confirm with the client before adding either one back.
export const photos = {
  hero: "/images/hero-1600.webp",
  heroSmall: "/images/hero-800.webp",
  usoUrbano1: "/images/uso-urbano-1.webp",
  usoUrbano2: "/images/uso-urbano-2.webp",
  usoUrbano3: "/images/uso-urbano-3.webp",
  usoPersonal1: "/images/uso-personal-1.webp",
  usoPersonal3: "/images/uso-personal-3.webp",
  usoEscolar1: "/images/uso-escolar-1.webp",
  usoEscolar2: "/images/uso-escolar-2.webp",
  usoTurismo1: "/images/uso-turismo-1.webp",
  usoTurismo2: "/images/uso-turismo-2.webp",
  usoTurismo3: "/images/uso-turismo-3.webp",
  unidadToreto: "/images/unidad-toreto.webp",
  unidadAycoCosmopolitan: "/images/unidad-ayco-cosmopolitan.webp",
  unidadBeccar: "/images/unidad-beccar.webp",
  unidadUrviabusMt: "/images/unidad-urviabus-mt.webp",
  unidadMarcopoloTorino: "/images/unidad-marcopolo-torino.webp",
  interiorTela: "/images/interior-tela.webp",
  interiorPlastico: "/images/interior-plastico.webp",
  interiorReclinable: "/images/interior-reclinable.webp",
  accesibilidad: "/images/accesibilidad.webp",
  retratoMariana: site.portraitImagePath,
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
      src: photos.usoPersonal3,
      alt: "Interior de la misma unidad, con asientos de plástico duro gris y azul y pasillo central.",
    },
  ],
  escolar: [
    {
      src: photos.usoEscolar1,
      alt: "Autobús Mercedes-Benz blanco con carrocería Toreto, completo, de tres cuartos frontal en sala de exhibición.",
    },
    {
      src: photos.usoEscolar2,
      alt: "Acceso de la misma unidad Toreto, con la puerta abierta, escalones y pasamanos.",
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

// Gallery of real units, one per confirmed bodywork that has a usable photo.
// The full list of bodyworks lives in site.product.bodyStyles and is rendered
// as text, so a bodywork without a photo is still listed.
export const bodyworks = [
  {
    name: "Toreto",
    blurb: "Carrocería Toreto sobre chasis Mercedes-Benz, una de las más vendidas.",
    image: photos.unidadToreto,
    alt: "Autobús Mercedes-Benz blanco con carrocería Toreto, completo y de tres cuartos frontal, en sala de exhibición.",
  },
  {
    name: "Ayco Cosmopolitan",
    blurb: "Carrocería Ayco Cosmopolitan de piso alto, sobre chasis Mercedes-Benz.",
    image: photos.unidadAycoCosmopolitan,
    alt: "Autobús Mercedes-Benz blanco con carrocería Ayco Cosmopolitan, completo y de tres cuartos frontal, frente a la agencia Zapata.",
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
