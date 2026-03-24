"use client";

import { cn } from "@/lib/utils";

interface GradientPlaceholderProps {
  /** CSS aspect-ratio value, default "16/9" */
  aspectRatio?: string;
  /** Optional centered label */
  label?: string;
  className?: string;
}

export function GradientPlaceholder({
  aspectRatio = "16/9",
  label,
  className,
}: GradientPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden flex items-center justify-center",
        className
      )}
      style={{ aspectRatio }}
    >
      {/* Animated gradient background — uses gradient-shift keyframe from globals.css */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(201,100,66,0.6) 0%, rgba(217,150,80,0.5) 33%, rgba(244,114,182,0.3) 66%, rgba(201,100,66,0.6) 100%)",
          backgroundSize: "300% 300%",
          animation: "gradient-shift 15s ease-in-out infinite",
        }}
      />

      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Label */}
      {label && (
        <span className="relative z-10 text-sm font-medium text-foreground/40 select-none">
          {label}
        </span>
      )}
    </div>
  );
}
