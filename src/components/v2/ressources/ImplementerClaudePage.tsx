// src/components/v2/ressources/ImplementerClaudePage.tsx
//
// Page /ressources/implementer-claude rendue en layout article-blog :
// hero centré, cover image placeholder, sommaire sticky + contenu.

import Link from "next/link";
import { ArrowRight, MessageCircle, type LucideIcon } from "lucide-react";
import { PageHeroCentered } from "@/components/v2/shared/PageHeroCentered";
import { ResourceArticleLayout } from "./ResourceArticleLayout";
import { ResourceArticleToc } from "./ResourceArticleToc";
import { ResourceCover } from "./ResourceCover";
import { SectionCTAFinalClaude } from "./sections/claude/SectionCTAFinalClaude";
import { SectionChoisirPlan } from "./sections/claude/SectionChoisirPlan";
import { SectionProduits } from "./sections/claude/SectionProduits";
import { SectionClaudeMd } from "./sections/claude/SectionClaudeMd";
import { SectionMemory } from "./sections/claude/SectionMemory";
import { SectionMcp } from "./sections/claude/SectionMcp";
import { SectionContext7 } from "./sections/claude/SectionContext7";
import { SectionSkills } from "./sections/claude/SectionSkills";
import { SectionSkillCreator } from "./sections/claude/SectionSkillCreator";
import { SectionPromptsBusiness } from "./sections/claude/SectionPromptsBusiness";
import { Section14Jours } from "./sections/claude/Section14Jours";
import { SectionRisquesClaude } from "./sections/claude/SectionRisquesClaude";
import {
  implementerClaudeHero,
  implementerClaudeToc,
} from "@/data/v2/implementer-claude";

type ArticleSection = {
  id: string;
  label: string;
  eyebrow: string;
  Renderer: React.ComponentType;
};

const SECTIONS: ArticleSection[] = [
  { id: "choisir-plan",  label: "Choisis ton plan en 2 min",                       eyebrow: "Chapitre 01", Renderer: SectionChoisirPlan },
  { id: "produits",      label: "Les 6 produits Claude (et lequel ouvrir)",        eyebrow: "Chapitre 02", Renderer: SectionProduits },
  { id: "claude-md",     label: "Ton premier CLAUDE.md",                           eyebrow: "Chapitre 03", Renderer: SectionClaudeMd },
  { id: "memory",        label: "Activer Memory comme un pro",                     eyebrow: "Chapitre 04", Renderer: SectionMemory },
  { id: "mcp",           label: "Les 10 MCP à brancher",                           eyebrow: "Chapitre 05", Renderer: SectionMcp },
  { id: "context7",      label: "Context7, la doc à jour des libs",                eyebrow: "Chapitre 06", Renderer: SectionContext7 },
  { id: "skills",        label: "5 Skills business prêts à copier",                eyebrow: "Chapitre 07", Renderer: SectionSkills },
  { id: "skill-creator", label: "Crée tes propres Skills (méta)",                  eyebrow: "Chapitre 08", Renderer: SectionSkillCreator },
  { id: "prompts",       label: "15 prompts business prêts",                       eyebrow: "Chapitre 09", Renderer: SectionPromptsBusiness },
  { id: "14-jours",      label: "La séquence 14 jours",                            eyebrow: "Chapitre 10", Renderer: Section14Jours },
  { id: "risques",       label: "Les 6 erreurs à ne JAMAIS faire",                 eyebrow: "Chapitre 11", Renderer: SectionRisquesClaude },
];

export function ImplementerClaudePage() {
  return (
    <ResourceArticleLayout
      gate={{
        resourceId: "implementer-claude",
        resourceLabel: "Le guide complet pour implémenter Claude dans ton entreprise.",
      }}
      hero={
        <PageHeroCentered
          eyebrow={implementerClaudeHero.eyebrow}
          headline={implementerClaudeHero.headline}
          subHeadline={implementerClaudeHero.subHeadline}
          cta={implementerClaudeHero.cta}
        />
      }
      cover={<ResourceCover label="Ressource · Le kit Claude" />}
      toc={
        <ResourceArticleToc entries={implementerClaudeToc}>
          <SidebarMiniCta
            icon={MessageCircle}
            title="On déploie chez toi ?"
            description="30 min avec Elliot pour cadrer ton setup Claude clé en main."
            label="Demander un accompagnement"
            href="/contact"
          />
        </ResourceArticleToc>
      }
      footer={<SectionCTAFinalClaude />}
    >
      {SECTIONS.map(({ id, label, eyebrow, Renderer }) => (
        <section key={id} id={id} className="scroll-mt-28">
          <header className="mb-8 flex flex-col gap-3 md:mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
              {eyebrow}
            </p>
            <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {label}
            </h2>
          </header>
          <Renderer />
        </section>
      ))}
    </ResourceArticleLayout>
  );
}

function SidebarMiniCta({
  icon: Icon,
  title,
  description,
  label,
  href,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  label: string;
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-transparent p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-inset ring-primary/30">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all duration-500 ease-in-out hover:gap-3 hover:text-accent-primary"
      >
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
