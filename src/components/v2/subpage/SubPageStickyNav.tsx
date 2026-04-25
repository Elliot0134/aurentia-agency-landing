// src/components/v2/subpage/SubPageStickyNav.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ANCHORS = [
  { id: "for-who", label: "Pour qui" },
  { id: "what-you-get", label: "Inclus" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Tarifs" },
  { id: "examples", label: "Exemples" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Devis" },
];

export function SubPageStickyNav() {
  const [activeId, setActiveId] = useState<string>(ANCHORS[0].id);

  useEffect(() => {
    const sections = ANCHORS.map((a) => document.getElementById(a.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-[64px] z-40 hidden border-b border-foreground/10 bg-background/90 backdrop-blur-md md:block">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-1 overflow-x-auto px-12 py-3">
        {ANCHORS.map((anchor) => (
          <a
            key={anchor.id}
            href={`#${anchor.id}`}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-500 ease-in-out",
              activeId === anchor.id
                ? "bg-foreground/10 text-foreground"
                : "text-foreground/60 hover:text-foreground"
            )}
          >
            {anchor.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
