// src/components/v2/pillar/PillarStatsBanner.tsx
import type { Stat } from "@/data/v2/types";

type PillarStatsBannerProps = {
  stats: Stat[];
};

export function PillarStatsBanner({ stats }: PillarStatsBannerProps) {
  return (
    <section className="border-b border-foreground/10 bg-background-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-12">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="font-heading text-3xl font-bold text-accent-primary md:text-4xl">
              {stat.value}
            </span>
            <span className="text-base text-foreground/65">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
