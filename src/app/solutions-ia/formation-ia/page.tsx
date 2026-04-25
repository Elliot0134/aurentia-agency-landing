// src/app/v2/solutions-ia/formation-ia/page.tsx
import type { Metadata } from "next";
import { SolutionsIaSubPage } from "@/components/v2/solutions-ia/SolutionsIaSubPage";

export const metadata: Metadata = {
  title: "Formation IA pour entreprises",
  description:
    "Vidéos, cours et skills pour maîtriser Claude AI, le prompting avancé et l'automatisation IA.",
};

export default function FormationIaPage() {
  return <SolutionsIaSubPage slug="formation-ia" />;
}
