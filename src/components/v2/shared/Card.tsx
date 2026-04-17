// src/components/v2/shared/Card.tsx
//
// Shared base for every /v2 card. Centralises the background tint, the
// border rule (transparent in light, subtle in dark), and the standard
// rounded radius. Per-card tweaks (padding, rounded override, hover, flex
// layout, `group`, overflow, etc.) go through `className`.
//
// Prefer the `<Card>` component for div-based cards. When the card needs
// to be a different element (e.g. a `<Link>` for a clickable card),
// import `cardClasses` and compose them inline with `cn(...)`.

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Base visual identity of a /v2 card: radius, bg tint, bordered-in-dark-only. */
export const cardClasses =
  "rounded-3xl border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04]";

/** Add to cards that animate their border on hover (also provides the transition). */
export const cardInteractiveClasses =
  "transition-colors duration-500 ease-in-out dark:hover:border-foreground/25";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn(cardClasses, className)} {...props}>
      {children}
    </div>
  );
}
