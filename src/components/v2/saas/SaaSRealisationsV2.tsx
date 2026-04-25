// src/components/saas/SaaSRealisationsV2.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { saasData } from "@/data/v2/saas";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

export function SaaSRealisationsV2() {
  const { realisationsFiltered } = saasData;
  if (realisationsFiltered.length === 0) return null;

  // 2 items → side-by-side feature layout
  const layoutClass = (idx: number, total: number) => {
    if (total === 2) return "md:col-span-1";
    if (total === 3 && idx === 0) return "md:col-span-2 md:row-span-2";
    if (total === 3) return "md:col-span-1";
    if (idx === 0) return "md:col-span-2 md:row-span-2";
    return "md:col-span-1";
  };

  return (
    <SectionContainer
      id="realisations"
      title="Quelques SaaS récents"
      subtitle="Des projets livrés, en production, avec des résultats concrets."
    >
      <div
        className={cn(
          "grid grid-cols-1 gap-4 md:gap-5",
          realisationsFiltered.length === 2
            ? "md:grid-cols-2 auto-rows-[280px] md:auto-rows-[320px]"
            : "md:grid-cols-3 auto-rows-[220px] md:auto-rows-[200px]",
        )}
      >
        {realisationsFiltered.map((r, idx) => (
          <BlurReveal
            key={r.slug}
            delay={idx * 0.1}
            className={layoutClass(idx, realisationsFiltered.length)}
          >
            <Link
              href={r.href}
              className="group relative block h-full w-full overflow-hidden rounded-3xl border border-transparent bg-background-surface transition-colors duration-500 ease-in-out dark:border-foreground/10 dark:bg-foreground/[0.04] dark:hover:border-foreground/25"
              data-cursor="click"
            >
              {/* Background image */}
              <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
                <Image
                  src={r.imageUrl}
                  alt={r.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Top + bottom gradients */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 rounded-t-[inherit] bg-gradient-to-b from-foreground/30 to-transparent md:h-14" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 rounded-b-[inherit] bg-gradient-to-t from-foreground/55 via-foreground/20 to-transparent md:h-24" />

              <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-5">
                <div className="flex w-full items-start justify-between transition-transform duration-500 ease-in-out group-hover:-translate-y-1">
                  <span className="rounded-full border border-foreground/20 bg-background/55 px-3 py-1 font-mono text-sm uppercase tracking-widest text-foreground backdrop-blur-md">
                    {r.client}
                  </span>
                  <span className="rounded-full border border-foreground/20 bg-background/45 px-3 py-1 font-mono text-sm text-foreground backdrop-blur-md">
                    {r.resultKpi}
                  </span>
                </div>

                <div className="transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                  <div className="flex items-end justify-between gap-3">
                    <h3 className="text-base font-bold leading-snug text-background md:text-lg">
                      {r.title}
                    </h3>
                    <span className="shrink-0 translate-x-2 text-sm font-medium text-accent-primary opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
                      Découvrir&nbsp;→
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </BlurReveal>
        ))}
      </div>

      <BlurReveal delay={0.3}>
        <div className="mt-12 flex justify-center">
          <Link
            href="/realisations"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
          >
            Voir toutes nos réalisations
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
    </SectionContainer>
  );
}
