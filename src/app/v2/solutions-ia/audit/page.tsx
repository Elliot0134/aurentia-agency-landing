// src/app/v2/solutions-ia/audit/page.tsx
import type { Metadata } from "next";
import { SubPage } from "@/components/v2/subpage/SubPage";
import { solutionsIaAuditData } from "@/data/v2/solutions-ia-audit";

export const metadata: Metadata = {
  title: "Audit IA de votre business",
  description:
    "Cartographie de vos processus, identification des quick wins IA, roadmap d'implémentation. Express ou approfondi.",
};

export default function AuditPage() {
  return <SubPage data={solutionsIaAuditData} />;
}
