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

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!layerRef.current || !animationsEnabled) return;

    const yValue = (1 - speed) * 100;

    gsap.fromTo(
      layerRef.current,
      { y: -yValue },
      {
        y: yValue,
        ease: "none",
        scrollTrigger: {
          trigger: layerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, { scope: layerRef, dependencies: [animationsEnabled] });

  return (
    <div ref={layerRef} className={cn("relative z-0", className)}>
      {children}
    </div>
  );
}
