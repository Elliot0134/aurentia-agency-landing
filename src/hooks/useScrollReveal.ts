"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  children?: boolean; // Animate children with stagger
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const animationsEnabled = useAnimationsEnabled();
  const {
    y = 40,
    x = 0,
    scale = 1,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    start = "top 80%",
    children = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !animationsEnabled) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const targets = children ? el.children : el;

    gsap.set(targets, { y, x, scale, opacity });

    gsap.to(targets, {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      stagger: children ? stagger : 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [y, x, scale, opacity, duration, delay, stagger, start, children, animationsEnabled]);

  return ref;
}

export function useCountUp(
  endValue: number,
  options: { duration?: number; prefix?: string; suffix?: string; start?: string } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);
  const animationsEnabled = useAnimationsEnabled();
  const { duration = 2, prefix = "", suffix = "", start = "top 80%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // On mobile or reduced motion, show final value immediately
    if (!animationsEnabled) {
      el.textContent = `${prefix}${endValue.toLocaleString("fr-FR")}${suffix}`;
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      el.textContent = `${prefix}${endValue.toLocaleString("fr-FR")}${suffix}`;
      return;
    }

    const obj = { value: 0 };

    gsap.to(obj, {
      value: endValue,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.value).toLocaleString("fr-FR")}${suffix}`;
      },
    });
  }, [endValue, duration, prefix, suffix, start, animationsEnabled]);

  return ref;
}
