"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ctaContent } from "@/data/landing-pages-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LandingPagesCTA() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      const elements =
        contentRef.current.querySelectorAll("[data-reveal]");

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
    <Section
      theme="dark"
      className="relative py-28 md:py-40 text-center overflow-hidden border-t-0 min-h-[50vh] flex items-center"
    >
      {/* Intense gradient mesh — SectionBackground with orbs */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[20%] left-[25%]", size: "w-[550px] h-[550px]", opacity: "[0.12]" },
          { color: "ambre", position: "bottom-[15%] right-[20%]", size: "w-[450px] h-[450px]", opacity: "[0.08]" },
          { color: "violet", position: "top-[40%] left-[50%]", size: "w-[500px] h-[500px]", opacity: "[0.06]" },
          { color: "rose", position: "bottom-[30%] left-[10%]", size: "w-[350px] h-[350px]", opacity: "[0.05]" },
        ]}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6 w-full"
      >
        {/* Title */}
        <TextGradientReveal
          text={ctaContent.title}
          elementType="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight justify-center"
        />

        {/* Subtitle */}
        <p
          data-reveal
          className="text-lg md:text-xl text-foreground/40 max-w-xl leading-relaxed"
        >
          {ctaContent.subtitle}
        </p>

        {/* CTA Button */}
        <div data-reveal className="mt-6">
          <MagneticButton
            glow
            className="px-10 py-4 text-base"
            onClick={() => window.open(ctaContent.cta.href, "_blank")}
          >
            {ctaContent.cta.label}
          </MagneticButton>
        </div>

        {/* Proof points */}
        <div
          data-reveal
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-4"
        >
          {ctaContent.proofs.map((proof, idx) => (
            <span
              key={idx}
              className="text-sm text-foreground/30 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary/50" />
              {proof}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
