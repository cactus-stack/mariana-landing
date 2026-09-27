import Link from "next/link";
import { FacebookLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import { legal, privacyHref } from "@/src/lib/legal";
import { site } from "@/src/lib/site";

// Shared by the landing and the legal page. The profile link is root-relative
// so it still lands on the landing's profile section from the legal page.
export function SiteFooter() {
  const facebookHref = site.socials.find((social) => social.label === "Facebook")?.href ?? site.socials[0].href;
  const tiktokHref = site.socials.find((social) => social.label === "TikTok")?.href ?? site.socials[1].href;

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <strong>
            {site.personName} · {site.brandName}
          </strong>
          <span>Asesoría comercial para autobuses Mercedes-Benz.</span>
        </div>
        <nav className="footer-links" aria-label="Enlaces de contacto y redes sociales">
          <Link href="/#mariana-barrera">Conoce a Mariana</Link>
          <a className="footer-social" href={facebookHref} target="_blank" rel="noreferrer">
            <FacebookLogo size={20} weight="fill" aria-hidden="true" /> Facebook
          </a>
          <a className="footer-social" href={tiktokHref} target="_blank" rel="noreferrer">
            <TiktokLogo size={20} weight="fill" aria-hidden="true" /> TikTok
          </a>
          <a href={site.phoneHref}>Llamar</a>
          <a href={`mailto:${site.email}`}>Correo</a>
        </nav>
      </div>
      <div className="container footer-legal">
        <p>
          © {new Date().getFullYear()} {site.personName}. Sitio personal de {site.personName}, asesora de ventas
          de {site.brandName}. No es un sitio oficial de {site.brandName}, de Mercedes-Benz ni de los fabricantes
          de carrocerías, y ninguna de esas empresas lo administra.
        </p>
        <p>
          La información y las fotografías son de referencia y no constituyen una oferta. Precios, disponibilidad,
          especificaciones, financiamiento y condiciones de compra solo son válidos en la cotización formal que
          emite la agencia. Mercedes-Benz y las marcas de carrocerías mencionadas pertenecen a sus respectivos
          titulares.
        </p>
        <nav className="footer-legal-links" aria-label="Información legal">
          <Link href={legal.path}>Aviso legal</Link>
          <Link href={privacyHref}>Aviso de privacidad</Link>
        </nav>
      </div>
    </footer>
  );
}
