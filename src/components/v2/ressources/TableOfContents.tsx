// src/components/v2/ressources/TableOfContents.tsx
"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/data/v2/vibe-coding";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  entries: TocEntry[];
  onJump: (id: string) => void;
  allOpen: boolean;
  onToggleAll: () => void;
};

export function TableOfContents({
  entries,
  onJump,
  allOpen,
  onToggleAll,
}: TableOfContentsProps) {
  const [active, setActive] = useState<string>(entries[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        const visible = items
          .filter((i) => i.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    entries.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav
      aria-label="Table des matières"
      className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
    >
      <div className="rounded-2xl border border-foreground/10 bg-background-surface p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Sommaire
          </p>
          <button
            type="button"
            onClick={onToggleAll}
            className="text-sm font-medium text-foreground/70 underline-offset-4 transition-colors duration-500 ease-in-out hover:text-accent-primary hover:underline"
          >
            {allOpen ? "Tout fermer" : "Tout ouvrir"}
          </button>
        </div>
        <ol className="flex flex-col gap-1">
          {entries.map((e, i) => {
            const isActive = active === e.id;
            return (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => onJump(e.id)}
                  className={cn(
                    "group flex w-full items-baseline gap-3 rounded-xl px-3 py-2 text-left text-sm transition-all duration-500 ease-in-out",
                    isActive
                      ? "bg-foreground/[0.06] text-foreground"
                      : "text-foreground/60 hover:bg-foreground/[0.04] hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-sm transition-colors duration-500 ease-in-out",
                      isActive ? "text-accent-primary" : "text-foreground/40"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug">{e.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
