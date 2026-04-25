// src/components/v2/agence/AProposValues.tsx
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { aProposData } from "@/data/v2/agence-a-propos";

export function AProposValues() {
  const { values } = aProposData;
  return (
    <SectionContainer
      id="values"
      title={values.title}
      subtitle="Les principes qu'on applique sur chaque projet — pas des posters au mur, des règles de travail."
      className="py-32 md:py-40"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {values.items.map((v, idx) => {
          const Icon = v.icon;
          return (
            <BlurReveal key={v.title} delay={idx * 0.08}>
              <div className="group flex h-full flex-col gap-4 rounded-2xl border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-7 transition-all duration-500 ease-in-out dark:hover:border-foreground/25">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {v.title}
                </h3>
                <p className="text-base text-foreground/65">{v.description}</p>
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
