"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import {
  audienceItems,
  audienceSectionContent,
} from "@/data/about-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutAudience() {
  const listRef = useRef<HTMLUListElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!listRef.current) return;

    const items = listRef.current.querySelectorAll("[data-audience-item]");
    const checks = listRef.current.querySelectorAll("[data-check-icon]");

    // Slide-in items from the left
    gsap.fromTo(
      items,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      }
    );

    // Check icon bounce
    gsap.fromTo(
      checks,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2.5)",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: listRef, dependencies: [animationsEnabled] });

  return (
    <>
      <SectionDivider />
      <Section
        id="audience"
        theme="dark"
        className="py-28 md:py-36"
      >
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <TextReveal
            text={audienceSectionContent.title}
            elementType="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
          />

          {/* Paragraph */}
          <BlurReveal className="mb-12 md:mb-16">
            <p className="text-base md:text-lg text-foreground/40 leading-relaxed">
              {audienceSectionContent.paragraph}
            </p>
          </BlurReveal>

          {/* Checklist */}
          <ul ref={listRef} className="space-y-5 md:space-y-6 mb-12 md:mb-16">
            {audienceItems.map((item, index) => (
              <li
                key={index}
                data-audience-item
                className="flex items-start gap-4 rounded-xl p-4 transition-colors duration-500 ease-in-out hover:bg-foreground/[0.02]"
              >
                {/* Check icon */}
                <div
                  data-check-icon
                  className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-accent-primary/15 flex items-center justify-center"
                >
                  <Check className="w-3.5 h-3.5 text-accent-primary" />
                </div>

                {/* Text */}
                <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          {/* Conclusion */}
          <BlurReveal>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed font-medium border-l-2 border-accent-primary/40 pl-6">
              {audienceSectionContent.conclusion}
            </p>
          </BlurReveal>
        </div>
      </Section>
    </>
  );
}
