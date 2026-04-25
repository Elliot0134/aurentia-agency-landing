// src/components/v2/sites-web/SitesWebFeaturesV2.tsx
"use client";

import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { sitesWebExtra } from "@/data/v2/sites-web";
import { cn } from "@/lib/utils";

export function SitesWebFeaturesV2() {
  const { features } = sitesWebExtra;

  return (
    <SectionContainer
      id="features"
      title={"Tout ce qu'un site pro doit avoir.\nRien de superflu."}
      titleClassName="whitespace-pre-line"
      subtitle="Chaque site qu'on livre est complet, fonctionnel et prêt à convertir dès le jour 1."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <BlurReveal key={item.title} delay={idx * 0.08}>
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
              </Card>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
