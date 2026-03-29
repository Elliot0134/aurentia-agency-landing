"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AnimationContextValue {
  animationsEnabled: boolean;
}

const AnimationContext = createContext<AnimationContextValue>({
  animationsEnabled: true,
});

const MD_BREAKPOINT = 768;

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setAnimationsEnabled(window.innerWidth >= MD_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <AnimationContext.Provider value={{ animationsEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationsEnabled() {
  return useContext(AnimationContext).animationsEnabled;
}
