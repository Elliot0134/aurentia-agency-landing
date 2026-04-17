// src/components/v2/agence/AgenceStoryV2.tsx
"use client";

import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { agenceStory } from "@/data/v2/agence-content";

function splitFirstSentence(text: string): { first: string; rest: string } {
  const dotIndex = text.indexOf(". ");
  if (dotIndex === -1) {
    return { first: text, rest: "" };
  }
  return {
    first: text.slice(0, dotIndex + 1),
    rest: text.slice(dotIndex + 2),
  };
}

export function AgenceStoryV2() {
  return (
    <SectionContainer
      id="histoire"
      title={agenceStory.title}
      subtitle={agenceStory.subtitle}
      innerClassName="max-w-3xl"
    >
      <div className="space-y-14 md:space-y-16">
        {agenceStory.paragraphs.map((paragraph, index) => {
          const { first, rest } = splitFirstSentence(paragraph.text);

          return (
            <BlurReveal key={paragraph.label} delay={index * 0.15}>
              <div className="space-y-4 border-l-2 border-accent-primary/30 pl-6">
                <span className="text-sm font-mono tracking-wider text-accent-primary uppercase">
                  {paragraph.label}
                </span>
                <p className="text-base md:text-lg text-foreground leading-relaxed md:leading-[1.8] font-semibold">
                  {first}
                </p>
                {rest && (
                  <p className="text-base md:text-lg text-foreground/65 leading-relaxed md:leading-[1.8]">
                    {rest}
                  </p>
                )}
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
