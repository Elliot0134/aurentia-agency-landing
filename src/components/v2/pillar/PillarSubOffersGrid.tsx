// src/components/v2/pillar/PillarSubOffersGrid.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CommercialPillarData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card, cardClasses, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { PriceHT } from "@/components/v2/shared/PriceHT";
import { cn } from "@/lib/utils";

type PillarSubOffersGridProps = {
  subOffers: CommercialPillarData["subOffers"];
};

export function PillarSubOffersGrid({ subOffers }: PillarSubOffersGridProps) {
  return (
    <SectionContainer id="offers" eyebrow="Nos offres" title={subOffers.title}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subOffers.variant === "grid"
          ? subOffers.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    cardClasses,
                    cardInteractiveClasses,
                    "group flex h-full flex-col gap-5 p-7",
                  )}
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="flex-1 text-base text-foreground/70">{item.pitch}</p>
                  {item.priceFrom && (
                    <p className="text-sm text-foreground/55">
                      À partir de <span className="font-semibold text-foreground"><PriceHT value={item.priceFrom} /></span>
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                    Découvrir <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              );
            })
          : subOffers.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className={cn(cardInteractiveClasses, "flex h-full flex-col gap-5 p-7")}
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="flex-1 text-base text-foreground/70">{item.description}</p>
                </Card>
              );
            })}
      </div>

      {subOffers.variant === "single" && subOffers.stack && subOffers.stack.length > 0 && (
        <Card className="mt-16 flex flex-col gap-4 p-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">
            Notre stack
          </h3>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {subOffers.stack.map((tech) => (
              <span key={tech.name} className="text-base font-medium text-foreground/70">
                {tech.name}
              </span>
            ))}
          </div>
        </Card>
      )}
    </SectionContainer>
  );
}
