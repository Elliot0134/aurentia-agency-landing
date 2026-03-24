"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

interface LegalTocProps {
  items: TocItem[];
}

export function LegalToc({ items }: LegalTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(item.id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -70% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items]);

  return (
    <>
      {/* Mobile: inline accordion */}
      <nav className="lg:hidden mb-10" aria-label="Table des matières">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-3 px-4 rounded-lg bg-foreground/5 text-foreground/70 text-sm font-medium transition-colors duration-500 ease-in-out hover:bg-foreground/10"
          aria-expanded={isOpen}
        >
          <span>Table des matières</span>
          <svg
            className={cn(
              "h-4 w-4 transition-transform duration-500 ease-in-out",
              isOpen && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-700 ease-in-out",
            isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
          )}
        >
          <ul className="space-y-1 px-4 py-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    "block w-full text-left text-sm py-1.5 px-3 rounded-md transition-all duration-500 ease-in-out",
                    activeId === item.id
                      ? "text-foreground font-medium bg-foreground/[0.03] border-l-2 border-accent-primary"
                      : "text-foreground/50 hover:text-foreground/70 border-l-2 border-transparent"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Desktop: sticky sidebar */}
      <nav
        className="hidden lg:block sticky top-24 self-start shrink-0 w-56"
        aria-label="Table des matières"
      >
        <p className="text-sm font-medium text-foreground/50 mb-4">
          Table des matières
        </p>
        <ul className="space-y-1 border-l border-foreground/10">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={cn(
                  "block w-full text-left text-sm py-1.5 pl-4 -ml-px border-l-2 rounded-r-md transition-all duration-500 ease-in-out",
                  activeId === item.id
                    ? "border-accent-primary text-foreground font-medium bg-foreground/[0.03]"
                    : "border-transparent text-foreground/50 hover:text-foreground/70 hover:border-foreground/30"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
