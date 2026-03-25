import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutTeam } from "@/components/about/AboutTeam";

import { AboutHackathons } from "@/components/about/AboutHackathons";
import { AboutProof } from "@/components/about/AboutProof";
import { AboutStack } from "@/components/about/AboutStack";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutAudience } from "@/components/about/AboutAudience";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "À propos d'Aurentia — Agence Web IA | Aurentia Agency",
  description:
    "3 profils, 20 ans de craft web et l'IA comme superpouvoir. Découvrez l'équipe qui livre votre site pro en 48h à partir de 1 200€.",
  openGraph: {
    title: "L'équipe Aurentia — 20 ans de craft web + IA",
    description:
      "3 profils. 20 ans d'expertise. L'IA comme superpouvoir. On révèle le potentiel digital de chaque business.",
    images: [{ url: "/images/og/a-propos.jpg" }],
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aurentia Agency",
    url: "https://aurentia.agency",
    logo: "https://aurentia.agency/images/logo.png",
    description:
      "Agence web IA qui révèle le potentiel digital de chaque business. Sites vitrines sur-mesure, applications SaaS, landing pages haute conversion.",
    foundingDate: "2025",
    knowsAbout: [
      "Intelligence Artificielle",
      "Création de sites web",
      "Design UI/UX",
      "SEO",
    ],
    founders: [
      {
        "@type": "Person",
        name: "Elliot Estrade",
        jobTitle: "CEO, IA & Design",
      },
      {
        "@type": "Person",
        name: "Fabien Estrade",
        jobTitle: "Production Lead",
      },
    ],
    employee: [
      {
        "@type": "Person",
        name: "Matthieu Bousquet",
        jobTitle: "CTO, Lead Technique",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/aurentia-agency",
      "https://instagram.com/aurentia.agency",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: "https://cal.com/aurentia",
    },
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
        name: "À propos",
        item: "https://aurentia.agency/a-propos",
      },
    ],
  },
];

export default function AProposPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToTop />
      <main className="flex min-h-screen flex-col w-full">
        <AboutHero />
        <AboutStory />
        <AboutTeam />
        <AboutValues />

        <AboutHackathons />
        <AboutProof />
        <AboutStack />
        <AboutApproach />
        <AboutAudience />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
