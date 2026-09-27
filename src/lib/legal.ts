import { site } from "./site";

/**
 * Facts the legal notice and the privacy notice depend on, kept in one place
 * so the short notice by the form and the full page never drift apart.
 *
 * `domicile` is only the locality the client has confirmed. The privacy law
 * (LFPDPPP 2025, art. 15-I) asks for the controller's domicile, so replace it
 * with a full address as soon as Mariana confirms which one to publish.
 */
export const legal = {
  path: "/aviso-legal/",
  privacyAnchor: "privacidad",
  updated: "27 de septiembre de 2026",
  controller: site.personName,
  domicile: `${site.office.locality}, ${site.office.region}`,
  contactEmail: site.email,
  employerLegalName: "Zapata Camiones, S.A. de C.V.",
  employerUrl: site.employerUrl,
  employerPrivacyUrl: "https://www.zapata.com.mx/aviso-de-privacidad/buses",
  employerPrivacyEmail: "datospersonales@zapata.com.mx",
} as const;

export const privacyHref = `${legal.path}#${legal.privacyAnchor}`;
