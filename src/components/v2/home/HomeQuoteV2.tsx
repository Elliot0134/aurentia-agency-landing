"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORDS = [
  { text: "Tant", highlight: false },
  { text: "que", highlight: false },
  { text: "ce", highlight: false },
  { text: "n'est", highlight: false },
  { text: "pas", highlight: false },
  { text: "parfait,", highlight: true },
  { text: "on", highlight: false },
  { text: "ne", highlight: false },
  { text: "lance", highlight: false },
  { text: "pas.", highlight: false },
];

export function HomeQuoteV2() {
  const containerRef = useRef<HTMLQuoteElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!containerRef.current || !animationsEnabled) return;

    const words = containerRef.current.querySelectorAll(".quote-word");

    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      },
    );
  }, { scope: containerRef, dependencies: [animationsEnabled] });

  return (
    <section className="w-full px-6 py-24 md:px-12 md:py-32">
      <blockquote ref={containerRef} className="relative mx-auto max-w-5xl text-center">
        {/* Opening decorative quote mark */}
        <span
          className="pointer-events-none select-none font-heading text-[120px] md:text-[180px] leading-none text-accent-primary/15 absolute -top-14 left-1/2 -translate-x-1/2 md:-top-20"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* The quote — word by word with scroll reveal */}
        <p className="relative z-10 flex flex-wrap justify-center gap-x-[0.25em] font-heading text-3xl md:text-5xl lg:text-6xl tracking-tight">
          {WORDS.map((w, i) => (
            <span
              key={i}
              className={`quote-word inline-block transition-colors duration-500 ${
                w.highlight
                  ? "font-semibold underline decoration-accent-primary/50 underline-offset-[6px]"
                  : ""
              }`}
            >
              {w.text}
            </span>
          ))}
        </p>

        {/* Attribution */}
        <footer className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-accent-primary/40" />
          <span className="text-sm font-mono uppercase tracking-[0.15em] text-accent-primary/70">
            L&apos;équipe Aurentia
          </span>
          <span className="h-px w-8 bg-accent-primary/40" />
        </footer>
      </blockquote>
    </section>
  );
}
