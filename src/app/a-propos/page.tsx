import type { Metadata } from "next";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { breadcrumb } from "@/lib/seo/schema";
import { AgenceHero } from "@/components/v2/agence/AgenceHero";
import { AgenceStoryV2 } from "@/components/v2/agence/AgenceStoryV2";
import { AgenceStats } from "@/components/v2/agence/AgenceStats";
import { AgenceTeamFull } from "@/components/v2/agence/AgenceTeamFull";
import { AgenceValuesV2 } from "@/components/v2/agence/AgenceValuesV2";
import { AgenceHackathons } from "@/components/v2/agence/AgenceHackathons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AgenceStack } from "@/components/v2/agence/AgenceStack";
import { AgenceApproach } from "@/components/v2/agence/AgenceApproach";
import { AgenceAudience } from "@/components/v2/agence/AgenceAudience";
import { AgenceFinalCTA } from "@/components/v2/agence/AgenceFinalCTA";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SubNavSetter } from "@/components/shared/SubNavContext";

export const metadata: Metadata = {
  title: "À propos — Équipe, histoire & méthode",
  description:
    "Aurentia Agency : 20 ans d'expertise web, l'IA comme superpouvoir. L'équipe, l'histoire, la méthode. Basée à Avignon.",
  alternates: { canonical: "/a-propos" },
};

const subNavItems = [
  { label: "Histoire", sectionId: "histoire" },
  { label: "Stats", sectionId: "stats" },
  { label: "Équipe", sectionId: "equipe" },
  { label: "Valeurs", sectionId: "valeurs" },
  { label: "Hackathons", sectionId: "hackathons" },
  // { label: "Stack", sectionId: "stack" },
  { label: "Approche", sectionId: "approche" },
  { label: "Pour qui", sectionId: "pour-qui" },
  { label: "Contact", sectionId: "contact" },
];

export default function AProposPage() {
  return (
    <>
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/" },
        { name: "À propos", url: "/a-propos" },
      ])} />
      <SubNavSetter items={subNavItems} />
      <ScrollToTop />
      <AgenceHero />
      <AgenceStoryV2 />
      <AgenceStats />
      <AgenceTeamFull />
      <AgenceValuesV2 />
      <AgenceHackathons />
      {/* <AgenceStack /> */}
      <AgenceApproach />
      <AgenceAudience />
      <AgenceFinalCTA />
    </>
  );
}
