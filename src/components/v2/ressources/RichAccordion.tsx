// src/components/v2/ressources/RichAccordion.tsx
"use client";

import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type RichAccordionProps = {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};

export function RichAccordion({ id, title, open, onToggle, children }: RichAccordionProps) {
  return (
    <section id={id} className="border-b border-foreground/10 first:border-t scroll-mt-24">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-500 ease-in-out md:py-8"
      >
        <h2 className="font-heading text-xl tracking-tight text-foreground transition-colors duration-500 ease-in-out group-hover:text-accent-primary md:text-2xl">
          {title}
        </h2>
        <Plus
          className={cn(
            "size-5 shrink-0 text-foreground/50 transition-all duration-500 ease-in-out md:size-6",
            open && "rotate-45 text-accent-primary"
          )}
          aria-hidden
        />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100 pb-10 md:pb-12" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 min-w-0">{children}</div>
      </div>
    </section>
  );
}
