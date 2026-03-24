"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { vitrineContent } from "@/data/landing-pages-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Larger browser mockup frame ──────────────────── */
function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden shadow-2xl shadow-foreground/[0.05]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-foreground/5 bg-foreground/[0.03]">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-foreground/10" />
          <span className="w-3 h-3 rounded-full bg-foreground/10" />
          <span className="w-3 h-3 rounded-full bg-foreground/10" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-sm text-foreground/30 font-mono px-5 py-1.5 rounded-lg bg-foreground/[0.03] border border-foreground/5">
            aurentia.agency
          </span>
        </div>
        <div className="w-[62px]" /> {/* Spacer to balance dots */}
      </div>
      {/* Content area */}
      <div className="relative">{children}</div>
    </div>
  );
}

export function LandingPagesVitrine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!calloutsRef.current) return;

      const items = calloutsRef.current.querySelectorAll(".callout-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: calloutsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <Section className="py-28 md:py-36 min-h-[60vh] relative">
      <SectionBackground variant="base" />

      <div ref={sectionRef} className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <BlurReveal>
            <span className="inline-block text-sm font-mono uppercase tracking-widest px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 mb-8">
              {vitrineContent.badge}
            </span>
          </BlurReveal>

          <TextGradientReveal
            text={vitrineContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 justify-center"
          />

          <BlurReveal delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/60">
              {vitrineContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Browser frame — larger and more prominent */}
        <BlurReveal delay={0.3} className="max-w-5xl mx-auto mb-14">
          <BrowserMockup>
            <div className="relative aspect-[16/9] bg-foreground/[0.02]">
              <Image
                src="/images/landing-pages/vitrine-aurentia.webp"
                alt="aurentia.agency — notre site vitrine"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
              {/* Fallback overlay when image is missing */}
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/[0.02]">
                <span className="text-sm text-foreground/20 font-mono">
                  aurentia.agency
                </span>
              </div>
            </div>
          </BrowserMockup>
        </BlurReveal>

        {/* Callouts with subtle connecting lines (border-l) */}
        <div
          ref={calloutsRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-3xl mx-auto mb-14"
        >
          {vitrineContent.callouts.map((callout) => (
            <div
              key={callout.label}
              className="callout-item flex items-center gap-3 px-5 py-4 rounded-xl border-l-2 border-l-accent-primary/30 border border-foreground/5 bg-foreground/[0.02] transition-all duration-700 ease-in-out hover:border-l-accent-primary/60 hover:bg-accent-primary/[0.03]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary/60 shrink-0" />
              <span className="text-sm font-medium text-foreground/70">
                {callout.label}
              </span>
            </div>
          ))}
        </div>

        {/* Closing */}
        <BlurReveal delay={0.4}>
          <p className="text-center text-xl md:text-2xl font-semibold text-foreground/80 italic">
            {vitrineContent.closing}
          </p>
        </BlurReveal>
      </div>
    </Section>
  );
}
