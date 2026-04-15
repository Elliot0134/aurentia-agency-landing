// src/app/v2/agence/page.tsx
import type { Metadata } from "next";
import { AgencyPillarPage } from "@/components/v2/pillar/AgencyPillarPage";
import { agenceData } from "@/data/v2/agence";

export const metadata: Metadata = {
  title: "L'agence",
  description: "Aurentia : équipe, méthode, manifeste, réalisations et ressources.",
};

export default function AgencePage() {
  return <AgencyPillarPage data={agenceData} />;
}
