// src/app/solutions-ia/audit/page.tsx
import { SolutionsIaSubPage } from "@/components/v2/solutions-ia/SolutionsIaSubPage";
import { pageMeta } from "@/lib/seo/metadata";

export const metadata = pageMeta({
  title: "Audit IA de votre business",
  description:
    "Cartographie de vos processus, identification des quick wins IA, roadmap d'implémentation. Express ou approfondi.",
  path: "/solutions-ia/audit",
});

export default function AuditPage() {
  return <SolutionsIaSubPage slug="audit" />;
}
