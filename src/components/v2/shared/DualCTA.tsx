// src/components/v2/shared/DualCTA.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CTA } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type DualCTAProps = {
  primary: CTA;
  secondary?: CTA;
  className?: string;
  size?: "md" | "lg";
};

export function DualCTA({ primary, secondary, className, size = "md" }: DualCTAProps) {
  const padding = size === "lg" ? "px-7 py-3.5 text-base" : "px-6 py-3 text-sm";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Link
        href={primary.href}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full bg-foreground font-semibold text-background transition-colors duration-500 ease-in-out hover:bg-foreground/90",
          padding
        )}
      >
        {primary.label}
        <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
      </Link>

      {secondary && (
        <Link
          href={secondary.href}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-foreground/20 font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40",
            padding
          )}
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
