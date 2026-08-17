"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-driven text reveal for the content below the hero.
 * Text softly fades/slides in as it enters the viewport and fades/slides
 * away again as it approaches the top of the viewport.
 */
export default function ScrollTextEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const textTargets = gsap.utils.toArray<HTMLElement>(
        [
          ".section > .section-label",
          ".section-heading .section-label",
          ".section-heading .eyebrow",
          ".section-heading h2",
          ".section-heading .section-description",
          ".intro-copy .eyebrow",
          ".intro-copy h2",
          ".intro-copy .large-copy",
          ".intro-statements p",
          ".service-number",
          ".service-title-wrap h3",
          ".service-title-wrap p",
          ".service-tags",
          ".difference-grid article > span",
          ".difference-grid article h3",
          ".difference-grid article p",
          ".process-track article > span",
          ".process-track article h3",
          ".process-track article p",
          ".price-card .plan-name",
          ".price-card h3",
          ".price-card-top > p:last-child",
          ".price-card li",
          ".contact-copy .eyebrow",
          ".contact-copy h2",
          ".contact-copy > p:not(.eyebrow)",
          ".contact-direct",
          ".contact-form"
        ].join(",")
      );

      textTargets.forEach((element, index) => {
        // Small alternating horizontal drift keeps repeated rows from feeling mechanical.
        const xFrom = index % 2 === 0 ? -10 : 10;

        gsap.set(element, {
          opacity: 0,
          y: 34,
          x: xFrom,
          filter: "blur(7px)"
        });

        ScrollTrigger.create({
          trigger: element,
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              x: 0,
              filter: "blur(0px)",
              duration: 0.75,
              ease: "power3.out",
              overwrite: "auto"
            });
          },
          onLeave: () => {
            gsap.to(element, {
              opacity: 0,
              y: -28,
              x: 0,
              filter: "blur(5px)",
              duration: 0.45,
              ease: "power2.in",
              overwrite: "auto"
            });
          },
          onEnterBack: () => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              x: 0,
              filter: "blur(0px)",
              duration: 0.55,
              ease: "power3.out",
              overwrite: "auto"
            });
          },
          onLeaveBack: () => {
            gsap.to(element, {
              opacity: 0,
              y: 28,
              x: xFrom,
              filter: "blur(5px)",
              duration: 0.4,
              ease: "power2.in",
              overwrite: "auto"
            });
          }
        });
      });

      // The service rows and cards stay structurally visible while their content reveals.
      // Give their arrows/buttons a subtle delayed entrance so the text remains the focus.
      gsap.utils.toArray<HTMLElement>(
        ".service-arrow, .price-card .full-button, .process-dot"
      ).forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    // Refresh once layout/fonts have settled so trigger positions are exact.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
