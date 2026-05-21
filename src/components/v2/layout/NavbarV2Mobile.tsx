// src/components/v2/layout/NavbarV2Mobile.tsx
"use client";

import { Fragment, useCallback, useState } from "react";
import { WipAwareLink as Link, isWipHref } from "@/components/shared/WipModal";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { navbarConfig } from "@/data/v2/navbar";
import { LowPolyCoralBg } from "@/components/v2/shared/LowPolyCoralBg";
import {
  WhatsAppIcon,
  WHATSAPP_HREF,
} from "@/components/shared/icons/WhatsAppIcon";
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
          className="flex items-center transition-opacity duration-500 ease-in-out hover:opacity-80"
          aria-label="Aurentia Agency"
        >
          <Image
            src="/images/logo-aurentia-light.svg"
            alt="Aurentia Agency"
            width={200}
            height={36}
            priority
            className="block h-9 w-auto dark:hidden"
          />
          <Image
            src="/images/logo-aurentia-dark.svg"
            alt="Aurentia Agency"
            width={200}
            height={36}
            priority
            className="hidden h-9 w-auto dark:block"
          />
        </Link>
        <div className="flex items-center gap-1">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter sur WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#25D366] transition-colors duration-500 ease-in-out hover:bg-foreground/5"
          >
            <WhatsAppIcon className="size-6" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="rounded-full p-2 text-foreground transition-colors duration-500 ease-in-out hover:bg-foreground/5"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
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
                        isExpanded ? "max-h-[800px]" : "max-h-0"
                      )}
                    >
                      <ul className="flex flex-col gap-1 pb-4 pl-4">
                        {section.children!.map((child, idx) => {
                          const wip = isWipHref(child.href) || child.comingSoon === true;
                          const prevGroup = idx > 0 ? section.children![idx - 1].group : undefined;
                          const showGroupHeader = child.group && child.group !== prevGroup;
                          const groupHeader = showGroupHeader ? (
                            <li
                              key={`group-${child.group}`}
                              className="px-3 pb-1 pt-3 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55"
                            >
                              {child.group}
                            </li>
                          ) : null;
                          if (child.comingSoon === true) {
                            return (
                              <Fragment key={`${child.label}-${child.href}`}>
                                {groupHeader}
                                <li>
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
                              </Fragment>
                            );
                          }
                          return (
                            <Fragment key={`${child.label}-${child.href}`}>
                              {groupHeader}
                              <li>
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
                            </Fragment>
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
            className="relative mt-4 flex w-full items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold text-white transition-opacity duration-500 ease-in-out hover:opacity-90"
          >
            <LowPolyCoralBg />
            <span className="relative">{navbarConfig.cta.label}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
