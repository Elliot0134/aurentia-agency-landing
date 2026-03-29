"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { ctaContent } from "@/data/identite-visuelle-content";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function IdentiteVisuelleCTA() {
  const contentRef = useRef<HTMLDivElement>(null);
  const proofsRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!contentRef.current) return;

      // CTA button animation
      const btn = contentRef.current.querySelector("[data-cta-btn]");
      if (btn) {
        gsap.fromTo(
          btn,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Proof points stagger
      if (proofsRef.current) {
        const proofs = proofsRef.current.querySelectorAll("[data-proof]");
        gsap.fromTo(
          proofs,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: proofsRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: contentRef, dependencies: [animationsEnabled] }
  );

  return (
    <Section
      theme="dark"
      className="relative min-h-[50vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Warm gradient mesh with ambre/or/rose orbs */}
      <SectionBackground
        orbs={[
          { color: "ambre", position: "bottom-0 left-[20%]", size: "w-[500px] h-[500px]", opacity: "[0.12]" },
          { color: "orange", position: "top-0 right-[15%]", size: "w-[350px] h-[350px]", opacity: "[0.08]" },
          { color: "rose", position: "bottom-[20%] right-[5%]", size: "w-[300px] h-[300px]", opacity: "[0.05]" },
          { color: "ambre", position: "top-[40%] left-[5%]", size: "w-[200px] h-[200px]", opacity: "[0.06]" },
        ]}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Title */}
        <TextGradientReveal
          text={ctaContent.title}
          elementType="h2"
          className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground justify-center leading-tight"
        />

        {/* Subtitle */}
        <BlurReveal className="mt-6 md:mt-8" delay={0.3}>
          <p className="text-base md:text-lg text-foreground/50 max-w-2xl mx-auto leading-relaxed">
            {ctaContent.subtitle}
          </p>
        </BlurReveal>

        {/* CTA Button */}
        <div data-cta-btn className="opacity-0 mt-8 md:mt-10">
          <a
            href={ctaContent.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <MagneticButton
              glow
              className="w-full sm:w-auto px-8 py-4 text-base md:text-lg"
            >
              {ctaContent.cta}
            </MagneticButton>
          </a>
        </div>

        {/* Proof points */}
        <div
          ref={proofsRef}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-6"
        >
          {ctaContent.proofs.map((proof, idx) => (
            <div
              key={idx}
              data-proof
              className="flex items-center gap-2 opacity-0"
            >
              <Check className="w-4 h-4 text-amber-500/70 flex-shrink-0" />
              <span className="text-sm text-foreground/40">{proof}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
