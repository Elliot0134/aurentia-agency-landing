// src/components/v2/layout/MegaMenu.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { NavLink } from "@/data/v2/types";

type MegaMenuProps = {
  items: NavLink[];
  open: boolean;
  top: number;
  left: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function MegaMenu({ items, open, top, left, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      role="menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`fixed z-[60] w-60 origin-top overflow-hidden rounded-2xl border transition-[opacity,transform] duration-200 ${
        open ? "opacity-100 scale-100 translate-y-0" : "pointer-events-none opacity-0 scale-95 -translate-y-1"
      }`}
      style={{
        top,
        left,
        background: "color-mix(in srgb, var(--background) 30%, transparent)",
        backdropFilter: "blur(40px) saturate(1.8)",
        WebkitBackdropFilter: "blur(40px) saturate(1.8)",
        borderColor: "var(--glass-border-hover)",
        boxShadow: "0 8px 32px -20px rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(255, 255, 255, 0.08) inset",
      }}
    >
      {items.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.href}
          className="block px-4 py-2.5 text-sm text-foreground/70 transition-colors duration-500 ease-in-out hover:bg-foreground/5 hover:text-foreground"
          role="menuitem"
        >
          {item.label}
        </Link>
      ))}
    </div>,
    document.body
  );
}
