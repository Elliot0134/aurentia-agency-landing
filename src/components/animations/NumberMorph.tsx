"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    if (!containerRef.current) return;
    
    const valueString = value.toString();
    const digits = containerRef.current.querySelectorAll('.digit-column');

    digits.forEach((digit, i) => {
      const targetDigit = parseInt(valueString[i]);
      // Reset position
      gsap.set(digit, { y: 0 });

      // Animate to target digit (each digit column has 0-9 stacked vertically)
      // Height of one digit line is roughly 1em.
      gsap.to(digit, {
        y: `-${targetDigit}em`,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse" // Play on scroll down, reverse on scroll up just to feel dynamic
        }
      });
    });

  }, [value]);

  const valueString = value.toString();

  return (
    <div ref={containerRef} className={cn("inline-flex overflow-hidden h-[1em] leading-none items-end", className)}>
      {valueString.split('').map((char, index) => (
        <div key={index} className="relative inline-block w-[0.6em] h-[1em]">
          <div className="digit-column absolute top-0 left-0 flex flex-col will-change-transform">
            {/* We stack 0-9 vertically */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <span key={num} className="h-[1em] leading-none flex items-center justify-center">
                {num}
              </span>
            ))}
          </div>
        </div>
      ))}
      <span className="leading-none">{suffix}</span>
    </div>
  );
};
