"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "de" | "en" | "fr";

const de = {
  language: { label: "Sprache", de: "DE", en: "EN", fr: "FR" },
  nav: {
    services: "Leistungen",
    process: "Ablauf",
    subscriptions: "Abos",
    contact: "Kontakt",
    login: "Login",
    startProject: "Projekt starten",
    navigation: "Navigation",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schliessen",
    homeLabel: "KLYKGO Startseite"
  },
  hero: {
    kicker: "KLYKGO / SWISS MARKETING AGENCY",
    line1: "Wir machen",
    line2: "Marken",
    accent: "sichtbar.",
    subtitle: "Marketing, Branding, Webdesign & Development, Werbetechnik und Content als ein starker Auftritt aus einer Hand.",
    start: "Projekt starten",
    explore: "Leistungen ansehen",
    end: "STRATEGIE · KREATION · UMSETZUNG",
    floating: [
      ["📈", "Marketing"], ["✦", "Branding"], ["</>", "Development"], ["🚘", "Werbetechnik"],
      ["🎥", "Content"], ["📣", "Kampagnen"], ["📷", "Foto"]
    ]
  },
  intro: {
    label: "01 / KLYKGO",
    eyebrow: "Alles für Ihre Marke.",
    title1: "Eine Marke.",
    title2: "Ein Partner.",
    copy: "Wir verbinden Strategie, Gestaltung, Technologie, Werbung und Content zu einem Auftritt, der digital und im echten Leben funktioniert.",
    statements: ["Digital.", "Physisch.", "Überall."]
  },
  servicesSection: {
    label: "02 / LEISTUNGEN",
    eyebrow: "Fünf Bereiche. Ein Auftritt.",
    title: "Was wir bewegen."
  },
  services: [
    {
      number: "01", title: "Marketing",
      desc: "Strategie und Kampagnen, die Reichweite nicht nur erzeugen, sondern in Aufmerksamkeit und Anfragen verwandeln.",
      tags: ["Social Media Marketing", "Google & Meta Ads", "Strategie & Kampagnen", "SEO", "Social Media Betreuung"]
    },
    {
      number: "02", title: "Branding",
      desc: "Markenidentitäten mit klarer Haltung. Vom ersten Logo bis zum konsistenten Auftritt auf jedem Touchpoint.",
      tags: ["Logo & Corporate Identity", "Rebranding", "Grafikdesign", "Flyer & Broschüren", "Geschäftsdrucksachen"]
    },
    {
      number: "03", title: "Webdesign & Development",
      desc: "Von schnellen Landingpages bis zu individuellen Web-Apps: durchdacht gestaltet, sauber entwickelt und responsive umgesetzt.",
      tags: ["Websites & Landingpages", "Individuelle Webentwicklung", "Web Apps", "Online-Shops", "APIs & Integrationen", "Website-Pflege"]
    },
    {
      number: "04", title: "Werbetechnik",
      desc: "Sichtbarkeit im echten Raum. Auf Fahrzeugen, Fassaden, Schaufenstern und überall dort, wo Marken präsent sein sollen.",
      tags: ["Fahrzeugbeschriftungen", "Schaufenster & Fassaden", "Beschilderungen", "Leuchtreklamen", "Folierungen", "Banner & Roll-ups"]
    },
    {
      number: "05", title: "Content",
      desc: "Foto, Video und Social Content, der zur Marke passt und Aufmerksamkeit in den richtigen Formaten gewinnt.",
      tags: ["Foto & Video", "Social Media Content", "Reels & Werbevideos", "Produktfotografie", "Content Creation"]
    }
  ],
  why: {
    label: "03 / WARUM KLYKGO",
    eyebrow: "Nicht fünf Dienstleister.",
    title: "Ein Team, das zusammendenkt.",
    cards: [
      ["01", "Strategisch.", "Wir starten nicht beim Design, sondern beim Ziel. Jede Massnahme bekommt einen klaren Grund."],
      ["02", "Kreativ.", "Ein starker Auftritt muss auffallen und trotzdem zur Marke passen, online, auf Papier und im Raum."],
      ["03", "Umsetzungsstark.", "Vom Konzept bis zum fertigen Webprodukt, Content oder Werbemittel bleibt alles in einem klaren Prozess."]
    ]
  },
  process: {
    label: "04 / ABLAUF",
    eyebrow: "Von der Idee bis zur Wirkung.",
    title: "Ein klarer Prozess.",
    steps: [
      ["01", "Verstehen", "Ziele, Marke, Angebot und Zielgruppe kennenlernen."],
      ["02", "Entwickeln", "Strategie, Idee und visuelle Richtung definieren."],
      ["03", "Umsetzen", "Design, Entwicklung, Kampagnen oder Produktion realisieren."],
      ["04", "Wachsen", "Ergebnisse beobachten, optimieren und gezielt weiterentwickeln."]
    ]
  },
  pricing: {
    label: "05 / ABOS",
    eyebrow: "Kontinuierliche Betreuung.",
    title: "Wählen Sie Ihr Tempo.",
    description: "Die Preise und finalen Leistungsumfänge werden vor dem Launch ergänzt. Registrierung und Bezahlung folgen in Phase 2.",
    recommended: "EMPFOHLEN",
    perMonth: "/ Monat",
    choose: "wählen"
  },
  plans: [
    {
      name: "Starter", subtitle: "Der perfekte Einstieg für kleine Unternehmen und neue Marken.",
      features: ["Basis Marketing & Beratung", "Social Media Unterstützung", "Grafik- & Content-Erstellung", "Kleine Design-Anpassungen", "Regelmässige Betreuung", "Support durch KLYKGO"]
    },
    {
      name: "Growth", subtitle: "Für Unternehmen, die sichtbar wachsen möchten.", featured: true,
      features: ["Erweiterte Marketing-Betreuung", "Social Media Management", "Content & Grafikdesign", "Kampagnen-Unterstützung", "SEO & Online-Sichtbarkeit", "Regelmässige Optimierung", "Priorisierter Support"]
    },
    {
      name: "Pro", subtitle: "Die umfassende Lösung für ambitionierte Marken.",
      features: ["Umfassende Marketing-Betreuung", "Individuelle Marketingstrategie", "Social Media & Content", "Kampagnen & Performance Marketing", "Branding & Grafikdesign", "Web-Support & digitale Beratung", "Performance-Analyse", "Persönliche Betreuung"]
    }
  ],
  contact: {
    label: "06 / KONTAKT",
    eyebrow: "Bereit für den nächsten Schritt?",
    title1: "Machen wir etwas,",
    title2: "das auffällt.",
    copy: "Erzählen Sie uns, was Sie vorhaben. Wir melden uns mit einer klaren nächsten Empfehlung für Ihr Projekt.",
    email: "E-Mail",
    location: "Standort",
    switzerland: "Schweiz"
  },
  form: {
    name: "Name *", namePlaceholder: "Ihr Name",
    company: "Unternehmen", companyPlaceholder: "Firmenname",
    email: "E-Mail *", emailPlaceholder: "name@firma.ch",
    phone: "Telefon", phonePlaceholder: "+41 ...",
    service: "Wobei können wir helfen? *", servicePlaceholder: "Service auswählen",
    services: ["Marketing", "Branding", "Webdesign & Development", "Werbetechnik", "Content", "Mehrere Bereiche"],
    message: "Projekt / Nachricht *", messagePlaceholder: "Erzählen Sie uns kurz von Ihrem Projekt...",
    privacyBefore: "Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu und habe die",
    privacyLink: "Datenschutzerklärung",
    privacyAfter: "gelesen.",
    send: "Anfrage senden", sending: "Wird gesendet...",
    success: "Vielen Dank. Ihre Anfrage wurde gesendet.",
    error: "Das hat nicht funktioniert. Bitte versuchen Sie es erneut.",
    missing: "Formspree-ID fehlt noch. Siehe .env.example im Projekt."
  },
  phase2: {
    kicker: "Phase 02",
    title: "Kundenportal kommt im Backend-Ausbau.",
    copy: "Registrierung, Login, Abonnements, Stripe-Zahlungen und das Kunden-Dashboard werden in Phase 2 aktiviert.",
    button: "Vorerst anfragen",
    close: "Schliessen"
  },
  footer: {
    description: "Marketing, Branding, Webdesign & Development, Werbetechnik und Content aus einer Hand.",
    navigation: "Navigation", social: "Social", legal: "Rechtliches",
    services: "Leistungen", process: "Ablauf", subscriptions: "Abos", contact: "Kontakt",
    imprint: "Impressum", privacy: "Datenschutz", terms: "AGB", cookies: "Cookies",
    rights: "© 2026 KLYKGO. Alle Rechte vorbehalten.",
    location: "Schweiz",
    credit: "Developed by"
  },
  legal: {
    close: "Fenster schliessen",
    impressum: {
      title: "Impressum", kicker: "Rechtliche Angaben",
      sections: [
        ["Anbieter", "KLYKGO Marketing Agency\n[Rechtlicher Firmenname ergänzen]\n[Strasse und Hausnummer]\n[PLZ Ort], Schweiz"],
        ["Kontakt", "E-Mail: hello@klykgo.ch\nTelefon: [Telefonnummer ergänzen]"],
        ["Unternehmensangaben", "UID / Handelsregister: [falls vorhanden ergänzen]\nMWST-Nr.: [falls vorhanden ergänzen]\nVertretungsberechtigte Person: [Name ergänzen]"],
        ["Vor dem Launch", "Die Platzhalter in diesem Impressum müssen mit den definitiven Unternehmensangaben von KLYKGO ersetzt werden.", "note"]
      ]
    },
    privacy: {
      title: "Datenschutz", kicker: "Datenschutzerklärung",
      sections: [
        ["1. Verantwortliche Stelle", "Verantwortlich für die Bearbeitung personenbezogener Daten über diese Website ist KLYKGO Marketing Agency. Die vollständige Firmenadresse und die verantwortliche Kontaktperson werden vor dem Launch ergänzt."],
        ["2. Welche Daten wir bearbeiten", "Beim Besuch der Website können technisch notwendige Verbindungsdaten verarbeitet werden. Wenn Sie das Kontaktformular nutzen, bearbeiten wir die von Ihnen eingegebenen Angaben wie Name, Unternehmen, E-Mail-Adresse, Telefonnummer, gewünschte Leistung und Nachricht."],
        ["3. Zweck der Bearbeitung", "Wir verwenden diese Daten zur Bereitstellung und Sicherheit der Website, zur Bearbeitung von Anfragen, zur Kommunikation mit Interessenten und Kunden sowie zur Vorbereitung und Durchführung unserer Dienstleistungen."],
        ["4. Kontaktformular und Dienstleister", "Das Kontaktformular kann über Formspree verarbeitet werden. Dabei können die im Formular eingegebenen Daten an einen externen Dienstleister übermittelt werden. Vor dem Launch sind die tatsächlich eingesetzten Dienstleister, deren Verarbeitungsorte und die erforderlichen Schutzmassnahmen abschliessend zu prüfen und hier zu dokumentieren."],
        ["5. Weitergabe und Bearbeitung im Ausland", "Personenbezogene Daten werden nur weitergegeben, wenn dies für die genannten Zwecke erforderlich ist, eine gesetzliche Grundlage besteht oder Sie eingewilligt haben. Bei einer Bearbeitung ausserhalb der Schweiz werden die anwendbaren datenschutzrechtlichen Anforderungen und geeignete Schutzmechanismen berücksichtigt."],
        ["6. Aufbewahrung und Sicherheit", "Wir bewahren personenbezogene Daten nur so lange auf, wie dies für den jeweiligen Zweck oder aufgrund gesetzlicher Pflichten erforderlich ist. Angemessene technische und organisatorische Massnahmen schützen die Daten vor unbefugtem Zugriff, Verlust und Missbrauch."],
        ["7. Ihre Rechte", "Im Rahmen des anwendbaren Datenschutzrechts können Sie insbesondere Auskunft über Ihre bearbeiteten Daten verlangen sowie deren Berichtigung oder Löschung beantragen. Anfragen können an die im Impressum genannte Kontaktadresse gerichtet werden."],
        ["8. Änderungen", "Diese Datenschutzerklärung kann angepasst werden, wenn sich Funktionen, Dienstleister oder rechtliche Anforderungen ändern."],
        ["Hinweis für Phase 2", "Mit Login, Supabase, Stripe, Kundenkonto und allfälligen Analyse-Tools muss diese Datenschutzerklärung vor dem Backend-Launch erweitert werden.", "note"]
      ]
    },
    terms: {
      title: "AGB", kicker: "Allgemeine Geschäftsbedingungen",
      sections: [
        ["1. Geltungsbereich", "Diese AGB regeln die Vertragsbeziehung zwischen KLYKGO und seinen Kunden für Marketing, Branding, Webdesign und Webentwicklung, Werbetechnik, Content sowie abonnierte Dienstleistungen."],
        ["2. Angebote und Vertragsabschluss", "Leistungsumfang, Preis, Termine und besondere Bedingungen ergeben sich aus dem jeweiligen Angebot oder dem gewählten Abonnement. Ein Vertrag kommt zustande, sobald das Angebot angenommen oder ein kostenpflichtiges Abonnement verbindlich abgeschlossen wurde."],
        ["3. Preise und Zahlung", "Alle Preise, Währungen, Steuern, Zahlungsfristen und allfälligen Zusatzkosten werden vor dem Vertragsabschluss transparent ausgewiesen. Wiederkehrende Abonnements werden gemäss dem beim Abschluss angezeigten Abrechnungsintervall verrechnet."],
        ["4. Abonnements, Änderungen und Kündigung", "Die definitive Mindestlaufzeit, Verlängerung, Upgrade- und Downgrade-Regeln sowie Kündigungsfristen werden vor Aktivierung der kostenpflichtigen Abonnements festgelegt und im Checkout klar angezeigt."],
        ["5. Mitwirkung des Kunden", "Der Kunde stellt benötigte Inhalte, Zugänge, Freigaben und Informationen rechtzeitig zur Verfügung. Verzögerungen aufgrund fehlender Mitwirkung können vereinbarte Termine entsprechend verschieben."],
        ["6. Nutzungsrechte", "Die Übertragung von Nutzungsrechten an Designs, Inhalten, Websites, Software oder anderen Arbeitsergebnissen richtet sich nach dem jeweiligen Angebot. Rechte Dritter und lizenzierte Bestandteile bleiben vorbehalten."],
        ["7. Gewährleistung und Haftung", "KLYKGO erbringt die vereinbarten Leistungen fachgerecht. Umfang und Grenzen von Gewährleistung und Haftung werden im definitiven Vertrag unter Beachtung des zwingenden Schweizer Rechts geregelt."],
        ["8. Schlussbestimmungen", "Anwendbares Recht, Gerichtsstand und die vollständigen Vertragsbedingungen werden vor dem kommerziellen Launch der Abonnements finalisiert."],
        ["Entwurf für Phase 1", "Diese AGB sind aktuell eine strukturierte Vorlage. Vor Aktivierung von Stripe und bezahlten Abonnements müssen Preise, Leistungsumfang, Laufzeiten, Kündigung und Haftungsregeln mit dem Kunden final festgelegt und rechtlich geprüft werden.", "note"]
      ]
    },
    cookies: {
      title: "Cookies", kicker: "Cookie-Hinweise",
      sections: [
        ["Aktueller Stand", "In Phase 1 soll die Website möglichst datensparsam arbeiten. Es werden keine Marketing- oder Analyse-Cookies bewusst aktiviert, solange dafür keine passende Konfiguration und, falls erforderlich, Einwilligungslösung umgesetzt ist."],
        ["Technisch notwendige Technologien", "Technisch notwendige Speicher- oder Sitzungsmechanismen können eingesetzt werden, wenn sie für Sicherheit, grundlegende Website-Funktionen oder später für Login und Kundenkonto erforderlich sind."],
        ["Phase 2", "Wenn Authentifizierung, Stripe, Analyse- oder Marketing-Technologien ergänzt werden, wird dieser Hinweis aktualisiert. Nicht notwendige Tracking-Technologien werden erst nach Prüfung der anwendbaren Anforderungen aktiviert."]
      ]
    }
  }
};

