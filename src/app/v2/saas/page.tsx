// src/app/v2/saas/page.tsx
import type { Metadata } from "next";
import { CommercialPillarPage } from "@/components/v2/pillar/CommercialPillarPage";
import { saasData } from "@/data/v2/saas";

export const metadata: Metadata = {
  title: "SaaS sur-mesure",
  description:
    "MVP SaaS livré en 1 à 2 semaines. Architecture pro, IA intégrée, design soigné. À partir de 5 000 €.",
};

export default function SaasPillarPage() {
  return <CommercialPillarPage data={saasData} />;
}
