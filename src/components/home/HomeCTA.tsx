"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { AuroraBackground } from "@/components/animations/AuroraBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeCTA() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll("[data-reveal]");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: contentRef });

  return (
    <Section
      id="cta"
      theme="dark"
      className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center overflow-hidden border-t-0 py-32 md:py-0"
    >
      {/* Aurora background */}
      <AuroraBackground intensity="medium" />

      {/* Subtle warm vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,100,66,0.04)_0%,transparent_50%)] pointer-events-none z-[1]" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-10"
      >
        {/* Headline */}
        <h2
          data-reveal
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.05]"
        >
          Prêt à{" "}
          <span className="text-orange-gradient italic">révéler</span>
          <br />
          votre projet&nbsp;?
        </h2>

        {/* Subtitle */}
        <p
          data-reveal
          className="text-lg sm:text-xl md:text-2xl text-foreground/50 font-medium max-w-2xl leading-relaxed"
        >
          Un échange. Votre vision. Nos idées.
          <br />
          <span className="text-foreground/80 font-semibold">
            Sans engagement.
          </span>
        </p>

        {/* Simple white button */}
        <button
          data-reveal
          className="mt-4 rounded-full bg-foreground text-background px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-semibold tracking-wide transition-all duration-700 ease-in-out hover:opacity-85 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] cursor-pointer"
          onClick={() => window.open("https://cal.com/aurentia", "_blank")}
        >
          Prendre rendez-vous&nbsp;&nbsp;→
        </button>

        {/* Trust line */}
        <p
          data-reveal
          className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm font-mono tracking-wider text-foreground/30 uppercase"
        >
          <span>Sur-mesure</span>
          <span className="text-foreground/15">·</span>
          <span>Sans engagement</span>
          <span className="text-foreground/15">·</span>
          <span>Un seul interlocuteur</span>
        </p>
      </div>
    </Section>
  );
}
