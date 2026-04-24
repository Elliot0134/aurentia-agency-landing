// src/app/v2/solutions-ia/configuration-claude/page.tsx
import type { Metadata } from "next";
import { SolutionsIaSubPage } from "@/components/v2/solutions-ia/SolutionsIaSubPage";

export const metadata: Metadata = {
  title: "Configuration Claude pour votre workflow",
  description:
    "Hooks, skills, MCP servers, CLAUDE.md custom. On configure Claude exactement pour votre stack et vos besoins.",
};

export default function ConfigurationClaudePage() {
  return <SolutionsIaSubPage slug="configuration-claude" />;
}
