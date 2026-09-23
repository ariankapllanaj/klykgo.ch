"use client";

import { useLanguage } from "./LanguageProvider";

const WHATSAPP_NUMBER = "41799007473";

export default function PhaseTwoButton({
  children,
  planName,
  className = "button button-outline"
}: {
  children: React.ReactNode;
  planName: string;
  className?: string;
}) {
  const { language } = useLanguage();

  const message = language === "de"
    ? `Hallo KLYKGO, ich interessiere mich für das ${planName}-Paket und möchte gerne ein Angebot erhalten.`
    : language === "fr"
      ? `Bonjour KLYKGO, je suis intéressé(e) par l'offre ${planName} et je souhaite recevoir une offre.`
      : `Hello KLYKGO, I'm interested in the ${planName} plan and would like to request an offer.`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      className={className}
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${planName} WhatsApp enquiry`}
    >
      {children}
    </a>
  );
}
