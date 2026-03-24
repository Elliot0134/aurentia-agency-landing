"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  embedUrl: string;
  className?: string;
}

export function PhoneMockup({ embedUrl, className }: PhoneMockupProps) {
  const handleMouseEnter = useCallback(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;
    if (cursor) {
      cursor.style.transition = "opacity 0.5s ease-in-out";
      cursor.style.opacity = "0";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;
    if (cursor) {
      cursor.style.transition = "opacity 0.5s ease-in-out";
      cursor.style.opacity = "1";
    }
  }, []);

  return (
    <div
      className={cn(
        "relative mx-auto w-[280px] rounded-[3rem] border-[6px] border-foreground/15 bg-foreground/[0.03] shadow-2xl shadow-foreground/5 ring-1 ring-accent-primary/10 overflow-hidden",
        className
      )}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-foreground/10 rounded-b-2xl z-20" />

      {/* Screen */}
      <div
        className="relative w-full aspect-[9/19.5] overflow-hidden rounded-[2.5rem]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <iframe
          src={embedUrl}
          title="Mobile preview"
          className="absolute inset-0 w-[375px] h-[812px] border-0 origin-top-left"
          style={{
            transform: `scale(${280 / 375})`,
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-foreground/20 z-20" />
    </div>
  );
}
