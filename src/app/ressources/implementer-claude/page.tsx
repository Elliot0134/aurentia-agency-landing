// src/app/ressources/implementer-claude/page.tsx
import type { Metadata } from "next";
import { ImplementerClaudePage } from "@/components/v2/ressources/ImplementerClaudePage";

export const metadata: Metadata = {
  title: "Implémenter Claude dans ton business — le kit complet — Aurentia Agency",
  description:
    "Les prompts, skills, configs et templates qu'on déploie chez nos clients. CLAUDE.md, Memory, MCP, context7, skill creator, séquence 14 jours. Copie, colle, ton setup est prêt.",
  openGraph: {
    title: "Le kit pour implémenter Claude dans ton business",
    description:
      "Tout le setup Claude qu'on déploie chez nos clients : templates CLAUDE.md, Memory, MCP, Skills, 15 prompts business, séquence 14 jours.",
    type: "article",
  },
};

export default function ImplementerClaudeResourcePage() {
  return <ImplementerClaudePage />;
}
