"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { TextReveal } from "@/components/animations/TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function RealisationsInterlude() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!subtextRef.current) return;

    gsap.fromTo(
      subtextRef.current,
      { opacity: 0, filter: "blur(10px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subtextRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Glow pulse animation (15s full cycle)
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.08,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, { scope: sectionRef, dependencies: [animationsEnabled] });

  return (
    <Section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="min-h-[40vh] flex items-center justify-center relative"
      theme="transparent"
    >
      {/* Orbs behind */}
      <SectionBackground
        orbs={[
          { color: "ambre", position: "top-[30%] left-[20%]", size: "w-[400px] h-[300px]", opacity: "[0.06]" },
          { color: "orange", position: "bottom-[20%] right-[15%]", size: "w-[350px] h-[250px]", opacity: "[0.05]" },
          { color: "rose", position: "top-[40%] right-[35%]", size: "w-[300px] h-[200px]", opacity: "[0.03]" },
        ]}
      />

      {/* Gradient mesh glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-primary/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Decorative opening quote mark */}
        <span className="text-6xl md:text-8xl font-bold text-accent-primary/40 leading-none select-none" aria-hidden="true">
          &ldquo;
        </span>

        {/* Quote */}
        <TextReveal
          elementType="h2"
          className="text-3xl md:text-4xl lg:text-5xl italic font-bold tracking-tight leading-tight justify-center"
        >
          {"On ne livre pas des sites web. On r\u00E9v\u00E8le des entreprises."}
        </TextReveal>

        {/* Decorative closing quote mark */}
        <span className="text-6xl md:text-8xl font-bold text-accent-primary/40 leading-none select-none" aria-hidden="true">
          &rdquo;
        </span>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-base md:text-lg text-foreground/40 max-w-xl leading-relaxed opacity-0"
        >
          Chaque projet est unique. Chaque d{"\u00E9"}tail est d{"\u00E9"}lib{"\u00E9"}r{"\u00E9"}.
          Tant que c&apos;est pas parfait, on ne lance pas.
        </p>
      </div>
    </Section>
  );
}
