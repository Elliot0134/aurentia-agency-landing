// src/app/v2/solutions-ia/configuration-claude/page.tsx
import type { Metadata } from "next";
import { SubPage } from "@/components/v2/subpage/SubPage";
import { solutionsIaConfigClaudeData } from "@/data/v2/solutions-ia-config-claude";

export const metadata: Metadata = {
  title: "Configuration Claude pour votre workflow",
  description:
    "Hooks, skills, MCP servers, CLAUDE.md custom. On configure Claude exactement pour votre stack et vos besoins.",
};

export default function ConfigurationClaudePage() {
  return <SubPage data={solutionsIaConfigClaudeData} />;
}
