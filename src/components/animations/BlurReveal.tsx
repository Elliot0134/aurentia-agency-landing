"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useAnimationsEnabled } from "./AnimationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  style,
}: BlurRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!containerRef.current || !animationsEnabled) return;

    const elements = containerRef.current.children;
    if (!elements.length) return;

    // Check if element is already in viewport (above the fold)
    const rect = containerRef.current.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight;

    const fromVars = {
      opacity: 0,
      filter: "blur(8px)",
      scale: 0.97,
      y: 20,
    };

    const toVars = {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      duration: 0.5,
      stagger: stagger,
      ease: "power3.out",
    };

    if (isAboveFold) {
      // Above the fold: animate immediately with delay
      gsap.fromTo(elements, fromVars, {
        ...toVars,
        delay: delay || 0.2,
      });
    } else {
      // Below the fold: trigger on scroll
      gsap.fromTo(elements, fromVars, {
        ...toVars,
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }
  }, { scope: containerRef, dependencies: [animationsEnabled] });

  return (
    <div ref={containerRef} className={cn("", className)} style={style}>
      {children}
    </div>
  );
}
