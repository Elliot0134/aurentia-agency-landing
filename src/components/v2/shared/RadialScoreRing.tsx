// src/components/v2/shared/RadialScoreRing.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

type RadialScoreRingProps = {
  label: string;
  value: number;
  delay?: number;
  size?: "sm" | "md";
  color?: string;
};

const GREEN = "#10B981";

export function RadialScoreRing({
  label,
  value,
  delay = 0,
  size = "sm",
  color = GREEN,
}: RadialScoreRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const startAt = performance.now() + delay;
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - startAt) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedValue(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay]);

  const chartData = [{ name: label, value: animatedValue, fill: color }];
  const endAngle = 90 - (animatedValue / 100) * 360;

  const sizeClasses =
    size === "md" ? "max-w-[150px]" : "max-w-[110px]";
  const valueClasses =
    size === "md"
      ? "text-3xl md:text-4xl"
      : "text-2xl md:text-3xl";
  const unitClasses =
    size === "md" ? "text-sm" : "text-sm";
  const labelClasses =
    size === "md" ? "text-sm md:text-base" : "text-sm";

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 text-center"
    >
      <div className={`relative aspect-square w-full ${sizeClasses}`}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={endAngle}
            innerRadius="78%"
            outerRadius="100%"
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[86, 74]}
              className="first:fill-transparent last:fill-transparent"
            />
            <RadialBar
              dataKey="value"
              background={{ fill: "transparent" }}
              cornerRadius={999}
              fill={color}
              isAnimationActive={false}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-heading font-bold leading-none text-foreground ${valueClasses}`}
          >
            {animatedValue}
          </span>
          <span
            className={`mt-0.5 font-mono uppercase tracking-wider text-foreground/40 ${unitClasses}`}
          >
            /100
          </span>
        </div>
      </div>
      <span
        className={`font-medium text-foreground/80 ${labelClasses}`}
      >
        {label}
      </span>
    </div>
  );
}
