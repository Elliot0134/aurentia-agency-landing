// src/components/v2/layout/NavbarV2Desktop.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navbarConfig } from "@/data/v2/navbar";
import { siteConfig } from "@/data/content";
import { ThemeSwitch } from "@/components/unlumen-ui/theme-switch";
import { MegaMenu } from "./MegaMenu";
import { cn } from "@/lib/utils";

export function NavbarV2Desktop() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const updatePosition = useCallback((label: string) => {
    const el = triggerRefs.current[label];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 8, left: rect.left });
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      setOpenSection(null);
      closeTimeoutRef.current = null;
    }, 150);
  }, [cancelClose]);

  const openMenu = useCallback(
    (label: string) => {
      cancelClose();
      updatePosition(label);
      setOpenSection(label);
    },
    [cancelClose, updatePosition]
  );

  useEffect(() => {
    if (!openSection) return;
    const reposition = () => updatePosition(openSection);
    window.addEventListener("scroll", reposition, { passive: true });
    window.addEventListener("resize", reposition, { passive: true });
    return () => {
      window.removeEventListener("scroll", reposition);
      window.removeEventListener("resize", reposition);
    };
  }, [openSection, updatePosition]);

  const currentSection = navbarConfig.sections.find((s) => s.label === openSection);
  const menuItems = currentSection?.children ?? [];

  return (
    <>
      <div className="relative z-20 hidden lg:flex items-center justify-between px-5 py-2.5">
        {/* Left — Nav sections */}
        <ul className="flex items-center gap-0.5 flex-1">
          {navbarConfig.sections.map((section) => {
            const hasMenu = !!section.children?.length;
            const isOpen = openSection === section.label;
            return (
              <li
                key={section.label}
                ref={(el) => {
                  triggerRefs.current[section.label] = el;
                }}
                className="relative"
                onMouseEnter={() => hasMenu && openMenu(section.label)}
                onMouseLeave={() => hasMenu && scheduleClose()}
              >
                <Link
                  href={section.href ?? "#"}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm font-medium text-foreground/70 transition-colors duration-500 ease-in-out hover:bg-foreground/5 hover:text-foreground",
                    isOpen && "bg-foreground/5 text-foreground"
                  )}
                >
                  {section.label}
                  {hasMenu && (
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-500 ease-in-out",
                        isOpen && "rotate-180"
                      )}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Center — Logo */}
        <div className="shrink-0">
          <Link href="/v2" className="flex items-baseline group shrink-0">
            <span className="font-heading text-[1.3rem] leading-none text-foreground font-bold group-hover:opacity-80 transition-opacity duration-500">
              Aurentia
            </span>
            <span className="font-heading text-[1.3rem] leading-none text-foreground font-normal group-hover:opacity-80 transition-opacity duration-500">
              .agency
            </span>
          </Link>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-1.5 flex-1 justify-end">
          <ThemeSwitch
            iconSize={16}
            className="w-8 h-8 rounded-xl bg-transparent border-0 hover:bg-foreground/5 text-foreground/70 hover:text-foreground"
          />

          <a
            href={`https://wa.me/${siteConfig.phone?.replace(/\s+/g, "").replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5b] transition-all duration-500 text-white"
            aria-label="WhatsApp"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.472h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          <Link
            href={navbarConfig.cta.href}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-primary px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:opacity-90"
          >
            {navbarConfig.cta.label}
          </Link>
        </div>
      </div>

      <MegaMenu
        items={menuItems}
        open={!!openSection && menuItems.length > 0}
        top={menuPos.top}
        left={menuPos.left}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      />
    </>
  );
}
