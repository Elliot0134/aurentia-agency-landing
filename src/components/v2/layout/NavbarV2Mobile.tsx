// src/components/v2/layout/NavbarV2Mobile.tsx
"use client";

import { useCallback, useState } from "react";
import { WipAwareLink as Link, isWipHref } from "@/components/shared/WipModal";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { navbarConfig } from "@/data/v2/navbar";
import { cn } from "@/lib/utils";

export function NavbarV2Mobile() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [pathname],
  );

  return (
    <nav className="lg:hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href={navbarConfig.logo.href}
          onClick={handleLogoClick}
          className="font-heading text-xl font-bold text-foreground"
        >
          {navbarConfig.logo.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="rounded-full p-2 text-foreground transition-colors duration-500 ease-in-out hover:bg-foreground/5"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          open ? "max-h-[80vh]" : "max-h-0"
        )}
      >
        <div className="border-t border-foreground/10 bg-background-surface px-6 py-4">
          <ul className="flex flex-col">
            {navbarConfig.sections.map((section) => {
              const hasMenu = !!section.children?.length;
              const isExpanded = expandedSection === section.label;
              return (
                <li key={section.label} className="border-b border-foreground/10 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={section.href ?? "#"}
                      onClick={() => setOpen(false)}
                      className="flex-1 py-4 text-base font-semibold text-foreground"
                    >
                      {section.label}
                    </Link>
                    {hasMenu && (
                      <button
                        type="button"
                        onClick={() => setExpandedSection(isExpanded ? null : section.label)}
                        aria-label={isExpanded ? "Replier" : "Déplier"}
                        className="p-3"
                      >
                        <ChevronDown
                          className={cn(
                            "size-5 text-foreground/60 transition-transform duration-500 ease-in-out",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {hasMenu && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500 ease-in-out",
                        isExpanded ? "max-h-96" : "max-h-0"
                      )}
                    >
                      <ul className="flex flex-col gap-1 pb-4 pl-4">
                        {section.children!.map((child) => {
                          const wip = isWipHref(child.href) || child.comingSoon === true;
                          if (child.comingSoon === true) {
                            return (
                              <li key={`${child.label}-${child.href}`}>
                                <div
                                  aria-disabled="true"
                                  className="flex cursor-not-allowed select-none items-center justify-between gap-2 rounded-lg px-3 py-2 text-base text-foreground/40"
                                >
                                  <span className="flex min-w-0 items-center gap-2">
                                    {child.iconUrl && (
                                      <Image
                                        src={child.iconUrl}
                                        alt=""
                                        width={18}
                                        height={18}
                                        className="shrink-0 opacity-60"
                                        aria-hidden="true"
                                      />
                                    )}
                                    <span className="truncate">{child.label}</span>
                                  </span>
                                  <span className="shrink-0 rounded-full bg-foreground/10 px-2 py-0.5 text-sm font-medium text-foreground/50">
                                    En cours
                                  </span>
                                </div>
                              </li>
                            );
                          }
                          return (
                            <li key={`${child.label}-${child.href}`}>
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-base text-foreground/75 transition-colors duration-500 ease-in-out hover:bg-foreground/5"
                              >
                                <span className="flex min-w-0 items-center gap-2">
                                  {child.iconUrl && (
                                    <Image
                                      src={child.iconUrl}
                                      alt=""
                                      width={18}
                                      height={18}
                                      className="shrink-0"
                                      aria-hidden="true"
                                    />
                                  )}
                                  <span className="truncate">{child.label}</span>
                                </span>
                                {wip && (
                                  <span className="shrink-0 rounded-full bg-foreground/10 px-2 py-0.5 text-sm font-medium text-foreground/60">
                                    Bientôt
                                  </span>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}

            {navbarConfig.rightLinks.map((link) => (
              <li key={link.href} className="border-b border-foreground/10 last:border-b-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-base font-semibold text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={navbarConfig.cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 flex w-full items-center justify-center rounded-full bg-accent-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-500 ease-in-out hover:opacity-90"
          >
            {navbarConfig.cta.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}
