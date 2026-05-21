import type { Metadata } from "next";
import { HomeClient } from "@/components/v2/home/HomeClient";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { ORGANIZATION, faqPage } from "@/lib/seo/schema";
import { homeData } from "@/data/v2/home";

export const metadata: Metadata = {
  title: "L'agence web & IA qui ne lance pas tant que ce n'est pas parfait",
  description: "Aurentia Agency conçoit des sites sur-mesure, SaaS et solutions IA depuis Avignon. 25 ans de craft, livraison rapide, équipe senior.",
  alternates: { canonical: "/" },
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aurentia Agency",
  url: "https://aurentia.agency",
  inLanguage: "fr-FR",
  publisher: ORGANIZATION,
};

const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://aurentia.agency/#localbusiness",
  name: "Aurentia Agency",
  url: "https://aurentia.agency",
  image: "https://aurentia.agency/images/opengraph/opengraph.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Avignon",
    addressRegion: "Vaucluse",
    addressCountry: "FR",
  },
  areaServed: ["France", "PACA", "Vaucluse", "Avignon"].map((a) => ({ "@type": "Place", name: a })),
  priceRange: "€€€",
  sameAs: ORGANIZATION.sameAs,
};

export default function Page() {
  const faqSchema = faqPage(homeData.faq);

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={WEBSITE} />
      <JsonLd data={LOCAL_BUSINESS} />
      <JsonLd data={faqSchema} />
      <HomeClient />
    </>
  );
}
