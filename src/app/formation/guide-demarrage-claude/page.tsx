import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { GuideHero } from "@/components/formation/GuideHero";
import { GuideClaude } from "@/components/formation/GuideClaude";
import { GuideReglesOr } from "@/components/formation/GuideReglesOr";
import { GuidePrompts } from "@/components/formation/GuidePrompts";
import { GuideErreurs } from "@/components/formation/GuideErreurs";
import { GuideAstuces } from "@/components/formation/GuideAstuces";
import { GuideProgression } from "@/components/formation/GuideProgression";
import { Skills20Aurentia } from "@/components/formation/Skills20Aurentia";
import { GuideCTA } from "@/components/formation/GuideCTA";

export const metadata: Metadata = {
  title: "Maîtrisez Claude AI en 30 minutes — Guide de démarrage Aurentia",
  description:
    "Le guide complet pour débuter avec Claude AI. 5 chapitres, 10 prompts prêts à l'emploi, 5 règles d'or. Zéro prérequis. Accès libre et gratuit.",
  openGraph: {
    title: "Maîtrisez Claude AI en 30 minutes",
    description:
      "Les bases essentielles pour être opérationnel avec Claude. 5 chapitres, 10 prompts, zéro prérequis. Par Aurentia.",
    images: [{ url: "/images/opengraph/opengraph.png" }],
    type: "article",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Maîtrisez Claude AI en 30 minutes",
    description:
      "Guide complet pour débuter avec Claude AI : comprendre ce qu'est Claude, les 5 règles d'or du prompting, 10 prompts prêts à l'emploi, les erreurs à éviter et 3 astuces pro.",
    totalTime: "PT30M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Comprendre ce qu'est Claude AI",
        text: "Découvrir les capacités de Claude, la comparaison avec ChatGPT et comment y accéder.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Appliquer les 5 règles d'or du prompting",
        text: "Être précis, donner du contexte, préciser le format, itérer, donner des exemples.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Utiliser les 10 prompts prêts à l'emploi",
        text: "Copier et adapter les templates pour emails, posts LinkedIn, analyses SWOT, résumés, brainstorming et plus.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Éviter les 5 erreurs de débutant",
        text: "Ne pas être vague, ne pas traiter Claude comme un moteur de recherche, itérer, donner du contexte, vérifier les faits.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Appliquer les 3 astuces pro",
        text: "Commencer par un briefing, utiliser les Projects claude.ai, sauvegarder ses meilleurs prompts.",
      },
    ],
    provider: {
      "@type": "Organization",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
    isAccessibleForFree: true,
    inLanguage: "fr",
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Guide de démarrage Claude AI",
        item: "https://aurentia.agency/formation/guide-demarrage-claude",
      },
    ],
  },
];

export default function GuideDemarrageClaudePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <div className="w-full">
          <GuideHero />
          <GuideClaude />
          <GuideReglesOr />
          <GuidePrompts />
          <GuideErreurs />
          <GuideAstuces />
          <GuideProgression />
          <Skills20Aurentia />
          <GuideCTA />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
