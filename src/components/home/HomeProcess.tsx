"use client";

import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

/* ═══════════════════════════════════════════════════════
   STEPS DATA — 4 clear steps, no jargon
   ═══════════════════════════════════════════════════════ */

const STEPS = [
  {
    num: "01",
    title: "On échange",
    desc: "Un appel pour comprendre votre projet, vos objectifs et vos contraintes. On analyse votre marché et on vous propose une stratégie claire.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "On crée",
    desc: "Design sur-mesure, développement, itérations avec vos retours. Vous suivez chaque étape et validez avant qu'on avance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "On livre",
    desc: "Votre projet est en ligne. On s'assure que tout fonctionne parfaitement — performance, mobile, SEO — avant de vous remettre les clés.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "On accompagne",
    desc: "30 jours de support inclus, formation IA offerte, évolutions sur-mesure. Votre site continue de grandir avec vous.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 16.98h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2z" />
        <path d="M6 16.98H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2z" />
        <path d="M3 11.98v-1a9 9 0 0 1 18 0v1" />
        <path d="M21 17.98v.02a3 3 0 0 1-3 3h-3" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export function HomeProcess() {
  return (
    <Section id="process" theme="dark-alt" className="section-divider-orange py-24 md:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.03] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10">
              PROCESSUS
            </span>
          </BlurReveal>
          <TextReveal
            text="Comment on travaille."
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tight justify-center mb-6"
          />
          <BlurReveal>
            <p className="text-base md:text-lg text-foreground/50 max-w-2xl mx-auto leading-relaxed">
              Un processus simple et transparent. Vous savez toujours o&ugrave; en est votre projet.
            </p>
          </BlurReveal>
        </div>

        {/* Steps grid */}
        <BlurReveal stagger={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <SpotlightCard key={step.num} className="h-full">
                <div className="relative z-10 flex flex-col gap-5 p-8">
                  {/* Step number + icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-primary/10 text-accent-primary">
                      {step.icon}
                    </div>
                    <span className="text-4xl font-black font-mono text-accent-primary/10 select-none">
                      {step.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-foreground/50">
                    {step.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
