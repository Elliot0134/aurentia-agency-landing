// src/components/v2/subpage/SubPageTrustBand.tsx
"use client";

import type { Stat } from "@/data/v2/types";
import { BlurReveal } from "@/components/animations/BlurReveal";

type SubPageTrustBandProps = {
  stats: Stat[];
};

export function SubPageTrustBand({ stats }: SubPageTrustBandProps) {
  return (
    <section className="w-full px-4 py-6 md:px-6 md:py-8">
      <BlurReveal>
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-y border-foreground/10 py-8 md:grid-cols-4 md:py-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                </span>
                <span className="text-sm uppercase tracking-[0.14em] text-foreground/55">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </BlurReveal>
    </section>
  );
}
