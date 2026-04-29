"use client";

import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { solutionContent } from "@/data/content";

export function ConciergerieSolution() {
  return (
    <Section id="solution" theme="dark" className="py-32">
      <div className="text-center mb-16">
        <TextReveal 
          text={solutionContent.title} 
          elementType="h2"
          className="text-4xl md:text-5xl font-bold tracking-tight justify-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {solutionContent.team.map((member, idx) => (
          <BlurReveal key={idx} delay={idx * 0.2}>
            <SpotlightCard className="p-8 h-full flex flex-col justify-end min-h-[400px] border-foreground/5 relative group">
              <div className="absolute right-0 top-0 w-48 h-48 opacity-10 bg-gradient-to-br from-foreground to-transparent rounded-bl-[100px] transition-all group-hover:opacity-20" />
              
              <div className="relative z-10">
                <span className="text-accent-primary font-mono text-sm tracking-wider uppercase mb-2 block">{member.role}</span>
                <h3 className="text-3xl font-bold mb-4">{member.name}</h3>
                <p className="text-foreground-muted leading-relaxed">
                  {member.description}
                </p>
              </div>
            </SpotlightCard>
          </BlurReveal>
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <TextGradientReveal 
          text={solutionContent.promise} 
          elementType="p"
          className="text-3xl md:text-5xl font-black uppercase tracking-tighter justify-center opacity-80"
        />
      </div>
    </Section>
  );
}
