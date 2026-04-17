// src/components/v2/home/HomeServicesV2.tsx
"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import {
  AIIntegrationMockup,
  AuditMockup,
  DashMockup,
  FormationMockup,
  ImplementationMockup,
  LandingMockup,
  RefonteMockup,
  VitrineMockup,
} from "@/components/v2/home/ServiceMockups";

type TabKey = "sites-web" | "saas" | "solutions-ia";

type Offer = {
  title: string;
  desc: string;
  tags: string[];
  priceFrom: string;
  href: string;
  Visual: ComponentType;
};

type TabDef = {
  key: TabKey;
  label: string;
  offers: Offer[];
  href: string;
};

const TABS: TabDef[] = [
  {
    key: "sites-web",
    label: "Sites Web",
    href: "/v2/sites-web",
    offers: [
      {
        title: "Site vitrine",
        desc: "Présence pro pour TPE, artisans, commerces. SEO, responsive, rapide.",
        tags: ["SEO", "Responsive", "Animations", "Sur-mesure"],
        priceFrom: "1 200 €",
        href: "/v2/sites-web/site-vitrine",
        Visual: VitrineMockup,
      },
      {
        title: "Landing page",
        desc: "Une page, un objectif. Pages haute conversion pour startups et SaaS.",
        tags: ["Conversion", "A/B Testing", "Analytics", "Performance"],
        priceFrom: "1 500 €",
        href: "/v2/sites-web/landing-page",
        Visual: LandingMockup,
      },
    ],
  },
  {
    key: "saas",
    label: "SaaS",
    href: "/v2/saas",
    offers: [
      {
        title: "MVP SaaS",
        desc: "Prototype fonctionnel livré en 1 à 2 semaines. Architecture pro, prêt à scaler.",
        tags: ["Next.js", "Supabase", "Auth", "Stripe"],
        priceFrom: "5 000 €",
        href: "/v2/saas",
        Visual: DashMockup,
      },
      {
        title: "Refonte SaaS",
        desc: "Modernisation d'un produit existant. Refactor propre, UX revue, perf au top.",
        tags: ["Refactor", "UX", "Performance", "Migration"],
        priceFrom: "Sur devis",
        href: "/v2/saas",
        Visual: RefonteMockup,
      },
      {
        title: "Intégration IA",
        desc: "On branche Claude dans votre produit — agents, skills, tools sur-mesure.",
        tags: ["Claude", "Agents", "Tools", "Skills"],
        priceFrom: "Sur devis",
        href: "/v2/saas",
        Visual: AIIntegrationMockup,
      },
    ],
  },
  {
    key: "solutions-ia",
    label: "Solutions IA",
    href: "/v2/solutions-ia",
    offers: [
      {
        title: "Formation IA",
        desc: "Vidéos, cours et skills custom pour former vos équipes à Claude et à l'IA.",
        tags: ["Vidéos", "Cours", "Skills", "Équipes"],
        priceFrom: "Sur devis",
        href: "/v2/solutions-ia/formation-ia",
        Visual: FormationMockup,
      },
      {
        title: "Audit IA",
        desc: "Audit complet de votre business — process, coûts, ROI, opportunités d'automation.",
        tags: ["Process", "Coûts", "ROI", "Opportunités"],
        priceFrom: "Sur devis",
        href: "/v2/solutions-ia/audit",
        Visual: AuditMockup,
      },
      {
        title: "Implémentation IA",
        desc: "Skills custom déployés directement chez vous. On code, on teste, on livre.",
        tags: ["Skills", "Deploy", "Custom", "On-site"],
        priceFrom: "Sur devis",
        href: "/v2/solutions-ia/implementation-ia",
        Visual: ImplementationMockup,
      },
    ],
  },
];

