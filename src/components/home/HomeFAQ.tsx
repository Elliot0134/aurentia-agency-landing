"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Combien de temps pour livrer un projet ?",
    answer:
      "Selon la complexité : un site vitrine en 48-72h, une landing page en 1-2 semaines, un SaaS complet en 4-8 semaines. On s'adapte à vos urgences.",
  },
  {
    question: "Comment se déroule un projet ?",
    answer:
      "Appel découverte → Maquettes en 48h → Développement itératif avec vos retours → Tests → Lancement. Vous avez un interlocuteur unique du début à la fin.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Next.js, React, TypeScript, Tailwind CSS, Supabase, Stripe. Des technologies modernes, performantes et maintenables. Pas de WordPress, pas de no-code.",
  },
  {
    question: "Que comprennent vos tarifs ?",
    answer:
      "Design sur-mesure, développement, SEO technique, hébergement première année, et 30 jours de support post-lancement. Zéro surprise.",
  },
  {
    question: "Et après le lancement ?",
    answer:
      "On ne disparaît pas. Maintenance, évolutions, support technique — on reste disponibles. Forfaits mensuels adaptés à vos besoins.",
  },
  {
    question: "Proposez-vous des facilités de paiement ?",
    answer:
      "Oui. Paiement en 2 ou 3 fois sans frais sur tous nos projets. On s'adapte à votre trésorerie.",
  },
];

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
        "border-b border-foreground/[0.06]",
        "transition-colors duration-700 ease-in-out"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
        className={cn(
          "w-full flex items-center justify-between gap-6 py-5 text-left",
          "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 rounded-sm",
          "transition-colors duration-700 ease-in-out"
        )}
      >
        <span
          className={cn(
            "text-lg font-medium leading-snug",
            "transition-colors duration-700 ease-in-out",
            isOpen ? "text-accent-primary" : "text-foreground"
          )}
        >
          {question}
        </span>

        {/* Plus/minus icon — rotates 45deg to become an × when open */}
        <span
          aria-hidden="true"
          className={cn(
            "relative flex-shrink-0 w-6 h-6 flex items-center justify-center",
            "text-foreground/40",
            "transition-colors duration-700 ease-in-out",
            isOpen && "text-accent-primary"
          )}
        >
          {/* Horizontal bar — always visible */}
          <span
            className={cn(
              "absolute w-[14px] h-[1.5px] rounded-full bg-current",
              "transition-transform duration-700 ease-in-out"
            )}
          />
          {/* Vertical bar — rotates to 0deg (disappears into horizontal) when open */}
          <span
            className={cn(
              "absolute w-[14px] h-[1.5px] rounded-full bg-current",
              "transition-transform duration-700 ease-in-out",
              isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"
            )}
          />
        </span>
      </button>

      {/* Accordion body — CSS grid trick for smooth height animation */}
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={cn(
          "grid transition-[grid-template-rows] duration-700 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p
            className={cn(
              "text-foreground/50 text-sm leading-relaxed pb-5 pr-10",
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

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <Section
      theme="dark-alt-2"
      className="section-divider-orange py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-primary/[0.04] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 w-full max-w-2xl mx-auto">
          <TextReveal
            text="Questions fréquentes."
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/50 text-lg leading-relaxed">
              Tout ce que vous devez savoir avant de nous contacter.
            </p>
          </BlurReveal>
        </div>

        {/* Accordion list */}
        <div className="w-full max-w-3xl mx-auto">
          <BlurReveal>
            <div>
              {faqs.map((faq, index) => (
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
    </Section>
  );
}
