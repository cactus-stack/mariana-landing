import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter } from "@/components/SiteFooter";
import { photos } from "@/src/lib/content";
import { legal } from "@/src/lib/legal";
import { getSiteMetadata, site } from "@/src/lib/site";

export const metadata: Metadata = getSiteMetadata(legal.path, {
  title: `Aviso legal y de privacidad | ${site.personName}`,
  description: `Alcance del sitio personal de ${site.personName}, asesora de ventas de ${site.brandName}, y aviso de privacidad de los datos que compartes al contactarla.`,
});

const externalLink = { target: "_blank", rel: "noreferrer" } as const;

// Plain-language notice. It separates what Mariana publishes as a salesperson
// from what only the dealership can commit to, and covers every element the
// 2025 privacy law (LFPDPPP art. 15) requires in a full privacy notice.
export default function LegalPage() {
  const employerSite = legal.employerUrl.replace(/^https?:\/\/(www\.)?/, "www.").replace(/\/$/, "");

  return (
    <>
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <Link className="brand-lockup" href="/" aria-label={`${site.personName}, ${site.brandName}. Ir al inicio`}>
            <Image className="brand-logo" src={photos.logo} alt="" width={761} height={240} loading="eager" />
          </Link>
          <Link className="legal-back" href="/">
            <ArrowLeft size={16} weight="bold" aria-hidden="true" /> Volver al inicio
          </Link>
        </div>
      </header>

      <main id="contenido" className="page-main">
        <article className="container legal-page" aria-labelledby="legal-heading">
          <header className="legal-intro">
            <h1 id="legal-heading">Aviso legal y de privacidad</h1>
            <p>
              Qué es este sitio, qué alcance tiene la información que publica y cómo se tratan los datos que compartes
              al contactar a {site.personName}.
            </p>
            <p className="legal-updated">Última actualización: {legal.updated}.</p>
            <nav className="legal-toc" aria-label="Secciones">
              <a href="#aviso-legal">Aviso legal</a>
              <a href={`#${legal.privacyAnchor}`}>Aviso de privacidad</a>
            </nav>
          </header>

          <section id="aviso-legal" className="legal-section" aria-labelledby="aviso-legal-heading">
            <h2 id="aviso-legal-heading">Aviso legal</h2>

            <h3>Qué es este sitio</h3>
            <p>
              marianabarrera.com es el sitio personal y profesional de {site.personName}, asesora de ventas de
              autobuses en {legal.employerLegalName} («la agencia»). Su propósito es presentar su trabajo como asesora y
              facilitar que la contactes para una consulta.
            </p>
            <p>
              No es un sitio oficial de la agencia, de Corporación Zapata, de Mercedes-Benz ni de los fabricantes de
              carrocerías, y ninguna de esas empresas lo administra. El sitio oficial de la agencia es{" "}
              <a href={legal.employerUrl} {...externalLink}>
                {employerSite}
              </a>
              .
            </p>

            <h3>Alcance de la información</h3>
            <ul>
              <li>
                La información sobre carrocerías, asientos, accesibilidad y usos es general y de referencia. No
                constituye una oferta, una cotización ni un compromiso de venta.
              </li>
              <li>
                Precios, disponibilidad, especificaciones técnicas, equipamiento, tiempos de entrega, financiamiento,
                garantías y demás condiciones los determinan el fabricante y la agencia, pueden cambiar sin previo aviso
                y solo son válidos cuando constan por escrito en una cotización formal, pedido o contrato emitido por la
                agencia.
              </li>
              <li>
                La compra, la facturación, la garantía y el servicio posventa se formalizan directamente con la agencia,
                conforme a sus políticas.
              </li>
              <li>
                Las orientaciones que {site.personName} comparte en este sitio, en sus redes sociales o en una
                conversación son comerciales. La elección final de la unidad, y confirmar que cumple los requisitos de
                tu permiso, concesión o normativa de transporte, corresponde a quien compra, con base en las
                especificaciones oficiales de la cotización.
              </li>
            </ul>

            <h3>Pagos</h3>
            <p>
              Todo pago relacionado con la compra de una unidad se hace a la agencia, con los datos que aparecen en su
              documentación formal. {site.personName} no solicita depósitos ni transferencias a cuentas personales. Si
              alguien te pide un pago a nombre de este sitio por otro medio, no lo hagas y confírmalo antes con la
              agencia.
            </p>

            <h3>Fotografías</h3>
            <p>
              Las fotografías muestran unidades reales y se publican como referencia de carrocerías y configuraciones.
              Algunas corresponden a unidades ya vendidas o entregadas, por lo que no representan inventario
              disponible; cuando fue necesario se difuminaron letreros o placas. Colores, equipamiento y acabados pueden
              variar según la configuración que se cotice.
            </p>

            <h3>Marcas</h3>
            <p>
              Mercedes-Benz, Freightliner, Zapata, Ayco, Zafiro, Cosmopolitan, Toreto, Beccar, Urviabus, Marcopolo,
              Torino y las demás marcas, modelos y logotipos que aparecen en el texto o en las fotografías pertenecen a
              sus respectivos titulares. Se mencionan solo para identificar los productos que {site.personName} asesora
              y la agencia en la que trabaja. Su uso no implica patrocinio, respaldo ni una relación con sus titulares
              distinta de la que {site.personName} tiene como asesora de la agencia.
            </p>

            <h3>Enlaces a otros sitios</h3>
            <p>
              Los enlaces a WhatsApp, Facebook, TikTok y al sitio de la agencia llevan a servicios de terceros, que se
              rigen por sus propios términos y avisos de privacidad.
            </p>
          </section>

          <section id={legal.privacyAnchor} className="legal-section" aria-labelledby="privacidad-heading">
            <h2 id="privacidad-heading">Aviso de privacidad</h2>
            <p className="legal-lead">
              Aviso de privacidad integral, conforme a la Ley Federal de Protección de Datos Personales en Posesión de
              los Particulares.
            </p>

            <h3>Responsable</h3>
            <p>
              {legal.controller}, con domicilio en {legal.domicile}, es responsable del tratamiento de los datos
              personales que le compartes por los medios de contacto de este sitio. Para cualquier tema de privacidad
              puedes escribir a <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a>.
            </p>
            <p>
              Cuando tu consulta avanza a una cotización formal, un pedido o una compra, tus datos se integran al
              proceso comercial de {legal.employerLegalName}, que a partir de ese momento los trata como responsable
              conforme a{" "}
              <a href={legal.employerPrivacyUrl} {...externalLink}>
                su propio aviso de privacidad
              </a>
              .
            </p>

            <h3>Datos que se tratan</h3>
            <ul>
              <li>Nombre.</li>
              <li>Teléfono, WhatsApp y correo electrónico.</li>
              <li>Empresa u organización que representas, si la mencionas.</li>
              <li>
                Detalles de tu consulta: tipo de servicio, rutas, número de pasajeros y carrocería o asientos de
                interés.
              </li>
            </ul>
            <p>
              No se solicitan datos personales sensibles. Por favor no envíes por estos medios datos sensibles ni
              información bancaria completa.
            </p>

            <h3>Cómo se obtienen</h3>
            <p>
              Directamente de ti, cuando escribes por WhatsApp, llamas, envías un correo o contactas por redes sociales.
              El formulario de este sitio no envía ni guarda información: solo prepara un mensaje de WhatsApp que tú
              decides si envías.
            </p>
            <p>
              Este sitio no usa cookies de analítica ni de publicidad, ni herramientas de seguimiento. Cloudflare, el
              proveedor que aloja el sitio, puede procesar datos técnicos como la dirección IP para entregarlo y
              protegerlo contra abusos.
            </p>

            <h3>Para qué se usan</h3>
            <p>Finalidades necesarias para atender tu solicitud:</p>
            <ul>
              <li>Responder tu consulta y darle seguimiento.</li>
              <li>Preparar tu cotización y orientarte sobre carrocerías, asientos y configuraciones.</li>
              <li>
                Canalizar tu solicitud a la agencia cuando quieras formalizar una cotización, un pedido, un
                financiamiento o una compra.
              </li>
            </ul>
            <p>Finalidad adicional, que requiere tu consentimiento. Si no te opones, tus datos también se usarán para:</p>
            <ul>
              <li>Enviarte información sobre nuevas unidades, lanzamientos o promociones.</li>
            </ul>
            <p>
              Puedes negarte a esta finalidad desde el primer contacto o en cualquier momento después. Negarte no
              afecta la atención de tu consulta.
            </p>

            <h3>Con quién se comparten</h3>
            <ul>
              <li>
                Con {legal.employerLegalName}, cuando sea necesario para formalizar una cotización, un pedido, un
                financiamiento o una compra, o cuando tú lo pidas. La agencia los trata conforme a su aviso de
                privacidad, que también describe las transferencias que ella realiza, por ejemplo al fabricante y a
                entidades financieras.
              </li>
              <li>Con autoridades competentes, cuando una disposición legal lo exija.</li>
            </ul>
            <p>
              Tus datos no se venden ni se ceden a terceros para fines ajenos a tu consulta. Los mensajes viajan por los
              servicios de WhatsApp, telefonía y correo electrónico que elijas, sujetos a sus propias políticas.
            </p>

            <h3>Cómo limitar el uso de tus datos</h3>
            <p>
              Puedes pedir en cualquier momento que no se te envíe información comercial o que se deje de contactarte,
              por el mismo medio en que escribiste o al correo{" "}
              <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a>.
            </p>

            <h3>Derechos ARCO y revocación del consentimiento</h3>
            <p>
              Tienes derecho a acceder a tus datos, rectificarlos si son inexactos, cancelarlos cuando consideres que no
              se requieren y oponerte a su uso para fines específicos. También puedes revocar el consentimiento que
              hayas dado.
            </p>
            <p>
              Para ejercerlos, escribe a <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a> e incluye:
            </p>
            <ol>
              <li>Tu nombre y un medio para recibir la respuesta.</li>
              <li>Un documento que acredite tu identidad o, en su caso, la identidad y personalidad de tu representante.</li>
              <li>
                La descripción clara de los datos y del derecho que quieres ejercer. Si pides una rectificación, indica
                el cambio y adjunta el documento que lo respalde.
              </li>
              <li>Cualquier otro elemento que ayude a localizar tus datos.</li>
            </ol>
            <p>
              Recibirás respuesta en un plazo máximo de 20 días hábiles y, si procede, se hará efectiva dentro de los 15
              días hábiles siguientes. Estos plazos pueden ampliarse una sola vez por un periodo igual cuando el caso lo
              justifique.
            </p>
            <p>
              Si tus datos ya forman parte de un proceso con la agencia, también puedes ejercer estos derechos ante{" "}
              {legal.employerLegalName} en{" "}
              <a href={`mailto:${legal.employerPrivacyEmail}`}>{legal.employerPrivacyEmail}</a>, conforme a su aviso de
              privacidad.
            </p>
            <p>
              Si consideras que se vulneró tu derecho a la protección de datos personales, puedes acudir a la Secretaría
              Anticorrupción y Buen Gobierno, autoridad en la materia.
            </p>

            <h3>Conservación y seguridad</h3>
            <p>
              Tus datos se conservan solo mientras sean necesarios para atender y dar seguimiento a tu consulta, y se
              protegen con medidas razonables contra pérdida, uso o acceso no autorizado. Puedes pedir su eliminación en
              cualquier momento.
            </p>

            <h3>Cambios a este aviso</h3>
            <p>
              Cualquier cambio a este aviso se publicará en esta misma página, con la fecha de la última actualización.
            </p>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
