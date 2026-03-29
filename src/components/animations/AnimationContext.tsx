"use client";

import { useSyncExternalStore } from "react";

const MD_BREAKPOINT = 768;

function getSnapshot(): boolean {
  return window.innerWidth >= MD_BREAKPOINT;
}

function getServerSnapshot(): boolean {
  return true;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

/**
 * Returns true on desktop (>= 768px), false on mobile.
 * Uses useSyncExternalStore for immediate sync value — no useEffect delay.
 */
export function useAnimationsEnabled(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Sync check for use outside React (GSAP callbacks, event handlers).
 * Returns false on server.
 */
export function isAnimationsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= MD_BREAKPOINT;
}
