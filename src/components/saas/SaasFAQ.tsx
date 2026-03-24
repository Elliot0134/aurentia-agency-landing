"use client";

import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { saasFAQContent, saasFAQItems } from "@/data/saas-content";
import type { SaasFAQItem } from "@/data/saas-content";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: SaasFAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!answerRef.current || !innerRef.current) return;

      if (isOpen) {
        const height = innerRef.current.scrollHeight;
        gsap.to(answerRef.current, {
          height,
          opacity: 1,
          duration: 0.6,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [isOpen] }
  );

  return (
    <div className="border-b border-foreground/10 last:border-b-0 mb-4 last:mb-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 md:py-7 text-left group cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="text-base md:text-lg font-semibold text-foreground transition-colors duration-700 group-hover:text-foreground/80">
          {item.question}
        </span>
        <ChevronDown
          className="w-5 h-5 text-foreground/40 shrink-0 transition-transform duration-700 ease-in-out"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        ref={answerRef}
        id={`faq-answer-${index}`}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
        role="region"
        aria-labelledby={`faq-question-${index}`}
      >
        <div ref={innerRef} className="pb-6 md:pb-7">
          <p className="text-sm md:text-base text-foreground/50 leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SaasFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <Section id="faq" className="py-28 md:py-36 relative">
      <SectionBackground variant="base" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <TextReveal
            text={saasFAQContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground justify-center"
          />
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <BlurReveal stagger={0.1}>
            {saasFAQItems.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </BlurReveal>
        </div>
      </div>
    </Section>
  );
}
