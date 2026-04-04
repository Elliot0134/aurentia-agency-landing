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

  // Show sub-nav only after the user actually scrolls (relative to initial position)
  useEffect(() => {
    let initialScrollY: number | null = null;

    const handleScroll = () => {
      if (initialScrollY === null) {
        initialScrollY = window.scrollY;
      }
      setVisible(window.scrollY > initialScrollY + 20);
    };

    // Capture initial position after a short delay to account for auto-scrolls (e.g. easter egg)
    const timer = setTimeout(() => {
      initialScrollY = window.scrollY;
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setVisible]);

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
