import type { Metadata } from "next";
import { HomeClient } from "@/components/v2/home/HomeClient";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { ORGANIZATION, faqPage, localBusiness } from "@/lib/seo/schema";
import { homeData } from "@/data/v2/home";

export const metadata: Metadata = {
  title: { absolute: "Aurentia Agency — Agence web, SaaS & IA à Avignon" },
  description: "Aurentia Agency conçoit des sites sur-mesure, SaaS et solutions IA depuis Avignon. 25 ans de craft, livraison rapide, équipe senior.",
  alternates: { canonical: "/" },
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aurentia Agency",
  url: "https://www.aurentia.agency",
  inLanguage: "fr-FR",
  publisher: { "@id": "https://www.aurentia.agency/#organization" },
};

export default function Page() {
  const faqSchema = faqPage(homeData.faq);

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={WEBSITE} />
      <JsonLd data={localBusiness()} />
      <JsonLd data={faqSchema} />
      <HomeClient />
    </>
  );
}
