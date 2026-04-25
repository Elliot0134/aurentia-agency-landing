// src/components/v2/agence/AProposManifesto.tsx
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { aProposData } from "@/data/v2/agence-a-propos";

export function AProposManifesto() {
  const { manifesto } = aProposData;
  return (
    <SectionContainer
      id="manifesto"
      title={manifesto.title}
      subtitle="Pourquoi on a monté Aurentia — et ce qu'on essaie de faire différemment."
      className="bg-background-surface"
      innerClassName="max-w-3xl"
    >
      <div className="flex flex-col gap-5">
        {manifesto.paragraphs.map((p, i) => (
          <BlurReveal key={i} delay={i * 0.1}>
            <p className="text-base leading-relaxed text-foreground/75 md:text-lg">
              {p}
            </p>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
