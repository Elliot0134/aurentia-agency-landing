import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { RealisationsHero } from "@/components/realisations/RealisationsHero";
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
    images: ["/images/opengraph/opengraph.png"],
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
        { "@type": "ListItem", position: 1, name: "Comparateur-IA-Facile", url: "https://aurentia.agency/realisations/comparateur-ia-facile" },
        { "@type": "ListItem", position: 2, name: "Maison Enileh", url: "https://aurentia.agency/realisations/maison-enileh" },
        { "@type": "ListItem", position: 3, name: "Savistas", url: "https://aurentia.agency/realisations/savistas" },
        { "@type": "ListItem", position: 4, name: "Friend'iz", url: "https://aurentia.agency/realisations/friendiz" },
        { "@type": "ListItem", position: 5, name: "Allo Restau", url: "https://aurentia.agency/realisations/allo-restau" },
        { "@type": "ListItem", position: 6, name: "Golf Mentor", url: "https://aurentia.agency/realisations/golf-mentor" },
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
