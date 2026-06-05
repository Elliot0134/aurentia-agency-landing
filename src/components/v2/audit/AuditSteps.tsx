import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { auditData } from "@/data/v2/audit";

const { steps } = auditData;

export function AuditSteps() {
  return (
    <SectionContainer id="etapes" eyebrow={steps.eyebrow} title={steps.title}>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.items.map((step) => (
          <Card key={step.number} className="p-7 md:p-8">
            <span className="flex size-11 items-center justify-center rounded-full bg-foreground font-heading text-base text-background">
              {step.number}
            </span>
            <h3 className="mt-4 font-heading text-xl text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-foreground/65 md:text-base">{step.description}</p>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
