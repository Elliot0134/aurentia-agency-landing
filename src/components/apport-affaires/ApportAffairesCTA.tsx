"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { apportCTA } from "@/data/apport-affaires-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ApportAffairesCTA() {
  const contentRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!contentRef.current) return;

      const buttons = contentRef.current.querySelectorAll("[data-cta-btn]");
      gsap.fromTo(
        buttons,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: contentRef, dependencies: [animationsEnabled] }
  );

  return (
    <Section
      id="apport-cta"
      theme="dark-alt"
      className="min-h-[50vh] flex items-center py-28 md:py-36"
    >
      {/* SectionBackground with gradient mesh */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "w-[700px] h-[500px]", opacity: "[0.08]" },
          { color: "ambre", position: "top-[20%] right-[15%]", size: "w-[350px] h-[350px]", opacity: "[0.06]" },
        ]}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        {/* Title */}
        <TextGradientReveal
          text={apportCTA.title}
          elementType="h2"
          className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 justify-center"
        />

        {/* Subtitle */}
        <BlurReveal delay={0.3}>
          <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            {apportCTA.subtitle}
          </p>
        </BlurReveal>

        {/* Dual CTA buttons — primary MUCH bigger */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div data-cta-btn className="w-full sm:w-auto opacity-0">
            <MagneticButton
              glow
              className="px-10 py-5 text-lg font-semibold w-full sm:w-auto"
              onClick={() => {
                window.open(apportCTA.whatsappUrl, "_blank");
              }}
            >
              {apportCTA.ctaPrimary}&nbsp;&nbsp;&rarr;
            </MagneticButton>
          </div>

          <div data-cta-btn className="w-full sm:w-auto opacity-0">
            <button
              onClick={() => {
                window.open(apportCTA.whatsappUrl, "_blank");
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 transition-all duration-700 ease-in-out hover:bg-emerald-500/15 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] w-full sm:w-auto cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              {apportCTA.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Proofs */}
        <BlurReveal delay={0.7}>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8">
            {apportCTA.proofs.map((proof, i) => (
              <span
                key={i}
                className="text-sm text-foreground/30 font-medium"
              >
                {proof}
                {i < apportCTA.proofs.length - 1 && (
                  <span className="ml-4 text-foreground/10">&middot;</span>
                )}
              </span>
            ))}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
