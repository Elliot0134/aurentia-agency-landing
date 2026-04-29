"use client";

import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { leadMagnetContent } from "@/data/content";
import { Check } from "lucide-react";

export function ConciergerieLeadMagnet() {
  return (
    <Section theme="dark" className="py-24">
      <BlurReveal>
        <SpotlightCard className="max-w-5xl mx-auto rounded-[2rem] p-8 md:p-16 border-accent-secondary/20 overflow-hidden relative">
          
          <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/5 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left side text */}
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-xs uppercase tracking-widest font-mono mb-6">
                100% Gratuit
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                {leadMagnetContent.title.replace('"', '').replace('"', '')}
              </h2>

              <ul className="flex flex-col gap-4 mb-8">
                {leadMagnetContent.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent-secondary shrink-0 mt-0.5" />
                    <span className="text-foreground-muted">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side form block */}
            <div className="bg-background/80 backdrop-blur-md rounded-2xl p-8 border border-foreground/10 shadow-2xl">
              <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Envoi factice"); }}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground-muted mb-2">Email professionnel</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    placeholder="contact@maconciergerie.fr"
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-dim focus:outline-none focus:ring-2 focus:ring-accent-secondary/50 focus:border-transparent transition-all"
                  />
                </div>
                
                <MagneticButton className="w-full py-4 justify-center mt-2 group" style={{background: 'linear-gradient(135deg, #b05730, #c96442)'}}>
                  {leadMagnetContent.ctaText}
                </MagneticButton>
                
                <p className="text-xs text-center text-foreground-dim mt-4">
                  {leadMagnetContent.disclaimer}
                </p>
              </form>
            </div>
            
          </div>
        </SpotlightCard>
      </BlurReveal>
    </Section>
  );
}
