"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { faqContent } from "@/data/landing-pages-content";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border-b border-foreground/[0.06] mb-4 last:mb-0",
        "transition-colors duration-700 ease-in-out"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`lp-faq-answer-${index}`}
        id={`lp-faq-question-${index}`}
        className={cn(
          "w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left",
          "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 rounded-sm",
          "transition-colors duration-700 ease-in-out"
        )}
      >
        <span
          className={cn(
            "text-lg md:text-xl font-medium leading-snug",
            "transition-colors duration-700 ease-in-out",
            isOpen ? "text-accent-primary" : "text-foreground"
          )}
        >
          {question}
        </span>

        {/* Plus/minus icon */}
        <span
          aria-hidden="true"
          className={cn(
            "relative flex-shrink-0 w-6 h-6 flex items-center justify-center",
            "text-foreground/40",
            "transition-colors duration-700 ease-in-out",
            isOpen && "text-accent-primary"
          )}
        >
          <span
            className={cn(
              "absolute w-[14px] h-[1.5px] rounded-full bg-current",
              "transition-transform duration-700 ease-in-out"
            )}
          />
          <span
            className={cn(
              "absolute w-[14px] h-[1.5px] rounded-full bg-current",
              "transition-transform duration-700 ease-in-out",
              isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"
            )}
          />
        </span>
      </button>

      {/* Accordion body */}
      <div
        id={`lp-faq-answer-${index}`}
        role="region"
        aria-labelledby={`lp-faq-question-${index}`}
        className={cn(
          "grid transition-[grid-template-rows] duration-700 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p
            className={cn(
              "text-foreground/60 text-sm md:text-base leading-relaxed pb-6 md:pb-7 pr-10",
              "transition-opacity duration-700 ease-in-out",
              isOpen ? "opacity-100" : "opacity-0"
            )}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function LandingPagesFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <Section className="py-28 md:py-36 relative">
      <SectionBackground variant="base" />

      <div className="relative z-10">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-primary/[0.04] rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20 w-full max-w-2xl mx-auto">
            <TextReveal
              text={faqContent.title}
              elementType="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 justify-center"
            />
          </div>

          {/* Accordion list */}
          <div className="w-full max-w-3xl mx-auto">
            <BlurReveal>
              <div>
                {faqContent.items.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    index={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                  />
                ))}
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
