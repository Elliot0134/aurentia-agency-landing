// src/components/v2/sites-web/SitesWebNichesV2.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { sitesWebExtra } from "@/data/v2/sites-web";
import { cn } from "@/lib/utils";

export function SitesWebNichesV2() {
  const { niches } = sitesWebExtra;

  return (
    <SectionContainer
      id="niches"
      title={niches.title}
      subtitle={niches.subtitle}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {niches.items.map((niche, idx) => {
          const Icon = niche.icon;
          return (
            <BlurReveal key={niche.title} delay={idx * 0.08}>
              <Card
                className={cn(
                  cardInteractiveClasses,
                  "group relative flex flex-col gap-4 p-7 h-full",
                )}
              >
                {niche.badge && (
                  <span className="absolute top-4 right-4 rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-accent-primary">
                    {niche.badge}
                  </span>
                )}
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {niche.title}
                </h3>
                <p className="text-base leading-relaxed text-foreground/65">
                  {niche.description}
                </p>
                {niche.href && niche.ctaLabel && (
                  <Link
                    href={niche.href}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-all duration-500 ease-in-out hover:gap-3"
                  >
                    {niche.ctaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </Card>
            </BlurReveal>
          );
        })}
      </div>

      <BlurReveal delay={0.5}>
        <p className="mt-10 text-center text-base text-foreground/55">
          {niches.footerNote}
        </p>
      </BlurReveal>
    </SectionContainer>
  );
}
