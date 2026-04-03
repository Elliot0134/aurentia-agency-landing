"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useAnimationsEnabled } from "./AnimationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NumberMorphProps {
  value: number;
  suffix?: string;
  className?: string;
}

export const NumberMorph = ({ value, suffix = "", className }: NumberMorphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useEffect(() => {
    if (!containerRef.current || !animationsEnabled) return;

    const valueString = value.toString();
    const digits = containerRef.current.querySelectorAll('.digit-column');

    digits.forEach((digit, i) => {
      const targetDigit = parseInt(valueString[i]);
      gsap.set(digit, { y: 0 });

      gsap.to(digit, {
        y: `-${targetDigit * 1.1}em`,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

  }, [value, animationsEnabled]);

  // On mobile, show the final value directly
  if (!animationsEnabled) {
    return (
      <span className={className}>
        {value}{suffix}
      </span>
    );
  }

  const valueString = value.toString();

  return (
    <div ref={containerRef} className={cn("inline-flex overflow-hidden h-[1.1em] leading-none items-end", className)}>
      {valueString.split('').map((char, index) => (
        <div key={index} className="relative inline-block w-[0.65em] h-[1.1em]">
          <div className="digit-column absolute top-0 left-0 flex flex-col will-change-transform">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <span key={num} className="h-[1.1em] leading-[1.1em] flex items-center justify-center">
                {num}
              </span>
            ))}
          </div>
        </div>
      ))}
      <span className="leading-[1.1em]">{suffix}</span>
    </div>
  );
};
