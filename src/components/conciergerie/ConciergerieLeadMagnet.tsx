"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  conciergeriesLeadMagnetContent,
  conciergeriesSiteConfig,
} from "@/data/conciergeries-content";
import { Check, Mail } from "lucide-react";

export function ConciergerieLeadMagnet() {
  const { title, subtitle, bullets, ctaText, disclaimer } =
    conciergeriesLeadMagnetContent;
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder action — would send to Supabase
    setSubmitted(true);
  }

  return (
    <Section theme="dark" className="py-24">
      <BlurReveal>
        <SpotlightCard className="max-w-5xl mx-auto rounded-[2rem] p-8 md:p-16 border-accent-secondary/20 overflow-hidden relative">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/5 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left side — text content */}
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-sm uppercase tracking-widest font-mono mb-6">
                Guide gratuit
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-foreground">
                {title}
              </h3>

              <p className="text-foreground/60 mb-8">{subtitle}</p>

              <ul className="flex flex-col gap-4 mb-8">
                {bullets.map((bullet, idx) => (
                  <BlurReveal key={idx} delay={0.1 + idx * 0.1}>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-secondary shrink-0 mt-0.5" />
                      <span className="text-foreground/60">{bullet}</span>
                    </li>
                  </BlurReveal>
                ))}
              </ul>
            </div>

            {/* Right side — form */}
            <div className="bg-background/80 backdrop-blur-md rounded-2xl p-8 border border-foreground/10 shadow-2xl">
              {submitted ? (
                <div className="flex flex-col items-center text-center gap-4 py-8">
                  <div className="w-12 h-12 rounded-full bg-accent-secondary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent-secondary" />
                  </div>
                  <p className="text-foreground font-medium text-lg">
                    {conciergeriesSiteConfig.leadMagnetConfirmation}
                  </p>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-sm font-medium text-foreground/60 mb-2"
                    >
                      Email professionnel
                    </label>
                    <input
                      type="email"
                      id="lead-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@maconciergerie.fr"
                      className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-accent-secondary/50 focus:border-transparent transition-all duration-500"
                    />
                  </div>

                  <MagneticButton
                    glow
                    className="w-full py-4 justify-center mt-2"
                    type="submit"
                  >
                    {ctaText}
                  </MagneticButton>

                  <p className="text-sm text-center text-foreground/30 mt-4">
                    {disclaimer}
                  </p>
                </form>
              )}
            </div>
          </div>
        </SpotlightCard>
      </BlurReveal>
    </Section>
  );
}
