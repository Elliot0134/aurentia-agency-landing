"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { formationCTA } from "@/data/formation-content";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FormationCTA() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useGSAP(
    () => {
      if (!contentRef.current) return;
      const els = contentRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        els,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: contentRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    // TODO: Server Action — store email in Supabase waitlist table
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <Section
      id="waitlist"
      theme="dark-alt"
      className="relative min-h-[50vh] flex items-center justify-center py-28 md:py-36 text-center overflow-hidden"
    >
      {/* SectionBackground with orbs */}
      <SectionBackground
        variant="alt"
        orbs={[
          { color: "orange", position: "top-[40%] left-[30%]", size: "w-[500px] h-[400px]", opacity: "[0.08]" },
          { color: "violet", position: "top-[50%] right-[20%]", size: "w-[400px] h-[300px]", opacity: "[0.05]" },
        ]}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5"
      >
        {/* Title */}
        <TextReveal
          text={formationCTA.title}
          elementType="h2"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight justify-center"
        />

        {/* Subtitle */}
        <BlurReveal delay={0.3}>
          <p className="text-base md:text-lg text-foreground-dim max-w-lg leading-relaxed">
            {formationCTA.subtitle}
          </p>
        </BlurReveal>

        {/* Form */}
        <div data-reveal className="mt-6 w-full max-w-md">
          {submitted ? (
            <div className="relative flex items-center justify-center gap-3 py-4 text-accent-primary transition-opacity duration-700">
              {/* Glow burst ring */}
              <div className="absolute inset-0 rounded-full bg-accent-primary/10 animate-[glowBurst_1s_ease-out_forwards] pointer-events-none" />
              <Check className="w-5 h-5 relative z-10" />
              <span className="text-base font-medium relative z-10">
                Vous &ecirc;tes sur la liste. On vous pr&eacute;vient
                bient&ocirc;t.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col sm:flex-row gap-3"
            >
              {/* Gradient border container */}
              <div className="relative flex-1 rounded-full p-[1px] bg-gradient-to-r from-accent-primary/30 via-accent-secondary/30 to-accent-primary/30 bg-[length:200%_100%] animate-[gradientBorder_3s_linear_infinite]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={formationCTA.inputPlaceholder}
                  className="w-full px-4 py-3 rounded-full bg-background border-none text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-primary/30 transition-all duration-500 text-base"
                />
              </div>
              <MagneticButton
                glow
                className="px-6 py-3 whitespace-nowrap"
                type="submit"
                disabled={loading}
              >
                {loading ? "..." : formationCTA.ctaLabel}
              </MagneticButton>
            </form>
          )}
        </div>

        {/* Proofs */}
        <BlurReveal delay={0.5}>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
            {formationCTA.proofs.map((proof, i) => (
              <span
                key={i}
                className="text-sm text-foreground-muted flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary/50" />
                {proof}
              </span>
            ))}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
