// src/app/v2/solutions-ia/audit/page.tsx
import type { Metadata } from "next";
import { SolutionsIaSubPage } from "@/components/v2/solutions-ia/SolutionsIaSubPage";

export const metadata: Metadata = {
  title: "Audit IA de votre business",
  description:
    "Cartographie de vos processus, identification des quick wins IA, roadmap d'implémentation. Express ou approfondi.",
};

export default function AuditPage() {
  return <SolutionsIaSubPage slug="audit" />;
}
