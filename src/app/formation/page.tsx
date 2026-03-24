import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { FormationHero } from "@/components/formation/FormationHero";
import { FormationVision } from "@/components/formation/FormationVision";
import { FormationModules } from "@/components/formation/FormationModules";
import { FormationAudience } from "@/components/formation/FormationAudience";
import { FormationTeam } from "@/components/formation/FormationTeam";
import { FormationFormat } from "@/components/formation/FormationFormat";
import { FormationFAQ } from "@/components/formation/FormationFAQ";
import { FormationCTA } from "@/components/formation/FormationCTA";

export const metadata: Metadata = {
  title: "Formation Claude AI — Aurentia Formation",
  description:
    "Vidéos, cours et skills pour maîtriser Claude Code, le prompting avancé et l'automatisation IA. Par des formateurs qui l'utilisent au quotidien.",
  openGraph: {
    title: "Aurentia Formation — Maîtrisez Claude AI",
    description:
      "Vidéos, cours et skills pour maîtriser Claude Code, le prompting avancé et l'automatisation IA. Waitlist ouverte.",
    images: [{ url: "/images/og/formation.jpg" }],
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Aurentia Formation — Maîtrisez Claude AI",
    description:
      "Formation complète sur Claude AI : Claude Code, prompting avancé, skills, automatisation. Vidéos, cours et bundles par des formateurs IA professionnels.",
    provider: {
      "@type": "Organization",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
    instructor: [
      {
        "@type": "Person",
        name: "Elliot Estrade",
        jobTitle: "CEO, Formateur IA en entreprise",
      },
      {
        "@type": "Person",
        name: "Mathieu Bousquet",
        jobTitle: "CTO, Formateur Epitech Marseille",
      },
    ],
    coursePrerequisites: "Aucun prérequis technique spécifique",
    availableLanguage: "fr",
    isAccessibleForFree: false,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://aurentia.agency",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Formation",
        item: "https://aurentia.agency/formation",
      },
    ],
  },
];

export default function FormationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <div className="w-full">
          <FormationHero />
          <FormationVision />
          <FormationModules />
          <FormationAudience />
          <FormationTeam />
          <FormationFormat />
          <FormationFAQ />
          <FormationCTA />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
