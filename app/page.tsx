"use client";

import ContactForm from "@/components/ContactForm";
import HeroParallax from "@/components/HeroParallax";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LegalFooter from "@/components/LegalFooter";
import MobileMenu from "@/components/MobileMenu";
import PhaseTwoButton from "@/components/PhaseTwoButton";
import AuthButton from "@/components/AuthButton";
import ScrollTextEffects from "@/components/ScrollTextEffects";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      <ScrollTextEffects />
      <header className="topbar">
        <a href="#home" className="brand" aria-label={t.nav.homeLabel}>
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/klykgo-logo-mark.jpg`} alt="" className="brand-mini-image" aria-hidden="true" />
          <span>KLYKGO</span>
        </a>

        <nav className="desktop-nav" aria-label={t.nav.navigation}>
          <a href="#leistungen">{t.nav.services}</a>
          <a href="#ablauf">{t.nav.process}</a>
          <a href="#abos">{t.nav.subscriptions}</a>
          <a href="#kontakt">{t.nav.contact}</a>
        </nav>

        <div className="nav-actions">
          <LanguageSwitcher compact />
          <AuthButton className="login-link" />
          <a className="button button-outline nav-cta" href="#kontakt">
            {t.nav.startProject} <span>↗</span>
          </a>
        </div>

        <MobileMenu />
      </header>

      <HeroParallax />

      <section className="section intro-section">
        <div className="section-label">{t.intro.label}</div>
        <div className="intro-copy reveal-block">
          <p className="eyebrow">{t.intro.eyebrow}</p>
          <h2>
            {t.intro.title1}
            <br />
            <span>{t.intro.title2}</span>
          </h2>
          <p className="large-copy">{t.intro.copy}</p>
        </div>
        <div className="intro-statements">
          {t.intro.statements.map((statement) => <p key={statement}>{statement}</p>)}
        </div>
      </section>

      <section className="section services-section" id="leistungen">
        <div className="section-heading">
          <div className="section-label">{t.servicesSection.label}</div>
          <div>
            <p className="eyebrow">{t.servicesSection.eyebrow}</p>
            <h2>{t.servicesSection.title}</h2>
          </div>
        </div>

        <div className="services-list">
          {t.services.map((service) => (
            <article className="service-row" key={service.number}>
              <div className="service-number">{service.number}</div>
              <div className="service-title-wrap">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
              <div className="service-tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="service-arrow" aria-hidden="true">↗</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section difference-section">
        <div className="section-heading">
          <div className="section-label">{t.why.label}</div>
          <div>
            <p className="eyebrow">{t.why.eyebrow}</p>
            <h2>{t.why.title}</h2>
          </div>
        </div>

        <div className="difference-grid">
          {t.why.cards.map(([number, title, desc]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section" id="ablauf">
        <div className="section-heading">
          <div className="section-label">{t.process.label}</div>
          <div>
            <p className="eyebrow">{t.process.eyebrow}</p>
            <h2>{t.process.title}</h2>
          </div>
        </div>

        <div className="process-track">
          {t.process.steps.map(([number, title, desc]) => (
            <article key={number}>
              <div className="process-dot" />
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section pricing-section" id="abos">
        <div className="section-heading pricing-heading">
          <div className="section-label">{t.pricing.label}</div>
          <div>
            <p className="eyebrow">{t.pricing.eyebrow}</p>
            <h2>{t.pricing.title}</h2>
            <p className="section-description">{t.pricing.description}</p>
          </div>
        </div>

        <div className="pricing-grid">
          {t.plans.map((plan) => (
            <article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              <div className="price-card-top">
                <p className="plan-name">{plan.name}</p>
                <h3 className="price-on-request">{t.pricing.priceOnRequest}</h3>
                <p>{plan.subtitle}</p>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}><span>+</span> {feature}</li>
                ))}
              </ul>
              <PhaseTwoButton className={plan.featured ? "button button-solid full-button" : "button button-outline full-button"}>
                {plan.name} {t.pricing.choose} <span>↗</span>
              </PhaseTwoButton>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="kontakt">
        <div className="contact-copy">
          <div className="section-label">{t.contact.label}</div>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2>
            {t.contact.title1}
            <br />
            <span>{t.contact.title2}</span>
          </h2>
          <p>{t.contact.copy}</p>

          <div className="contact-direct">
            <div>
              <span>{t.contact.email}</span>
              <a href="mailto:hello@klykgo.ch">hello@klykgo.ch</a>
            </div>
            <div>
              <span>{t.contact.location}</span>
              <p>{t.contact.switzerland}</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>

      <LegalFooter />
    </main>
  );
}
