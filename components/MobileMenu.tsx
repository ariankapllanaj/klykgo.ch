"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButton from "./AuthButton";
import { useLanguage } from "./LanguageProvider";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  const links = [
    [t.nav.services, "#leistungen"],
    [t.nav.process, "#ablauf"],
    [t.nav.subscriptions, "#abos"],
    [t.nav.contact, "#kontakt"]
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
              <span className="brand-mini-symbol" aria-hidden="true"><i /><i /><i /></span>
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
                {t.nav.startProject} <span>↗</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
