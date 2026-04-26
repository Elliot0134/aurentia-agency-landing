// src/components/home/HomeServicesV2.tsx
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
import { WipAwareLink as Link } from "@/components/shared/WipModal";
import gsap from "gsap";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { PriceHT } from "@/components/v2/shared/PriceHT";
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

type TabKey = "sites-web" | "saas" | "formation-ia" | "systeme-ia";

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

type PillarEntry = {
  key: TabKey;
  title: string;
  desc: string;
};

const TABS: TabDef[] = [
  {
    key: "sites-web",
    label: "Sites Web",
    href: "/sites-web",
    offers: [
      {
        title: "Site vitrine",
        desc: "Présence pro pour TPE, artisans, commerces. SEO, responsive, rapide.",
        tags: ["SEO", "Responsive", "Animations", "Sur-mesure"],
        priceFrom: "1 500 €",
        href: "/sites-web/site-vitrine",
        Visual: VitrineMockup,
      },
      {
        title: "Landing page",
        desc: "Une page, un objectif. Design sur-mesure et copy orienté conversion.",
        tags: ["Conversion", "Sur-mesure", "Performance", "Responsive"],
        priceFrom: "1 500 €",
        href: "/sites-web/landing-page",
        Visual: LandingMockup,
      },
    ],
  },
  {
    key: "saas",
    label: "SaaS",
    href: "/saas",
    offers: [
      {
        title: "MVP SaaS",
        desc: "Prototype fonctionnel livré en 1 à 2 semaines. Architecture pro, prêt à scaler.",
        tags: ["Next.js", "Supabase", "Auth", "Stripe"],
        priceFrom: "5 000 €",
        href: "/saas",
        Visual: DashMockup,
      },
      {
        title: "Refonte SaaS",
        desc: "Modernisation d'un produit existant. Refactor propre, UX revue, perf au top.",
        tags: ["Refactor", "UX", "Performance", "Migration"],
        priceFrom: "Sur devis",
        href: "/saas",
        Visual: RefonteMockup,
      },
      {
        title: "Intégration IA",
        desc: "On branche Claude dans votre produit — agents, skills, tools sur-mesure.",
        tags: ["Claude", "Agents", "Tools", "Skills"],
        priceFrom: "Sur devis",
        href: "/saas",
        Visual: AIIntegrationMockup,
      },
      {
        title: "Marque blanche pour agences",
        desc: "Partenariat tech pour agences : on développe vos SaaS clients sous votre marque.",
        tags: ["Partenariat", "White-label", "Agences", "Tech"],
        priceFrom: "Sur devis",
        href: "/saas/agences",
        Visual: RefonteMockup,
      },
    ],
  },
  {
    key: "formation-ia",
    label: "Formation IA",
    href: "/solutions-ia/formation-ia",
    offers: [
      {
        title: "Formation équipes",
        desc: "Bootcamp Claude, workshops IA. Sessions in-house ou remote pour monter vos équipes en compétence.",
        tags: ["Bootcamp", "Workshops", "In-house", "Remote"],
        priceFrom: "Sur devis",
        href: "/solutions-ia/formation-ia",
        Visual: FormationMockup,
      },
      {
        title: "Skills & Cours",
        desc: "Vidéos structurées et skills Claude sur-mesure déployés pour vos équipes.",
        tags: ["Vidéos", "Skills", "Claude", "Custom"],
        priceFrom: "Sur devis",
        href: "/solutions-ia/formation-ia",
        Visual: AIIntegrationMockup,
      },
      {
        title: "Accompagnement",
        desc: "Coaching continu 3 à 6 mois. Un expert IA à disposition pour débloquer et accélérer.",
        tags: ["Coaching", "Continu", "Expert", "Suivi"],
        priceFrom: "Sur devis",
        href: "/solutions-ia/formation-ia",
        Visual: ImplementationMockup,
      },
    ],
  },
  {
    key: "systeme-ia",
    label: "Système IA",
    href: "/solutions-ia",
    offers: [
      {
        title: "Audit IA",
        desc: "Audit complet de votre business — process, coûts, ROI, opportunités d'automation.",
        tags: ["Process", "Coûts", "ROI", "Opportunités"],
        priceFrom: "Sur devis",
        href: "/solutions-ia/audit",
        Visual: AuditMockup,
      },
      {
        title: "Implémentation IA",
        desc: "Skills custom déployés directement chez vous. On code, on teste, on livre.",
        tags: ["Skills", "Deploy", "Custom", "On-site"],
        priceFrom: "Sur devis",
        href: "/solutions-ia/implementation-ia",
        Visual: ImplementationMockup,
      },
      {
        title: "Configuration Claude",
        desc: "Hooks, skills, MCP servers et CLAUDE.md sur-mesure pour votre stack.",
        tags: ["Hooks", "Skills", "MCP", "CLAUDE.md"],
        priceFrom: "Sur devis",
        href: "/solutions-ia/configuration-claude",
        Visual: AIIntegrationMockup,
      },
    ],
  },
];

