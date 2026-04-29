"use client";

import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";

const LINES = [
  { text: "On croit que chaque projet mérite sa lumière.", bold: false },
  { text: "Pas juste un site. Une présence. Une identité.", bold: false },
  { text: "Un outil qui travaille pour vous.", bold: false },
  { text: "On révèle ce qui est déjà là.", bold: true },
  { text: "Le potentiel de votre marque. La force de votre offre.", bold: false },
  { text: "L'histoire que vous n'avez pas encore racontée.", bold: false },
  { text: "Premium dans l'exécution. Accessible à tous.", bold: true },
];

export function HomeManifeste() {
  return (
    <Section theme="dark-alt" className="py-32 md:py-44 border-t border-foreground/5">
      <div className="max-w-4xl mx-auto text-center">
        {LINES.map((line, idx) => (
          <BlurReveal key={idx} delay={idx * 0.08}>
            <p
              className={`text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-4 md:mb-6 ${
                line.bold
                  ? "font-bold text-foreground"
                  : "font-light text-foreground/60"
              }`}
            >
              {line.text}
            </p>
          </BlurReveal>
        ))}

        {/* Signature tagline */}
        <BlurReveal delay={LINES.length * 0.08 + 0.1}>
          <div className="mt-16 md:mt-24">
            <TextReveal
              text="Tant que ce n'est pas parfait, on ne lance pas."
              elementType="p"
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-accent-primary/80 justify-center"
            />
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
