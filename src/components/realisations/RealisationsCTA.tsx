"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CalModal } from "@/components/shared/CalModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const proofPoints = [
  "Gratuit et sans engagement",
  "On vous montre VOTRE site",
  "Vous gardez l\u2019audit quoi qu\u2019il arrive",
] as const;

export function RealisationsCTA() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [calOpen, setCalOpen] = useState(false);

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
    <>
      <Section
        id="cta-realisations"
      theme="dark"
      className="relative min-h-[50vh] flex items-center justify-center py-28 md:py-40 text-center overflow-hidden border-t-0"
    >
      {/* Intense gradient mesh — 3 orbs with doubled opacity */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[25%] left-[30%]", size: "w-[600px] h-[400px]", opacity: "[0.12]" },
          { color: "ambre", position: "bottom-[25%] right-[25%]", size: "w-[500px] h-[350px]", opacity: "[0.08]" },
          { color: "rose", position: "top-[50%] left-[50%]", size: "w-[400px] h-[300px]", opacity: "[0.06]" },
        ]}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5"
      >
        {/* Eyebrow */}
        <p
          data-reveal
          className="text-sm tracking-widest uppercase text-foreground/30 font-medium"
        >
          Passons {"à"} l&apos;action
        </p>

        {/* Headline */}
        <TextReveal
          elementType="h2"
          className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight justify-center"
        >
          {"Votre projet m\u00E9rite d\u2019\u00EAtre vu."}
        </TextReveal>

        {/* Subtitle */}
        <p
          data-reveal
          className="text-base md:text-lg text-foreground/40 max-w-lg leading-relaxed"
        >
          On vous pr{"\u00E9"}pare un aper{"\u00E7"}u de votre futur site. Gratuit. 20 minutes.
          Sans engagement. Vous repartez avec un audit de vos concurrents et des
          recommandations strat{"\u00E9"}giques.
        </p>

        {/* CTA Button */}
        <div data-reveal className="mt-6 w-full sm:w-auto">
          <MagneticButton
            glow
            className="px-8 py-3.5 w-full sm:w-auto"
            onClick={() => setCalOpen(true)}
          >
            R{"\u00E9"}server mon call gratuit&nbsp;&nbsp;{"\u2192"}
          </MagneticButton>
        </div>

        {/* Proof points */}
        <div data-reveal className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-4">
          {proofPoints.map((point) => (
            <span
              key={point}
              className="text-sm text-foreground/30 flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-accent-primary/60 shrink-0" />
              {point}
            </span>
          ))}
        </div>
      </div>
      </Section>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
