"use client";

import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/animations/BlurReveal";

interface LegalSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function LegalSection({ id, title, children, className }: LegalSectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28", className)}
    >
      <BlurReveal>
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-6 pl-4 border-l-2 border-accent-primary/20">
          <a
            href={`#${id}`}
            className="hover:text-foreground/70 transition-colors duration-500 ease-in-out"
          >
            {title}
          </a>
        </h2>
        <div className="text-base md:text-lg leading-relaxed md:leading-loose text-foreground/80 space-y-4">
          {children}
        </div>
      </BlurReveal>
    </section>
  );
}
