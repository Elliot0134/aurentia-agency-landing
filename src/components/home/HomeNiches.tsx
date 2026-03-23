"use client";

import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { Building2, UtensilsCrossed, Dumbbell, Code2 } from "lucide-react";

export function HomeNiches() {
  const niches = [
    { name: "Conciergeries", href: "/conciergeries", active: true, icon: <Building2 className="w-8 h-8" /> },
    { name: "Restaurants", href: "#", active: false, icon: <UtensilsCrossed className="w-8 h-8" /> },
    { name: "Salles de sport", href: "#", active: false, icon: <Dumbbell className="w-8 h-8" /> },
    { name: "SaaS", href: "#", active: false, icon: <Code2 className="w-8 h-8" /> }
  ];

  return (
    <Section theme="dark" className="py-32 section-divider-orange">
      <div className="text-center mb-20">
        <TextReveal 
          text="Des offres forgées pour votre métier." 
          elementType="h2"
          className="text-4xl md:text-5xl font-bold tracking-tight justify-center"
        />
        <BlurReveal delay={0.2} className="mt-6">
          <p className="text-foreground-muted text-xl max-w-2xl mx-auto">
            Chaque industrie a ses codes. On les connaît, on les maîtrise, on crée en conséquence.
          </p>
        </BlurReveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {niches.map((niche, idx) => (
          <BlurReveal key={idx} delay={idx * 0.1}>
            {niche.active ? (
              <Link href={niche.href} className="block group h-full">
                <SpotlightCard className="p-8 text-center border-foreground/10 glass hover:bg-foreground/5 hover:shadow-[0_0_30px_rgba(201,100,66,0.08)] hover:border-accent-primary/15 transition-all duration-500 h-full flex flex-col items-center justify-center min-h-[220px]">
                  <div className="text-accent-secondary mb-6 transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500">
                    {niche.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{niche.name}</h3>
                  <span className="text-accent-secondary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    Voir l'offre →
                  </span>
                </SpotlightCard>
              </Link>
            ) : (
              <div className="p-8 text-center rounded-[2rem] border border-foreground/5 bg-background opacity-40 cursor-not-allowed h-full flex flex-col items-center justify-center min-h-[220px]">
                 <div className="text-foreground/20 mb-6 grayscale">
                    {niche.icon}
                  </div>
                <h3 className="text-xl font-bold text-foreground/50 mb-4">{niche.name}</h3>
                <span className="text-sm font-mono uppercase tracking-wider text-foreground/30 bg-foreground/5 px-3 py-1 rounded-full border border-foreground/5">Prochainement</span>
              </div>
            )}
          </BlurReveal>
        ))}
      </div>
    </Section>
  );
}
