"use client";

import Link from "next/link";
import LegalFooter from "@/components/LegalFooter";
import SiteHeader from "@/components/SiteHeader";
import { useLanguage } from "@/components/LanguageProvider";

export default function PartnerPage() {
  const { t } = useLanguage();

  return (
    <main className="partner-page">
      <SiteHeader />

      <section className="partner-page-hero" aria-labelledby="partner-page-title">
        <div className="partner-page-intro">
          <p className="section-label">{t.partner.label}</p>
          <p className="eyebrow">{t.partner.eyebrow}</p>
          <h1 id="partner-page-title">{t.partner.pageTitle}</h1>
          <p className="partner-page-lead">{t.partner.pageLead}</p>
          <Link className="partner-back-link" href="/">← {t.partner.back}</Link>
        </div>
        <div className="partner-page-logo partner-logo-card">
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/it-service-manai-logo.webp`} alt="IT Service Manai — Infrastructure & Logistics" />
        </div>
      </section>

      <section className="partner-page-detail">
        <p className="section-label">{t.partner.scopeLabel}</p>
        <div>
          <h2>{t.partner.scopeTitle}</h2>
          <p>{t.partner.scopeCopy}</p>
        </div>
      </section>

      <section className="partner-page-contact">
        <p className="section-label">KLYKGO / IT SERVICE MANAI</p>
        <div>
          <h2>{t.partner.contactTitle}</h2>
          <p>{t.partner.contactCopy}</p>
          <Link className="button button-solid" href="/#kontakt">{t.partner.contactAction} <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}
