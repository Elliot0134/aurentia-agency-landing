// src/app/v2/solutions-ia/page.tsx
import type { Metadata } from "next";
import { CommercialPillarPage } from "@/components/v2/pillar/CommercialPillarPage";
import { solutionsIaData } from "@/data/v2/solutions-ia";

export const metadata: Metadata = {
  title: "Solutions IA pour entreprises",
  description:
    "Formation, configuration Claude, audit et implémentation IA. L'IA dans votre quotidien business.",
};

export default function SolutionsIaPillarPage() {
  return <CommercialPillarPage data={solutionsIaData} />;
}
