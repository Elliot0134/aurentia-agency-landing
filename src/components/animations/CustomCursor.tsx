"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input[type="submit"], input[type="button"], [data-clickable], label[for], select, textarea, input, summary';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const pathname = usePathname();
  const isV2 = pathname?.startsWith("/v2") ?? false;

  useEffect(() => {
    if (isV2) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const MD_BREAKPOINT = 768;

    let isVisible = true;
    let isWideEnough = window.innerWidth >= MD_BREAKPOINT;

    const updateCursorClass = () => {
      if (isWideEnough) {
        document.documentElement.classList.add("has-custom-cursor");
      } else {
        document.documentElement.classList.remove("has-custom-cursor");
      }
    };

    updateCursorClass();

    const onResize = () => {
      const wide = window.innerWidth >= MD_BREAKPOINT;
      if (wide !== isWideEnough) {
        isWideEnough = wide;
        updateCursorClass();
      }
    };

    window.addEventListener("resize", onResize);

    const isClickable = (el: Element | null): boolean => {
      if (!el) return false;
      if (el.matches(CLICKABLE_SELECTOR)) return true;
      // Check computed cursor style as fallback
      const computed = window.getComputedStyle(el);
      if (computed.cursor === "pointer") return true;
      // Walk up the tree (max 5 levels for perf)
      let parent = el.parentElement;
      let depth = 0;
      while (parent && depth < 5) {
        if (parent.matches(CLICKABLE_SELECTOR)) return true;
        const parentStyle = window.getComputedStyle(parent);
        if (parentStyle.cursor === "pointer") return true;
        parent = parent.parentElement;
        depth++;
      }
      return false;
    };

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = "1";
      }

      // Check if hovering a clickable element
      const target = e.target as Element | null;
      setIsPointer(isClickable(target));
    };

    // When mouse leaves the window entirely, hide immediately
    const onMouseLeave = () => {
      if (isVisible) {
        isVisible = false;
        cursor.style.opacity = "0";
      }
      setIsPointer(false);
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
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isV2]);

  if (isV2) return null;

  return (
    <div ref={cursorRef} className="custom-cursor hidden md:block">
      {/* Default arrow cursor */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="custom-cursor-icon"
        style={{ opacity: isPointer ? 0 : 1 }}
      >
        <path
          d="M7 4C7 3.2 7.9 2.8 8.4 3.4L25.5 16.2C26.1 16.7 25.8 17.6 25 17.7L16 18.8C15.6 18.9 15.3 19.1 15.1 19.5L11.2 27.4C10.9 28.1 9.9 28 9.7 27.3L7 4Z"
          fill="var(--accent)"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* Pointer hand cursor */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cursor-clic.png"
        alt=""
        width={32}
        height={32}
        className="custom-cursor-icon custom-cursor-pointer"
        style={{ opacity: isPointer ? 1 : 0 }}
        draggable={false}
      />
    </div>
  );
}
