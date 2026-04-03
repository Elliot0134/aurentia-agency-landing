import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SitesVitrinesHero } from "@/components/sites-vitrines/SitesVitrinesHero";
import { SitesVitrinesShowcase } from "@/components/sites-vitrines/SitesVitrinesShowcase";
import { SitesVitrinesFeatures } from "@/components/sites-vitrines/SitesVitrinesFeatures";
import { SitesVitrinesProcess } from "@/components/sites-vitrines/SitesVitrinesProcess";
import { SitesVitrinesNiches } from "@/components/sites-vitrines/SitesVitrinesNiches";
import { SitesVitrinesPricing } from "@/components/sites-vitrines/SitesVitrinesPricing";
import { SitesVitrinesDifferenciateurs } from "@/components/sites-vitrines/SitesVitrinesDifferenciateurs";
import { SitesVitrinesPortfolio } from "@/components/sites-vitrines/SitesVitrinesPortfolio";
import { SitesVitrinesFAQ } from "@/components/sites-vitrines/SitesVitrinesFAQ";
import { SitesVitrinesCTA } from "@/components/sites-vitrines/SitesVitrinesCTA";
import { SubNavSetter } from "@/components/shared/SubNavContext";
import { faqItems } from "@/data/sites-vitrines-content";

const subNavItems = [
  { label: "Démo", sectionId: "showcase" },
  { label: "Avantages", sectionId: "features" },
  { label: "Processus", sectionId: "process" },
  { label: "Secteurs", sectionId: "niches" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "Pourquoi nous", sectionId: "differenciateurs" },
  { label: "Portfolio", sectionId: "portfolio" },
  { label: "FAQ", sectionId: "faq" },
];

export const metadata: Metadata = {
  title: "Site Vitrine Sur-Mesure d\u00e8s 1\u202F200\u202F\u20ac \u2014 Livr\u00e9 en 48h | Aurentia",
  description:
    "Site vitrine professionnel, unique, optimis\u00e9 SEO. Livr\u00e9 en 48h par notre \u00e9quipe IA + 20 ans d\u2019expertise web. D\u00e8s 1\u202F200\u202F\u20ac. Z\u00e9ro template.",
  openGraph: {
    title: "Site Vitrine Sur-Mesure d\u00e8s 1\u202F200\u202F\u20ac \u2014 Livr\u00e9 en 48h",
    description:
      "Z\u00e9ro template. SEO int\u00e9gr\u00e9. Design unique. Livr\u00e9 en 48h par 20 ans d\u2019expertise web + IA.",
    url: "https://aurentia.agency/sites-vitrines",
    type: "website",
    images: [
      {
        url: "/images/opengraph/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Aurentia \u2014 Sites Vitrines Sur-Mesure",
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
    name: "Cr\u00e9ation de Sites Vitrines Sur-Mesure",
    description:
      "Sites vitrines professionnels, uniques, optimis\u00e9s SEO. Livr\u00e9s en 48h. \u00c0 partir de 1\u202F200\u202F\u20ac.",
    provider: {
      "@type": "Organization",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
    serviceType: "Cr\u00e9ation de site web",
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "1200",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        price: "1200",
        description: "\u00c0 partir de 1\u202F200\u202F\u20ac",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sites Vitrines",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Site vitrine conciergerie",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Site vitrine restaurant",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Site vitrine h\u00f4tel",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Site vitrine commerce",
          },
        },
      ],
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
        name: "Sites Vitrines",
        item: "https://aurentia.agency/sites-vitrines",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSchema,
  },
];

export default function SitesVitrinesPage() {
  return (
    <>
      <SubNavSetter items={subNavItems} />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden">
        <SitesVitrinesHero />
        <SitesVitrinesShowcase />
        <SitesVitrinesFeatures />
        <SitesVitrinesProcess />
        <SitesVitrinesNiches />
        <SitesVitrinesPricing />
        <SitesVitrinesDifferenciateurs />
        <SitesVitrinesPortfolio />
        <SitesVitrinesFAQ />
        <SitesVitrinesCTA />
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
