"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { CalModal } from "./CalModal";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [showPing, setShowPing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Start ping when visible, hide it after 3 pulses (3 × 2s = 6s)
  useEffect(() => {
    if (visible && !showPing) {
      const raf = requestAnimationFrame(() => setShowPing(true));
      const timer = setTimeout(() => setShowPing(false), 6000);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [visible, showPing]);

  return (
    <>
      <button
        onClick={() => setCalOpen(true)}
        aria-label="Réserver un appel"
        className={`fixed bottom-6 left-1/2 z-40 flex items-center gap-2.5 rounded-full bg-foreground text-background font-semibold text-sm cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 ${
          visible
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-0 pointer-events-none"
        }`}
        style={{
          transform: visible
            ? "translateX(-50%) scale(1)"
            : "translateX(-50%) scale(0)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Ping animation on the icon */}
        <span className="relative flex items-center justify-center w-10 h-10 -ml-1 pl-2">
          {showPing && (
            <span
              className="absolute inset-0 rounded-full bg-foreground/20 animate-ping"
              style={{ animationDuration: "2s", animationIterationCount: "3" }}
            />
          )}
          <Phone size={16} strokeWidth={2.5} className="relative z-10" />
        </span>
        <span className="pr-5">Réserver un appel</span>
      </button>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
