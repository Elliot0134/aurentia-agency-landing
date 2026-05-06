// src/app/solutions-ia/configuration-claude/page.tsx
import { SolutionsIaSubPage } from "@/components/v2/solutions-ia/SolutionsIaSubPage";
import { pageMeta } from "@/lib/seo/metadata";

export const metadata = pageMeta({
  title: "Configuration Claude pour votre workflow",
  description:
    "Hooks, skills, MCP servers, CLAUDE.md custom. On configure Claude exactement pour votre stack et vos besoins.",
  path: "/solutions-ia/configuration-claude",
});

export default function ConfigurationClaudePage() {
  return <SolutionsIaSubPage slug="configuration-claude" />;
}
