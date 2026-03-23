"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextGradientRevealProps {
  text: string;
  className?: string;
  elementType?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export const TextGradientReveal = ({
  text,
  className,
  elementType: Component = "h2",
}: TextGradientRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.headline-word');

    // V2 Prompt implementation:
    // Chaque mot commence gris (#555) et passe en blanc ou gradient orange au scroll (scrub: true)
    gsap.fromTo(words, 
      { color: "currentColor", opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  const wordsArray = text.split(" ");

  return (
    <Component ref={containerRef as React.Ref<never>} className={cn("flex flex-wrap gap-x-[0.25em]", className)}>
      {wordsArray.map((word, i) => (
        <span
          key={i}
          className="headline-word inline-block font-black transition-colors duration-300"
        >
          {word}
        </span>
      ))}
    </Component>
  );
};
