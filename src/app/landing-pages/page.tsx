import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LandingPagesHero } from "@/components/landing-pages/LandingPagesHero";
import { LandingPagesFeatures } from "@/components/landing-pages/LandingPagesFeatures";
import { LandingPagesVitrine } from "@/components/landing-pages/LandingPagesVitrine";
import { LandingPagesExemples } from "@/components/landing-pages/LandingPagesExemples";
import { LandingPagesProcess } from "@/components/landing-pages/LandingPagesProcess";
import { LandingPagesPricing } from "@/components/landing-pages/LandingPagesPricing";
import { LandingPagesFAQ } from "@/components/landing-pages/LandingPagesFAQ";
import { LandingPagesCTA } from "@/components/landing-pages/LandingPagesCTA";

export const metadata: Metadata = {
  title: "Landing Pages Haute Conversion pour SaaS | Aurentia Agency",
  description:
    "Design spectaculaire, animations premium, optimisees conversion. Landing pages SaaS sur-mesure des 1 500\u20AC. Ce site est notre carte de visite.",
  openGraph: {
    title: "Landing Pages Haute Conversion — Aurentia Agency",
    description:
      "Design spectaculaire, animations premium, optimisees conversion. Des 1 500\u20AC. Ce site est notre carte de visite.",
    url: "https://aurentia.agency/landing-pages",
    type: "website",
    images: ["/images/opengraph/opengraph.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Landing Pages Haute Conversion",
    provider: {
      "@type": "Organization",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
    description:
      "Creation de landing pages haute conversion pour SaaS et produits tech. Design premium, animations GSAP/Framer Motion, responsive, SEO, performance.",
    url: "https://aurentia.agency/landing-pages",
    areaServed: "FR",
    offers: {
      "@type": "Offer",
      price: "1500",
      priceCurrency: "EUR",
      description: "A partir de 1 500\u20AC sur devis",
    },
    serviceType: [
      "Landing Page",
      "Page de conversion",
      "Design web premium",
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
        name: "Landing Pages",
        item: "https://aurentia.agency/landing-pages",
      },
    ],
  },
];

export default function LandingPagesPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden">
        <LandingPagesHero />
        <LandingPagesVitrine />
        <LandingPagesFeatures />
        <LandingPagesExemples />
        <LandingPagesProcess />
        <LandingPagesPricing />
        <LandingPagesFAQ />
        <LandingPagesCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
