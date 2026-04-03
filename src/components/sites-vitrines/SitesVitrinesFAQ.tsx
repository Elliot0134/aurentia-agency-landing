"use client";

import { useState } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";
import { faqContent, faqItems } from "@/data/sites-vitrines-content";

interface AccordionItemProps {
  question: string;
  answer: string;
  link?: { text: string; href: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({
  question,
  answer,
  link,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "border-b border-foreground/[0.06]",
        "transition-colors duration-700 ease-in-out"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`sv-faq-answer-${index}`}
        id={`sv-faq-question-${index}`}
        className={cn(
          "w-full flex items-center justify-between gap-6 py-6 text-left",
          "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 rounded-sm",
          "transition-colors duration-700 ease-in-out"
        )}
      >
        <span
          className={cn(
            "text-base md:text-lg font-medium leading-snug",
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
        id={`sv-faq-answer-${index}`}
        role="region"
        aria-labelledby={`sv-faq-question-${index}`}
        className={cn(
          "grid transition-[grid-template-rows] duration-700 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "text-foreground/50 text-sm leading-relaxed pb-6 pr-10",
              "transition-opacity duration-700 ease-in-out",
              isOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <p>{answer}</p>
            {link && (
              <Link
                href={link.href}
                className="inline-block mt-3 text-sm font-semibold text-accent-primary/80 transition-colors duration-500 hover:text-accent-primary"
              >
                {link.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SitesVitrinesFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <Section id="faq" theme="dark-alt-2" className="section-divider-orange py-32">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-primary/[0.04] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 w-full max-w-2xl mx-auto">
          <TextReveal
            text={faqContent.title}
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/50 text-base md:text-lg leading-relaxed">
              Tout ce que vous devez savoir avant de nous contacter.
            </p>
          </BlurReveal>
        </div>

        {/* Visual divider before accordion */}
        <SectionDivider className="mb-12 w-full max-w-3xl" />

        {/* Accordion list */}
        <div className="w-full max-w-3xl mx-auto">
          <BlurReveal>
            <div>
              {faqItems.map((faq, index) => (
                <AccordionItem
                  key={index}
                  index={index}
                  question={faq.question}
                  answer={faq.answer}
                  link={faq.link}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>
          </BlurReveal>
        </div>

        {/* Visual divider after accordion */}
        <SectionDivider className="mt-12 w-full max-w-3xl" />
      </div>
    </Section>
  );
}
