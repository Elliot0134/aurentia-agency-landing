// src/components/v2/agence/AgenceAudience.tsx
import { Check } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { agenceAudience } from "@/data/v2/agence-content";

export function AgenceAudience() {
  return (
    <SectionContainer
      id="pour-qui"
      title={agenceAudience.title}
      subtitle={agenceAudience.paragraph}
      className="bg-background-surface"
      innerClassName="max-w-3xl"
      alignHeader="left"
    >
      <ul className="mb-12 space-y-5 md:space-y-6 md:mb-16">
        {agenceAudience.items.map((item, index) => (
          <BlurReveal key={index} delay={index * 0.08}>
            <li className="flex items-start gap-4 rounded-xl p-4 transition-colors duration-500 ease-in-out hover:bg-foreground/[0.02]">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-primary/15">
                <Check className="h-3.5 w-3.5 text-accent-primary" />
              </div>
              <p className="text-base leading-relaxed text-foreground/75 md:text-lg">
                {item.text}
              </p>
            </li>
          </BlurReveal>
        ))}
      </ul>

      <BlurReveal>
        <p className="border-l-2 border-accent-primary/40 pl-6 text-base font-medium leading-relaxed text-foreground/70 md:text-lg">
          {agenceAudience.conclusion}
        </p>
      </BlurReveal>
    </SectionContainer>
  );
}
