import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (isGitHubPages
    ? "https://ariankapllanaj.github.io/klykgo.ch"
    : "https://klykgo.ch");

const logoUrl = `${siteUrl}/klykgo-logo.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),

  title: {
    default: "KLYKGO | Swiss Marketing Agency",
    template: "%s | KLYKGO"
  },

  description:
    "KLYKGO combines marketing, branding, web design & development, signage and content for strong brand experiences.",

  applicationName: "KLYKGO",

  icons: {
    icon: [
      { url: `${basePath}/klykgo-logo-mark.jpg`, type: "image/jpeg" }
    ],
    shortcut: `${basePath}/klykgo-logo-mark.jpg`,
    apple: `${basePath}/klykgo-logo-mark.jpg`
  },

  keywords: [
    "KLYKGO",
    "Marketing Agency",
    "Swiss Marketing Agency",
    "Marketing Schweiz",
    "Branding",
    "Webdesign",
    "Webentwicklung",
    "Social Media Marketing",
    "Werbetechnik",
    "Content Creation",
    "SEO",
    "Google Ads",
    "Meta Ads"
  ],

  authors: [
    {
      name: "KLYKGO"
    }
  ],

  creator: "KLYKGO",
  publisher: "KLYKGO",

  openGraph: {
    title: "KLYKGO | Swiss Marketing Agency",

    description:
      "Marketing, branding, web design & development, signage and content from one partner.",

    url: siteUrl,

    siteName: "KLYKGO",

    images: [
      {
        url: logoUrl,
        width: 1200,
        height: 1200,
        alt: "KLYKGO Marketing Agency"
      }
    ],

    locale: "de_CH",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",

    title: "KLYKGO | Swiss Marketing Agency",

    description:
      "Marketing, branding, web design & development, signage and content from one partner.",

    images: [logoUrl]
  },

  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
