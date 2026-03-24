"use client";

import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { InfiniteMarquee } from "@/components/animations/InfiniteMarquee";
import {
  saasStackContent,
  techStack,
  marqueeItems,
} from "@/data/saas-content";
import type { TechCard } from "@/data/saas-content";

function TechItem({ tech }: { tech: TechCard }) {
  return (
    <div className="group/tech rounded-2xl border border-foreground/5 bg-foreground/[0.03] p-6 flex flex-col gap-3 transition-all duration-700 ease-in-out hover:border-foreground/15 hover:shadow-[0_0_30px_rgba(201,100,66,0.08)]">
      <h3 className="text-base md:text-lg font-bold text-foreground transition-colors duration-700">
        {tech.name}
      </h3>
      <p className="text-sm text-foreground/50 leading-relaxed transition-colors duration-700 group-hover/tech:text-foreground/65">
        {tech.description}
      </p>
    </div>
  );
}

export function SaasStack() {
  return (
    <Section className="py-28 md:py-36 min-h-[40vh] relative">
      <SectionBackground variant="base" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <TextReveal
            text={saasStackContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground justify-center"
          />
          <BlurReveal className="mt-6" delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
              {saasStackContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Tech grid */}
        <BlurReveal stagger={0.08}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {techStack.map((tech) => (
              <TechItem key={tech.name} tech={tech} />
            ))}
          </div>
        </BlurReveal>

        {/* Marquee */}
        <div className="mt-16 md:mt-20">
          <InfiniteMarquee
            items={marqueeItems}
            className="text-foreground/40 font-medium text-base"
          />
        </div>
      </div>
    </Section>
  );
}