type Dictionary = typeof de;

const en: Dictionary = {
  language: { label: "Language", de: "DE", en: "EN", fr: "FR" },
  nav: {
    services: "Services", process: "Process", subscriptions: "Plans", contact: "Contact", login: "Login",
    startProject: "Start a project", navigation: "Navigation", openMenu: "Open menu", closeMenu: "Close menu", homeLabel: "KLYKGO home"
  },
  hero: {
    kicker: "KLYKGO / SWISS MARKETING AGENCY",
    line1: "We make", line2: "brands", accent: "visible.",
    subtitle: "Marketing, branding, web design & development, signage and content combined into one strong brand presence.",
    start: "Start a project", explore: "Explore services", end: "STRATEGY · CREATION · DELIVERY",
    floating: [["📈", "Marketing"], ["✦", "Branding"], ["</>", "Development"], ["🚘", "Signage"], ["🎥", "Content"], ["📣", "Campaigns"], ["📷", "Photo"]]
  },
  intro: {
    label: "01 / KLYKGO", eyebrow: "Everything for your brand.", title1: "One brand.", title2: "One partner.",
    copy: "We combine strategy, design, technology, advertising and content into a brand presence that works both digitally and in the real world.",
    statements: ["Digital.", "Physical.", "Everywhere."]
  },
  servicesSection: { label: "02 / SERVICES", eyebrow: "Five disciplines. One presence.", title: "What we make happen." },
  services: [
    { number: "01", title: "Marketing", desc: "Strategy and campaigns designed not only to generate reach, but to turn attention into meaningful enquiries.", tags: ["Social Media Marketing", "Google & Meta Ads", "Strategy & Campaigns", "SEO", "Social Media Management"] },
    { number: "02", title: "Branding", desc: "Brand identities with a clear point of view, from the first logo to a consistent presence across every touchpoint.", tags: ["Logo & Corporate Identity", "Rebranding", "Graphic Design", "Flyers & Brochures", "Business Print"] },
    { number: "03", title: "Web Design & Development", desc: "From fast landing pages to custom web applications, thoughtfully designed, cleanly developed and fully responsive.", tags: ["Websites & Landing Pages", "Custom Web Development", "Web Apps", "Online Shops", "APIs & Integrations", "Website Maintenance"] },
    { number: "04", title: "Signage & Advertising", desc: "Visibility in the real world, on vehicles, façades, shop windows and every place your brand needs to be seen.", tags: ["Vehicle Graphics", "Shopfronts & Façades", "Signs", "Illuminated Signage", "Wrapping & Privacy Film", "Banners & Roll-ups"] },
    { number: "05", title: "Content", desc: "Photography, video and social content designed to fit your brand and earn attention in the right formats.", tags: ["Photo & Video", "Social Media Content", "Reels & Promotional Videos", "Product Photography", "Content Creation"] }
  ],
  why: {
    label: "03 / WHY KLYKGO", eyebrow: "Not five different providers.", title: "One team thinking together.",
    cards: [
      ["01", "Strategic.", "We do not start with design. We start with the objective, so every action has a clear reason."],
      ["02", "Creative.", "A strong brand presence should stand out while still feeling true to the brand, online, in print and in physical spaces."],
      ["03", "Built to deliver.", "From concept to the finished website, content or advertising material, everything follows one clear process."]
    ]
  },
  process: {
    label: "04 / PROCESS", eyebrow: "From the idea to the impact.", title: "A clear process.",
    steps: [
      ["01", "Understand", "Get to know the goals, brand, offer and target audience."],
      ["02", "Develop", "Define the strategy, concept and visual direction."],
      ["03", "Deliver", "Produce the design, development, campaigns or physical output."],
      ["04", "Grow", "Review results, optimise and develop the next steps with purpose."]
    ]
  },
  pricing: {
    label: "05 / PLANS", eyebrow: "Ongoing support.", title: "Choose your pace.",
    description: "Final pricing and deliverables will be added before launch. Registration and payments will be activated in Phase 2.",
    recommended: "RECOMMENDED", perMonth: "/ month", choose: "choose"
  },
  plans: [
    { name: "Starter", subtitle: "The ideal starting point for small businesses and new brands.", features: ["Core marketing & consulting", "Social media support", "Graphic & content creation", "Small design adjustments", "Regular support", "KLYKGO support"] },
    { name: "Growth", subtitle: "For businesses that want to grow their visibility.", featured: true, features: ["Extended marketing support", "Social media management", "Content & graphic design", "Campaign support", "SEO & online visibility", "Regular optimisation", "Priority support"] },
    { name: "Pro", subtitle: "The comprehensive solution for ambitious brands.", features: ["Comprehensive marketing support", "Custom marketing strategy", "Social media & content", "Campaigns & performance marketing", "Branding & graphic design", "Web support & digital consulting", "Performance analysis", "Personal support"] }
  ],
  contact: {
    label: "06 / CONTACT", eyebrow: "Ready for the next step?", title1: "Let's create something", title2: "that stands out.",
    copy: "Tell us what you are planning. We will come back with a clear recommendation for the next step in your project.",
    email: "Email", location: "Location", switzerland: "Switzerland"
  },
  form: {
    name: "Name *", namePlaceholder: "Your name", company: "Company", companyPlaceholder: "Company name", email: "Email *", emailPlaceholder: "name@company.ch", phone: "Phone", phonePlaceholder: "+41 ...",
    service: "How can we help? *", servicePlaceholder: "Select a service", services: ["Marketing", "Branding", "Web Design & Development", "Signage & Advertising", "Content", "Multiple services"],
    message: "Project / Message *", messagePlaceholder: "Tell us briefly about your project...",
    privacyBefore: "I agree to the processing of my details in order to handle my enquiry and I have read the", privacyLink: "Privacy Policy", privacyAfter: ".",
    send: "Send enquiry", sending: "Sending...", success: "Thank you. Your enquiry has been sent.", error: "Something went wrong. Please try again.", missing: "The Formspree ID is still missing. See .env.example in the project."
  },
  phase2: {
    kicker: "Phase 02", title: "The client portal is coming with the backend build.",
    copy: "Registration, login, subscriptions, Stripe payments and the client dashboard will be activated in Phase 2.",
    button: "Enquire for now", close: "Close"
  },
  footer: {
    description: "Marketing, branding, web design & development, signage and content from one partner.", navigation: "Navigation", social: "Social", legal: "Legal",
    services: "Services", process: "Process", subscriptions: "Plans", contact: "Contact", imprint: "Imprint", privacy: "Privacy", terms: "Terms", cookies: "Cookies",
    rights: "© 2026 KLYKGO. All rights reserved.", location: "Switzerland", credit: "Developed by"
  },
  legal: {
    close: "Close window",
    impressum: {
      title: "Imprint", kicker: "Legal information",
      sections: [
        ["Provider", "KLYKGO Marketing Agency\n[Add legal company name]\n[Street and number]\n[Postcode City], Switzerland"],
        ["Contact", "Email: hello@klykgo.ch\nPhone: [add phone number]"],
        ["Company information", "UID / Commercial Register: [add if applicable]\nVAT No.: [add if applicable]\nAuthorised representative: [add name]"],
        ["Before launch", "The placeholders in this imprint must be replaced with KLYKGO's final company information before launch.", "note"]
      ]
    },
    privacy: {
      title: "Privacy", kicker: "Privacy Policy",
      sections: [
        ["1. Controller", "KLYKGO Marketing Agency is responsible for processing personal data through this website. The complete company address and responsible contact person will be added before launch."],
        ["2. Data we process", "When you visit the website, technically necessary connection data may be processed. If you use the contact form, we process the information you enter, including name, company, email address, phone number, requested service and message."],
        ["3. Purpose of processing", "We use this data to provide and secure the website, handle enquiries, communicate with prospective and existing clients, and prepare and deliver our services."],
        ["4. Contact form and service providers", "The contact form may be processed through Formspree. Information entered in the form may therefore be transferred to an external service provider. Before launch, the actual providers, processing locations and required safeguards must be reviewed and documented here."],
        ["5. Disclosure and processing abroad", "Personal data is disclosed only when necessary for the stated purposes, where a legal basis exists or where you have given consent. Where data is processed outside Switzerland, applicable data protection requirements and appropriate safeguards are taken into account."],
        ["6. Retention and security", "We retain personal data only for as long as required for the relevant purpose or by law. Appropriate technical and organisational measures are used to protect data against unauthorised access, loss and misuse."],
        ["7. Your rights", "Under applicable data protection law, you may in particular request information about your processed data and ask for correction or deletion. Requests can be sent to the contact address stated in the imprint."],
        ["8. Changes", "This Privacy Policy may be updated when website functions, service providers or legal requirements change."],
        ["Phase 2 note", "When login, Supabase, Stripe, client accounts or analytics tools are added, this Privacy Policy must be expanded before the backend launch.", "note"]
      ]
    },
    terms: {
      title: "Terms", kicker: "General Terms and Conditions",
      sections: [
        ["1. Scope", "These terms govern the contractual relationship between KLYKGO and its clients for marketing, branding, web design and development, signage, content and subscription services."],
        ["2. Offers and contract formation", "The scope of services, price, schedule and special conditions are defined in the relevant offer or selected subscription. A contract is formed when an offer is accepted or a paid subscription is validly completed."],
        ["3. Prices and payment", "All prices, currencies, taxes, payment periods and possible additional costs will be shown transparently before a contract is concluded. Recurring subscriptions are charged according to the billing interval shown at checkout."],
        ["4. Subscriptions, changes and cancellation", "Final minimum terms, renewals, upgrade and downgrade rules and cancellation periods will be defined before paid subscriptions are activated and clearly shown at checkout."],
        ["5. Client cooperation", "The client provides required content, access, approvals and information on time. Delays caused by missing cooperation may move agreed delivery dates accordingly."],
        ["6. Usage rights", "The transfer of usage rights for designs, content, websites, software or other work products is governed by the relevant offer. Third-party rights and licensed components remain reserved."],
        ["7. Warranty and liability", "KLYKGO provides the agreed services professionally. The scope and limits of warranty and liability will be defined in the final agreement in accordance with mandatory Swiss law."],
        ["8. Final provisions", "Applicable law, jurisdiction and complete contractual terms will be finalised before the commercial launch of subscriptions."],
        ["Phase 1 draft", "These terms are currently a structured template. Before Stripe and paid subscriptions are activated, prices, scope, terms, cancellation and liability rules must be finalised with the client and legally reviewed.", "note"]
      ]
    },
    cookies: {
      title: "Cookies", kicker: "Cookie information",
      sections: [
        ["Current status", "Phase 1 is designed to minimise data collection. Marketing or analytics cookies are not intentionally activated until an appropriate configuration and, where required, a consent solution has been implemented."],
        ["Technically necessary technologies", "Technically necessary storage or session mechanisms may be used when required for security, basic website functions or later for login and client accounts."],
        ["Phase 2", "When authentication, Stripe, analytics or marketing technologies are added, this notice will be updated. Non-essential tracking technologies will only be activated after the applicable requirements have been reviewed."]
      ]
    }
  }
};

