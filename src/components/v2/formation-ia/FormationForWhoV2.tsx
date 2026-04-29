// src/components/v2/formation-ia/FormationForWhoV2.tsx
"use client";

import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";

export function FormationForWhoV2() {
  const { forWho } = solutionsIaFormationData;

  return (
    <SectionContainer
      id="for-who"
      title={forWho.title}
      subtitle={forWho.subtitle}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {forWho.items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <BlurReveal key={item.title} delay={idx * 0.08}>
              <Card className="group flex h-full flex-col gap-4 p-7 transition-colors duration-500 dark:hover:border-foreground/25">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-base leading-relaxed text-foreground/70">
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
