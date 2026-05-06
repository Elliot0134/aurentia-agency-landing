// src/app/solutions-ia/page.tsx
import { SolutionsIaPillarPage } from "@/components/v2/solutions-ia/SolutionsIaPillarPage";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { serviceSchema, breadcrumb } from "@/lib/seo/schema";
import { pageMeta } from "@/lib/seo/metadata";

export const metadata = pageMeta({
  title: "Solutions IA pour entreprises à Avignon",
  description:
    "Formation, configuration Claude, audit et implémentation IA depuis Avignon. Aurentia Agency intègre l'IA dans votre quotidien business.",
  path: "/solutions-ia",
});

export default function SolutionsIaPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
        name: "Solutions IA pour entreprises",
        description: "Aurentia Agency propose formations IA, configuration Claude, audits et implémentation IA pour les entreprises depuis Avignon.",
        url: "/solutions-ia",
      })} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/" },
        { name: "Solutions IA", url: "/solutions-ia" },
      ])} />
      <SolutionsIaPillarPage />
    </>
  );
}
