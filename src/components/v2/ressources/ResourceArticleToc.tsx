// src/components/v2/ressources/ResourceArticleToc.tsx
//
// Sticky table of contents pour les ressources style article-blog.
// - Desktop (lg+) : sidebar sticky à gauche, scroll-spy via IntersectionObserver
// - Mobile / tablet : collapsible dropdown au-dessus du contenu

"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type ResourceTocEntry = { id: string; label: string };

type ResourceArticleTocProps = {
  entries: ResourceTocEntry[];
  /** Label au-dessus de la liste. Défaut : "Sommaire". */
  heading?: string;
  /** Slot pour des extras sous le sommaire (mini CTA, share, etc.) */
  children?: React.ReactNode;
};

export function ResourceArticleToc({
  entries,
  heading = "Sommaire",
  children,
}: ResourceArticleTocProps) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = entries
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (items) => {
        const visible = items
          .filter((i) => i.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [entries]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveId(id);
    setMobileOpen(false);
    window.history.replaceState(null, "", `#${id}`);
  };

  if (entries.length === 0) return null;

  const list = (onItemClick?: () => void) => (
    <ol className="flex flex-col gap-0.5">
      {entries.map((e, i) => {
        const isActive = activeId === e.id;
        return (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              onClick={(ev) => {
                handleClick(ev, e.id);
                onItemClick?.();
              }}
              className={cn(
                "group flex w-full items-baseline gap-3 rounded-xl px-3 py-2 text-left text-sm leading-snug transition-all duration-500 ease-in-out",
                isActive
                  ? "bg-foreground/[0.06] text-foreground"
                  : "text-foreground/60 hover:bg-foreground/[0.04] hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "font-mono text-sm transition-colors duration-500 ease-in-out",
                  isActive ? "text-accent-primary" : "text-foreground/40",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{e.label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside
        aria-label="Table des matières"
        className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
      >
        <div className="rounded-2xl border border-foreground/10 bg-background-surface p-5 md:p-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {heading}
          </p>
          {list()}
        </div>
        {children && <div className="mt-4 space-y-4">{children}</div>}
      </aside>

      {/* Mobile collapsible */}
      <div className="lg:hidden">
        <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background-surface">
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="resource-toc-mobile"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors duration-500 ease-in-out hover:bg-foreground/[0.03]"
          >
            <span className="flex items-baseline gap-2">
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                {heading}
              </span>
              <span className="text-sm text-foreground/40">·</span>
              <span className="text-sm text-foreground/60">
                {entries.length} sections
              </span>
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-foreground/60 transition-transform duration-500 ease-in-out",
                mobileOpen && "rotate-180",
              )}
            />
          </button>
          {mobileOpen && (
            <div
              id="resource-toc-mobile"
              className="border-t border-foreground/10 px-3 py-3"
            >
              {list(() => setMobileOpen(false))}
            </div>
          )}
        </div>
        {children && <div className="mt-4 space-y-4">{children}</div>}
      </div>
    </>
  );
}
