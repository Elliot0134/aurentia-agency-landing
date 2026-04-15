// src/components/v2/home/HomeMethodV2.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

export function HomeMethodV2() {
  const { method } = homeData;
  return (
    <SectionContainer eyebrow="Notre méthode" title={method.title}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {method.steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-3">
            <span className="font-heading text-5xl font-bold text-accent-primary/30">
              {step.number}
            </span>
            <h3 className="font-heading text-xl font-bold text-foreground">{step.title}</h3>
            <p className="text-base text-foreground/65">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
