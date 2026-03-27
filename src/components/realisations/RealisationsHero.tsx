"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { ChevronDown } from "lucide-react";
import { CalModal } from "@/components/shared/CalModal";

export function RealisationsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const [calOpen, setCalOpen] = useState(false);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Badge: fade-in + scale
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "power3.out" }
        );
      }

      // Chevron: infinite bounce
      if (chevronRef.current) {
        gsap.fromTo(
          chevronRef.current,
          { opacity: 0 },
          { opacity: 1, delay: 1, duration: 0.6 }
        );
        gsap.to(chevronRef.current, {
          y: 8,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2,
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <SectionBackground
        showGrid gridOpacity={0.1} gridFadeDirection="bottom"
        orbs={[
          { color: "orange", position: "bottom-0 right-0", size: "w-[500px] h-[500px]", opacity: "[0.08]" },
          { color: "ambre", position: "top-[20%] left-[15%]", size: "w-[350px] h-[350px]", opacity: "[0.05]" },
          { color: "orange", position: "top-[50%] right-[25%]", size: "w-[250px] h-[250px]", opacity: "[0.04]" },
        ]}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-7xl">
        {/* Badge */}
        <div ref={badgeRef} className="opacity-0 mb-6 md:mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10">
            NOS RÉALISATIONS
          </span>
        </div>

        {/* H1 */}
        <BlurReveal delay={0.15}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-tight text-foreground text-center">
            Chaque projet raconte
            <br />
            <span>une </span>
            <span className="bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent underline decoration-accent-primary/50 underline-offset-4 decoration-2 md:decoration-4">
              transformation
            </span>
          </h1>
        </BlurReveal>

        {/* Subtitle */}
        <BlurReveal className="mt-6 md:mt-8" delay={0.3}>
          <p className="text-base md:text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Sites vitrines, applications SaaS, landing pages. Zéro template.
            Chaque pixel a une intention. Voici ce qu&apos;on a forgé pour nos clients.
          </p>
        </BlurReveal>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0 mt-8 md:mt-10 flex flex-col items-center gap-4">
          <MagneticButton
            glow
            className="w-full sm:w-auto px-8 py-4 text-base md:text-lg"
            onClick={() => setCalOpen(true)}
          >
            Discuter de votre projet
          </MagneticButton>
          <p className="text-sm text-foreground/40">Gratuit · 20 min · Sans engagement</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      >
        <ChevronDown className="w-6 h-6 text-foreground/30" />
      </div>
      </section>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
