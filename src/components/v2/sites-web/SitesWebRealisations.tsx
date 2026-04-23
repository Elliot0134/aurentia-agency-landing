// src/components/v2/sites-web/SitesWebRealisations.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Realisation } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

type SitesWebRealisationsProps = {
  items: Realisation[];
};

function RealisationCardBento({
  realisation,
  large = false,
}: {
  realisation: Realisation;
  large?: boolean;
}) {
  return (
    <Link
      href={realisation.href}
      className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-background transition-all duration-500 ease-in-out hover:border-foreground/25"
    >
      {/* Image background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={realisation.imageUrl}
          alt={realisation.title}
          fill
          className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
          sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-foreground/30 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground/70 via-foreground/25 to-transparent" />
      </div>

      {/* Top row — client tag + KPI */}
      <div className="relative z-10 flex items-start justify-between gap-3 p-5 transition-transform duration-500 ease-in-out group-hover:-translate-y-1">
        <span className="rounded-full border border-foreground/20 bg-background/55 px-3 py-1 font-mono text-sm uppercase tracking-widest text-foreground backdrop-blur-md">
          {realisation.client}
        </span>
        <span className="rounded-full border border-foreground/20 bg-background/45 px-3 py-1 font-mono text-sm text-foreground backdrop-blur-md">
          {realisation.resultKpi}
        </span>
      </div>

      {/* Bottom — title + arrow */}
      <div className="relative z-10 flex items-end justify-between gap-3 p-5 transition-transform duration-500 ease-in-out group-hover:translate-x-1">
        <h3 className="max-w-[80%] font-heading text-base font-bold leading-snug text-background md:text-lg">
          {realisation.title}
        </h3>
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-background text-foreground opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}

export function SitesWebRealisations({ items }: SitesWebRealisationsProps) {
  if (items.length === 0) return null;

  // Homepage-like bento: first card large, others normal
  const [first, ...rest] = items;

  return (
    <SectionContainer
      id="realisations"
      title="Quelques projets récents"
      subtitle="Des sites livrés rapidement, pensés pour convertir — et qu'on aime montrer."
    >
      {rest.length > 0 ? (
        <div className="grid auto-rows-[240px] grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-3 md:gap-5">
          <BlurReveal className="md:col-span-2 md:row-span-2">
            <RealisationCardBento realisation={first} large />
          </BlurReveal>
          {rest.map((item, idx) => (
            <BlurReveal
              key={item.slug}
              delay={(idx + 1) * 0.1}
              className="md:col-span-1"
            >
              <RealisationCardBento realisation={item} />
            </BlurReveal>
          ))}
        </div>
      ) : (
        <div className="grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <BlurReveal>
            <RealisationCardBento realisation={first} large />
          </BlurReveal>
        </div>
      )}

      <BlurReveal delay={0.3}>
        <div className="mt-12 flex justify-center">
          <Link
            href="/v2/realisations"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:gap-3 hover:bg-foreground/90"
          >
            Voir toutes nos réalisations
            <ArrowUpRight className="size-4 transition-transform duration-500 ease-in-out" />
          </Link>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
