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
import { saasCTAContent } from "@/data/saas-content";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SaasCTA() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
    },
    { scope: contentRef }
  );

  return (
    <Section className="relative py-28 md:py-36 min-h-[50vh] flex items-center overflow-hidden">
      {/* Intense gradient mesh via SectionBackground with orbs */}
      <SectionBackground
        variant="alt"
        orbs={[
          { color: "orange", position: "top-[20%] left-[20%]", size: "w-[600px] h-[600px]", opacity: "[0.12]" },
          { color: "ambre", position: "bottom-[15%] right-[20%]", size: "w-[500px] h-[500px]", opacity: "[0.08]" },
          { color: "violet", position: "top-[50%] left-[50%]", size: "w-[400px] h-[400px]", opacity: "[0.06]" },
        ]}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-8"
      >
        {/* Title */}
        <TextGradientReveal
          text={saasCTAContent.title}
          elementType="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground justify-center leading-tight"
        />

        {/* Subtitle */}
        <BlurReveal delay={0.3}>
          <p className="text-lg md:text-xl text-foreground/50 max-w-lg leading-relaxed">
            {saasCTAContent.subtitle}
          </p>
        </BlurReveal>

        {/* CTA Button */}
        <div data-reveal className="mt-4">
          <a
            href={saasCTAContent.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MagneticButton
              glow
              className="px-10 py-4 text-base w-full sm:w-auto"
            >
              {saasCTAContent.cta}&nbsp;&nbsp;&rarr;
            </MagneticButton>
          </a>
        </div>

        {/* Proof points */}
        <div
          data-reveal
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-2"
        >
          {saasCTAContent.proofs.map((proof) => (
            <span
              key={proof}
              className="flex items-center gap-2 text-sm text-foreground/40"
            >
              <Check className="w-4 h-4 text-foreground/30" />
              {proof}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
