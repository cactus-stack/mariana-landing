import { faqs as siteFaqs, site } from "./site";

// Re-exported for convenience; site.ts remains the single source of truth.
export const phone = site.phoneE164;
export const displayPhone = site.phoneDisplay;
export const email = site.email;
export const socialLinks = site.socials;
export const whatsappBase = `https://wa.me/${site.whatsappNumber}`;

export const photos = {
  hero: "/images/hero-1600.webp",
  heroSmall: "/images/hero-800.webp",
  usoUrbano: "/images/uso-urbano.webp",
  usoPersonal: "/images/uso-personal.webp",
  usoEscolar: "/images/uso-escolar.webp",
  usoTurismo: "/images/uso-turismo.webp",
  unidadAycoZafiroGt: "/images/unidad-ayco-zafiro-gt.webp",
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
} as const;

// Media paired to each confirmed use case, keyed by site.product.useCases id.
const useMedia: Record<string, { image: string; alt: string }> = {
  urbano: {
    image: photos.usoUrbano,
    alt: "Autobús urbano morado de Corredor 25 con carrocería Toreto, completo y de tres cuartos.",
  },
  personal: {
    image: photos.usoPersonal,
    alt: "Autobús Marcopolo Torino morado, completo, visto de tres cuartos trasero.",
  },
  escolar: {
    image: photos.usoEscolar,
    alt: "Autobús Mercedes-Benz AYCO azul, completo, visto de tres cuartos trasero.",
  },
  turismo: {
    image: photos.usoTurismo,
    alt: "Autobús Beccar Urviabus MT blanco de parabrisas panorámico, completo, vista lateral.",
  },
};

export const uses: readonly {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}[] = site.product.useCases.map((useCase) => ({
  ...useCase,
  ...useMedia[useCase.id],
}));

// Gallery of real units. Every name here is read off an emblem visible in the
// photo, never assumed: labelling a unit as a bodywork we cannot see on it is
// exactly the failure this section exists to avoid. The five bodyworks the
// client actually sells are listed as text from site.product.bodyStyles.
export const bodyworks = [
  {
    name: "Ayco Zafiro GT",
    blurb: "Carrocería Ayco Zafiro GT para transporte urbano, sobre chasis Mercedes-Benz.",
    image: photos.unidadAycoZafiroGt,
    alt: "Autobús urbano blanco con carrocería Ayco Zafiro GT, completo y de tres cuartos frontal.",
  },
  {
    name: "Ayco Cosmopolitan",
    blurb: "Unidad blanca de piso alto, con puerta de servicio y escalones de contraste.",
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
    blurb: "Modelo Urviabus MT de Beccar, con parabrisas panorámico de una sola pieza.",
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
    alt: "Interior de autobús con asientos altos tapizados en tela.",
  },
  {
    name: "Asientos altos fijos en plástico",
    description: "Respaldo alto con cubierta de plástico, en posición fija sin reclinado.",
    image: photos.interiorPlastico,
    alt: "Interior de autobús con asientos altos y cubierta de plástico.",
  },
  {
    name: "Asientos reclinables",
    description: "Respaldo reclinable, con ajuste de inclinación durante el recorrido.",
    image: photos.interiorReclinable,
    alt: "Interior de autobús con asientos reclinables.",
  },
] as const;

export const faqs = siteFaqs;
