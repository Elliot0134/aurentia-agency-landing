// src/components/v2/layout/NavbarV2Desktop.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navbarConfig } from "@/data/v2/navbar";
import { MegaMenu } from "./MegaMenu";
import { cn } from "@/lib/utils";

export function NavbarV2Desktop() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <nav className="hidden md:block">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-8 px-12 py-4">
        <Link
          href={navbarConfig.logo.href}
          className="font-heading text-xl font-bold text-foreground"
        >
          {navbarConfig.logo.label}
        </Link>

        <ul className="flex items-center gap-1">
          {navbarConfig.sections.map((section) => {
            const hasMenu = !!section.children?.length;
            const isOpen = openSection === section.label;
            return (
              <li
                key={section.label}
                className="relative"
                onMouseEnter={() => hasMenu && setOpenSection(section.label)}
                onMouseLeave={() => hasMenu && setOpenSection(null)}
              >
                <Link
                  href={section.href ?? "#"}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-base font-medium text-foreground/85 transition-colors duration-500 ease-in-out hover:bg-foreground/5 hover:text-foreground",
                    isOpen && "bg-foreground/5 text-foreground"
                  )}
                >
                  {section.label}
                  {hasMenu && (
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-500 ease-in-out",
                        isOpen && "rotate-180"
                      )}
                    />
                  )}
                </Link>
                {hasMenu && isOpen && (
                  <MegaMenu
                    pillarLabel={section.label}
                    pillarHref={section.href ?? "#"}
                    items={section.children!}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-4">
          {navbarConfig.rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-foreground/70 transition-colors duration-500 ease-in-out hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={navbarConfig.cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
          >
            {navbarConfig.cta.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}
