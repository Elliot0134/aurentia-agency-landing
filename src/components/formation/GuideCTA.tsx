"use client";

import { useState } from "react";
import { ArrowRight, GraduationCap, Zap, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";

export function GuideCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <Section theme="dark" className="relative overflow-hidden">
      <div
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[60%] aspect-[3/1] rounded-full pointer-events-none"
        style={{ background: "var(--accent)", filter: "blur(120px)", opacity: 0.06 }}
      />

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-4xl mx-auto">
        <div className="text-center">
          <TextReveal
            text="Envie d'aller plus loin ?"
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight justify-center"
          />
        </div>

        {/* CTA cards */}
        <BlurReveal className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 20 Skills */}
          <SpotlightCard className="p-6 flex flex-col gap-4">
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-accent-primary" />
              </div>
              <div>
                <p className="text-xs text-accent-primary font-mono tracking-widest uppercase mb-0.5">Niveau 2</p>
                <h3 className="font-black text-foreground/90 text-lg leading-tight">20 Skills Claude AI</h3>
              </div>
            </div>
            <p className="relative z-10 text-sm text-foreground/50 leading-relaxed">
              Prompts et templates testés en production. Copiez, collez, transformez votre façon de travailler.
            </p>
            <a
              href="/formation/20-skills-claude"
              className="relative z-10 mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-all duration-500 self-start"
            >
              Voir les 20 skills
              <ArrowRight className="w-4 h-4" />
            </a>
          </SpotlightCard>

          {/* Formation */}
          <SpotlightCard className="p-6 flex flex-col gap-4">
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-violet-400 font-mono tracking-widest uppercase mb-0.5">Niveau 3</p>
                <h3 className="font-black text-foreground/90 text-lg leading-tight">Formation Claude AI</h3>
              </div>
            </div>
            <p className="relative z-10 text-sm text-foreground/50 leading-relaxed">
              Formation complète avec modules vidéo, exercices pratiques et accompagnement. De débutant à expert.
            </p>
            <a
              href="/formation"
              className="relative z-10 mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/15 text-foreground/70 font-semibold text-sm hover:border-foreground/30 hover:text-foreground transition-all duration-500 self-start"
            >
              Rejoindre la waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
          </SpotlightCard>
        </BlurReveal>

        {/* Newsletter */}
        <BlurReveal className="w-full max-w-lg">
          <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 flex flex-col gap-4">
            <div>
              <p className="font-bold text-foreground/80">Restez dans la boucle</p>
              <p className="text-sm text-foreground/40 mt-1">
                Nouveaux guides, tips Claude AI et actualités Aurentia — directement dans votre boîte.
              </p>
            </div>
            {submitted ? (
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <Check className="w-5 h-5" />
                <span>C&apos;est noté ! On vous tient au courant.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 px-4 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground placeholder-foreground/30 text-sm outline-none focus:border-foreground/25 transition-colors duration-500"
                />
                <button
                  type="submit"
                  className="shrink-0 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity duration-500"
                >
                  S&apos;inscrire
                </button>
              </form>
            )}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
