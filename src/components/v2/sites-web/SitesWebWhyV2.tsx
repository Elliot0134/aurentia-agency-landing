// src/components/v2/sites-web/SitesWebWhyV2.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { sitesWebExtra } from "@/data/v2/sites-web";
import { cn } from "@/lib/utils";

export function SitesWebWhyV2() {
  const { why } = sitesWebExtra;

  return (
    <SectionContainer
      id="why"
      title={why.title}
      subtitle={why.subtitle}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {why.items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <BlurReveal key={item.title} delay={idx * 0.1}>
              <Card
                className={cn(
                  cardInteractiveClasses,
                  "group flex flex-col gap-4 p-7 h-full",
                )}
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-foreground/65">
                  {item.description}
                </p>
                {item.ctaLabel && item.ctaHref && (
                  <Link
                    href={item.ctaHref}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent-primary transition-all duration-500 ease-in-out hover:gap-3"
                  >
                    {item.ctaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </Card>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
