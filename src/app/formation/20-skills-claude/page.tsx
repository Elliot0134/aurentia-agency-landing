import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { Skills20Hero } from "@/components/formation/Skills20Hero";
import { Skills20InstallGuide } from "@/components/formation/Skills20InstallGuide";
import { Skills20Categories } from "@/components/formation/Skills20Categories";
import { Skills20Aurentia } from "@/components/formation/Skills20Aurentia";
import { Skills20CTA } from "@/components/formation/Skills20CTA";

export const metadata: Metadata = {
  title: "20 Skills Claude AI prêts à l'emploi — Aurentia Formation",
  description:
    "20 prompts et templates Claude AI testés en production. Copiez, collez, transformez votre façon de travailler. Accès libre et gratuit.",
  openGraph: {
    title: "20 Skills Claude AI prêts à l'emploi",
    description:
      "Des prompts et templates testés en production. Copiez, collez, transformez votre façon de travailler. Par Aurentia.",
    images: [{ url: "/images/opengraph/opengraph.png" }],
    type: "article",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "20 Skills Claude AI prêts à l'emploi",
    description:
      "20 prompts et templates Claude AI testés en production, organisés en 4 catégories : Prompting Avancé, Claude Code, Automatisation, Business & Stratégie.",
    step: [
      {
        "@type": "HowToStep",
        name: "Installer le skill",
        text: "Copiez le contenu du skill et collez-le dans vos instructions de projet Claude (claude.ai), vos réglages Claude Desktop, ou votre fichier CLAUDE.md.",
      },
      {
        "@type": "HowToStep",
        name: "Adapter les variables",
        text: "Remplacez les [VARIABLES EN MAJUSCULES] par vos informations spécifiques.",
      },
      {
        "@type": "HowToStep",
        name: "Utiliser avec Claude",
        text: "Lancez votre conversation ou session Claude — le skill s'applique automatiquement.",
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
        name: "20 Skills Claude AI",
        item: "https://aurentia.agency/formation/20-skills-claude",
      },
    ],
  },
];

export default function Skills20Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <div className="w-full">
          <Skills20Hero />
          <Skills20InstallGuide />
          <Skills20Categories />
          <Skills20Aurentia />
          <Skills20CTA />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
