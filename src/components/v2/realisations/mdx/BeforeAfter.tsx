"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  before: string;
  after: string;
  label?: string;
  alt?: string;
  className?: string;
}

export function BeforeAfter({
  before,
  after,
  label,
  alt = "",
  className,
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      setWidth(w);
      x.set(w / 2);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [x]);

  const clipPath = useTransform(x, (v) => {
    if (!width) return "inset(0 50% 0 0)";
    const pct = Math.max(0, Math.min(100, (v / width) * 100));
    return `inset(0 ${100 - pct}% 0 0)`;
  });

  return (
    <figure className={cn("my-10", className)}>
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/10 bg-background-surface select-none"
      >
        <Image
          src={after}
          alt={alt ? `${alt} — après` : "Après"}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
        />

        <motion.div
          className="absolute inset-0"
          style={{ clipPath }}
        >
          <Image
            src={before}
            alt={alt ? `${alt} — avant` : "Avant"}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-y-0 w-px bg-foreground/80 pointer-events-none"
          style={{ x, translateX: "-50%" }}
        />

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: width }}
          dragElastic={0}
          dragMomentum={false}
          style={{ x, translateX: "-50%" }}
          onDrag={(_, info) => {
            const next = Math.max(
              0,
              Math.min(width, x.get() + info.delta.x),
            );
            x.set(next);
          }}
          className="absolute top-1/2 -translate-y-1/2 size-10 rounded-full bg-foreground text-background grid place-items-center cursor-ew-resize shadow-lg transition-all duration-500 ease-in-out hover:scale-110"
          role="slider"
          aria-label="Glisser pour comparer avant et après"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={width ? Math.round((x.get() / width) * 100) : 50}
          tabIndex={0}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(0,0)" />
          </svg>
        </motion.div>

        <div className="absolute top-3 left-3 text-sm px-3 py-1 rounded-full bg-background/70 backdrop-blur text-foreground/80 border border-foreground/10">
          Avant
        </div>
        <div className="absolute top-3 right-3 text-sm px-3 py-1 rounded-full bg-background/70 backdrop-blur text-foreground/80 border border-foreground/10">
          Après
        </div>
      </div>
      {label && (
        <figcaption className="text-sm text-foreground/60 mt-3 text-center">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
