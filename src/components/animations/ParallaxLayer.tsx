"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 1 represents normal scrolling. > 1 is faster, < 1 is slower (backgrounds).
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!layerRef.current) return;
    
    // Parallax logic: translate Y based on scroll
    // A speed of 0.5 means it scrolls at half the speed of the viewport
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
  }, { scope: layerRef });

  return (
    <div ref={layerRef} className={cn("relative z-0", className)}>
      {children}
    </div>
  );
}
