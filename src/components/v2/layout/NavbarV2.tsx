// src/components/v2/layout/NavbarV2.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NavbarV2Desktop } from "./NavbarV2Desktop";
import { NavbarV2Mobile } from "./NavbarV2Mobile";
import { useSubNav } from "@/components/shared/SubNavContext";

export function NavbarV2() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { items: subNavItems, activeId: subNavActiveId, visible: subNavVisible } = useSubNav();
  const hasSubNav = subNavItems.length > 0 && subNavVisible;

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const headerEl = headerRef.current;
    const navbarBottom = headerEl
      ? headerEl.getBoundingClientRect().bottom
      : 96;
    const offset = navbarBottom + 24;
    const rect = el.getBoundingClientRect();
    const y = rect.top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "instant" });
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 pointer-events-none"
      style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
    >
      <nav
        className="pointer-events-auto mx-auto max-w-7xl border rounded-3xl"
        style={{
          background: "color-mix(in srgb, var(--background) 35%, transparent)",
          backdropFilter: `blur(${scrolled ? 40 : 28}px) saturate(1.6)`,
          WebkitBackdropFilter: `blur(${scrolled ? 40 : 28}px) saturate(1.6)`,
          borderColor: "var(--glass-border-hover)",
          boxShadow: scrolled
            ? "0 6px 24px -16px rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(255, 255, 255, 0.06) inset"
            : "0 4px 20px -18px rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.04) inset",
          transition:
            "background 500ms ease-in-out, backdrop-filter 500ms ease-in-out, border-color 500ms ease-in-out, box-shadow 500ms ease-in-out",
        }}
      >
        <NavbarV2Desktop />
        <NavbarV2Mobile />

        {/* Sub-nav — section tabs, unfolds on scroll past first section */}
        <div
          className="relative z-10 hidden lg:grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-in-out"
          style={{
            gridTemplateRows: hasSubNav ? "1fr" : "0fr",
            opacity: hasSubNav ? 1 : 0,
          }}
          aria-hidden={!hasSubNav}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="mx-5 border-t border-foreground/[0.08]" />
            <div className="scrollbar-hide flex items-center justify-center gap-1 overflow-x-auto px-5 py-2">
              {subNavItems.map(({ label, sectionId }) => {
                const isActive = subNavActiveId === sectionId;
                return (
                  <button
                    key={sectionId}
                    type="button"
                    onClick={() => scrollToSection(sectionId)}
                    className={`relative whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-500 ease-in-out ${
                      isActive
                        ? "text-foreground"
                        : "text-foreground/50 hover:text-foreground/80"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent-primary transition-all duration-500 ease-in-out ${
                        isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
