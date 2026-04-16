"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const pathname = usePathname();
  const isV2 = pathname?.startsWith("/v2") ?? false;

  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => setShow(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const [fading, setFading] = useState(false);

  const handleClick = useCallback(() => {
    if (fading) return;
    setFading(true);

    // After fade out completes, scroll instantly and fade back in
    setTimeout(() => {
      const easterEgg = document.querySelector("[data-easter-egg]") as HTMLElement | null;
      const targetY = easterEgg ? easterEgg.scrollHeight : 0;

      // Stop Lenis, jump with native scroll, then restart Lenis
      const lenis = (window as unknown as Record<string, { stop: () => void; start: () => void }>).__lenis;
      if (lenis) lenis.stop();
      window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
      if (lenis) {
        // Let the browser paint at the new position, then restart Lenis
        requestAnimationFrame(() => lenis.start());
      }

      // Small delay before fade in so the browser has painted at new position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFading(false);
        });
      });
    }, 700); // matches the CSS transition duration
  }, [fading]);

  if (!show) return null;

  return (
    <>
      {/* Full-screen fade overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998] bg-background transition-opacity duration-700 ease-in-out"
        style={{ opacity: fading ? 1 : 0 }}
      />
      <button
        onClick={handleClick}
        aria-label="Retour en haut"
        className={cn(
          "fixed right-6 z-[9999] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-foreground/10 bg-card-bg shadow-lg backdrop-blur-xl transition-colors duration-500 hover:bg-card-bg-hover",
          isV2 ? "bottom-24" : "bottom-6"
        )}
        style={{ color: "var(--text-primary)" }}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
