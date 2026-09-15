"use client";

import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

type MobileMenuProps = {
  ctaLabel: string;
  ctaHref: string;
};

export function MobileMenu({ ctaLabel, ctaHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        ref={toggleRef}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={19} weight="bold" /> : <List size={19} weight="bold" />}
        <span>Menú</span>
      </button>
      {open ? (
        <div id="mobile-navigation" className="mobile-nav">
          <nav className="mobile-nav-inner" aria-label="Navegación móvil">
            <a href="#opciones" onClick={closeMenu}>
              Opciones
            </a>
            <a href="#carrocerias" onClick={closeMenu}>
              Carrocerías
            </a>
            <a href="#asientos" onClick={closeMenu}>
              Asientos
            </a>
            <a href="#asesoria" onClick={closeMenu}>
              Asesoría
            </a>
            <a href={ctaHref} target="_blank" rel="noreferrer" onClick={closeMenu}>
              {ctaLabel}
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
