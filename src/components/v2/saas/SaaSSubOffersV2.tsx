// src/components/v2/saas/SaaSSubOffersV2.tsx
"use client";

import { saasData } from "@/data/v2/saas";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";

export function SaaSSubOffersV2() {
  const { subOffers } = saasData;
  // saas data is single-variant — guard at runtime for future-proofing
  if (subOffers.variant !== "single") return null;

  return (
    <SectionContainer
      id="offers"
      title={subOffers.title}
      subtitle="Quatre manières de bosser avec nous. Toujours avec la même exigence : du code propre, livré vite, prêt à scaler."
      className="py-20 md:py-24"
      titleClassName="text-4xl md:text-5xl lg:text-6xl mb-4 font-normal"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {subOffers.items.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="group flex flex-col gap-4 rounded-2xl p-7 transition-all duration-500 ease-in-out dark:hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                <Icon className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-base text-foreground/65">{item.description}</p>
            </Card>
          );
        })}
      </div>

      {subOffers.stack && subOffers.stack.length > 0 && (
        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-transparent bg-background-surface p-8 transition-colors duration-500 ease-in-out dark:border-foreground/10 dark:bg-foreground/[0.04]">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">
            Notre stack
          </h3>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {subOffers.stack.map((tech) => (
              <span
                key={tech.name}
                className="text-base font-medium text-foreground/70 transition-colors duration-500 ease-in-out hover:text-foreground"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </SectionContainer>
  );
}
