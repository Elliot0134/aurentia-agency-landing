"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface SubNavItem {
  label: string;
  sectionId: string;
}

interface SubNavContextValue {
  items: SubNavItem[];
  setItems: (items: SubNavItem[]) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  visible: boolean;
  setVisible: (v: boolean) => void;
}

const SubNavContext = createContext<SubNavContextValue | null>(null);

export function SubNavProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SubNavItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <SubNavContext.Provider value={{ items, setItems, activeId, setActiveId, visible, setVisible }}>
      {children}
    </SubNavContext.Provider>
  );
}

export function useSubNav() {
  const ctx = useContext(SubNavContext);
  if (!ctx) throw new Error("useSubNav must be used within SubNavProvider");
  return ctx;
}

// Drop-in component for pages to set sub-nav items
export function SubNavSetter({ items }: { items: SubNavItem[] }) {
  const { setItems, setActiveId, setVisible } = useSubNav();

  // Register items on mount, clear on unmount
  useEffect(() => {
    setItems(items);
    return () => {
      setItems([]);
      setActiveId(null);
      setVisible(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show sub-nav only after scrolling past the first section (hero)
  useEffect(() => {
    const handleScroll = () => {
      // Use the first section's sectionId as reference, fallback to "hero"
      const firstId = items[0]?.sectionId;
      const anchor = document.getElementById(firstId ?? "hero") ?? document.getElementById("hero");
      if (anchor) {
        // Show sub-nav when the anchor section enters the viewport
        const rect = anchor.getBoundingClientRect();
        setVisible(rect.top < window.innerHeight * 0.5);
      } else {
        setVisible(window.scrollY > 20);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, setVisible]);

  // Track which section is in view
  const handleIntersect = useCallback(
    (sectionId: string) => (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setActiveId(sectionId);
      }
    },
    [setActiveId]
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(handleIntersect(sectionId), {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items, handleIntersect]);

  return null;
}
