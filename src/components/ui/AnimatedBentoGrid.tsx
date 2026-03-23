"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Apply GSAP stagger reveal to all immediate children
    const items = gsap.utils.toArray(grid.children);

    gsap.fromTo(
      items,
      {
        y: 60,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%", // Trigger just before elements enter view
          toggleActions: "play none none reverse", // Plays on enter, reverses if scrolled back up fast enough (optional, but requested narrative makes more sense static after entry or replay)
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === grid) {
          t.kill();
        }
      });
      gsap.killTweensOf(items);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-500 shadow-none p-4 dark:bg-foreground/5 dark:border-foreground/[0.1] bg-background border border-transparent justify-between flex flex-col space-y-4 isolate relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-foreground/[0.05] before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        className
      )}
    >
      {/* Spotlight Effect element here could be stacked if we import SpotlightCard, but we keep it simpler via hover groups for now to guarantee compatibility */}
      {header}
      <div className="group-hover/bento:-translate-y-1 transition duration-200 mt-2">
        {icon}
        <div className="font-sans font-bold text-foreground mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-muted-foreground text-sm">
          {description}
        </div>
      </div>
    </div>
  );
};
