"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroToNameTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textRef.current) return;

    gsap.fromTo(
      textRef.current,
      {
        scale: 0.15,
        y: -100,
        opacity: 0,
        transformPerspective: 800,
        rotateX: 25,
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        rotateX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <div
      ref={sectionRef}
      className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={textRef}
        className="font-heading font-bold text-foreground text-[20vw] leading-none whitespace-nowrap will-change-transform select-none"
      >
        Aurentia
      </div>
    </div>
  );
}
