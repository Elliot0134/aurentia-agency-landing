// src/components/v2/home/HomePillarsGrid.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

export function HomePillarsGrid() {
  const { pillars } = homeData;
  return (
    <SectionContainer id="pillars" eyebrow={pillars.eyebrow} title={pillars.title}>
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.items.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.title}
              href={p.href}
              className="group flex h-full flex-col gap-5 rounded-2xl border border-foreground/10 bg-background-surface p-8 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Icon className="size-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">{p.title}</h3>
              <p className="flex-1 text-base text-foreground/70">{p.pitch}</p>
              {p.priceFrom && (
                <p className="text-sm text-foreground/55">
                  À partir de <span className="font-semibold text-foreground">{p.priceFrom}</span>
                </p>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                Découvrir <ArrowUpRight className="size-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </SectionContainer>
  );
}
