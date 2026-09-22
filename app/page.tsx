import Image from "next/image";
import {
  ArrowUpRight,
  CaretRight,
  ChatCircleText,
  Compass,
  EnvelopeSimple,
  FacebookLogo,
  MapPin,
  Phone,
  Scales,
  TiktokLogo,
  Wheelchair,
} from "@phosphor-icons/react/dist/ssr";
import { FaqAccordion } from "@/components/FaqAccordion";
import { InquiryForm } from "@/components/InquiryForm";
import { MobileMenu } from "@/components/MobileMenu";
import { Reveal } from "@/components/Reveal";
import { UseCaseMedia } from "@/components/UseCaseMedia";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { bodyworks, faqs, photos, seats, uses } from "@/src/lib/content";
import {
  createWhatsAppHref,
  getStructuredData,
  landingContent,
  site,
} from "@/src/lib/site";

const navLinks = [
  { href: "#opciones", label: "Servicios" },
  { href: "#carrocerias", label: "Carrocerías" },
  { href: "#asientos", label: "Asientos" },
  { href: "#mariana-barrera", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
] as const;

// Server Component: the page itself renders no client hooks. Motion and
// stateful interactivity live in isolated "use client" leaves (Reveal,
// MobileMenu, InquiryForm) per the RSC-safety rule.
export default function Home() {
  const structuredData = getStructuredData({ includeFaq: true });
  const whatsappHref = createWhatsAppHref();
  const facebookHref = site.socials.find((social) => social.label === "Facebook")?.href ?? site.socials[0].href;
  const tiktokHref = site.socials.find((social) => social.label === "TikTok")?.href ?? site.socials[1].href;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <a className="brand-lockup" href="#inicio" aria-label={`${site.personName}, ${site.brandName}`}>
            <Image
              className="brand-logo"
              src={photos.logo}
              alt=""
              width={761}
              height={240}
              loading="eager"
            />
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="nav-action" href={whatsappHref} target="_blank" rel="noreferrer">
            {landingContent.hero.primaryCta} <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </a>
          <MobileMenu links={navLinks} ctaLabel={landingContent.hero.primaryCta} ctaHref={whatsappHref} />
        </div>
      </header>

      <main id="contenido" className="page-main">
        <section id="inicio" className="container hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <span className="eyebrow">{landingContent.hero.eyebrow}</span>
            <h1 id="hero-heading">
              <span className="hero-h1-lead">{landingContent.hero.headingLead}</span>{" "}
              {landingContent.hero.headingMain}
            </h1>
            <p className="hero-lead">{landingContent.hero.body}</p>
            <div className="hero-actions">
              <a className="button-primary" href={whatsappHref} target="_blank" rel="noreferrer">
                {landingContent.hero.primaryCta} <WhatsAppIcon size={18} />
              </a>
              <a className="button-secondary" href="#opciones">
                {landingContent.hero.secondaryCta} <CaretRight size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
            <p className="hero-location">
              <MapPin size={16} weight="bold" aria-hidden="true" />
              {landingContent.hero.location}
            </p>
          </div>
          <div className="hero-visual">
            <figure>
              <div className="hero-frame">
                <picture>
                  <source media="(max-width: 820px)" srcSet={photos.heroSmall} />
                  <Image
                    src={photos.hero}
                    alt="Autobús Mercedes-Benz visto de frente, unidad completa en exterior."
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 820px) 100vw, 58vw"
                  />
                </picture>
              </div>
              <figcaption className="hero-agent">
                <span className="hero-agent-photo">
                  <Image src={photos.retratoMariana} alt="" width={112} height={112} loading="eager" />
                </span>
                <span className="hero-agent-copy">
                  <strong>{site.personName}</strong>
                  <span>Asesora de ventas · +15 años</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="container proof-bar" aria-label="Datos de la asesoría">
          <div className="proof-item">
            <strong>+15 años de experiencia</strong>
            <span>Acompañando compras de autobuses para rutas, empresas, escuelas y turismo.</span>
          </div>
          <div className="proof-item">
            <strong>{site.product.bodyStyles.length} carrocerías {site.product.brand}</strong>
            <span>Ayco, Toreto, Beccar, Urviabus y Marcopolo para comparar contigo.</span>
          </div>
          <div className="proof-item">
            <strong>Trato directo</strong>
            <span>Hablas directamente conmigo por WhatsApp, teléfono o correo.</span>
          </div>
        </div>

        <section id="opciones" className="section uses-section" aria-labelledby="uses-heading">
          <div className="container">
            <Reveal className="section-heading">
              <h2 id="uses-heading">{landingContent.services.heading}</h2>
              <p>{landingContent.services.body}</p>
            </Reveal>
            <div className="uses-grid">
              {uses.map((use, index) => (
                <Reveal key={use.id} className="use-card" delay={index * 0.05}>
                  <UseCaseMedia images={use.images} label={use.title} />
                  <div className="use-content">
                    <h3>{use.title}</h3>
                    <p>{use.description}</p>
                    <a
                      className="text-link"
                      href={createWhatsAppHref(`Hola Mariana, me interesa una opción para ${use.title.toLowerCase()}.`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Consultar {use.title.toLowerCase()} <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="mariana-barrera" className="section profile-section" aria-labelledby="profile-heading">
          <div className="container profile-statement">
            <Reveal>
              <div className="profile-intro">
                <div className="profile-portrait">
                  <Image
                    src={photos.retratoMariana}
                    alt="Mariana Barrera, asesora de ventas de autobuses en Zapata Camiones."
                    fill
                    sizes="(max-width: 620px) 160px, 220px"
                  />
                </div>
                <p className="profile-tenure">
                  <strong>+15</strong>
                  <span>años vendiendo autobuses</span>
                </p>
              </div>
              <span className="profile-signature-label">{landingContent.profile.role}</span>
              <h2 id="profile-heading">{landingContent.profile.heading}</h2>
              <p>{landingContent.profile.body}</p>
              <div className="signature-caption">
                <strong>{site.personName}</strong>
                <span>Autobuses Mercedes-Benz, {site.brandName}</span>
              </div>
              <div className="coverage-line" aria-label="Zonas de atención">
                <span>CDMX</span>
                <span>Estado de México</span>
                <span>Área metropolitana</span>
                <span>Consultas de toda la República Mexicana</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="carrocerias" className="section bodyworks-section" aria-labelledby="bodyworks-heading">
          <div className="container">
            <Reveal className="section-heading">
              <h2 id="bodyworks-heading">{landingContent.bodies.heading}</h2>
              <p>{landingContent.bodies.body}</p>
            </Reveal>
            <ul className="bodyworks-pills" aria-label="Carrocerías Mercedes-Benz disponibles">
              {site.product.bodyStyles.map((bodyStyle) => (
                <li key={bodyStyle}>{bodyStyle}</li>
              ))}
            </ul>
            <div className="bodywork-scroller">
              <div className="bodywork-track" tabIndex={0} role="region" aria-label="Galería de autobuses">
                {bodyworks.map((bodywork, index) => (
                  <Reveal key={bodywork.name} className="bodywork-card" delay={index * 0.04}>
                    <div className="bodywork-media">
                      <Image
                        src={bodywork.image}
                        alt={bodywork.alt}
                        fill
                        sizes="(max-width: 820px) 78vw, 330px"
                      />
                    </div>
                    <div className="bodywork-copy">
                      <h3>{bodywork.name}</h3>
                      <p>{bodywork.blurb}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section access-section" aria-labelledby="access-heading">
          <div className="container access-layout">
            <Reveal className="access-frame">
              <Image
                src={photos.accesibilidad}
                alt={landingContent.accessibility.alt}
                fill
                sizes="(max-width: 1460px) 100vw, 1400px"
              />
            </Reveal>
            <Reveal className="access-panel" delay={0.12}>
              <span className="access-badge" aria-hidden="true">
                <Wheelchair size={22} weight="bold" />
              </span>
              <h2 id="access-heading">{landingContent.accessibility.heading}</h2>
              <p>{landingContent.accessibility.body}</p>
              <a
                className="text-link"
                href={createWhatsAppHref(
                  "Hola Mariana, me interesa una opción con espacio para silla de ruedas.",
                )}
                target="_blank"
                rel="noreferrer"
              >
                Consultar accesibilidad <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>

        <section id="asientos" className="section seating-section" aria-labelledby="seating-heading">
          <div className="container">
            <Reveal className="section-heading">
              <h2 id="seating-heading">{landingContent.seats.heading}</h2>
              <p>{landingContent.seats.body}</p>
            </Reveal>
            <div className="seats-grid">
              {seats.map((seat, index) => (
                <Reveal key={seat.name} className="seat-card" delay={index * 0.05}>
                  <Image src={seat.image} alt={seat.alt} fill sizes="(max-width: 820px) 100vw, 45vw" />
                  <div className="seat-scrim">
                    <strong>{seat.name}</strong>
                    <span>{seat.description}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="asesoria" className="section process-section" aria-labelledby="process-heading">
          <div className="container">
            <Reveal className="section-heading compact">
              <h2 id="process-heading">Así es cotizar conmigo</h2>
              <p>Empezamos por lo que necesitas mover y cómo opera tu servicio.</p>
            </Reveal>
            <div className="process-grid">
              <Reveal className="process-item" delay={0.03}>
                <span className="process-icon" aria-hidden="true">
                  <ChatCircleText size={20} weight="bold" />
                </span>
                <h3>Cuéntame tu operación</h3>
                <p>Qué servicio vas a cubrir, cuántos pasajeros mueves y en qué rutas.</p>
              </Reveal>
              <Reveal className="process-item" delay={0.08}>
                <span className="process-icon" aria-hidden="true">
                  <Scales size={20} weight="bold" />
                </span>
                <h3>Comparamos opciones</h3>
                <p>Revisamos juntos las carrocerías y los asientos que se ajustan a tu operación.</p>
              </Reveal>
              <Reveal className="process-item" delay={0.13}>
                <span className="process-icon" aria-hidden="true">
                  <Compass size={20} weight="bold" />
                </span>
                <h3>Recibes tu cotización</h3>
                <p>Con la configuración elegida te preparo la cotización y resolvemos tus dudas.</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="preguntas" className="section faq-section" aria-labelledby="faq-heading">
          <div className="container faq-container">
            <Reveal className="section-heading">
              <h2 id="faq-heading">Preguntas frecuentes</h2>
              <p>Respuestas breves para comenzar tu consulta con la información esencial.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <FaqAccordion items={faqs} />
            </Reveal>
          </div>
        </section>

        <section id="contacto" className="section contact-section" aria-labelledby="contact-heading">
          <div className="container contact-panel">
            <Reveal className="contact-copy">
              <h2 id="contact-heading">{landingContent.contact.heading}</h2>
              <p>{landingContent.contact.body}</p>
              <div className="contact-details">
                <a className="contact-detail" href={site.phoneHref}>
                  <Phone size={18} weight="bold" aria-hidden="true" />
                  <span>{landingContent.contact.phoneLabel}</span>
                </a>
                <a className="contact-detail" href={`mailto:${site.email}`}>
                  <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
                  <span>{landingContent.contact.emailLabel}</span>
                </a>
                <span className="contact-detail">
                  <MapPin size={18} weight="bold" aria-hidden="true" />
                  <span>{landingContent.location.office}</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <InquiryForm />
            </Reveal>
          </div>
        </section>
        <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Hablar con Mariana por WhatsApp">
          <WhatsAppIcon size={28} />
        </a>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-copy">
            <strong>{site.siteName}</strong>
            <span>Asesoría comercial para autobuses Mercedes-Benz.</span>
          </div>
          <nav className="footer-links" aria-label="Enlaces de contacto y redes sociales">
            <a href="#mariana-barrera">Conoce a Mariana</a>
            <a className="footer-social" href={facebookHref} target="_blank" rel="noreferrer">
              <FacebookLogo size={26} weight="fill" aria-hidden="true" /> Facebook
            </a>
            <a className="footer-social" href={tiktokHref} target="_blank" rel="noreferrer">
              <TiktokLogo size={26} weight="fill" aria-hidden="true" /> TikTok
            </a>
            <a href={site.phoneHref}>Llamar</a>
            <a href={`mailto:${site.email}`}>Correo</a>
          </nav>
        </div>
        <p className="container footer-legal">
          © {new Date().getFullYear()} {site.personName}. Sitio personal de una asesora de ventas de {site.brandName}.
          Mercedes-Benz y las marcas de carrocerías mencionadas pertenecen a sus respectivos titulares.
        </p>
      </footer>
    </>
  );
}
