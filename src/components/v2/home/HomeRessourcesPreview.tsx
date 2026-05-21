// src/components/v2/home/HomeRessourcesPreview.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";

type ResourceCardData = {
  href: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
};

const RESOURCES: ResourceCardData[] = [
  {
    href: "/ressources/implementer-claude",
    category: "Kit",
    title: "Implémenter Claude dans ton business",
    excerpt:
      "Les prompts, skills, configs et templates qu'on déploie chez nos clients. CLAUDE.md, Memory, MCP, context7, skill creator, séquence 14 jours. Copie, colle, c'est branché.",
    readingTime: "Setup ~2 weekends",
  },
  {
    href: "/ressources/vibe-coding",
    category: "Guide",
    title: "Le guide complet du vibe coding",
    excerpt:
      "Construire du logiciel en parlant à une IA : 11 outils benchmarkés, méthode pro en 5 étapes, prompts copiables, zones rouges. Sans bullshit.",
    readingTime: "Lecture ~25 min",
  },
];

export function HomeRessourcesPreview() {
  return (
    <SectionContainer
      id="ressources"
      eyebrow="Ressources"
      title="Nos ressources"
      subtitle="Guides, méthodes et retours d'expérience sur tout ce qu'on fait au quotidien chez Aurentia. Direct, gratuit, sans détour."
      alignHeader="center"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-5">
        {RESOURCES.map((r, idx) => (
          <BlurReveal key={r.href} delay={idx * 0.1} className="h-full">
            <ResourceCard resource={r} />
          </BlurReveal>
        ))}
      </div>

      <BlurReveal delay={0.35}>
        <div className="mt-12 flex justify-center">
          <Link
            href="/ressources"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
          >
            Voir toutes les ressources
            <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </Link>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}

function ResourceCard({ resource }: { resource: ResourceCardData }) {
  return (
    <Link href={resource.href} className="block h-full" data-cursor="click">
      <SpotlightCard className="group flex h-full flex-col p-7 border-0 dark:border hover:translate-y-0 md:p-8">
        <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-foreground/60">
          <span>{resource.category}</span>
          <span className="text-foreground/30">·</span>
          <span>{resource.readingTime}</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug text-foreground md:text-xl">
          {resource.title}
        </h3>
        <p className="mt-3 text-sm text-foreground/70">{resource.excerpt}</p>
        <div className="mt-auto flex items-center justify-end pt-6 font-mono text-sm">
          <span className="flex items-center gap-1 text-foreground/60 transition-all duration-500 ease-in-out group-hover:translate-x-0.5 group-hover:text-accent-primary">
            Lire le guide
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
}
