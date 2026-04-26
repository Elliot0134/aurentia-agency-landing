// src/app/ressources/page.tsx
import type { Metadata } from "next";
import { RessourcesIndexPage } from "@/components/v2/ressources/RessourcesIndexPage";

export const metadata: Metadata = {
  title: "Ressources — Aurentia Agency",
  description:
    "Guides, méthodes et retours d'expérience sur le web, l'IA et le vibe coding. Direct, sans bullshit.",
  openGraph: {
    title: "Ressources — Aurentia Agency",
    description:
      "Guides, méthodes et retours d'expérience sur le web, l'IA et le vibe coding.",
    type: "website",
  },
};

export default function RessourcesPage() {
  return <RessourcesIndexPage />;
}
