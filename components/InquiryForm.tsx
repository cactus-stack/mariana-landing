"use client";

import { ArrowUpRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import { createWhatsAppHref, site } from "@/src/lib/site";

type FormValues = {
  name: string;
  useCase: string;
  details: string;
};

const initialValues: FormValues = {
  name: "",
  useCase: "",
  details: "",
};

export function InquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [error, setError] = useState("");
  const [whatsappHref, setWhatsappHref] = useState("");

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (error) setError("");
    if (whatsappHref) setWhatsappHref("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = values.name.trim();
    const details = values.details.trim();

    if (!name || !values.useCase || !details) {
      setError("Completa tu nombre, el tipo de transporte y los detalles de tu consulta.");
      return;
    }

    const useTitle = site.product.useCases.find((use) => use.id === values.useCase)?.title;
    const message = [
      `Hola Mariana, soy ${name}.`,
      `Me interesa una opción para ${useTitle?.toLowerCase() ?? "mi operación de transporte"}.`,
      `Esta es mi consulta: ${details}`,
    ].join("\n");

    setWhatsappHref(createWhatsAppHref(message));
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Tu nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Escribe tu nombre"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="use-case">Tipo de transporte</label>
          <select
            id="use-case"
            name="use-case"
            value={values.useCase}
            onChange={(event) => updateField("useCase", event.target.value)}
            required
          >
            <option value="">Selecciona una opción</option>
            {site.product.useCases.map((use) => (
              <option key={use.id} value={use.id}>
                {use.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="details">Cuéntame qué necesitas</label>
        <textarea
          id="details"
          name="details"
          placeholder="Describe brevemente tu proyecto o la duda que quieres revisar"
          value={values.details}
          onChange={(event) => updateField("details", event.target.value)}
          required
        />
      </div>
      <p className="form-helper">
        Prepararemos un mensaje para WhatsApp. Tú decides cuándo enviarlo.
      </p>
      {error ? (
        <p className="form-error" role="alert">
          <WarningCircle size={16} weight="bold" aria-hidden="true" />
          {error}
        </p>
      ) : null}
      {whatsappHref ? (
        <div className="form-success" role="status">
          <CheckCircle size={22} weight="fill" color="var(--accent-strong)" aria-hidden="true" />
          <strong>Tu consulta está lista para WhatsApp.</strong>
          <span>Revisa el mensaje y envíalo cuando quieras.</span>
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            Abrir WhatsApp <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
        </div>
      ) : (
        <button type="submit" className="button-primary form-submit">
          Preparar mi consulta <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
