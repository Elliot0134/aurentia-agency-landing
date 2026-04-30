// src/components/v2/solutions-ia/SolutionsIaPillarPage.tsx
"use client";

import { BrainCircuit, ShieldCheck, Layers, Users, Sparkles, Target } from "lucide-react";
import { solutionsIaData } from "@/data/v2/solutions-ia";
import { PageHeroCentered } from "@/components/v2/shared/PageHeroCentered";
import { SubOffersSection } from "@/components/v2/shared/SubOffersSection";
import { MethodSection } from "@/components/v2/shared/MethodSection";
import { FAQSection } from "@/components/v2/shared/FAQSection";
import { TestimonialsMarquee } from "@/components/v2/shared/TestimonialsMarquee";
import { PerksGrid, type Perk } from "@/components/v2/shared/PerksGrid";
import { SectionDivider } from "@/components/v2/shared/SectionDivider";
import { HomeBookingCTA } from "@/components/v2/home/HomeBookingCTA";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";
import { HomeBookingEmbed } from "@/components/v2/home/HomeBookingEmbed";
import { SubNavSetter } from "@/components/shared/SubNavContext";

const SOLUTIONS_IA_SUB_NAV = [
  { label: "Offres", sectionId: "offers" },
  { label: "Pourquoi", sectionId: "perks" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Méthode", sectionId: "method" },
  { label: "FAQ", sectionId: "faq" },
  { label: "RDV", sectionId: "rdv-embed" },
];

const PERKS: Perk[] = [
  {
    icon: BrainCircuit,
    title: "Partenaire Anthropic Claude",
    description:
      "On utilise Claude au quotidien depuis ses toutes premières versions et on fait partie du programme partenaires. Accès avancé, remontée directe de feedback.",
  },
  {
    icon: Sparkles,
    title: "IA opérationnelle, pas marketing",
    description:
      "On ne vend pas des slides sur l'IA — on la déploie dans votre stack. Nos livrables tournent en production dès la fin de mission.",
  },
  {
    icon: Layers,
    title: "Sur-mesure, pas des outils off-the-shelf",
    description:
      "Skills configurés pour votre métier, hooks branchés à votre CI, MCP servers adaptés. Pas de solution générique — que du sur-mesure.",
  },
  {
    icon: Users,
    title: "Formation incluse",
    description:
      "On forme vos équipes à utiliser et faire évoluer les outils qu'on a livrés. À la fin, vous êtes autonome — pas captif.",
  },
  {
    icon: ShieldCheck,
    title: "Données privées & RGPD",
    description:
      "API keys privées, intégrations chiffrées, respect RGPD, déploiement Claude Enterprise si besoin. Vos données restent sous votre contrôle.",
  },
  {
    icon: Target,
    title: "ROI mesurable",
    description:
      "On définit avec vous des métriques de succès dès le cadrage. Gain de temps, taux d'automatisation, satisfaction client — on track tout.",
  },
];

export function SolutionsIaPillarPage() {
  const data = solutionsIaData;
  return (
    <>
      <SubNavSetter items={SOLUTIONS_IA_SUB_NAV} />

      <PageHeroCentered
        eyebrow={data.hero.eyebrow}
        headline={data.hero.headline}
        subHeadline={data.hero.subHeadline}
        badges={data.hero.badges}
        cta={data.hero.cta}
      />

      <SectionDivider />

      <SubOffersSection
        subOffers={data.subOffers}
        subtitle="Trois portes d'entrée — un même objectif : déployer l'IA dans votre quotidien business."
      />

      <SectionDivider />

      <HomeBookingCTA />

      <SectionDivider />

      <PerksGrid
        items={PERKS}
        title="Pourquoi on fait mieux que la moyenne"
        subtitle="Ce qui nous différencie des agences IA — des engagements concrets, pas des promesses."
      />

      <SectionDivider />

      {data.testimonialsFiltered.length > 0 && (
        <>
          <TestimonialsMarquee
            testimonials={data.testimonialsFiltered}
            title="Ce que disent les équipes qu'on a accompagnées"
            subtitle="Des dirigeants, des leads tech et des opérationnels qui utilisent l'IA tous les jours."
          />
          <SectionDivider />
        </>
      )}

      <HomeRealisationsPreview title="Quelques projets IA livrés" subtitle="Plateformes IA, automatisations, agents — cliquez pour voir le détail." />

      <SectionDivider />

      <MethodSection
        title={data.method.title}
        subtitle="De l'audit à la formation, un processus clair en quatre étapes."
        steps={data.method.steps}
      />

      <SectionDivider />

      <FAQSection items={data.faq} />

      <SectionDivider />

      <HomeBookingEmbed />
    </>
  );
}
