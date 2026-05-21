// src/components/v2/layout/MegaMenu.tsx
"use client";

import { WipAwareLink as Link, isWipHref } from "@/components/shared/WipModal";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { NavLink } from "@/data/v2/types";

type MegaMenuProps = {
  items: NavLink[];
  open: boolean;
  top: number;
  left: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

type Group = { title: string; links: NavLink[] };

function groupLinks(items: NavLink[]): { grouped: Group[]; flat: NavLink[] } {
  const hasGroups = items.some((it) => it.group);
  if (!hasGroups) {
    return { grouped: [], flat: items };
  }
  const map = new Map<string, NavLink[]>();
  for (const it of items) {
    const key = it.group ?? "Autres";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(it);
  }
  return {
    grouped: Array.from(map.entries()).map(([title, links]) => ({ title, links })),
    flat: [],
  };
}

function MenuRow({ item }: { item: NavLink }) {
  const wip = isWipHref(item.href) || item.comingSoon === true;
  if (item.comingSoon === true) {
    return (
      <div
        className="flex cursor-not-allowed items-center justify-between gap-2 px-4 py-2.5 text-sm text-foreground/40 select-none"
        aria-disabled="true"
        role="menuitem"
      >
        <span className="flex items-center gap-2 min-w-0">
          {item.iconUrl && (
            <Image
              src={item.iconUrl}
              alt=""
              width={16}
              height={16}
              className="shrink-0 opacity-60"
              aria-hidden="true"
            />
          )}
          <span className="truncate">{item.label}</span>
        </span>
        <span className="shrink-0 rounded-full bg-foreground/10 px-2 py-0.5 text-sm font-medium text-foreground/50">
          En cours
        </span>
      </div>
    );
  }
  return (
    <Link
      href={item.href}
      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-foreground/75 transition-colors duration-500 ease-in-out hover:bg-foreground/5 hover:text-foreground"
      role="menuitem"
    >
      <span className="flex items-center gap-2 min-w-0">
        {item.iconUrl && (
          <Image
            src={item.iconUrl}
            alt=""
            width={16}
            height={16}
            className="shrink-0"
            aria-hidden="true"
          />
        )}
        <span className="truncate">{item.label}</span>
      </span>
      {wip && (
        <span className="shrink-0 rounded-full bg-foreground/10 px-2 py-0.5 text-sm font-medium text-foreground/60">
          Bientôt
        </span>
      )}
    </Link>
  );
}

export function MegaMenu({ items, open, top, left, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const [mounted, setMounted] = useState(false);
  const { grouped, flat } = useMemo(() => groupLinks(items), [items]);
  const isGrouped = grouped.length > 0;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!isGrouped && flat.length === 0) return null;

  return createPortal(
    <div
      role="menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`fixed z-[60] origin-top overflow-hidden rounded-2xl border transition-[opacity,transform] duration-200 ${
        isGrouped ? "w-[640px]" : "w-60"
      } ${
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
      {isGrouped ? (
        <div className="grid grid-cols-3 gap-2 p-3">
          {grouped.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="px-3 pb-1 pt-2 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">
                {group.title}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.links.map((link) => (
                  <MenuRow key={link.href + link.label} item={link} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col py-1">
          {flat.map((item) => (
            <MenuRow key={item.href + item.label} item={item} />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
