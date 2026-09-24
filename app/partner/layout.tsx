import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Service Manai | Partner",
  description: "IT Service Manai is a KLYKGO partner in infrastructure and logistics."
};

export default function PartnerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
