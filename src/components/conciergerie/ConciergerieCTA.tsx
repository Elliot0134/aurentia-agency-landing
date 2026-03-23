"use client";

import { Section } from "@/components/ui/Section";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { ctaFinalContent } from "@/data/content";

export function ConciergerieCTA() {
  return (
    <Section theme="dark" className="relative py-40 flex flex-col items-center justify-center text-center overflow-hidden border-t-0">
      <AuroraBackground intensity="strong" />
      
      <div className="relative z-10 max-w-4xl px-4 flex flex-col items-center">
        <TextGradientReveal 
          text={ctaFinalContent.title} 
          elementType="h2"
          className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight justify-center"
        />
        
        <p className="text-xl md:text-2xl text-foreground/80 font-medium mb-12 max-w-2xl">
          {ctaFinalContent.subtitle}
        </p>
        
        <BlurReveal delay={0.2} className="flex flex-col items-center gap-6 w-full">
          <MagneticButton glow className="text-lg py-5 px-10" onClick={() => window.open('https://cal.com/aurentia', '_blank')}>
            {ctaFinalContent.cta} →
          </MagneticButton>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono tracking-wider text-foreground/50 uppercase mt-4">
            {ctaFinalContent.proofs.map((proof, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span>{proof}</span>
                {idx !== ctaFinalContent.proofs.length - 1 && <span>•</span>}
              </div>
            ))}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
