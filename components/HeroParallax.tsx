"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "./LanguageProvider";

const floatClasses = ["float-a", "float-b", "float-c", "float-d", "float-e", "float-f", "float-g"];

export default function HeroParallax() {
  const root = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(".floating-icon", {
        y: "+=8",
        duration: 2.7,
        ease: "sine.inOut",
        stagger: { each: 0.18, from: "random" },
        yoyo: true,
        repeat: -1
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-shell",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.72
          }
        });

        timeline
          .to(".hero-copy", { y: -110, scale: 0.93, opacity: 0.18, ease: "none" }, 0)
          .to(".hero-kicker", { letterSpacing: "0.42em", opacity: 0.15, ease: "none" }, 0)
          .to(".float-a", { x: -240, y: -210, rotate: -18, scale: 0.82, ease: "none" }, 0)
          .to(".float-b", { x: 190, y: -250, rotate: 16, scale: 0.78, ease: "none" }, 0)
          .to(".float-c", { x: 250, y: 180, rotate: 12, scale: 0.86, ease: "none" }, 0)
          .to(".float-d", { x: -230, y: 190, rotate: -14, scale: 0.82, ease: "none" }, 0)
          .to(".float-e", { x: 150, y: 250, rotate: 18, scale: 0.75, ease: "none" }, 0)
          .to(".float-f", { x: -160, y: 250, rotate: -10, scale: 0.72, ease: "none" }, 0)
          .to(".float-g", { x: 110, y: -210, rotate: 14, scale: 0.75, ease: "none" }, 0)
          .to(".floating-object", { opacity: 0, ease: "none" }, 0.52)
          .fromTo(".hero-end-mark", { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, ease: "none" }, 0.56)
          .fromTo(".hero-end-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "center", ease: "none" }, 0.66);
      });

      mm.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(".floating-object", {
          scrollTrigger: { trigger: ".hero-shell", start: "top top", end: "bottom bottom", scrub: 0.72 },
          y: (index) => (index % 2 ? -110 : 120),
          x: (index) => (index % 2 ? 70 : -70),
          opacity: 0,
          scale: 0.78,
          rotate: (index) => (index % 2 ? 10 : -10),
          ease: "none"
        });

        gsap.to(".hero-copy", {
          scrollTrigger: { trigger: ".hero-shell", start: "top top", end: "bottom bottom", scrub: 0.72 },
          y: -70,
          opacity: 0.12,
          scale: 0.94,
          ease: "none"
        });

        gsap.fromTo(".hero-end-mark", { opacity: 0, y: 24 }, {
          opacity: 1,
          y: 0,
          scrollTrigger: { trigger: ".hero-shell", start: "48% top", end: "bottom bottom", scrub: 0.72 }
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-shell" ref={root} id="home">
      <section className="hero-stage">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

        {t.hero.floating.map(([emoji, label], index) => (
          <div key={`${label}-${index}`} className={`floating-object ${floatClasses[index]}`} aria-hidden="true">
            <div className="floating-icon">{emoji}</div>
            <span>{label}</span>
          </div>
        ))}

        <div className="hero-copy">
          <p className="eyebrow hero-kicker">{t.hero.kicker}</p>
          <h1>
            {t.hero.line1}
            <br />
            {t.hero.line2}
            <br />
            <em>{t.hero.accent}</em>
          </h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-actions">
            <a href="#kontakt" className="button button-solid">
              {t.hero.start} <span>↗</span>
            </a>
            <a href="#leistungen" className="text-link">
              {t.hero.explore} <span>↓</span>
            </a>
          </div>
        </div>

        <div className="hero-end-mark" aria-hidden="true">
          <div className="brand-symbol"><i /><i /><i /></div>
          <div className="hero-end-line" />
          <p>{t.hero.end}</p>
        </div>
      </section>
    </div>
  );
}
