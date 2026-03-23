"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  intensity?: "light" | "medium" | "strong";
}

/**
 * Aurora background using a looping video.
 * Drop your video file at: public/aurora-bg.mp4
 * Fallback: static dark gradient if video fails to load.
 */
export const AuroraBackground = React.forwardRef<
  HTMLDivElement,
  AuroraBackgroundProps
>(({ className, children, intensity = "medium", ...props }, ref) => {
  const opacityMap = { light: "opacity-30", medium: "opacity-50", strong: "opacity-70" };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Video background */}
      <div className={cn("absolute inset-0 pointer-events-none", opacityMap[intensity])}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/aurora-bg.webm" type="video/webm" />
          <source src="/aurora-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Radial vignette — blends edges into page bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 50%, var(--bg-base, #0a0a0a) 95%)",
        }}
      />

      {children}
    </div>
  );
});

AuroraBackground.displayName = "AuroraBackground";
