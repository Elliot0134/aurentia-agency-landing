// src/components/v2/solutions-ia/SolutionsIaSubPage.tsx
"use client";

import type { SubPageData } from "@/data/v2/types";
import { solutionsIaConfigClaudeData } from "@/data/v2/solutions-ia-config-claude";
import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";
import { solutionsIaAuditData } from "@/data/v2/solutions-ia-audit";
import { PageHeroCentered } from "@/components/v2/shared/PageHeroCentered";
import { WhatYouGetSection } from "@/components/v2/shared/WhatYouGetSection";
import { PerksGrid } from "@/components/v2/shared/PerksGrid";
import { PricingSection } from "@/components/v2/shared/PricingSection";
import { MethodSection } from "@/components/v2/shared/MethodSection";
import { ExamplesGrid } from "@/components/v2/shared/ExamplesGrid";
import { TestimonialsMarquee } from "@/components/v2/shared/TestimonialsMarquee";
import { FAQSection } from "@/components/v2/shared/FAQSection";
import { SectionDivider } from "@/components/v2/shared/SectionDivider";
import { HomeBookingCTA } from "@/components/v2/home/HomeBookingCTA";
import { HomeBookingEmbed } from "@/components/v2/home/HomeBookingEmbed";
import { HomeTeamV2 } from "@/components/v2/home/HomeTeamV2";
import { SubNavSetter } from "@/components/shared/SubNavContext";

const DATA_MAP: Record<string, SubPageData> = {
  "configuration-claude": solutionsIaConfigClaudeData,
  "formation-ia": solutionsIaFormationData,
  audit: solutionsIaAuditData,
};

const BASE_SUB_NAV = [
  { label: "Inclus", sectionId: "what-you-get" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "Méthode", sectionId: "method" },
  { label: "Exemples", sectionId: "examples" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "FAQ", sectionId: "faq" },
  { label: "RDV", sectionId: "rdv-embed" },
];

const AUDIT_SUB_NAV = [
  { label: "Inclus", sectionId: "what-you-get" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "Équipe", sectionId: "equipe" },
  { label: "Méthode", sectionId: "method" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "FAQ", sectionId: "faq" },
  { label: "RDV", sectionId: "rdv-embed" },
];

const SUB_NAV_WITH_GUARANTEES = [
  { label: "Inclus", sectionId: "what-you-get" },
  { label: "Garanties", sectionId: "guarantees" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "Méthode", sectionId: "method" },
  { label: "Exemples", sectionId: "examples" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "FAQ", sectionId: "faq" },
  { label: "RDV", sectionId: "rdv-embed" },
];

export function SolutionsIaSubPage({ slug }: { slug: string }) {
  const data = DATA_MAP[slug];
  if (!data) return null;

  const baseNav =
    slug === "audit"
      ? AUDIT_SUB_NAV
      : data.guarantees && data.guarantees.length > 0
      ? SUB_NAV_WITH_GUARANTEES
      : BASE_SUB_NAV;
  const subNav =
    data.examples.items.length > 0
      ? baseNav
      : baseNav.filter((item) => item.sectionId !== "examples");

  return (
    <>
      <SubNavSetter items={subNav} />

      <PageHeroCentered
        eyebrow={data.hero.eyebrow}
        headline={data.hero.headline}
        subHeadline={data.hero.subHeadline}
        priceFrom={data.hero.priceFrom}
        badges={data.hero.badges}
        cta={data.hero.cta}
      />

      <WhatYouGetSection
        data={data.whatYouGet}
        subtitle={
          data.whatYouGet.subtitle ??
          "Pas de surprise — voici exactement ce que vous recevez."
        }
      />

      <SectionDivider />

      {data.guarantees && data.guarantees.length > 0 && (
        <>
          <PerksGrid
            id="guarantees"
            items={data.guarantees}
            title="Pourquoi notre setup tient la route"
            subtitle="Ce qui nous distingue des configurations génériques que vous trouvez ailleurs."
          />
          <SectionDivider />
        </>
      )}

      <PricingSection data={data.pricing} />

      <SectionDivider />

      <HomeBookingCTA />

      {slug === "audit" && (
        <>
          <SectionDivider />
          <HomeTeamV2 members={["Elliot", "Matthieu"]} title="L'équipe" />
        </>
      )}

      <SectionDivider />

      <MethodSection
        title="Comment on travaille"
        subtitle="Un processus simple et transparent. Vous savez toujours où en est votre mission."
        steps={data.process}
      />

      {data.examples.items.length > 0 && (
        <>
          <SectionDivider />
          <ExamplesGrid
            data={data.examples}
            subtitle="Des missions récentes pour des équipes qui bougent."
          />
        </>
      )}

      {data.testimonials.length > 0 && (
        <>
          <SectionDivider />
          <TestimonialsMarquee
            testimonials={data.testimonials}
            title="Ils ont vu la différence en quelques semaines"
            subtitle="Des retours concrets de dirigeants et d'équipes qu'on a accompagnés."
          />
        </>
      )}

      <SectionDivider />

      <FAQSection items={data.faq} />

      <SectionDivider />

      <HomeBookingEmbed />
    </>
  );
}
