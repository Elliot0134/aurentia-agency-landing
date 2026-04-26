// src/components/v2/home/HomeRessourcesPreview.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, type LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";

type ResourceCardData = {
  href: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  icon: LucideIcon;
};

const RESOURCES: ResourceCardData[] = [
  {
    href: "/ressources/vibe-coding",
    category: "Guide",
    title: "Le guide complet du vibe coding",
    excerpt:
      "Construire du logiciel en parlant à une IA : 11 outils benchmarkés, méthode pro en 5 étapes, prompts copiables, zones rouges. Sans bullshit.",
    readingTime: "Lecture ~25 min",
    icon: Sparkles,
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
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
  const Icon = resource.icon;
  return (
    <Link href={resource.href} className="block h-full" data-cursor="click">
      <SpotlightCard className="group flex h-full flex-col overflow-hidden p-0 border-0 dark:border hover:translate-y-0">
        {/* Cover — CSS-only illustration */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-foreground/10 bg-foreground/[0.04]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 90% at 80% 20%, color-mix(in srgb, var(--orange-500) 28%, transparent) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 10% 90%, color-mix(in srgb, var(--orange-500) 14%, transparent) 0%, transparent 65%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-20 items-center justify-center rounded-3xl border border-foreground/10 bg-background/70 text-accent-primary backdrop-blur-sm transition-transform duration-700 ease-in-out group-hover:scale-110 md:size-24">
              <Icon className="size-9 md:size-11" strokeWidth={1.4} aria-hidden />
            </div>
          </div>
          {/* Subtle grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-foreground/60">
            <span>{resource.category}</span>
            <span className="text-foreground/30">·</span>
            <span>{resource.readingTime}</span>
          </div>
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground md:text-xl">
            {resource.title}
          </h3>
          <p className="line-clamp-3 text-sm text-foreground/70">{resource.excerpt}</p>
          <div className="mt-auto flex items-center justify-end pt-2 font-mono text-sm">
            <span className="flex items-center gap-1 text-foreground/60 transition-all duration-500 ease-in-out group-hover:translate-x-0.5 group-hover:text-accent-primary">
              Lire le guide
              <ArrowRight className="size-3.5" />
            </span>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
