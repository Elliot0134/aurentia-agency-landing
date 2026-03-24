"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { conciergeriesFaqContent } from "@/data/conciergeries-content";
import { Plus } from "lucide-react";

function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const measure = useCallback(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <div
      className={`border border-foreground/10 rounded-2xl overflow-hidden transition-all duration-700 ease-in-out ${
        isOpen
          ? "bg-foreground/5 border-foreground/15"
          : "bg-transparent hover:bg-foreground/[0.02]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`text-lg font-medium transition-colors duration-700 ${
            isOpen ? "text-foreground" : "text-foreground/60"
          }`}
        >
          {question}
        </span>
        <Plus
          className={`w-5 h-5 shrink-0 ml-4 transition-all duration-700 ease-in-out ${
            isOpen
              ? "rotate-45 text-accent-primary"
              : "rotate-0 text-foreground/40"
          }`}
        />
      </button>

      {/* Smooth height transition — never display:none */}
      <div
        className="overflow-hidden transition-all duration-700 ease-in-out"
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <p className="text-foreground/60 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function ConciergerieFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { title, items } = conciergeriesFaqContent;

  // Split into two columns for desktop
  const midpoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midpoint);
  const rightColumn = items.slice(midpoint);

  return (
    <Section id="faq" theme="transparent" className="py-32 border-t border-foreground/5 relative">
      {/* Subtle orbs */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[30%] right-[10%]", size: "w-[350px] h-[350px]", opacity: "[0.06]" },
          { color: "ambre", position: "bottom-[20%] left-[20%]", size: "w-[300px] h-[300px]", opacity: "[0.04]" },
        ]}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <TextReveal
            text={title}
            elementType="h2"
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 justify-center"
          />
        </div>

        {/* 2-column grid on desktop, 1-column on mobile — generous spacing mb-4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {leftColumn.map((item, idx) => (
              <BlurReveal key={idx} delay={idx * 0.08}>
                <FAQAccordionItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIdx === idx}
                  onToggle={() =>
                    setOpenIdx(openIdx === idx ? null : idx)
                  }
                />
              </BlurReveal>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {rightColumn.map((item, idx) => {
              const globalIdx = midpoint + idx;
              return (
                <BlurReveal key={globalIdx} delay={globalIdx * 0.08}>
                  <FAQAccordionItem
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIdx === globalIdx}
                    onToggle={() =>
                      setOpenIdx(openIdx === globalIdx ? null : globalIdx)
                    }
                  />
                </BlurReveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