const fr: Dictionary = {
  language: { label: "Langue", de: "DE", en: "EN", fr: "FR" },
  nav: {
    services: "Services", process: "Processus", subscriptions: "Abonnements", contact: "Contact", login: "Connexion",
    startProject: "Démarrer un projet", navigation: "Navigation", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu", homeLabel: "Accueil KLYKGO"
  },
  hero: {
    kicker: "KLYKGO / SWISS MARKETING AGENCY",
    line1: "Nous rendons", line2: "les marques", accent: "visibles.",
    subtitle: "Marketing, branding, web design & développement, signalétique et contenu réunis dans une présence de marque forte.",
    start: "Démarrer un projet", explore: "Découvrir les services", end: "STRATÉGIE · CRÉATION · RÉALISATION",
    floating: [["📈", "Marketing"], ["✦", "Branding"], ["</>", "Développement"], ["🚘", "Signalétique"], ["🎥", "Contenu"], ["📣", "Campagnes"], ["📷", "Photo"]]
  },
  intro: {
    label: "01 / KLYKGO", eyebrow: "Tout pour votre marque.", title1: "Une marque.", title2: "Un partenaire.",
    copy: "Nous réunissons stratégie, design, technologie, publicité et contenu pour créer une présence de marque efficace, en ligne comme dans le monde réel.",
    statements: ["Digital.", "Physique.", "Partout."]
  },
  servicesSection: { label: "02 / SERVICES", eyebrow: "Cinq expertises. Une présence.", title: "Ce que nous faisons avancer." },
  services: [
    { number: "01", title: "Marketing", desc: "Des stratégies et campagnes conçues non seulement pour générer de la portée, mais pour transformer l'attention en demandes concrètes.", tags: ["Marketing réseaux sociaux", "Google & Meta Ads", "Stratégie & campagnes", "SEO", "Gestion des réseaux sociaux"] },
    { number: "02", title: "Branding", desc: "Des identités de marque avec une direction claire, du premier logo à une présence cohérente sur chaque point de contact.", tags: ["Logo & identité visuelle", "Rebranding", "Design graphique", "Flyers & brochures", "Imprimés professionnels"] },
    { number: "03", title: "Web Design & Développement", desc: "Des landing pages rapides aux applications web sur mesure, pensées avec soin, développées proprement et entièrement responsives.", tags: ["Sites & landing pages", "Développement web sur mesure", "Web Apps", "Boutiques en ligne", "APIs & intégrations", "Maintenance web"] },
    { number: "04", title: "Signalétique & Publicité", desc: "De la visibilité dans le monde réel, sur les véhicules, façades, vitrines et partout où votre marque doit être remarquée.", tags: ["Marquage de véhicules", "Vitrines & façades", "Enseignes & panneaux", "Enseignes lumineuses", "Films & covering", "Bannières & roll-ups"] },
    { number: "05", title: "Contenu", desc: "Photo, vidéo et contenu social adaptés à votre marque et pensés pour attirer l'attention dans les bons formats.", tags: ["Photo & vidéo", "Contenu réseaux sociaux", "Reels & vidéos publicitaires", "Photo produit", "Création de contenu"] }
  ],
  why: {
    label: "03 / POURQUOI KLYKGO", eyebrow: "Pas cinq prestataires différents.", title: "Une équipe qui pense ensemble.",
    cards: [
      ["01", "Stratégique.", "Nous ne commençons pas par le design, mais par l'objectif. Chaque action répond à une raison claire."],
      ["02", "Créatif.", "Une présence forte doit se démarquer tout en restant fidèle à la marque, en ligne, sur papier et dans l'espace physique."],
      ["03", "Orienté exécution.", "Du concept au produit web, au contenu ou au support publicitaire final, tout suit un processus clair."]
    ]
  },
  process: {
    label: "04 / PROCESSUS", eyebrow: "De l'idée à l'impact.", title: "Un processus clair.",
    steps: [
      ["01", "Comprendre", "Découvrir les objectifs, la marque, l'offre et le public cible."],
      ["02", "Développer", "Définir la stratégie, le concept et la direction visuelle."],
      ["03", "Réaliser", "Produire le design, le développement, les campagnes ou les supports physiques."],
      ["04", "Grandir", "Analyser les résultats, optimiser et développer les prochaines étapes."]
    ]
  },
  pricing: {
    label: "05 / ABONNEMENTS", eyebrow: "Un accompagnement continu.", title: "Choisissez votre rythme.",
    description: "Les prix et prestations définitives seront ajoutés avant le lancement. L'inscription et les paiements seront activés en Phase 2.",
    recommended: "RECOMMANDÉ", perMonth: "/ mois", choose: "choisir"
  },
  plans: [
    { name: "Starter", subtitle: "Le point de départ idéal pour les petites entreprises et les nouvelles marques.", features: ["Marketing de base & conseil", "Support réseaux sociaux", "Création graphique & contenu", "Petites adaptations design", "Accompagnement régulier", "Support KLYKGO"] },
    { name: "Growth", subtitle: "Pour les entreprises qui veulent développer leur visibilité.", featured: true, features: ["Accompagnement marketing étendu", "Gestion des réseaux sociaux", "Contenu & design graphique", "Support campagnes", "SEO & visibilité en ligne", "Optimisation régulière", "Support prioritaire"] },
    { name: "Pro", subtitle: "La solution complète pour les marques ambitieuses.", features: ["Accompagnement marketing complet", "Stratégie marketing sur mesure", "Réseaux sociaux & contenu", "Campagnes & performance marketing", "Branding & design graphique", "Support web & conseil digital", "Analyse de performance", "Accompagnement personnalisé"] }
  ],
  contact: {
    label: "06 / CONTACT", eyebrow: "Prêt pour la prochaine étape ?", title1: "Créons quelque chose", title2: "qui se remarque.",
    copy: "Parlez-nous de votre projet. Nous reviendrons vers vous avec une recommandation claire pour la prochaine étape.",
    email: "E-mail", location: "Localisation", switzerland: "Suisse"
  },
  form: {
    name: "Nom *", namePlaceholder: "Votre nom", company: "Entreprise", companyPlaceholder: "Nom de l'entreprise", email: "E-mail *", emailPlaceholder: "nom@entreprise.ch", phone: "Téléphone", phonePlaceholder: "+41 ...",
    service: "Comment pouvons-nous vous aider ? *", servicePlaceholder: "Choisir un service", services: ["Marketing", "Branding", "Web Design & Développement", "Signalétique & Publicité", "Contenu", "Plusieurs services"],
    message: "Projet / Message *", messagePlaceholder: "Parlez-nous brièvement de votre projet...",
    privacyBefore: "J'accepte le traitement de mes données afin de répondre à ma demande et j'ai lu la", privacyLink: "Politique de confidentialité", privacyAfter: ".",
    send: "Envoyer la demande", sending: "Envoi...", success: "Merci. Votre demande a bien été envoyée.", error: "Une erreur s'est produite. Veuillez réessayer.", missing: "L'identifiant Formspree manque encore. Consultez .env.example dans le projet."
  },
  phase2: {
    kicker: "Phase 02", title: "Le portail client arrivera avec le développement backend.",
    copy: "L'inscription, la connexion, les abonnements, les paiements Stripe et le tableau de bord client seront activés en Phase 2.",
    button: "Faire une demande", close: "Fermer"
  },
  footer: {
    description: "Marketing, branding, web design & développement, signalétique et contenu réunis chez un seul partenaire.", navigation: "Navigation", social: "Social", legal: "Mentions légales",
    services: "Services", process: "Processus", subscriptions: "Abonnements", contact: "Contact", imprint: "Mentions légales", privacy: "Confidentialité", terms: "CGV", cookies: "Cookies",
    rights: "© 2026 KLYKGO. Tous droits réservés.", location: "Suisse", credit: "Developed by"
  },
  legal: {
    close: "Fermer la fenêtre",
    impressum: {
      title: "Mentions légales", kicker: "Informations légales",
      sections: [
        ["Prestataire", "KLYKGO Marketing Agency\n[Ajouter la raison sociale]\n[Rue et numéro]\n[NPA Localité], Suisse"],
        ["Contact", "E-mail : hello@klykgo.ch\nTéléphone : [ajouter le numéro]"],
        ["Informations sur l'entreprise", "IDE / Registre du commerce : [ajouter si applicable]\nN° TVA : [ajouter si applicable]\nPersonne autorisée à représenter : [ajouter le nom]"],
        ["Avant le lancement", "Les informations provisoires de ces mentions légales doivent être remplacées par les données définitives de KLYKGO avant le lancement.", "note"]
      ]
    },
    privacy: {
      title: "Confidentialité", kicker: "Politique de confidentialité",
      sections: [
        ["1. Responsable", "KLYKGO Marketing Agency est responsable du traitement des données personnelles effectué via ce site. L'adresse complète de l'entreprise et la personne de contact responsable seront ajoutées avant le lancement."],
        ["2. Données traitées", "Lors de votre visite, des données de connexion techniquement nécessaires peuvent être traitées. Si vous utilisez le formulaire de contact, nous traitons les informations saisies, notamment le nom, l'entreprise, l'adresse e-mail, le numéro de téléphone, le service demandé et le message."],
        ["3. Finalité du traitement", "Ces données sont utilisées pour fournir et sécuriser le site, traiter les demandes, communiquer avec les prospects et clients, et préparer ou fournir nos services."],
        ["4. Formulaire de contact et prestataires", "Le formulaire de contact peut être traité via Formspree. Les données saisies peuvent donc être transmises à un prestataire externe. Avant le lancement, les prestataires effectivement utilisés, leurs lieux de traitement et les mesures de protection nécessaires doivent être vérifiés et documentés ici."],
        ["5. Transmission et traitement à l'étranger", "Les données personnelles ne sont transmises que lorsque cela est nécessaire aux finalités indiquées, lorsqu'une base légale existe ou lorsque vous avez donné votre consentement. En cas de traitement hors de Suisse, les exigences applicables en matière de protection des données et les garanties appropriées sont prises en compte."],
        ["6. Conservation et sécurité", "Nous conservons les données personnelles uniquement pendant la durée nécessaire à la finalité concernée ou imposée par la loi. Des mesures techniques et organisationnelles appropriées protègent les données contre les accès non autorisés, la perte et les abus."],
        ["7. Vos droits", "Dans le cadre du droit applicable, vous pouvez notamment demander des informations sur les données traitées et solliciter leur rectification ou leur suppression. Les demandes peuvent être adressées au contact indiqué dans les mentions légales."],
        ["8. Modifications", "Cette politique de confidentialité peut être adaptée lorsque les fonctionnalités, prestataires ou exigences légales évoluent."],
        ["Note Phase 2", "Avec la connexion, Supabase, Stripe, les comptes clients ou d'éventuels outils d'analyse, cette politique devra être complétée avant le lancement du backend.", "note"]
      ]
    },
    terms: {
      title: "CGV", kicker: "Conditions générales",
      sections: [
        ["1. Champ d'application", "Les présentes conditions régissent la relation contractuelle entre KLYKGO et ses clients pour le marketing, le branding, le web design et développement, la signalétique, le contenu et les services par abonnement."],
        ["2. Offres et conclusion du contrat", "L'étendue des prestations, le prix, les délais et les conditions particulières résultent de l'offre concernée ou de l'abonnement choisi. Le contrat est conclu dès qu'une offre est acceptée ou qu'un abonnement payant est valablement souscrit."],
        ["3. Prix et paiement", "Tous les prix, devises, taxes, délais de paiement et éventuels frais supplémentaires sont indiqués de manière transparente avant la conclusion du contrat. Les abonnements récurrents sont facturés selon l'intervalle affiché lors de la souscription."],
        ["4. Abonnements, modifications et résiliation", "La durée minimale définitive, le renouvellement, les règles d'upgrade ou downgrade et les délais de résiliation seront définis avant l'activation des abonnements payants et clairement indiqués lors du paiement."],
        ["5. Collaboration du client", "Le client fournit à temps les contenus, accès, validations et informations nécessaires. Les retards dus à une collaboration insuffisante peuvent décaler les délais convenus."],
        ["6. Droits d'utilisation", "Le transfert des droits d'utilisation sur les designs, contenus, sites web, logiciels ou autres résultats dépend de l'offre concernée. Les droits de tiers et les éléments sous licence restent réservés."],
        ["7. Garantie et responsabilité", "KLYKGO fournit les prestations convenues de manière professionnelle. L'étendue et les limites de la garantie et de la responsabilité seront définies dans le contrat définitif conformément au droit suisse impératif."],
        ["8. Dispositions finales", "Le droit applicable, le for et les conditions contractuelles complètes seront finalisés avant le lancement commercial des abonnements."],
        ["Projet Phase 1", "Ces CGV constituent actuellement un modèle structuré. Avant l'activation de Stripe et des abonnements payants, les prix, prestations, durées, règles de résiliation et de responsabilité doivent être finalisés avec le client et vérifiés juridiquement.", "note"]
      ]
    },
    cookies: {
      title: "Cookies", kicker: "Informations sur les cookies",
      sections: [
        ["Situation actuelle", "La Phase 1 vise à limiter au maximum la collecte de données. Aucun cookie marketing ou analytique n'est volontairement activé tant qu'une configuration adaptée et, si nécessaire, une solution de consentement n'ont pas été mises en place."],
        ["Technologies techniquement nécessaires", "Des mécanismes de stockage ou de session techniquement nécessaires peuvent être utilisés lorsqu'ils sont requis pour la sécurité, les fonctions de base du site ou plus tard pour la connexion et les comptes clients."],
        ["Phase 2", "Lorsque l'authentification, Stripe, des outils analytiques ou marketing seront ajoutés, cette information sera mise à jour. Les technologies de suivi non essentielles ne seront activées qu'après vérification des exigences applicables."]
      ]
    }
  }
};

const dictionaries: Record<Language, Dictionary> = { de, en, fr };

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de");

  useEffect(() => {
    const saved = window.localStorage.getItem("klykgo-language") as Language | null;
    if (saved && ["de", "en", "fr"].includes(saved)) {
      setLanguageState(saved);
      return;
    }

    const browserLanguage = window.navigator.language.toLowerCase();
    if (browserLanguage.startsWith("fr")) setLanguageState("fr");
    else if (browserLanguage.startsWith("en")) setLanguageState("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("klykgo-language", language);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage: setLanguageState, t: dictionaries[language] }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
