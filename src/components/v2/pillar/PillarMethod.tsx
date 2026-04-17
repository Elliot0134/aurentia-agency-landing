// src/components/v2/pillar/PillarMethod.tsx
import type { ProcessStep } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

type PillarMethodProps = {
  title: string;
  steps: ProcessStep[];
};

export function PillarMethod({ title, steps }: PillarMethodProps) {
  return (
    <SectionContainer id="method" eyebrow="Notre méthode" title={title}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Card
              key={step.number}
              className={cn(cardInteractiveClasses, "relative flex flex-col gap-5 p-8")}
            >
              {/* Icon + step number */}
              <div className="flex items-center justify-between">
                {Icon ? (
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                ) : (
                  <span />
                )}
                <span className="select-none font-mono text-4xl font-black text-accent-primary/15">
                  {step.number}
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold leading-snug text-foreground">
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed text-foreground/65">
                {step.description}
              </p>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
