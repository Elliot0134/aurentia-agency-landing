"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { faqContent } from "@/data/content";
import { ChevronDown } from "lucide-react";

export function ConciergerieFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First one open by default

  return (
    <Section id="faq" theme="transparent" className="py-32 border-t border-foreground/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <TextReveal 
            text={faqContent.title} 
            elementType="h2"
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 justify-center"
          />
        </div>

        <div className="flex flex-col gap-4">
          {faqContent.items.map((item, idx) => {
            const isOpen = openIdx === idx;
            
            return (
              <BlurReveal key={idx} delay={idx * 0.1}>
                <div 
                  className={`border border-foreground/10 rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-foreground/5' : 'bg-transparent hover:bg-foreground/[0.02]'}`}
                >
                  <button 
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-foreground' : 'text-foreground-muted'}`}>
                      {item.question}
                    </span>
                    <ChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-primary' : 'text-foreground-dim'}`} />
                  </button>
                  
                  <div 
                    className="overflow-hidden transition-all duration-300 px-6"
                    style={{ 
                      maxHeight: isOpen ? "200px" : "0",
                      opacity: isOpen ? 1 : 0,
                      paddingBottom: isOpen ? "24px" : "0"
                    }}
                  >
                    <p className="text-foreground-muted leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
