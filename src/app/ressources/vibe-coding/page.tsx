// src/app/ressources/vibe-coding/page.tsx
import type { Metadata } from "next";
import { VibeCodingPage } from "@/components/v2/ressources/VibeCodingPage";

export const metadata: Metadata = {
  title: "Le guide complet du vibe coding — Aurentia Agency",
  description:
    "Construire du logiciel en parlant à une IA : les 11 outils du marché, la méthode pro en 6 étapes, les tips Claude Code, les zones rouges. Le guide qu'on aurait voulu lire en 2024.",
  openGraph: {
    title: "Le guide complet du vibe coding",
    description:
      "Tout ce qu'on a appris en faisant du vibe coding chez Aurentia : outils, méthode, prompts copiables, risques. Direct, sans bullshit.",
    type: "article",
  },
};

export default function VibeCodingResourcePage() {
  return <VibeCodingPage />;
}
