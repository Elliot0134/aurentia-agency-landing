// src/components/v2/sites-web/SitesWebFinalCtaV2.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { sitesWebExtra } from "@/data/v2/sites-web";
import { LowPolyCoralBg } from "@/components/v2/shared/LowPolyCoralBg";

export function SitesWebFinalCtaV2() {
  const { finalCta } = sitesWebExtra;

  return (
    <SectionContainer id="contact" alignHeader="center" innerClassName="max-w-2xl">
      <BlurReveal>
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {finalCta.title}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
            {finalCta.description}
          </p>

          <Link
            href={finalCta.cta.href}
            className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
          >
            <LowPolyCoralBg />
            <span className="relative">{finalCta.cta.label}</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-500 ease-in-out" />
          </Link>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {finalCta.bullets.map((bullet) => (
              <span
                key={bullet}
                className="inline-flex items-center gap-2 text-sm text-foreground/55"
              >
                <Check className="size-3.5 text-accent-primary" />
                {bullet}
              </span>
            ))}
          </div>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
