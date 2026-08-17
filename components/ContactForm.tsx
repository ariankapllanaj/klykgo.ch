"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "missing">("idle");
  const { t } = useLanguage();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
      setStatus("missing");
      return;
    }

    setStatus("sending");
    const form = event.currentTarget;
    const body = new FormData(form);

    try {
      const response = await fetch(endpoint, { method: "POST", body, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function openPrivacy() {
    window.dispatchEvent(new CustomEvent("klykgo:legal", { detail: "datenschutz" }));
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label><span>{t.form.name}</span><input required name="name" type="text" placeholder={t.form.namePlaceholder} /></label>
        <label><span>{t.form.company}</span><input name="company" type="text" placeholder={t.form.companyPlaceholder} /></label>
        <label><span>{t.form.email}</span><input required name="email" type="email" placeholder={t.form.emailPlaceholder} /></label>
        <label><span>{t.form.phone}</span><input name="phone" type="tel" placeholder={t.form.phonePlaceholder} /></label>
      </div>

      <label>
        <span>{t.form.service}</span>
        <select required name="service" defaultValue="">
          <option value="" disabled>{t.form.servicePlaceholder}</option>
          {t.form.services.map((service) => <option key={service}>{service}</option>)}
        </select>
      </label>

      <label>
        <span>{t.form.message}</span>
        <textarea required name="message" rows={6} placeholder={t.form.messagePlaceholder} />
      </label>

      <label className="privacy-check">
        <input required type="checkbox" name="privacy" value="accepted" />
        <span>
          {t.form.privacyBefore}{" "}
          <button className="inline-legal-link" type="button" onClick={openPrivacy}>{t.form.privacyLink}</button>{" "}
          {t.form.privacyAfter}
        </span>
      </label>

      <div className="form-actions">
        <button className="button button-solid" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.form.sending : t.form.send} <span>↗</span>
        </button>
        <div className="form-status" aria-live="polite">
          {status === "success" && t.form.success}
          {status === "error" && t.form.error}
          {status === "missing" && t.form.missing}
        </div>
      </div>
    </form>
  );
}
