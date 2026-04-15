// src/components/v2/subpage/SubPageProcess.tsx
import type { ProcessStep } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type SubPageProcessProps = {
  steps: ProcessStep[];
};

export function SubPageProcess({ steps }: SubPageProcessProps) {
  return (
    <SectionContainer id="process" eyebrow="Le processus" title="Comment ça se passe" className="bg-background-surface">
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number} className="flex flex-col gap-3 rounded-2xl bg-background p-6">
            <span className="font-heading text-3xl font-bold text-accent-primary/40">{step.number}</span>
            <h3 className="font-heading text-lg font-bold text-foreground">{step.title}</h3>
            <p className="text-base text-foreground/65">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionContainer>
  );
}
