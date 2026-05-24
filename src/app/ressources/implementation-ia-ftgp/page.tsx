// src/app/ressources/implementation-ia-ftgp/page.tsx
//
// Ressource exclusive (non indexée, non listée dans la navigation) destinée
// aux membres French Tech Grande Provence — suite de l'intervention sur
// l'implémentation IA en entreprise. Lead magnet → objectif : prise de RDV.
//
// Layout article-blog : hero + cover + (TOC sticky | contenu) + footer CTA.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { cardClasses } from "@/components/v2/shared/Card";
import { PartnershipHero } from "@/components/v2/shared/PartnershipHero";
import { AurentiaPluginSection } from "@/components/v2/ressources/AurentiaPluginSection";
import { ResourceArticleLayout } from "@/components/v2/ressources/ResourceArticleLayout";
import { ResourceArticleToc } from "@/components/v2/ressources/ResourceArticleToc";
import { VideoSummaryAccordion } from "@/components/v2/ressources/VideoSummaryAccordion";
import { implementationIaFtgp } from "@/data/v2/implementation-ia-ftgp";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Implémentation IA — FTGP | Aurentia",
  description:
    "Ressources exclusives French Tech Grande Provence : présentation, replay et plugins de l'intervention sur l'implémentation IA en entreprise.",
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

const { partner, hero, toc, canva, video, plugin, finalCtas } =
  implementationIaFtgp;

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-3 md:mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        {description}
      </p>
    </header>
  );
}

export default function ImplementationIaFtgpPage() {
  return (
    <ResourceArticleLayout
      gate={{
        resourceId: "implementation-ia-ftgp",
        resourceLabel:
          "Présentation, replay et plugin de l'intervention French Tech Grande Provence.",
      }}
      hero={
        <PartnershipHero
          partner={{
            name: partner.name,
            contextLabel: hero.contextLabel,
            logo: partner.logo,
            href: partner.href,
          }}
          headline={hero.headline}
          subHeadline={hero.subheadline}
          cta={hero.cta}
        />
      }
      toc={
        <ResourceArticleToc entries={toc}>
          {/* Mini CTA RDV sous le sommaire — lead-magnet conversion permanente */}
          <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-transparent p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-inset ring-primary/30">
              <Calendar className="h-4 w-4" />
            </div>
            <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-foreground">
              Une question ?
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Réserve 30 min avec Elliot pour cadrer ton implémentation IA.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all duration-500 ease-in-out hover:gap-3 hover:text-accent-primary"
            >
              Bloquer un créneau
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ResourceArticleToc>
      }
      footer={
        <section
          id="aller-plus-loin"
          className="w-full px-6 py-20 md:px-12 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                Aller plus loin
              </p>
              <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Prêt à passer à l&apos;exécution ?
              </h2>
              <p className="max-w-xl text-base text-foreground/65 md:text-lg">
                Trois manières d&apos;aller plus loin après l&apos;intervention.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {finalCtas.map((c) => {
                const Icon = c.icon;
                return (
                  <Link
                    key={c.title}
                    href={c.cta.href}
                    className={cn(
                      cardClasses,
                      "group flex flex-col gap-5 p-7 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:border-accent-primary/40 md:p-8",
                    )}
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                      <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                    </div>
                    <h3 className="font-heading text-xl text-foreground md:text-2xl">
                      {c.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-foreground/65 md:text-base">
                      {c.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all duration-500 ease-in-out group-hover:gap-3 group-hover:text-accent-primary">
                      {c.cta.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      }
    >
      {/* Slides Canva */}
      <section id="presentation" className="scroll-mt-28">
        <SectionHeader
          eyebrow={canva.eyebrow}
          title={canva.title}
          description={canva.description}
        />
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
          <div className="relative aspect-video w-full">
            <iframe
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
              src={canva.embedUrl}
              allow="fullscreen"
              allowFullScreen
              title={canva.title}
            />
          </div>
        </div>
      </section>

      {/* Replay YouTube */}
      <section id="replay" className="scroll-mt-28">
        <SectionHeader
          eyebrow={video.eyebrow}
          title={video.title}
          description={video.description}
        />
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
          <div className="relative aspect-video w-full">
            <iframe
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
              src={video.embedUrl}
              allow="autoplay; fullscreen"
              allowFullScreen
              title={video.title}
            />
          </div>
        </div>
        <VideoSummaryAccordion
          label={video.summary.label}
          intro={video.summary.intro}
          chapters={video.summary.chapters}
        />
      </section>

      {/* Plugin Aurentia v2 */}
      <section id="plugins" className="scroll-mt-28">
        <SectionHeader
          eyebrow={plugin.eyebrow}
          title={plugin.title}
          description={plugin.description}
        />
        <AurentiaPluginSection
          version={plugin.version}
          download={plugin.download}
          steps={plugin.steps}
          skillCategories={plugin.skillCategories}
          partnerLabel={`Distribué via ${partner.name}`}
        />
      </section>
    </ResourceArticleLayout>
  );
}
