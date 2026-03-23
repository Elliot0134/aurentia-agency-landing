"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SplashScreen } from "./SplashScreen";

export function SplashWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showSplash, setShowSplash] = useState(isHome);

  const handleComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // On non-homepage routes, immediately reveal navbar and content
  useEffect(() => {
    if (!isHome) {
      const navbar = document.querySelector("[data-splash-navbar]") as HTMLElement | null;
      if (navbar) {
        navbar.setAttribute("data-splash-ready", "");
        navbar.style.opacity = "1";
      }
      const content = document.querySelector("[data-splash-content]") as HTMLElement | null;
      if (content) {
        content.setAttribute("data-splash-ready", "");
        content.style.opacity = "1";
      }
    }
  }, [isHome]);

  if (!showSplash) return null;

  return <SplashScreen onComplete={handleComplete} />;
}
