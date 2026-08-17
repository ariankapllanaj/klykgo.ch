"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function PhaseTwoButton({ children, className = "button button-outline" }: { children: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>{children}</button>
      {open && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <div className="phase-modal" role="dialog" aria-modal="true" aria-labelledby="phase-two-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label={t.phase2.close} onClick={() => setOpen(false)}>×</button>
            <p className="eyebrow">{t.phase2.kicker}</p>
            <h3 id="phase-two-title">{t.phase2.title}</h3>
            <p>{t.phase2.copy}</p>
            <a className="button button-solid" href="#kontakt" onClick={() => setOpen(false)}>{t.phase2.button} <span>↗</span></a>
          </div>
        </div>
      )}
    </>
  );
}
