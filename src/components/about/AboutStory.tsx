"use client";

import { Section } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { aboutStoryContent } from "@/data/about-content";

/**
 * Extract the first sentence from a paragraph text.
 * Splits on ". " and returns the first part + the period.
 */
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

export function AboutStory() {
  return (
    <>
      <SectionDivider />
      <Section
        className="py-28 md:py-36"
        containerClassName="flex flex-col items-center"
      >
        <div className="max-w-3xl mx-auto space-y-16 md:space-y-20">
          {aboutStoryContent.paragraphs.map((paragraph, index) => {
            const { first, rest } = splitFirstSentence(paragraph.text);
            const staggerDelay = index * 0.15;

            return (
              <BlurReveal key={paragraph.label} delay={staggerDelay}>
                <div className="space-y-4 border-l-2 border-accent-primary/30 pl-6">
                  {/* Label */}
                  <span className="text-sm font-mono tracking-wider text-accent-primary uppercase">
                    {paragraph.label}
                  </span>

                  {/* First sentence with TextGradientReveal */}
                  <TextGradientReveal
                    text={first}
                    elementType="p"
                    className="text-base md:text-lg text-foreground leading-relaxed md:leading-[1.8] font-semibold"
                  />

                  {/* Rest of the paragraph */}
                  {rest && (
                    <p className="text-base md:text-lg text-foreground-dim leading-relaxed md:leading-[1.8]">
                      {rest}
                    </p>
                  )}
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}
