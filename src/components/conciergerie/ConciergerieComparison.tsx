"use client";

import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { comparisonContent } from "@/data/content";
import { Check, X } from "lucide-react";

export function ConciergerieComparison() {
  return (
    <Section theme="dark-alt-2" className="py-32">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <TextReveal 
          text={comparisonContent.title} 
          elementType="h2"
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 justify-center"
        />
      </div>

      <BlurReveal delay={0.2} className="overflow-x-auto pb-8">
        <div className="min-w-[800px] w-full max-w-5xl mx-auto bg-background rounded-3xl border border-foreground/10 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-5 p-6 border-b border-foreground/10 bg-foreground/5">
            <div className="col-span-1"></div>
            {comparisonContent.columns.map((col, idx) => (
              <div key={idx} className={`col-span-1 text-center font-bold ${idx === 3 ? 'text-accent-primary text-lg' : 'text-foreground-muted'}`}>
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {comparisonContent.rows.map((row, idx) => (
            <div key={idx} className={`grid grid-cols-5 p-6 border-b border-foreground/5 items-center transition-colors hover:bg-foreground/5 ${idx % 2 === 0 ? '' : 'bg-foreground/[0.02]'}`}>
              <div className="col-span-1 font-medium text-foreground-muted">
                {row.label}
              </div>
              
              {row.values.map((val, vIdx) => (
                <div key={vIdx} className={`col-span-1 flex justify-center text-center ${vIdx === 3 ? 'font-bold text-foreground' : 'text-foreground-dim'}`}>
                  {typeof val === 'boolean' ? (
                    val ? <Check className={vIdx === 3 ? "text-accent-primary" : "text-foreground-muted"} /> : <X className="text-red-500/50" />
                  ) : (
                    <span>{val}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
          
        </div>
      </BlurReveal>
    </Section>
  );
}
