"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type LegalPage = "impressum" | "datenschutz" | "agb" | "cookies";

export function openLegalPage(page: LegalPage) {
  window.dispatchEvent(new CustomEvent("klykgo:legal", { detail: page }));
}

export default function LegalFooter() {
  const [active, setActive] = useState<LegalPage | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const openHandler = (event: Event) => {
      const customEvent = event as CustomEvent<LegalPage>;
      if (customEvent.detail) setActive(customEvent.detail);
    };
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    window.addEventListener("klykgo:legal", openHandler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("klykgo:legal", openHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [active]);

  const open = (page: LegalPage) => setActive(page);
  const legalPage = active
    ? active === "impressum" ? t.legal.impressum
      : active === "datenschutz" ? t.legal.privacy
      : active === "agb" ? t.legal.terms
      : t.legal.cookies
    : null;

  return (
    <>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-identity">
            <a href="#home" className="footer-wordmark" aria-label={t.nav.homeLabel}>
              <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/klykgo-logo-mark.jpg`} alt="" className="brand-mini-image footer-mini-image" aria-hidden="true" />
              <span>KLYKGO</span>
            </a>
            <p>{t.footer.description}</p>
            <a className="footer-contact-link" href="mailto:project@klykgo.ch">project@klykgo.ch <span>↗</span></a>
          </div>

          <nav className="footer-column" aria-label={t.footer.navigation}>
            <span>{t.footer.navigation}</span>
            <a href="#leistungen">{t.footer.services}</a>
            <a href="#ablauf">{t.footer.process}</a>
            <a href="#abos">{t.footer.subscriptions}</a>
            <a href="#kontakt">{t.footer.contact}</a>
          </nav>

          <div className="footer-column">
            <span>{t.footer.social}</span>
            <a href="https://www.instagram.com/klykgo.ch/" target="_blank" rel="noreferrer" aria-label="KLYKGO Instagram">Instagram <b>↗</b></a>
          </div>

          <div className="footer-column">
            <span>{t.footer.legal}</span>
            <button type="button" onClick={() => open("impressum")}>{t.footer.imprint}</button>
            <button type="button" onClick={() => open("datenschutz")}>{t.footer.privacy}</button>
            <button type="button" onClick={() => open("agb")}>{t.footer.terms}</button>
            <button type="button" onClick={() => open("cookies")}>{t.footer.cookies}</button>
          </div>
        </div>

        <div className="footer-bottom-pro">
          <span>{t.footer.rights}</span>
          <span className="footer-location">{t.footer.location}</span>
          <span className="site-credit">
            {t.footer.credit}{" "}
            <a href="https://ariankapllanaj.github.io/personal-website/" target="_blank" rel="noreferrer">Arian Kapllanaj ↗</a>
          </span>
        </div>
      </footer>

      {active && legalPage && (
        <div className="legal-backdrop" role="presentation" onMouseDown={() => setActive(null)}>
          <div className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="legal-modal-head">
              <div>
                <p>{legalPage.kicker}</p>
                <h2 id="legal-modal-title">{legalPage.title}</h2>
              </div>
              <button className="legal-close" type="button" aria-label={t.legal.close} onClick={() => setActive(null)}>×</button>
            </div>
            <div className="legal-modal-body">
              {legalPage.sections.map(([heading, text, style], index) => (
                <section key={`${heading}-${index}`} className={style === "note" ? "legal-note" : undefined}>
                  <h4>{heading}</h4>
                  <p>{text}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
