"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimationsEnabled } from "./AnimationContext";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const animationsEnabled = useAnimationsEnabled();
  const pathname = usePathname();

  useEffect(() => {
    // Disable Lenis smooth scroll on /v2 routes
    if (pathname?.startsWith("/v2")) return;

    // On mobile: skip Lenis entirely for native scroll performance.
    // ScrollTrigger still works (so inline GSAP in components can reveal elements)
    // but without the Lenis overhead.
    if (!animationsEnabled) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      delete (window as unknown as Record<string, unknown>).__lenis;
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, [animationsEnabled, pathname]);

  return <>{children}</>;
}
