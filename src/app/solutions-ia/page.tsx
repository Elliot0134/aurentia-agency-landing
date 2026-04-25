// src/app/v2/solutions-ia/page.tsx
import type { Metadata } from "next";
import { SolutionsIaPillarPage } from "@/components/v2/solutions-ia/SolutionsIaPillarPage";

export const metadata: Metadata = {
  title: "Solutions IA pour entreprises",
  description:
    "Formation, configuration Claude, audit et implémentation IA. L'IA dans votre quotidien business.",
};

export default function SolutionsIaPage() {
  return <SolutionsIaPillarPage />;
}
