// src/components/v2/layout/MegaMenu.tsx
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NavLink } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  pillarLabel: string;
  pillarHref: string;
  items: NavLink[];
  className?: string;
};

export function MegaMenu({ pillarLabel, pillarHref, items, className }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-full mt-3 w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-foreground/10 bg-background-surface p-4 shadow-[0_10px_60px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-500 ease-in-out",
        className
      )}
      role="menu"
    >
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="group flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors duration-500 ease-in-out hover:bg-foreground/5"
            role="menuitem"
          >
            <span className="text-base font-semibold text-foreground">{item.label}</span>
            {item.description && (
              <span className="text-sm text-foreground/60">{item.description}</span>
            )}
          </Link>
        ))}
      </div>
      <div className="mt-3 border-t border-foreground/10 pt-3">
        <Link
          href={pillarHref}
          className="group inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-accent-primary transition-colors duration-500 ease-in-out hover:bg-accent-primary/10"
        >
          Voir tout {pillarLabel}
          <ChevronRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
