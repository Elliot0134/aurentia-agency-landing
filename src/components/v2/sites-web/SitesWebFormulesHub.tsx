// src/components/v2/sites-web/SitesWebFormulesHub.tsx
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { Card } from "@/components/v2/shared/Card";
import { sitesWebFormules } from "@/data/v2/sites-web-formules";

export function SitesWebFormulesHub() {
  return (
    <SectionContainer
      id="services"
      title="Nos services"
      subtitle="Chaque type de site a ses propres tarifs. Cliquez pour découvrir les détails."
    >
      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {sitesWebFormules.map((formule, idx) => (
          <BlurReveal key={formule.slug} delay={idx * 0.08} className="h-full">
            <Card className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[0_0_40px_rgba(228,85,18,0.06)]">
              <Link
                href={formule.href}
                className="flex h-full flex-1 cursor-pointer flex-col p-6 md:p-8"
              >
                <h3 className="mb-2 font-heading text-xl leading-tight text-foreground md:text-2xl">
                  {formule.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {formule.pitch}
                </p>

                <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                  <div className="flex flex-col leading-tight">
                    <span className="font-mono text-sm uppercase tracking-widest text-foreground/30">
                      À partir de
                    </span>
                    <span className="font-mono text-base font-bold text-[var(--orange-600)]">
                      {formule.priceRange.split("–")[0]?.trim() || formule.priceRange}
                    </span>
                  </div>
                  <span className="group/cta inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-500 ease-in-out group-hover:opacity-90">
                    Découvrir
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Card>
          </BlurReveal>
        ))}
      </div>

      {/* Guidance text */}
      <BlurReveal delay={0.3}>
        <p className="mt-10 text-center text-sm text-foreground/60 md:text-base">
          Pas sûr de ce qu'il vous faut&nbsp;?{" "}
          <Link
            href="/v2/contact"
            className="font-semibold text-accent-primary underline-offset-4 transition-colors duration-500 ease-in-out hover:underline"
          >
            Prenez 20 min avec nous, on vous oriente gratuitement.
          </Link>
        </p>
      </BlurReveal>
    </SectionContainer>
  );
}
