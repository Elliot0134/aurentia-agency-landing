"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => setShow(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const handleClick = useCallback(() => {
    // Hero is pinned/transformed by GSAP ScrollTrigger — can't scroll to the element.
    // Instead, scroll to the Y position right after the easter egg section.
    const easterEgg = document.querySelector("[data-easter-egg]") as HTMLElement | null;
    const targetY = easterEgg ? easterEgg.scrollHeight : 0;

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(targetY, { duration: 2 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="Retour en haut"
      className="fixed bottom-6 right-6 z-[9999] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-foreground/10 bg-card-bg shadow-lg backdrop-blur-xl transition-colors hover:bg-card-bg-hover"
      style={{ color: "var(--text-primary)" }}
    >
      <ArrowUp size={20} />
    </button>
  );
}