export function HomeServicesV2() {
  const [active, setActive] = useState<TabKey>("sites-web");
  const activeTab = TABS.find((t) => t.key === active)!;

  // Listen for external tab-set events (from HomeHeroV2 service tags)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as TabKey | undefined;
      if (detail && TABS.some((t) => t.key === detail)) setActive(detail);
    };
    window.addEventListener("aurentia-set-service-tab", handler);
    return () => window.removeEventListener("aurentia-set-service-tab", handler);
  }, []);

  // ── Sliding pill tabs (measured) ──
  const tabsListRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<Map<TabKey, HTMLButtonElement | null>>(new Map());
  const [activePill, setActivePill] = useState({ x: 0, width: 0, ready: false });
  const [hoverPill, setHoverPill] = useState({ x: 0, width: 0, opacity: 0 });
  const hoverKeyRef = useRef<TabKey | null>(null);

  const measureActive = useCallback(() => {
    const list = tabsListRef.current;
    const btn = tabButtonRefs.current.get(active);
    if (!list || !btn) return;
    const listRect = list.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setActivePill({
      x: btnRect.left - listRect.left,
      width: btnRect.width,
      ready: true,
    });
  }, [active]);

  // Initial + on active change — runs before paint
  useLayoutEffect(() => {
    measureActive();
  }, [measureActive]);

  // Re-measure once fonts have loaded (prevents pill misalignment during font swap)
  useEffect(() => {
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) measureActive();
    });
    return () => {
      cancelled = true;
    };
  }, [measureActive]);

  // ResizeObserver → re-measure on any layout change (not just window.resize)
  useEffect(() => {
    const list = tabsListRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measureActive());
    ro.observe(list);
    return () => ro.disconnect();
  }, [measureActive]);

  const handleTabsPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const trigger = (e.target as HTMLElement).closest<HTMLElement>(
        '[data-tab-trigger="true"]',
      );
      const list = tabsListRef.current;
      if (!trigger || !list) return;
      const key = trigger.dataset.tabKey as TabKey | undefined;

      // Active tab: hide hover pill
      if (!key || key === active) {
        if (hoverKeyRef.current !== null) {
          hoverKeyRef.current = null;
          setHoverPill((p) => (p.opacity === 0 ? p : { ...p, opacity: 0 }));
        }
        return;
      }

      // Already tracking this trigger → skip state update
      if (hoverKeyRef.current === key) return;
      hoverKeyRef.current = key;

      const listRect = list.getBoundingClientRect();
      const elRect = trigger.getBoundingClientRect();
      setHoverPill({
        x: elRect.left - listRect.left,
        width: elRect.width,
        opacity: 1,
      });
    },
    [active],
  );

  const handleTabsPointerLeave = useCallback(() => {
    if (hoverKeyRef.current === null) return;
    hoverKeyRef.current = null;
    setHoverPill((p) => ({ ...p, opacity: 0 }));
  }, []);

  // Keyboard navigation (ArrowLeft/Right, Home/End) — WAI-ARIA tabs pattern
  const handleTabsKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"] as const;
      if (!keys.includes(e.key as (typeof keys)[number])) return;
      e.preventDefault();
      const currentIdx = TABS.findIndex((t) => t.key === active);
      let nextIdx = currentIdx;
      if (e.key === "ArrowLeft") nextIdx = (currentIdx - 1 + TABS.length) % TABS.length;
      if (e.key === "ArrowRight") nextIdx = (currentIdx + 1) % TABS.length;
      if (e.key === "Home") nextIdx = 0;
      if (e.key === "End") nextIdx = TABS.length - 1;
      const nextKey = TABS[nextIdx].key;
      setActive(nextKey);
      tabButtonRefs.current.get(nextKey)?.focus();
    },
    [active],
  );

  // ── Auto-scroll on hover (desktop only) — mirrored from root HomeServices ──
  const hoverTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map());

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const scrollArea = card.querySelector(".mockup-scroll-area") as HTMLElement | null;
    const inner = card.querySelector(".mockup-inner") as HTMLElement | null;
    if (!scrollArea || !inner) return;
    const scrollDistance = inner.scrollHeight - scrollArea.clientHeight;
    if (scrollDistance <= 0) return;

    hoverTweens.current.get(card)?.kill();
    const tween = gsap.to(inner, {
      y: -scrollDistance,
      duration: scrollDistance / 80,
      ease: "none",
    });
    hoverTweens.current.set(card, tween);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const inner = card.querySelector(".mockup-inner") as HTMLElement | null;
    if (!inner) return;

    hoverTweens.current.get(card)?.kill();
    const tween = gsap.to(inner, {
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    hoverTweens.current.set(card, tween);
  }, []);

  useEffect(() => {
    const tweens = hoverTweens.current;
    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <SectionContainer
      id="pillars"
      title="Nos services"
      alignHeader="center"
      className="py-20 md:py-24 lg:flex lg:min-h-screen lg:items-center"
      innerClassName="max-w-6xl"
      titleClassName="text-4xl md:text-5xl lg:text-6xl mb-4 font-normal"
    >
      <div className="relative flex flex-col">
        {/* ── Centered segmented-control tabs (bordered container) ── */}
        <div className="flex justify-center">
          <div
            ref={tabsListRef}
            onPointerMove={handleTabsPointerMove}
            onPointerLeave={handleTabsPointerLeave}
            onKeyDown={handleTabsKeyDown}
            role="tablist"
            aria-orientation="horizontal"
            aria-label="Catégories de services"
            className="relative inline-flex items-center gap-1 rounded-full border border-foreground/15 p-1"
          >
            {/* Hover indicator — GPU-composited, subtle */}
            <div
              className="pointer-events-none absolute inset-y-1 left-0 rounded-full bg-foreground/[0.04] will-change-transform"
              style={{
                width: hoverPill.width,
                opacity: hoverPill.opacity,
                transform: `translate3d(${hoverPill.x}px, 0, 0)`,
                transition:
                  "transform 450ms cubic-bezier(0.32, 0.72, 0, 1), width 450ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms ease-out",
              }}
            />
            {/* Active pill — card-like lift, clearly selected */}
            <div
              className="pointer-events-none absolute inset-y-1 left-0 rounded-full bg-background-surface shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] ring-1 ring-foreground/[0.08] will-change-transform"
              style={{
                width: activePill.width,
                opacity: activePill.ready ? 1 : 0,
                transform: `translate3d(${activePill.x}px, 0, 0)`,
                transition: activePill.ready
                  ? "transform 550ms cubic-bezier(0.32, 0.72, 0, 1), width 550ms cubic-bezier(0.32, 0.72, 0, 1)"
                  : "none",
              }}
            />
            {TABS.map((tab) => {
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`tab-${tab.key}`}
                  ref={(el) => {
                    tabButtonRefs.current.set(tab.key, el);
                  }}
                  data-tab-trigger="true"
                  data-tab-key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(tab.key)}
                  className={`relative z-10 cursor-pointer rounded-full px-5 py-1.5 text-sm font-medium whitespace-nowrap outline-none transition-colors duration-500 ease-out focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive ? "text-foreground" : "text-foreground/55 hover:text-foreground/90"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Body — cards with fixed width, wrap + center ── */}
        <div className="relative mt-8 min-h-[460px] md:mt-10">
          {TABS.map((tab) => (
            <TabPanel
              key={tab.key}
              id={`tabpanel-${tab.key}`}
              labelledBy={`tab-${tab.key}`}
              visible={active === tab.key}
            >
              <div className="flex flex-wrap items-start justify-center gap-5 md:gap-6">
                {tab.offers.map((offer) => (
                  <div
                    key={offer.title}
                    className="flex w-full max-w-[380px] md:w-[340px] lg:w-[350px]"
                  >
                    <OfferCard
                      offer={offer}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </div>

        {/* ── Footer — editorial text link ── */}
        <div className="mt-8 flex items-center justify-center md:mt-10">
          <Link
            href={activeTab.href}
            className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-all duration-500 ease-in-out hover:gap-3"
          >
            Voir toutes les offres{" "}
            <span className="font-bold text-[var(--orange-600)] transition-colors duration-500 ease-in-out">
              {activeTab.label}
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────
   Tab panel — fades & slides between tabs
   ────────────────────────────────────────────── */
function TabPanel({
  visible,
  id,
  labelledBy,
  children,
}: {
  visible: boolean;
  id: string;
  labelledBy: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      className={`absolute inset-0 transition-all ease-in-out ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100 duration-700"
          : "pointer-events-none translate-y-3 opacity-0 duration-300"
      }`}
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Offer card — reusable tile
   ────────────────────────────────────────────── */
function OfferCard({
  offer,
  onMouseEnter,
  onMouseLeave,
}: {
  offer: Offer;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const { Visual, title, desc, tags, priceFrom, href } = offer;
  return (
    <Card className="group relative flex w-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:-translate-y-1">
      <div className="flex flex-col p-4 md:p-5">
        {/* Title */}
        <h3 className="mb-3 font-heading text-xl leading-tight text-foreground md:text-2xl">
          {title}
        </h3>

        {/* Mockup viewport — same chrome + hover-scroll as root homepage */}
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="mockup-viewport relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-foreground/[0.08] bg-white transition-all duration-700 ease-in-out group-hover:border-foreground/20 group-hover:shadow-[0_0_50px_rgba(228,85,18,0.08)] group-hover:scale-[1.02] dark:bg-background-surface"
        >
          <Visual />
        </div>

        {/* Details — tags marquee + desc + price row */}
        <div className="flex flex-col gap-3 pt-3">
          {/* Tags marquee — wider fade masks + pause on hover */}
          <div className="group/tags relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background-surface via-background-surface/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background-surface via-background-surface/80 to-transparent" />
            <div className="flex w-max gap-2 animate-[scroll-x_20s_linear_infinite] group-hover/tags:[animation-play-state:paused]">
              {[...tags, ...tags].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="shrink-0 whitespace-nowrap rounded-md border border-foreground/[0.08] bg-foreground/[0.03] px-2.5 py-1 font-mono text-sm text-foreground/45"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>

          {/* Price + CTA footer */}
          <div className="flex items-end justify-between gap-3 pt-1">
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-sm uppercase tracking-widest text-foreground/30">
                À partir de
              </span>
              <span className="font-mono text-base font-bold text-[var(--orange-600)]">
                {priceFrom}
              </span>
            </div>
            <Link
              href={href}
              className="group/cta inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
            >
              Découvrir
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-in-out group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

