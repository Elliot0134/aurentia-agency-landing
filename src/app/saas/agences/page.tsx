import type { Metadata } from "next";
import { SaaSAgencesClient } from "@/components/v2/saas/SaaSAgencesClient";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { serviceSchema, breadcrumb } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "SaaS en marque blanche pour agences — Département tech externalisé",
  description: "Aurentia Agency devient votre équipe tech invisible. On code vos projets client en marque blanche depuis Avignon. NDA, code 100% à vous, devis en 48h.",
  alternates: { canonical: "/saas/agences" },
  openGraph: {
    title: "SaaS en marque blanche pour agences",
    description: "Votre département tech externalisé. Code en backstage, 0 mention Aurentia, marge 100% pour vous.",
    url: "https://aurentia.agency/saas/agences",
    images: [{ url: "/images/opengraph/opengraph.png", width: 1200, height: 630, alt: "Aurentia Agency — SaaS pour agences" }],
  },
};

export default function SaasAgencesPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: "SaaS en marque blanche pour agences",
        description: "Aurentia Agency développe vos projets client en marque blanche. Équipe tech invisible, NDA, code 100% propriété de l'agence partenaire.",
        url: "/saas/agences",
      })} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/" },
        { name: "SaaS sur-mesure", url: "/saas" },
        { name: "Pour les agences", url: "/saas/agences" },
      ])} />
      <SaaSAgencesClient />
    </>
  );
}
