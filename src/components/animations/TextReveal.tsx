"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
  elementType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  delay?: number;
}

export function TextReveal({
  text,
  className,
  elementType = "p",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const words = containerRef.current.querySelectorAll(".word");
    if (!words.length) return;

    const rect = containerRef.current.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight + 100;

    if (isVisible) {
      gsap.fromTo(
        words,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: 0.04,
          delay: delay || 0.2,
          ease: "power3.out",
          onComplete: () => setHasAnimated(true),
        }
      );
    } else {
      gsap.fromTo(
        words,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onComplete: () => setHasAnimated(true),
        }
      );
    }
  }, [delay, hasAnimated]);

  const wordsArray = text.split(" ");
  const Tag = elementType;

  return (
    <Tag ref={containerRef as React.Ref<never>} className={cn("flex flex-wrap gap-x-[0.25em]", className)}>
      {wordsArray.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <span className="word inline-block origin-bottom">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
