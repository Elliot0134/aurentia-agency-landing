// src/app/solutions-ia/formation-ia/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Formation IA — formé par les praticiens, pas par des slides",
  description:
    "Formation IA Claude pour PME, cabinets et équipes produit. 542 skills livrés, plateforme vidéo, 3 sessions live, éligible OPCO. Lancement Juin 2026.",
};

export default function FormationIALayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
