"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { aboutCtaContent } from "@/data/about-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutCTA() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll("[data-reveal]");

    gsap.fromTo(
      elements,
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
  }, { scope: contentRef });

  return (
    <Section
      id="about-cta"
      theme="dark"
      className="relative min-h-[50vh] py-28 md:py-40 text-center overflow-hidden flex items-center"
    >
      {/* SectionBackground with gradient mesh */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "w-[800px] h-[600px]", opacity: "[0.12]" },
          { color: "ambre", position: "top-[33%] left-[33%]", size: "w-[600px] h-[500px]", opacity: "[0.08]" },
          { color: "rose", position: "bottom-[25%] right-[25%]", size: "w-[400px] h-[400px]", opacity: "[0.06]" },
        ]}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5 w-full"
      >
        {/* Title with TextGradientReveal */}
        <TextGradientReveal
          text={aboutCtaContent.title}
          elementType="h2"
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight justify-center"
        />

        {/* Subtitle */}
        <BlurReveal className="max-w-lg" delay={0.3}>
          <p className="text-base md:text-lg text-foreground/40 leading-relaxed">
            {aboutCtaContent.subtitle}
          </p>
        </BlurReveal>

        {/* CTA Button */}
        <div data-reveal className="mt-6">
          <MagneticButton
            glow
            className="px-8 py-3.5 w-full sm:w-auto"
            onClick={() => window.open("https://cal.com/aurentia", "_blank")}
          >
            {aboutCtaContent.cta}&nbsp;&nbsp;&rarr;
          </MagneticButton>
        </div>

        {/* Proof points */}
        <div
          data-reveal
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-4"
        >
          {aboutCtaContent.proofs.map((proof, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-foreground/30"
            >
              <Check className="w-4 h-4 text-accent-primary flex-shrink-0" />
              <span>{proof}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
