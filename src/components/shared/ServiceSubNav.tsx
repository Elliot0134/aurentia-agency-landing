"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface SubNavItem {
  label: string;
  sectionId: string;
}

interface ServiceSubNavProps {
  items: SubNavItem[];
}

export function ServiceSubNav({ items }: ServiceSubNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Show sub-nav only after scrolling past the hero
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(sectionId);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  // Move the active indicator
  const updateIndicator = useCallback(() => {
    if (!activeId || !activeIndicatorRef.current) return;
    const btn = itemRefs.current.get(activeId);
    const nav = navRef.current;
    if (!btn || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    activeIndicatorRef.current.style.width = `${btnRect.width}px`;
    activeIndicatorRef.current.style.transform = `translateX(${btnRect.left - navRect.left}px)`;
    activeIndicatorRef.current.style.opacity = "1";
  }, [activeId]);

  useEffect(() => {
    updateIndicator();
  }, [activeId, updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const offset = 120; // navbar + subnav height
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "fixed top-16 md:top-[72px] left-0 right-0 z-40 transition-all duration-700 ease-in-out",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      <div className="w-full backdrop-blur-xl bg-background/70 border-b border-foreground/[0.06]">
        <div className="container mx-auto px-4">
          <nav
            ref={navRef}
            className="relative flex items-center gap-1 overflow-x-auto scrollbar-hide py-2"
          >
            {/* Active indicator */}
            <div
              ref={activeIndicatorRef}
              className="absolute bottom-0 h-0.5 bg-accent-primary rounded-full transition-all duration-500 ease-in-out opacity-0"
            />

            {items.map(({ label, sectionId }) => (
              <button
                key={sectionId}
                ref={(el) => {
                  if (el) itemRefs.current.set(sectionId, el);
                }}
                onClick={() => scrollToSection(sectionId)}
                className={cn(
                  "relative whitespace-nowrap px-3 py-2 text-sm font-medium rounded-lg transition-all duration-500 ease-in-out",
                  activeId === sectionId
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground/80"
                )}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
