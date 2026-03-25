"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";

const team = [
  {
    name: "Fabien",
    role: "Production Lead",
    desc: "20 ans de craft web. La rigueur, l'expérience, l'oeil qui ne laisse rien passer.",
    details: "Fondateur et directeur de l'agence de communication Le Prisme à Avignon. 20 ans de création de sites web, design graphique et stratégie de marque. Expert en identité visuelle, direction créative et accompagnement client.",
    image: "/images/team/fabien.webp",
    linkedin: "https://www.linkedin.com/in/fabienestrade/",
  },
  {
    name: "Elliot",
    role: "CEO, IA & Design",
    desc: "Architecte IA et design. La vision, l'innovation, la direction créative.",
    details: "Fondateur de Friend'iz (e-commerce) et CEO d'ESST Solutions. Spécialiste automatisation N8N et développement avec Claude Code. Formateur et consultant IA en entreprise.",
    image: "/images/team/elliot.webp",
    linkedin: "https://www.linkedin.com/in/elliot-estrade/",
  },
  {
    name: "Matthieu",
    role: "CTO, Lead Technique",
    desc: "Le pilier technique. Sécurité, performance et fiabilité — sans exception.",
    details: "Développeur full-stack et formateur à Epitech Marseille. Pionnier Claude Code au sein de l'équipe — c'est lui qui nous a tous convertis. Architecture technique et code review sur chaque projet.",
    image: "/images/team/mathieu.webp",
    linkedin: "https://www.linkedin.com/in/mathieu-bousquet-178454315/",
  },
];

export function HomeTeam() {
  return (
    <Section id="equipe" theme="dark" className="relative overflow-hidden -mt-8" data-theme="dark" style={{ clipPath: "ellipse(150% 100% at 50% 100%)" }}>

      {/* Orange glow at top — inverted arc (same as hero bottom) */}
      <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 z-[2] pointer-events-none w-[90%] aspect-[3/1] rounded-full" style={{ background: "var(--accent)", filter: "blur(100px)", opacity: "var(--hero-glow-opacity)" }} />

      {/* Colored orbs behind cards for glassmorphism effect */}
      <div className="absolute top-[40%] left-[15%] w-[400px] h-[400px] bg-accent-primary/[0.08] rounded-full blur-[150px] pointer-events-none z-[2]" />
      <div className="absolute top-[35%] left-[50%] w-[350px] h-[350px] bg-[#7c3aed]/[0.06] rounded-full blur-[130px] pointer-events-none z-[2]" />
      <div className="absolute top-[45%] right-[10%] w-[300px] h-[300px] bg-[#06b6d4]/[0.05] rounded-full blur-[120px] pointer-events-none z-[2]" />
      {/* Grid pattern like hero but gradient from top */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-grid" style={{ opacity: 0.1 }} />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "none" }}
      />

      {/* Vertically centered block — title + cards + CTA */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-8 pb-20">
        <div className="text-center mb-12 md:mb-16">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10">
              NOTRE ÉQUIPE
            </span>
          </BlurReveal>
          <TextReveal
            text="Le trio fondateur."
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tight justify-center"
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {team.map((member, idx) => (
          <BlurReveal key={idx} delay={idx * 0.2}>
            <SpotlightCard className="relative p-5 h-full flex flex-col justify-between aspect-square !bg-foreground/[0.03] backdrop-blur-xl border-foreground/[0.08] group overflow-hidden hover:shadow-[0_0_40px_rgba(201,100,66,0.1)] transition-shadow duration-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Default gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 via-[55%] to-transparent" />
                {/* Hover gradient — fades in smoothly */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 via-[70%] to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
              </div>

              {/* LinkedIn icon — top right */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-foreground/[0.03] backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/[0.06] transition-all duration-500 pointer-events-auto"
                aria-label={`LinkedIn de ${member.name}`}
              >
                <Linkedin className="w-5 h-5" />
              </a>

              {/* Text content — expands upward on hover */}
              <div className="relative z-10 mt-auto [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)] transition-all duration-500">
                <span className="text-accent-primary font-mono text-base tracking-widest uppercase mb-1 block opacity-80">{member.role}</span>
                <h3 className="text-3xl font-black mb-3 text-foreground">{member.name}</h3>
                <p className="text-foreground/70 leading-snug text-base">
                  {member.desc}
                </p>
                {/* Details — revealed on hover */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                  <div className="overflow-hidden">
                    <p className="text-foreground/50 leading-snug text-base mt-3 pt-3 border-t border-foreground/10">
                      {member.details}
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </BlurReveal>
        ))}
      </div>

      <BlurReveal delay={0.4}>
        <div className="flex justify-center">
          <a
            href="/equipe"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/10 bg-foreground/[0.04] backdrop-blur-md text-foreground hover:bg-foreground/[0.08] hover:border-foreground/20 transition-all duration-500 font-medium"
          >
            Découvrir l&apos;équipe
            <span className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
      </BlurReveal>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center py-32">
        <TextGradientReveal 
          text="Tant que ce n'est pas parfait, on ne lance pas." 
          elementType="p"
          className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight justify-center opacity-80"
        />
      </div>
    </Section>
  );
}
