"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SplashScreen } from "./SplashScreen";

export function SplashWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showSplash, setShowSplash] = useState(isHome);
  const prevPathnameRef = useRef(pathname);

  const handleComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Re-trigger splash when navigating back to homepage
  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (isHome && prevPathname !== "/") {
      // Clean up previous ready state so CSS hides content again
      const navbar = document.querySelector("[data-splash-navbar]") as HTMLElement | null;
      if (navbar) {
        navbar.removeAttribute("data-splash-ready");
        navbar.style.opacity = "";
      }
      setShowSplash(true);
    }
  }, [isHome, pathname]);

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
  }, [isHome, pathname]);

  if (!showSplash) return null;

  return <SplashScreen onComplete={handleComplete} />;
}
