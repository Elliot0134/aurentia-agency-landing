import type { Metadata } from "next";
import { SitesWebClient } from "@/components/v2/sites-web/SitesWebClient";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { serviceSchema, breadcrumb } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Sites web sur-mesure à Avignon — Vitrine, SaaS, E-commerce",
  description: "Aurentia Agency crée votre site web sur-mesure depuis Avignon. Sites vitrines, e-commerce, landing pages. Livraison en 72h à 2 semaines. Devis gratuit.",
  alternates: { canonical: "/sites-web" },
  openGraph: {
    title: "Sites web sur-mesure à Avignon",
    description: "Sites vitrines, e-commerce et landing pages. Livraison rapide, qualité senior.",
    url: "https://aurentia.agency/sites-web",
    images: [{ url: "/images/opengraph/opengraph.png", width: 1200, height: 630, alt: "Aurentia Agency — Sites web" }],
  },
};

export default function SitesWebPillarPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: "Création de sites web sur-mesure",
        description: "Aurentia Agency conçoit des sites vitrines, e-commerce et landing pages sur-mesure depuis Avignon.",
        url: "/sites-web",
      })} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/" },
        { name: "Sites web", url: "/sites-web" },
      ])} />
      <SitesWebClient />
    </>
  );
}
