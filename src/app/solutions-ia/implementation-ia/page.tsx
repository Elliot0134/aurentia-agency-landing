import type { Metadata } from "next";
import { ImplementationIAClient } from "@/components/v2/implementation-ia/ImplementationIAClient";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { serviceSchema, breadcrumb } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Implémentation IA en entreprise à Avignon — Claude, n8n, automatisation",
  description: "Aurentia Agency déploie l'IA dans votre entreprise depuis Avignon. Configuration Claude, workflows n8n, audits IA. Équipe senior, livraison en sprint.",
  alternates: { canonical: "/solutions-ia/implementation-ia" },
  openGraph: {
    title: "Implémentation IA en entreprise à Avignon",
    description: "Configuration Claude, workflows n8n, audits IA. Équipe senior, livraison en sprint.",
    url: "https://aurentia.agency/solutions-ia/implementation-ia",
    images: [{ url: "/images/opengraph/opengraph.png", width: 1200, height: 630, alt: "Aurentia Agency — Implémentation IA" }],
  },
};

export default function ImplementationIAPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: "Implémentation IA en entreprise",
        description: "Aurentia Agency déploie l'IA dans votre entreprise depuis Avignon. Configuration Claude, workflows n8n, automatisations sur-mesure.",
        url: "/solutions-ia/implementation-ia",
      })} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/" },
        { name: "Solutions IA", url: "/solutions-ia" },
        { name: "Implémentation IA", url: "/solutions-ia/implementation-ia" },
      ])} />
      <ImplementationIAClient />
    </>
  );
}
