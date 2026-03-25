"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    document.documentElement.classList.add("has-custom-cursor");

    let moveCount = 0;
    let isVisible = true;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    // Use CSS transition for opacity (avoids GSAP ticker conflicts)
    cursor.style.transition = "opacity 0.5s ease-out";

    const scheduleHide = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (isVisible) {
          isVisible = false;
          cursor.style.opacity = "0";
        }
      }, 200);
    };

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      moveCount++;

      if (!isVisible) {
        // Wait for a few consecutive moves before fading back in (avoids flicker)
        if (moveCount < 3) return;
        isVisible = true;
        cursor.style.opacity = "1";
      }

      moveCount = Math.min(moveCount, 10);
      scheduleHide();
    };

    // When mouse leaves the window entirely, hide immediately
    const onMouseLeave = () => {
      moveCount = 0;
      if (idleTimer) clearTimeout(idleTimer);
      if (isVisible) {
        isVisible = false;
        cursor.style.opacity = "0";
      }
    };

    document.addEventListener("mouseleave", onMouseLeave);

    const currentPos = { x: 0, y: 0 };
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

    const ticker = () => {
      currentPos.x = lerp(currentPos.x, posRef.current.x, 0.35);
      currentPos.y = lerp(currentPos.y, posRef.current.y, 0.35);
      cursor.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`;
    };

    currentPos.x = posRef.current.x;
    currentPos.y = posRef.current.y;

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (idleTimer) clearTimeout(idleTimer);
      document.documentElement.classList.remove("has-custom-cursor");
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
