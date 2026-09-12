"use client";

import { Language, useLanguage } from "./LanguageProvider";

const languages: Language[] = ["de", "en", "fr"];

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`language-switcher ${compact ? "is-compact" : ""}`} aria-label={t.language.label}>
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          className={language === item ? "is-active" : ""}
          aria-pressed={language === item}
          onClick={() => setLanguage(item)}
        >
          {t.language[item]}
        </button>
      ))}
    </div>
  );
}
