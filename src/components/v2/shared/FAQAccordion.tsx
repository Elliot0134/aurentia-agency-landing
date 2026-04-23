// src/components/v2/shared/FAQAccordion.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FAQItem } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type FAQAccordionProps = {
  items: FAQItem[];
  className?: string;
};

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("flex flex-col divide-y divide-foreground/10 border-y border-foreground/10", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-500 ease-in-out hover:text-accent-primary"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
            >
              <span className="text-base font-semibold text-foreground transition-colors duration-500 ease-in-out group-hover:text-accent-primary md:text-lg">
                {item.question}
              </span>
              <Plus
                className={cn(
                  "size-5 shrink-0 text-foreground/60 transition-all duration-500 ease-in-out",
                  isOpen && "rotate-45 text-accent-primary"
                )}
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0">
                <p className="text-base leading-relaxed text-foreground/65">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
