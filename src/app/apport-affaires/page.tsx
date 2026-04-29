import type { Metadata } from "next";
import { ApportHero } from "@/components/v2/apport-affaires/ApportHero";
import { ApportSteps } from "@/components/v2/apport-affaires/ApportSteps";
import { ApportAudience } from "@/components/v2/apport-affaires/ApportAudience";
import { ApportFinalCTA } from "@/components/v2/apport-affaires/ApportFinalCTA";
import { SubPageFAQ } from "@/components/v2/subpage/SubPageFAQ";
import { SubNavSetter } from "@/components/shared/SubNavContext";
import { apportFAQ } from "@/data/apport-affaires-content";

const subNavItems = [
  { label: "Comment ça marche", sectionId: "steps" },
  { label: "Pour qui", sectionId: "audience" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Inscription", sectionId: "cta" },
];

export const metadata: Metadata = {
  title: "Apport d'affaires — 10% de commission | Aurentia",
  description:
    "Recommandez Aurentia, touchez 10% de commission sur chaque projet signé. Inscription gratuite, paiement sous 30 jours, sans plafond.",
};

export default function ApportAffairesPage() {
  return (
    <>
      <SubNavSetter items={subNavItems} />
      <ApportHero />
      <ApportSteps />
      <ApportAudience />
      <SubPageFAQ items={apportFAQ} />
      <ApportFinalCTA />
    </>
  );
}
