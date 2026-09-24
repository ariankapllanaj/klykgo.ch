"use client";

import { usePathname } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MobileMenu from "@/components/MobileMenu";
import { useLanguage } from "@/components/LanguageProvider";

export default function SiteHeader() {
  const { t } = useLanguage();
  const isHome = usePathname() === "/";
  const homeLink = (anchor: string) => `${isHome ? "" : "/"}#${anchor}`;

  return (
    <header className="topbar">
      <a href={homeLink("home")} className="brand" aria-label={t.nav.homeLabel}>
        <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/klykgo-logo-mark.jpg`} alt="" className="brand-mini-image" aria-hidden="true" />
        <span>KLYKGO</span>
      </a>

      <nav className="desktop-nav" aria-label={t.nav.navigation}>
        <a href={homeLink("leistungen")}>{t.nav.services}</a>
        <a href={homeLink("ablauf")}>{t.nav.process}</a>
        <a href={homeLink("abos")}>{t.nav.subscriptions}</a>
        <a href="/partner/" aria-current={isHome ? undefined : "page"}>{t.nav.partner}</a>
        <a href={homeLink("kontakt")}>{t.nav.contact}</a>
      </nav>

      <div className="nav-actions">
        <LanguageSwitcher compact />
        <AuthButton className="login-link" />
        <a className="button button-outline nav-cta" href={homeLink("kontakt")}>
          {t.nav.startProject} <span>↗</span>
        </a>
      </div>

      <MobileMenu />
    </header>
  );
}