const PILLARS: PillarEntry[] = [
  { key: "sites-web", title: "Site Web", desc: "Visibilité & Conversion" },
  { key: "saas", title: "SaaS", desc: "Application sur-mesure" },
  { key: "formation-ia", title: "Formation IA", desc: "Bootcamp & Workshops" },
  { key: "systeme-ia", title: "Système IA", desc: "Audit & Automatisation" },
];

type HomeServicesV2Props = {
  /** Lock to a single tab — hides the tab switcher AND the pillar entry grid, shows only that tab's offers. */
  lockedTab?: TabKey;
};

type View = "cards" | "tabs";

export function HomeServicesV2({ lockedTab }: HomeServicesV2Props = {}) {
  const [active, setActive] = useState<TabKey>(lockedTab ?? "sites-web");
  const [view, setView] = useState<View>(lockedTab ? "tabs" : "cards");
  const activeTab = TABS.find((t) => t.key === active)!;

  // Listen for external tab-set events (from HomeHeroV2 service tags)
  useEffect(() => {
    if (lockedTab) return; // locked mode — ignore external events
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as TabKey | undefined;
      if (detail && TABS.some((t) => t.key === detail)) {
        setActive(detail);
        setView("tabs");
      }
    };
    window.addEventListener("aurentia-set-service-tab", handler);
    return () => window.removeEventListener("aurentia-set-service-tab", handler);
  }, [lockedTab]);

  const handlePillarClick = useCallback((key: TabKey) => {
    setActive(key);
    setView("tabs");
  }, []);

  const handleBackToCards = useCallback(() => {
    setView("cards");
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
    if (view !== "tabs") return;
    measureActive();
  }, [measureActive, view]);

  // Re-measure once fonts have loaded (prevents pill misalignment during font swap)
  useEffect(() => {
    if (view !== "tabs") return;
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) measureActive();
    });
    return () => {
      cancelled = true;
    };
  }, [measureActive, view]);

  // ResizeObserver → re-measure on any layout change (not just window.resize)
  useEffect(() => {
    if (view !== "tabs") return;
    const list = tabsListRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measureActive());
    ro.observe(list);
    return () => ro.disconnect();
  }, [measureActive, view]);

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

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
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

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
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
      tweens.clear();
    };
  }, [active]);

  // ── Auto-reveal on touch devices (no hover) — plays once per card when visible ──
  useEffect(() => {
    if (view !== "tabs") return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: none)").matches) return;

    const tweens: gsap.core.Timeline[] = [];
    const timer = window.setTimeout(() => {
      const panel = document.getElementById(`tabpanel-${active}`);
      if (!panel) return;

      const viewports = panel.querySelectorAll<HTMLElement>(".mockup-viewport");
      viewports.forEach((card, idx) => {
        const inner = card.querySelector<HTMLElement>(".mockup-inner");
        const scrollArea = card.querySelector<HTMLElement>(".mockup-scroll-area");
        if (!inner || !scrollArea) return;
        const scrollDistance = inner.scrollHeight - scrollArea.clientHeight;
        if (scrollDistance <= 0) return;

        const tl = gsap.timeline({ delay: 0.6 + idx * 0.25 });
        tl.to(inner, {
          y: -scrollDistance,
          duration: Math.min(scrollDistance / 50, 5),
          ease: "none",
        }).to(inner, {
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.8,
        });
        tweens.push(tl);
      });
    }, 800);

    return () => {
      window.clearTimeout(timer);
      tweens.forEach((t) => t.kill());
    };
  }, [active, view]);

  const showPillarGrid = view === "cards" && !lockedTab;

  return (
    <SectionContainer
      id="pillars"
      title="Nos services"
      alignHeader="center"
      className="py-16 md:py-20"
      innerClassName="max-w-6xl"
      titleClassName="text-4xl md:text-5xl lg:text-6xl mb-4 font-normal"
      headerClassName="!mb-8 md:!mb-10"
    >
      {showPillarGrid ? (
        <div key="cards" className="animate-fade-in">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {PILLARS.map((pillar) => (
              <PillarEntryCard
                key={pillar.key}
                pillar={pillar}
                onClick={() => handlePillarClick(pillar.key)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div key="tabs" className="relative flex flex-col animate-fade-in">
          {/* ── Back link — only when not locked ── */}
          {!lockedTab && (
            <div className="mb-5 flex justify-center md:mb-6">
              <button
                type="button"
                onClick={handleBackToCards}
                className="group inline-flex items-center gap-1.5 text-sm text-foreground/50 transition-colors duration-500 ease-in-out hover:text-foreground/90"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 ease-in-out group-hover:-translate-x-0.5" />
                Toutes les catégories
              </button>
            </div>
          )}

          {/* ── Centered segmented-control tabs (bordered container) ── */}
          {!lockedTab && (
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
          )}

          {/* ── Body — only active tab rendered so height = content, footer stays close ── */}
          <div className="mt-5 md:mt-7">
            <TabPanel
              key={active}
              id={`tabpanel-${active}`}
              labelledBy={`tab-${active}`}
            >
              <div className="flex flex-wrap items-stretch justify-center gap-5 md:gap-6">
                {activeTab.offers.map((offer) => (
                  <div
                    key={offer.title}
                    className="flex w-full md:w-[340px] lg:w-[360px]"
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
          </div>

          {/* ── Footer — editorial text link ── */}
          <div className="mt-4 flex items-center justify-center md:mt-6">
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
      )}
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────
   Tab panel — fades in when the active tab changes
   ────────────────────────────────────────────── */
function TabPanel({
  id,
  labelledBy,
  children,
}: {
  id: string;
  labelledBy: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      className="animate-fade-in"
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Pillar entry card — simple tile with title + short subtitle
   ────────────────────────────────────────────── */
function PillarEntryCard({
  pillar,
  onClick,
}: {
  pillar: PillarEntry;
  onClick: () => void;
}) {
  const { title, desc } = pillar;
  return (
    <Card className="group relative flex w-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[0_0_40px_rgba(228,85,18,0.06)]">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 p-8 text-center md:gap-3 md:p-10"
      >
        <h3 className="font-heading text-xl leading-tight text-foreground md:text-2xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </button>
    </Card>
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
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
}) {
  const { Visual, title, desc, priceFrom, href } = offer;
  return (
    <Card className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:-translate-y-1">
      <Link
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="flex flex-1 cursor-pointer flex-col p-4 md:p-5"
      >
        {/* Title */}
        <h3 className="mb-3 font-heading text-xl leading-tight text-foreground md:text-2xl">
          {title}
        </h3>

        {/* Mockup viewport — same chrome + hover-scroll as root homepage */}
        <div className="mockup-viewport relative aspect-[16/11] w-full shrink-0 overflow-hidden rounded-xl border border-foreground/[0.08] bg-white transition-all duration-700 ease-in-out group-hover:border-foreground/20 group-hover:shadow-[0_0_50px_rgba(228,85,18,0.08)] group-hover:scale-[1.02] dark:bg-background-surface">
          <Visual />
          {/* Bottom fade — hints scrollability + softens content clip */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-background-surface dark:via-background-surface/70" />
        </div>

        {/* Details — desc + price row */}
        <div className="flex flex-1 flex-col gap-3 pt-4">
          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>

          {/* Price + CTA footer */}
          <div className="mt-auto flex items-end justify-between gap-3 pt-1">
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-sm uppercase tracking-widest text-foreground/30">
                À partir de
              </span>
              <span className="font-mono text-base font-bold text-[var(--orange-600)]">
                <PriceHT value={priceFrom} />
              </span>
            </div>
            <span className="group/cta inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-500 ease-in-out group-hover:opacity-90">
              Découvrir
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
