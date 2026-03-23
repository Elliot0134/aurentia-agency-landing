"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnterInteractive = () => {
      cursor.classList.add("cursor-hover");
    };

    const onMouseLeaveInteractive = () => {
      cursor.classList.remove("cursor-hover");
      cursor.classList.remove("cursor-text");
    };

    // Manual lerp for butter-smooth cursor (no tween overhead)
    const currentPos = { x: 0, y: 0 };
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

    const ticker = () => {
      currentPos.x = lerp(currentPos.x, posRef.current.x, 0.35);
      currentPos.y = lerp(currentPos.y, posRef.current.y, 0.35);
      gsap.set(cursor, { x: currentPos.x, y: currentPos.y });
    };

    // Initialize position
    currentPos.x = posRef.current.x;
    currentPos.y = posRef.current.y;

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", onMouseMove);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, [data-cursor="hover"]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.classList.remove("has-custom-cursor");
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor hidden md:block">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 4C7 3.2 7.9 2.8 8.4 3.4L25.5 16.2C26.1 16.7 25.8 17.6 25 17.7L16 18.8C15.6 18.9 15.3 19.1 15.1 19.5L11.2 27.4C10.9 28.1 9.9 28 9.7 27.3L7 4Z"
          fill="var(--accent)"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
