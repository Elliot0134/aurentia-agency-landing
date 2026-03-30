"use client";

import { ArrowDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SkillsDownload } from "./SkillsDownload";

const stats = [
  { value: "20", label: "skills" },
  { value: "4", label: "catégories" },
  { value: "Testés", label: "en production" },
  { value: "Accès", label: "libre" },
];

export function Skills20Hero() {
  const handleScroll = () => {
    document.getElementById("skills-categories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section
      theme="dark"
      className="min-h-[90vh] flex items-center relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[70%] aspect-[3/1] rounded-full pointer-events-none"
        style={{ background: "var(--accent)", filter: "blur(120px)", opacity: 0.07 }}
      />
      {/* Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-grid" style={{ opacity: 0.06 }} />

      <div className="relative z-10 flex flex-col items-center text-center w-full gap-8">
        <BlurReveal>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
            GUIDE GRATUIT · AURENTIA FORMATION
          </span>
        </BlurReveal>

        <TextReveal
          text="20 Skills Claude AI prêts à l'emploi"
          elementType="h1"
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight justify-center max-w-4xl"
        />

        <BlurReveal>
          <p className="text-lg md:text-xl text-foreground/50 max-w-2xl leading-relaxed">
            Des prompts et templates testés en production. Copiez, collez,
            transformez votre façon de travailler.
          </p>
        </BlurReveal>

        {/* Stats */}
        <BlurReveal className="w-full" delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-foreground font-black text-xl md:text-2xl">{stat.value}</span>
                <span className="text-foreground/40 text-sm">{stat.label}</span>
                {i < stats.length - 1 && (
                  <span className="hidden md:block text-foreground/15 ml-4">·</span>
                )}
              </div>
            ))}
          </div>
        </BlurReveal>

        {/* Download + Scroll CTAs */}
        <BlurReveal delay={0.2} className="flex flex-col items-center gap-5 mt-2">
          <SkillsDownload />
          <button
            onClick={handleScroll}
            aria-label="Voir les skills"
            className="flex flex-col items-center gap-2 text-foreground/30 hover:text-foreground/60 transition-colors duration-500 group"
          >
            <span className="text-sm font-medium tracking-wider uppercase">Voir les skills</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </BlurReveal>
      </div>
    </Section>
  );
}
