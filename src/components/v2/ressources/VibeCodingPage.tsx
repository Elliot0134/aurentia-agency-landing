// src/components/v2/ressources/VibeCodingPage.tsx
//
// Page /ressources/vibe-coding rendue en layout article-blog :
// hero centré, cover image placeholder, sommaire sticky + contenu.

import Link from "next/link";
import { ArrowRight, MessageCircle, type LucideIcon } from "lucide-react";
import { PageHeroCentered } from "@/components/v2/shared/PageHeroCentered";
import { ResourceArticleLayout } from "./ResourceArticleLayout";
import { ResourceArticleToc } from "./ResourceArticleToc";
import { ResourceCover } from "./ResourceCover";
import { SectionCTAFinal } from "./sections/SectionCTAFinal";
import { SectionConcepts } from "./sections/SectionConcepts";
import { SectionParadigmes } from "./sections/SectionParadigmes";
import { SectionOutils } from "./sections/SectionOutils";
import { SectionDecision } from "./sections/SectionDecision";
import { SectionMethode } from "./sections/SectionMethode";
import { SectionPrompts } from "./sections/SectionPrompts";
import { SectionStack } from "./sections/SectionStack";
import { SectionRisques } from "./sections/SectionRisques";
import { vibeCodingHero, vibeCodingToc } from "@/data/v2/vibe-coding";

type ArticleSection = {
  id: string;
  label: string;
  eyebrow: string;
  Renderer: React.ComponentType;
};

const SECTIONS: ArticleSection[] = [
  { id: "concepts",   label: "Le vibe coding, c'est quoi ?",        eyebrow: "Chapitre 01", Renderer: SectionConcepts },
  { id: "paradigmes", label: "Les 3 paradigmes du marché",          eyebrow: "Chapitre 02", Renderer: SectionParadigmes },
  { id: "outils",     label: "Le benchmark des 10 outils",          eyebrow: "Chapitre 03", Renderer: SectionOutils },
  { id: "decision",   label: "Quel outil pour quel profil ?",       eyebrow: "Chapitre 04", Renderer: SectionDecision },
  { id: "methode",    label: "La méthode pro en 6 étapes",          eyebrow: "Chapitre 05", Renderer: SectionMethode },
  { id: "prompts",    label: "Prompts & templates copiables",       eyebrow: "Chapitre 06", Renderer: SectionPrompts },
  { id: "stack",      label: "Les outils qu'on conseille",          eyebrow: "Chapitre 07", Renderer: SectionStack },
  { id: "risques",    label: "Risques & vibe engineering",          eyebrow: "Chapitre 08", Renderer: SectionRisques },
];

export function VibeCodingPage() {
  return (
    <ResourceArticleLayout
      gate={{
        resourceId: "vibe-coding",
        resourceLabel: "Le guide pour vibe-coder avec Claude (méthodes, prompts, anti-patterns).",
      }}
      hero={
        <PageHeroCentered
          eyebrow={vibeCodingHero.eyebrow}
          headline={vibeCodingHero.headline}
          subHeadline={vibeCodingHero.subHeadline}
          cta={vibeCodingHero.cta}
        />
      }
      cover={<ResourceCover label="Ressource · Vibe coding" />}
      toc={
        <ResourceArticleToc entries={vibeCodingToc}>
          <SidebarMiniCta
            icon={MessageCircle}
            title="Discuter de ton setup"
            description="Un échange de 30 min pour cadrer ta stack vibe coding."
            label="Demander un échange"
            href="/contact"
          />
        </ResourceArticleToc>
      }
      footer={<SectionCTAFinal />}
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
