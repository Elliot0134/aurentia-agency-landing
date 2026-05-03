import type { Metadata } from "next";
import { SaaSClient } from "@/components/v2/saas/SaaSClient";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { serviceSchema, breadcrumb } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Développement SaaS sur-mesure à Avignon — MVP en 1-2 semaines",
  description: "Aurentia Agency développe votre SaaS sur-mesure depuis Avignon. MVP fonctionnel en 1 à 2 semaines, stack moderne, IA intégrée. À partir de 5 000 €.",
  alternates: { canonical: "/saas" },
  openGraph: {
    title: "Développement SaaS sur-mesure à Avignon",
    description: "MVP fonctionnel en 1 à 2 semaines. Stack moderne, IA intégrée, équipe senior.",
    url: "https://aurentia.agency/saas",
    images: [{ url: "/images/opengraph/opengraph.png", width: 1200, height: 630, alt: "Aurentia Agency — SaaS" }],
  },
};

export default function HomeSaaS() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: "Développement SaaS sur-mesure",
        description: "Aurentia Agency développe des MVP SaaS en 1 à 2 semaines depuis Avignon. Stack Next.js, Supabase, IA intégrée.",
        url: "/saas",
      })} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/" },
        { name: "SaaS sur-mesure", url: "/saas" },
      ])} />
      <SaaSClient />
    </>
  );
}
