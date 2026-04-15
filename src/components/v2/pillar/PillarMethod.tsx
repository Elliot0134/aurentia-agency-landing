// src/components/v2/pillar/PillarMethod.tsx
import type { ProcessStep } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type PillarMethodProps = {
  title: string;
  steps: ProcessStep[];
};

export function PillarMethod({ title, steps }: PillarMethodProps) {
  return (
    <SectionContainer eyebrow="Notre méthode" title={title}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-3">
            <span className="font-heading text-4xl font-bold text-accent-primary/40">
              {step.number}
            </span>
            <h3 className="font-heading text-lg font-bold text-foreground">{step.title}</h3>
            <p className="text-base text-foreground/65">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
