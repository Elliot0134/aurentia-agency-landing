"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Use Lenis if available, otherwise fallback to native scroll
    const lenis = (window as unknown as Record<string, unknown>).__lenis as {
      scrollTo: (target: number, options?: { immediate?: boolean }) => void;
    } | undefined;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
