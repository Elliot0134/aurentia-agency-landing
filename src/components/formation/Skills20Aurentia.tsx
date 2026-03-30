import { Linkedin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";

const team = [
  {
    name: "Elliot",
    role: "CEO · IA & Design",
    desc: "Formateur IA en entreprise, fondateur ESST Solutions. Spécialiste automatisation N8N et Claude Code.",
    linkedin: "https://www.linkedin.com/in/elliot-estrade/",
  },
  {
    name: "Matthieu",
    role: "CTO · Lead Technique",
    desc: "Développeur full-stack et formateur à Epitech Marseille. Pioneer Claude Code au sein de l'équipe.",
    linkedin: "https://www.linkedin.com/in/mathieu-bousquet-178454315/",
  },
  {
    name: "Fabien",
    role: "Production Lead",
    desc: "20 ans de craft web, co-fondateur de Le Prisme. Direction créative et stratégie de marque.",
    linkedin: "https://www.linkedin.com/in/fabienestrade/",
  },
];

export function Skills20Aurentia() {
  return (
    <Section theme="dark-alt" className="relative">
      <div className="flex flex-col items-center gap-12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
              AURENTIA
            </span>
          </BlurReveal>
          <TextReveal
            text="Qui sommes-nous ?"
            elementType="h2"
            className="text-3xl md:text-4xl font-black tracking-tight justify-center mb-4"
          />
          <BlurReveal>
            <p className="text-foreground/50 leading-relaxed max-w-2xl mx-auto">
              Aurentia est une agence web et une école de formation spécialisée Claude AI.
              Nous utilisons Claude au quotidien en production — ces skills sont ceux qu&apos;on
              utilise vraiment, pas des exemples théoriques.
            </p>
          </BlurReveal>
        </div>

        {/* Team mini-cards */}
        <BlurReveal className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          {team.map((member, i) => (
            <SpotlightCard key={i} className="p-5 flex flex-col gap-3">
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-xs text-accent-primary font-mono tracking-widest uppercase mb-0.5">
                    {member.role}
                  </p>
                  <h3 className="text-lg font-black text-foreground/90">{member.name}</h3>
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn de ${member.name}`}
                  className="w-8 h-8 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-foreground/10 transition-all duration-500"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="relative z-10 text-sm text-foreground/45 leading-relaxed">{member.desc}</p>
            </SpotlightCard>
          ))}
        </BlurReveal>

        {/* Aurentia links */}
        <BlurReveal>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/formation"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity duration-500"
            >
              Découvrir la formation →
            </a>
            <a
              href="/#agence"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/15 text-foreground/70 font-medium text-sm hover:border-foreground/30 hover:text-foreground transition-all duration-500"
            >
              L&apos;agence web
            </a>
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
