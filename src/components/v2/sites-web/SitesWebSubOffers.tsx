// src/components/v2/sites-web/SitesWebSubOffers.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CommercialPillarData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

type SitesWebSubOffersProps = {
  subOffers: CommercialPillarData["subOffers"];
};

export function SitesWebSubOffers({ subOffers }: SitesWebSubOffersProps) {
  if (subOffers.variant !== "grid") return null;

  return (
    <SectionContainer
      id="sub-offers"
      title={subOffers.title}
      subtitle="Deux formats clairs, un même niveau de finition — selon votre objectif."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {subOffers.items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <BlurReveal key={item.href} delay={idx * 0.1}>
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-5 rounded-3xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] p-8 transition-all duration-500 ease-in-out hover:border-foreground/25 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  {item.priceFrom && (
                    <span className="rounded-full border border-foreground/10 bg-background px-3 py-1 font-mono text-sm text-foreground/70">
                      dès {item.priceFrom}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                  {item.title}
                </h3>

                <p className="flex-1 text-base text-foreground/70 leading-relaxed">
                  {item.pitch}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary transition-all duration-500 ease-in-out group-hover:gap-2.5">
                  Découvrir l&apos;offre
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
