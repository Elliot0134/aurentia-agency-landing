"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CalModal } from "@/components/shared/CalModal";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeCTA() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [calOpen, setCalOpen] = useState(false);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
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
  }, { scope: contentRef, dependencies: [animationsEnabled] });

  return (
    <>
      <Section
        id="cta"
        theme="dark"
        className="relative py-28 md:py-40 text-center overflow-hidden border-t-0"
      >
        <div
          ref={contentRef}
          className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5"
        >
          <p
            data-reveal
            className="text-sm tracking-widest uppercase text-foreground/30 font-medium"
          >
            Discutons ensemble
          </p>

          <TextReveal
            text="Prêt à révéler votre projet ?"
            elementType="h2"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight justify-center"
          />

          <p
            data-reveal
            className="text-base md:text-lg text-foreground/40 max-w-md leading-relaxed"
          >
            Un échange. Votre vision. Nos idées.
            <br />
            Sans engagement.
          </p>

          <div data-reveal className="mt-6">
            <MagneticButton
              glow
              className="px-8 py-3.5"
              onClick={() => setCalOpen(true)}
            >
              Prendre rendez-vous&nbsp;&nbsp;&rarr;
            </MagneticButton>
          </div>
        </div>
      </Section>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
