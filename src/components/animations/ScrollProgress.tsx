"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimationsEnabled } from "./AnimationContext";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !animationsEnabled) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [animationsEnabled]);

  if (!animationsEnabled) return null;

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
