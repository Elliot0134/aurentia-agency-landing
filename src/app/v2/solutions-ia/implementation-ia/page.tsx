// src/app/v2/solutions-ia/implementation-ia/page.tsx
import type { Metadata } from "next";
import { SubPage } from "@/components/v2/subpage/SubPage";
import { solutionsIaImplementationData } from "@/data/v2/solutions-ia-implementation";

export const metadata: Metadata = {
  title: "Implémentation IA — skills custom déployés chez vous",
  description:
    "Skills Claude personnalisés développés et déployés dans votre workflow. Atelier, dev, déploiement, formation, support.",
};

export default function ImplementationIaPage() {
  return <SubPage data={solutionsIaImplementationData} />;
}
