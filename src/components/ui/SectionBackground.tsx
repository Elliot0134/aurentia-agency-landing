"use client";

import { cn } from "@/lib/utils";

// Orb color map — decorative only, so raw color values are acceptable
const ORB_COLORS: Record<string, string> = {
  orange: "rgba(201,100,66",
  violet: "rgba(124,58,237",
  cyan: "rgba(6,182,212",
  ambre: "rgba(217,150,80",
  rose: "rgba(244,114,182",
};

interface OrbConfig {
  /** Color key: "orange" | "violet" | "cyan" | "ambre" | "rose" */
  color: string;
  /** Tailwind position classes, e.g. "top-[40%] left-[15%]" */
  position: string;
  /** Tailwind size classes, e.g. "w-[400px] h-[400px]" */
  size: string;
  /** Opacity bracket, e.g. "[0.08]" — defaults to "[0.08]" */
  opacity?: string;
}

interface SectionBackgroundProps {
  orbs?: OrbConfig[];
  /** Show the hero-grid dot pattern */
  showGrid?: boolean;
  /** Grid base opacity (0-1), default 1 */
  gridOpacity?: number;
  /** Direction the grid fades out towards */
  gridFadeDirection?: "top" | "bottom" | "both";
  /** Background color variant: base or alt */
  variant?: "base" | "alt";
  className?: string;
}

const GRADIENT_MASKS: Record<string, string> = {
  top: "linear-gradient(to bottom, transparent 0%, black 30%)",
  bottom: "linear-gradient(to bottom, black 70%, transparent 100%)",
  both: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
};

export function SectionBackground({
  orbs,
  showGrid = false,
  gridOpacity = 1,
  gridFadeDirection,
  variant,
  className,
}: SectionBackgroundProps) {
  const bgClass =
    variant === "alt" ? "bg-background-alt" : variant === "base" ? "bg-background" : undefined;

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none z-0 overflow-hidden",
        bgClass,
        className
      )}
      aria-hidden="true"
    >
      {/* Orbs */}
      {orbs?.map((orb, i) => {
        const colorBase = ORB_COLORS[orb.color] ?? ORB_COLORS.orange;
        const opacityVal = orb.opacity ?? "[0.08]";
        // Extract numeric opacity from bracket notation for inline style
        const numericOpacity = opacityVal.replace(/[[\]]/g, "");

        return (
          <div
            key={i}
            className={cn(
              "absolute rounded-full blur-[140px]",
              orb.position,
              orb.size
            )}
            style={{
              background: `${colorBase},${numericOpacity})`,
            }}
          />
        );
      })}

      {/* Grid pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 hero-grid"
          style={{
            opacity: gridOpacity,
            ...(gridFadeDirection
              ? {
                  WebkitMaskImage: GRADIENT_MASKS[gridFadeDirection],
                  maskImage: GRADIENT_MASKS[gridFadeDirection],
                }
              : {}),
          }}
        />
      )}
    </div>
  );
}
