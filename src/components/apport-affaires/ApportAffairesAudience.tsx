"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import {
  apportAudienceSection,
  apportAudience,
} from "@/data/apport-affaires-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ApportAffairesAudience() {
  const listRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!listRef.current) return;

      const items = listRef.current.querySelectorAll("[data-audience-item]");

      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Check icon bounce
      const checks = listRef.current.querySelectorAll("[data-check]");
      gsap.fromTo(
        checks,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: listRef, dependencies: [animationsEnabled] }
  );

  return (
    <Section theme="dark" className="py-32">
      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <TextReveal
            text={apportAudienceSection.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/50 text-base md:text-lg leading-relaxed">
              {apportAudienceSection.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* List */}
        <div ref={listRef} className="w-full max-w-3xl mx-auto space-y-6">
          {apportAudience.map((item) => (
            <div
              key={item.label}
              data-audience-item
              className={cn(
                "flex items-start gap-4 p-6 rounded-2xl",
                "border border-foreground/5 bg-foreground/[0.02]",
                "transition-all duration-700 ease-in-out hover:border-foreground/10 hover:bg-foreground/[0.04]"
              )}
            >
              {/* Check icon */}
              <div
                data-check
                className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center mt-0.5"
              >
                <Check className="w-4 h-4 text-accent-primary" />
              </div>

              <div>
                <h3 className="text-lg font-bold mb-1">{item.label}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
