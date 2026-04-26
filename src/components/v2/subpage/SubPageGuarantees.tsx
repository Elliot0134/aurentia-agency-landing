// src/components/v2/subpage/SubPageGuarantees.tsx
"use client";

import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

type Guarantee = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type SubPageGuaranteesProps = {
  items: Guarantee[];
};

export function SubPageGuarantees({ items }: SubPageGuaranteesProps) {
  return (
    <SectionContainer
      id="guarantees"
      eyebrow="Zéro risque"
      title="Vous ne signez rien à l'aveugle."
      subtitle="Trois garanties concrètes pour enlever toutes les raisons d'hésiter."
    >
      <div
        className={cn(
          "grid gap-5",
          items.length === 4
            ? "mx-auto md:max-w-5xl md:grid-cols-2"
            : items.length === 2
              ? "mx-auto md:max-w-4xl md:grid-cols-2"
              : "md:grid-cols-3",
        )}
      >
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <BlurReveal key={item.title} delay={idx * 0.08} className="h-full">
              <Card
                className={cn(
                  cardInteractiveClasses,
                  "flex h-full flex-col gap-4 p-8",
                )}
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-bold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/65">
                  {item.description}
                </p>
              </Card>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
