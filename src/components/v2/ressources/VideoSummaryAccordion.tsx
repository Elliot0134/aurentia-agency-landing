"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Chapter = {
  title: string;
  timestamp: string;
  description: string;
};

type VideoSummaryAccordionProps = {
  label: string;
  intro?: string;
  chapters: Chapter[];
  className?: string;
};

export function VideoSummaryAccordion({
  label,
  intro,
  chapters,
  className,
}: VideoSummaryAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mt-5 overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-sm",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 px-5 py-4 text-left transition-colors duration-500 ease-in-out hover:bg-foreground/[0.03] md:px-6 md:py-5"
      >
        <span className="text-base font-semibold text-foreground transition-colors duration-500 ease-in-out group-hover:text-accent-primary md:text-lg">
          {label}
        </span>
        <Plus
          className={cn(
            "size-5 shrink-0 text-foreground/60 transition-all duration-500 ease-in-out",
            open && "rotate-45 text-accent-primary",
          )}
          aria-hidden
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 min-w-0">
          <div className="border-t border-border/60 px-5 py-6 md:px-6 md:py-7">
            {intro ? (
              <p className="mb-6 text-base leading-relaxed text-foreground/70 md:text-lg">
                {intro}
              </p>
            ) : null}
            <ol className="flex flex-col divide-y divide-foreground/10">
              {chapters.map((c, i) => (
                <li
                  key={c.title}
                  className={cn(
                    "flex flex-col gap-1.5 py-4 md:flex-row md:gap-6 md:py-5",
                    i === 0 && "pt-0 md:pt-0",
                  )}
                >
                  <span className="shrink-0 font-mono text-sm font-semibold tabular-nums text-accent-primary md:w-20 md:pt-0.5">
                    {c.timestamp}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-heading text-base text-foreground md:text-lg">
                      {c.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground/65 md:text-base">
                      {c.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
