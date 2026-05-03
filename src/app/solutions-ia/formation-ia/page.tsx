import type { Metadata } from "next";
import { FormationIAClient } from "@/components/v2/formation-ia/FormationIAClient";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { serviceSchema, breadcrumb } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Formation IA pour entreprises à Avignon — Claude, n8n, automatisation",
  description: "Formez votre équipe à l'IA avec Aurentia Agency depuis Avignon. Formations Claude, n8n, automatisations. Programme sur-mesure, formateurs seniors. Devis gratuit.",
  alternates: { canonical: "/solutions-ia/formation-ia" },
  openGraph: {
    title: "Formation IA pour entreprises à Avignon",
    description: "Formations Claude, n8n, automatisations. Programme sur-mesure, formateurs seniors.",
    url: "https://aurentia.agency/solutions-ia/formation-ia",
    images: [{ url: "/images/opengraph/opengraph.png", width: 1200, height: 630, alt: "Aurentia Agency — Formation IA" }],
  },
};

export default function FormationIaPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: "Formation IA pour entreprises",
        description: "Aurentia Agency forme vos équipes à l'IA depuis Avignon. Formations Claude, n8n, automatisations sur-mesure.",
        url: "/solutions-ia/formation-ia",
      })} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/" },
        { name: "Solutions IA", url: "/solutions-ia" },
        { name: "Formation IA", url: "/solutions-ia/formation-ia" },
      ])} />
      <FormationIAClient />
    </>
  );
}
