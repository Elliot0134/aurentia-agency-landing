"use client";

import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { problemContent } from "@/data/content";

export function ConciergerieProblem() {
  return (
    <Section id="probleme" theme="dark-alt" className="py-32">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <TextReveal 
          text={`${problemContent.title} ${problemContent.titleAccent}`} 
          elementType="h2"
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 justify-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {problemContent.pains.map((pain, idx) => (
          <BlurReveal key={idx} delay={idx * 0.2}>
            <SpotlightCard className="p-8 h-full flex flex-col justify-between">
              <div>
                <span className="text-4xl block mb-6">{pain.icon}</span>
                <h3 className="text-2xl font-bold mb-4">{pain.title}</h3>
                <p className="text-foreground-muted text-lg mb-6 leading-relaxed">
                  {pain.text}
                </p>
              </div>
              
              <div className="pt-6 border-t border-foreground/10 mt-auto">
                {pain.metric && (
                  <div className="mb-2 text-accent-primary font-mono font-bold text-xl">
                    <span className="line-through opacity-70 mr-2">-</span>
                    {pain.metric.value.toLocaleString("fr-FR")}{pain.metric.suffix}
                    <span className="text-sm text-foreground-muted ml-2 font-sans font-normal uppercase tracking-wider">{pain.metric.label}</span>
                  </div>
                )}
                <p className="text-sm font-medium text-foreground/70 italic">
                  {pain.detail}
                </p>
              </div>
            </SpotlightCard>
          </BlurReveal>
        ))}
      </div>

      <div className="text-center max-w-2xl mx-auto mt-16 p-8 rounded-3xl border border-accent-secondary/30 bg-accent-secondary/5">
        <p className="text-2xl font-medium text-accent-secondary leading-relaxed">
          {problemContent.conclusion}
        </p>
      </div>
    </Section>
  );
}
