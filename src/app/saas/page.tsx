import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SaasHero } from "@/components/saas/SaasHero";
import { SaasServices } from "@/components/saas/SaasServices";
import { SaasIntegrations } from "@/components/saas/SaasIntegrations";
import { SaasStack } from "@/components/saas/SaasStack";
import { SaasProcess } from "@/components/saas/SaasProcess";
import { SaasPortfolio } from "@/components/saas/SaasPortfolio";
import { SaasPricing } from "@/components/saas/SaasPricing";
import { SaasFAQ } from "@/components/saas/SaasFAQ";
import { SaasCTA } from "@/components/saas/SaasCTA";

export const metadata: Metadata = {
  title: "Développement SaaS & Logiciels Métier | Aurentia Agency",
  description:
    "MVP en 1 à 2 semaines à partir de 5 000€. Architecture, design et déploiement inclus. L'IA accélère, l'expertise humaine garantit la qualité.",
  openGraph: {
    title: "Développement SaaS & Logiciels Métier — Aurentia Agency",
    description:
      "MVP en 1 à 2 semaines. Architecture, design et déploiement inclus. À partir de 5 000€.",
    url: "https://aurentia.agency/saas",
    type: "website",
    images: [
      {
        url: "/images/opengraph/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Aurentia Agency — Développement SaaS",
      },
    ],
  },
  alternates: {
    canonical: "https://aurentia.agency/saas",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Développement SaaS & Logiciels Métier",
    provider: {
      "@type": "Organization",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
    description:
      "Développement d'applications SaaS, logiciels métier, dashboards et portails clients. MVP livré en 1 à 2 semaines avec architecture, design et déploiement inclus.",
    url: "https://aurentia.agency/saas",
    areaServed: "FR",
    offers: {
      "@type": "Offer",
      price: "5000",
      priceCurrency: "EUR",
      description: "À partir de 5 000€ pour un MVP pré-fonctionnel",
    },
    serviceType: [
      "Développement SaaS",
      "Logiciel métier",
      "Application web sur-mesure",
    ],
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
        name: "SaaS & Logiciels Métier",
        item: "https://aurentia.agency/saas",
      },
    ],
  },
];

export default function SaasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToTop />
      <main className="flex min-h-screen flex-col w-full">
        <SaasHero />
        <SaasServices />
        <SaasIntegrations />
        <SaasStack />
        <SaasProcess />
        <SaasPortfolio />
        <SaasPricing />
        <SaasFAQ />
        <SaasCTA />
      </main>
      <Footer />
    </>
  );
}
