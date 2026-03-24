import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { RealisationsHero } from "@/components/realisations/RealisationsHero";
import { RealisationsCounters } from "@/components/realisations/RealisationsCounters";
import { RealisationsGrid } from "@/components/realisations/RealisationsGrid";
import { RealisationsInterlude } from "@/components/realisations/RealisationsInterlude";
import { RealisationsCTA } from "@/components/realisations/RealisationsCTA";

export const metadata: Metadata = {
  title: "Nos r\u00E9alisations \u2014 Sites & Apps sur-mesure | Aurentia Agency",
  description:
    "D\u00E9couvrez nos projets : sites vitrines, applications SaaS, landing pages. Chaque pixel est sur-mesure. Z\u00E9ro template. R\u00E9sultats concrets.",
  openGraph: {
    title: "Nos r\u00E9alisations \u2014 Aurentia Agency",
    description:
      "Sites vitrines, SaaS, landing pages. Chaque projet est sur-mesure, propuls\u00E9 par l\u2019IA et forg\u00E9 par 20 ans d\u2019expertise. Z\u00E9ro template.",
    url: "https://aurentia.agency/realisations",
    type: "website",
    images: ["/images/og/realisations.jpg"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nos r\u00E9alisations \u2014 Aurentia Agency",
    description:
      "Portfolio de projets web sur-mesure : sites vitrines, applications SaaS, landing pages haute conversion. Propuls\u00E9s par l\u2019IA, forg\u00E9s par 20 ans d\u2019expertise.",
    url: "https://aurentia.agency/realisations",
    isPartOf: {
      "@type": "WebSite",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Conciergerie Azur", url: "https://aurentia.agency/realisations/conciergerie-azur" },
        { "@type": "ListItem", position: 2, name: "LuxStay Gestion", url: "https://aurentia.agency/realisations/luxstay-gestion" },
        { "@type": "ListItem", position: 3, name: "C\u00F4te & Cl\u00E9s", url: "https://aurentia.agency/realisations/cote-et-cles" },
        { "@type": "ListItem", position: 4, name: "Comparateur-IA-Facile", url: "https://aurentia.agency/realisations/comparateur-ia-facile" },
        { "@type": "ListItem", position: 5, name: "Balto", url: "https://aurentia.agency/realisations/balto" },
        { "@type": "ListItem", position: 6, name: "High Love", url: "https://aurentia.agency/realisations/high-love" },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://aurentia.agency" },
      { "@type": "ListItem", position: 2, name: "R\u00E9alisations", item: "https://aurentia.agency/realisations" },
    ],
  },
];

export default function RealisationsPage() {
  return (
    <>
      <ScrollToTop />
      <main className="flex min-h-screen flex-col w-full">
        <RealisationsHero />
        <RealisationsCounters />
        <RealisationsGrid />
        <RealisationsInterlude />
        <RealisationsCTA />
      </main>
      <Footer />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
