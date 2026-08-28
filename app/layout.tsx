import type { Metadata } from "next";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "KLYKGO | Swiss Marketing Agency",
  description: "KLYKGO combines marketing, branding, web design & development, signage and content for strong brand experiences.",
  openGraph: {
    title: "KLYKGO | Swiss Marketing Agency",
    description: "Marketing, branding, web design & development, signage and content from one partner.",
    images: ["/klykgo-logo.jpg"],
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <LanguageProvider><AuthProvider>{children}</AuthProvider></LanguageProvider>
      </body>
    </html>
  );
}
