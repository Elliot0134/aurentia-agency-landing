"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const SpotlightCard = ({
  children,
  className,
  ...props
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.style.setProperty("--mouse-x", `-1000px`);
    card.style.setProperty("--mouse-y", `-1000px`);

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "spotlight-card relative overflow-hidden rounded-3xl border border-foreground/5 bg-background/40 xl:bg-foreground/[0.02]",
        "transition-transform duration-500 hover:-translate-y-2 hover:border-foreground/20 will-change-transform",
        className
      )}
      {...props}
    >
      {/* Spotlight overlay — sits behind content (orange-tinted) */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(201,100,66,0.07), rgba(250,249,246,0.03) 30%, transparent 50%)`,
          zIndex: 0,
        }}
      />

      {/* Children rendered directly — no wrapper div to avoid breaking flex/grid layouts */}
      {children}
    </div>
  );
};
