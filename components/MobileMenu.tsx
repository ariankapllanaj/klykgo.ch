"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButton from "./AuthButton";
import { useLanguage } from "./LanguageProvider";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t, language } = useLanguage();

  const menuCopy = {
    de: {
      services: "Leistungen",
      process: "Ablauf",
      subscriptions: "Abos",
      contact: "Kontakt",
      startProject: "Projekt starten"
    },
    en: {
      services: "Services",
      process: "Process",
      subscriptions: "Plans",
      contact: "Contact",
      startProject: "Start a project"
    },
    fr: {
      services: "Services",
      process: "Processus",
      subscriptions: "Abonnements",
      contact: "Contact",
      startProject: "Démarrer un projet"
    }
  } as const;

  const copy = menuCopy[language];
  const links = [
    [copy.services, "#leistungen"],
    [copy.process, "#ablauf"],
    [copy.subscriptions, "#abos"],
    [copy.contact, "#kontakt"]
  ] as const;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        className={`menu-button ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span /><span />
      </button>

      {mounted && open ? createPortal(
        <div className="mobile-menu is-open" role="dialog" aria-modal="true" aria-label={t.nav.navigation}>
          <div className="mobile-menu-top">
            <a href="#home" className="mobile-menu-brand" onClick={closeMenu} aria-label={t.nav.homeLabel}>
              <img src="/klykgo-logo-mark.jpg" alt="" className="brand-mini-image" aria-hidden="true" />
              <span>KLYKGO</span>
            </a>
            <button className="mobile-menu-close" type="button" aria-label={t.nav.closeMenu} onClick={closeMenu}>
              <span /><span />
            </button>
          </div>

          <div className="mobile-menu-inner">
            <div className="mobile-menu-language">
              <p className="eyebrow">{t.language.label}</p>
              <LanguageSwitcher />
            </div>
            <p className="eyebrow mobile-nav-kicker">{t.nav.navigation}</p>
            <nav>
              {links.map(([label, href], index) => (
                <a key={href} href={href} onClick={closeMenu}>
                  <span>0{index + 1}</span>{label}
                </a>
              ))}
            </nav>
            <div className="mobile-menu-actions">
              <AuthButton className="button button-outline mobile-auth-button" onBeforeOpen={closeMenu} />
              <a className="button button-solid mobile-cta" href="#kontakt" onClick={closeMenu}>
                {copy.startProject} <span>↗</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
