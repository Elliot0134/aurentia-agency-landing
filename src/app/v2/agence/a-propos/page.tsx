// src/app/v2/agence/a-propos/page.tsx
// Rebuilt to mirror the /v2 homepage composition — same visual language,
// the page is all about the team and the manifesto.
import type { Metadata } from "next";
import { AProposHero } from "@/components/v2/agence/AProposHero";
import { AProposTeam } from "@/components/v2/agence/AProposTeam";
import { AProposManifesto } from "@/components/v2/agence/AProposManifesto";
import { AProposValues } from "@/components/v2/agence/AProposValues";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";
import { HomeContactV2 } from "@/components/v2/home/HomeContactV2";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SubNavSetter } from "@/components/shared/SubNavContext";

export const metadata: Metadata = {
  title: "À propos d'Aurentia",
  description: "Notre équipe, notre méthode, notre manifeste.",
};

const subNavItems = [
  { label: "Équipe", sectionId: "equipe" },
  { label: "Manifeste", sectionId: "manifesto" },
  { label: "Valeurs", sectionId: "values" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Contact", sectionId: "contact" },
];

export default function AProposPage() {
  return (
    <>
      <SubNavSetter items={subNavItems} />
      <ScrollToTop />
      <AProposHero />
      <AProposTeam />
      <AProposManifesto />
      <AProposValues />
      <HomeRealisationsPreview />
      <HomeContactV2 />
    </>
  );
}
