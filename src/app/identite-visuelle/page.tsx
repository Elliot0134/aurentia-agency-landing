import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { IdentiteVisuelleHero } from "@/components/identite-visuelle/IdentiteVisuelleHero";
import { IdentiteVisuellePrestations } from "@/components/identite-visuelle/IdentiteVisuellePrestations";
import { IdentiteVisuelleProcess } from "@/components/identite-visuelle/IdentiteVisuelleProcess";
import { IdentiteVisuellePortfolio } from "@/components/identite-visuelle/IdentiteVisuellePortfolio";
import { IdentiteVisuellePourquoi } from "@/components/identite-visuelle/IdentiteVisuellePourquoi";
import { IdentiteVisuelleTarifs } from "@/components/identite-visuelle/IdentiteVisuelleTarifs";
import { IdentiteVisuelleFAQ } from "@/components/identite-visuelle/IdentiteVisuelleFAQ";
import { IdentiteVisuelleCTA } from "@/components/identite-visuelle/IdentiteVisuelleCTA";
import { faqItems } from "@/data/identite-visuelle-content";

export const metadata: Metadata = {
  title: "Identit\u00e9 Visuelle \u2014 Logo, Charte & Univers de Marque | Aurentia",
  description:
    "Logo, charte graphique, univers de marque. 20 ans de direction cr\u00e9ative + IA. Une identit\u00e9 qui r\u00e9v\u00e8le votre potentiel. Sur devis.",
  openGraph: {
    title: "Identit\u00e9 Visuelle \u2014 Logo, Charte & Univers de Marque",
    description:
      "20 ans de direction cr\u00e9ative. L\u2019IA comme acc\u00e9l\u00e9rateur. Une identit\u00e9 qui r\u00e9v\u00e8le votre potentiel.",
    url: "https://aurentia.agency/identite-visuelle",
    type: "website",
    images: [
      {
        url: "/images/og/identite-visuelle.jpg",
        width: 1200,
        height: 630,
        alt: "Aurentia \u2014 Identit\u00e9 Visuelle",
      },
    ],
  },
};

// Build FAQPage schema from data
const faqSchema = faqItems.map((item) => ({
  "@type": "Question" as const,
  name: item.question,
  acceptedAnswer: {
    "@type": "Answer" as const,
    text: item.answer,
  },
}));

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cr\u00e9ation d\u2019Identit\u00e9 Visuelle",
    description:
      "Logo, charte graphique, univers de marque. 20 ans de direction cr\u00e9ative combin\u00e9s \u00e0 l\u2019IA pour une identit\u00e9 unique.",
    provider: {
      "@type": "Organization",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
    serviceType: "Design graphique et identit\u00e9 visuelle",
    areaServed: {
      "@type": "Country",
      name: "France",
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
        name: "Identit\u00e9 Visuelle",
        item: "https://aurentia.agency/identite-visuelle",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSchema,
  },
];

export default function IdentiteVisuellePage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <IdentiteVisuelleHero />
        <IdentiteVisuellePrestations />
        <IdentiteVisuelleProcess />
        <IdentiteVisuellePortfolio />
        <IdentiteVisuellePourquoi />
        <IdentiteVisuelleTarifs />
        <IdentiteVisuelleFAQ />
        <IdentiteVisuelleCTA />
      </main>
      <Footer />
      <ScrollToTop />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
