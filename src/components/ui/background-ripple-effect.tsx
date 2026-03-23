"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundRippleEffect = ({
  cellSize = 56,
  className,
}: {
  cellSize?: number;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const check = () => {
      const isDark = document.documentElement.dataset.theme === "dark";
      setTheme(isDark ? "dark" : "light");
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = theme === "dark"
        ? "rgba(250, 249, 246, 0.07)"
        : "rgba(59, 57, 41, 0.1)";
      ctx.lineWidth = 0.5;

      ctx.beginPath();
      for (let x = 0; x <= w; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(container);
    return () => ro.disconnect();
  }, [cellSize, theme]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 h-full w-full overflow-hidden pointer-events-none", className)}>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Fade to page background at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, var(--bg-base) 70%)",
        }}
      />
    </div>
  );
};
