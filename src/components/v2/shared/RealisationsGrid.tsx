// src/components/v2/shared/RealisationsGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Realisation } from "@/data/v2/types";
import { SectionContainer } from "./SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

type RealisationsGridProps = {
  realisations: Realisation[];
  title?: string;
  subtitle?: string;
  id?: string;
  seeMoreHref?: string;
  seeMoreLabel?: string;
  className?: string;
};

/**
 * Bento-style realisations grid, visually aligned with HomeRealisationsPreview
 * but without the multi-image slider chrome (data shape only has 1 image).
 */
export function RealisationsGrid({
  realisations,
  title = "Nos dernières réalisations",
  subtitle,
  id = "realisations",
  seeMoreHref,
  seeMoreLabel = "Voir toutes nos réalisations",
  className,
}: RealisationsGridProps) {
  if (realisations.length === 0) return null;

  // Layouts: 2 items = side-by-side; 3 = first spans 2 cols; fallback = 3-col grid
  const layoutClass = (idx: number, total: number) => {
    if (total === 2) return "md:col-span-3";
    if (total === 3 && idx === 0) return "md:col-span-2 md:row-span-2";
    if (total === 3) return "md:col-span-1";
    // 4+ items: alternate feature card
    if (idx === 0) return "md:col-span-2 md:row-span-2";
    return "md:col-span-1";
  };

  return (
    <SectionContainer id={id} title={title} subtitle={subtitle} className={className}>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5",
          realisations.length === 2 ? "md:grid-cols-2" : "auto-rows-[220px] md:auto-rows-[200px]"
        )}
      >
        {realisations.map((r, idx) => (
          <BlurReveal key={r.slug} delay={idx * 0.1} className={layoutClass(idx, realisations.length)}>
            <Link
              href={r.href}
              className="group relative block h-full w-full overflow-hidden rounded-3xl border border-transparent dark:border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] transition-colors duration-500 ease-in-out dark:hover:border-foreground/25"
              data-cursor="click"
            >
              {/* Image background */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[inherit]">
                <Image
                  src={r.imageUrl}
                  alt={r.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Top gradient — subtle */}
              <div className="absolute inset-x-0 top-0 h-20 md:h-14 bg-gradient-to-b from-foreground/30 to-transparent z-[1] pointer-events-none rounded-t-[inherit]" />

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-28 md:h-24 bg-gradient-to-t from-foreground/55 via-foreground/20 to-transparent z-[1] pointer-events-none rounded-b-[inherit]" />

              <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-5">
                <div className="flex justify-between items-start w-full transition-transform duration-500 ease-in-out group-hover:-translate-y-1">
                  <span className="text-sm font-mono uppercase tracking-widest py-1 px-3 rounded-full border border-foreground/20 bg-background/55 text-foreground backdrop-blur-md">
                    {r.client}
                  </span>
                  <span className="text-sm font-mono py-1 px-3 rounded-full border border-foreground/20 bg-background/45 text-foreground backdrop-blur-md">
                    {r.resultKpi}
                  </span>
                </div>

                <div className="transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                  <div className="flex items-end justify-between gap-3">
                    <h3 className="text-base md:text-lg font-bold leading-snug text-background">
                      {r.title}
                    </h3>
                    <span className="text-accent-primary text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out shrink-0">
                      Découvrir&nbsp;→
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </BlurReveal>
        ))}
      </div>

      {seeMoreHref && (
        <BlurReveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Link
              href={seeMoreHref}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90 group/cta"
            >
              {seeMoreLabel}
              <svg
                className="size-4 transition-transform duration-500 ease-in-out group-hover/cta:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </BlurReveal>
      )}
    </SectionContainer>
  );
}
