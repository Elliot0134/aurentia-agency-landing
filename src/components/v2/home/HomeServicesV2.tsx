// src/components/home/HomeServicesV2.tsx
"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { WipAwareLink as Link } from "@/components/shared/WipModal";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { PriceHT } from "@/components/v2/shared/PriceHT";
import { LowPolyCoralBg } from "@/components/v2/shared/LowPolyCoralBg";
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
  services: string[];
  Mockup: ComponentType;
  accent: { from: string; to: string };
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
      {
        title: "E-commerce",
        desc: "Boutique Shopify sur-mesure. Catalogue, paiement, livraison, SEO produit.",
        tags: ["Shopify", "Catalogue", "Paiement", "SEO"],
        priceFrom: "2 500 €",
        href: "/sites-web/ecommerce",
        Visual: VitrineMockup,
      },
      {
        title: "Site sur-mesure",
        desc: "App, marketplace, plateforme. Stack moderne, archi propre, livraison continue.",
        tags: ["Custom", "Next.js", "Supabase", "Scalable"],
        priceFrom: "6 000 €",
        href: "/sites-web/sur-mesure",
        Visual: RefonteMockup,
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
        title: "SaaS sur mesure",
        desc: "Plateforme custom de A à Z. Cadrage produit, archi scalable, livraison continue.",
        tags: ["Custom", "Architecture", "Scalable", "Long-terme"],
        priceFrom: "Sur devis",
        href: "/saas",
        Visual: ImplementationMockup,
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
        desc: "Audit complet de votre business : process, coûts, ROI, opportunités d'automation.",
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
  {
    key: "sites-web",
    title: "Site Web",
    services: ["Site vitrine", "Landing page", "E-commerce", "Sur-mesure"],
    Mockup: WebsiteMini,
    accent: { from: "#3B82F6", to: "#06B6D4" },
  },
  {
    key: "saas",
    title: "SaaS",
    services: ["MVP SaaS", "Refonte SaaS", "Sur-mesure"],
    Mockup: SaasMini,
    accent: { from: "#8B5CF6", to: "#EC4899" },
  },
  {
    key: "formation-ia",
    title: "Formation IA",
    services: ["Formation équipes", "Skills & Cours", "Accompagnement"],
    Mockup: YoutubeMini,
    accent: { from: "#EF4444", to: "#F97316" },
  },
  {
    key: "systeme-ia",
    title: "Système IA",
    services: ["Audit IA", "Implémentation", "Configuration Claude"],
    Mockup: OrgChartMini,
    accent: { from: "#F97316", to: "#EAB308" },
  },
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

  // ── Sliding pill tabs (measured) ──
  const tabsListRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<Map<TabKey, HTMLButtonElement | null>>(new Map());
  const [activePill, setActivePill] = useState({ x: 0, width: 0, ready: false });
  const [hoverPill, setHoverPill] = useState({ x: 0, width: 0, opacity: 0 });
  const hoverKeyRef = useRef<TabKey | null>(null);
  // Blocks measureActive while the cards→tabs morph is animating —
  // bounding rects mid-animation give wrong (transformed) coords.
  const morphCompleteRef = useRef(true);

  // Listen for external tab-set events (from HomeHeroV2 service tags)
  useEffect(() => {
    if (lockedTab) return; // locked mode — ignore external events
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as TabKey | undefined;
      if (detail && TABS.some((t) => t.key === detail)) {
        morphCompleteRef.current = false;
        setActive(detail);
        setView("tabs");
        setActivePill((p) => ({ ...p, ready: false }));
      }
    };
    window.addEventListener("aurentia-set-service-tab", handler);
    return () => window.removeEventListener("aurentia-set-service-tab", handler);
  }, [lockedTab]);

  const handlePillarClick = useCallback((key: TabKey) => {
    morphCompleteRef.current = false;
    setActive(key);
    setView("tabs");
    setActivePill((p) => ({ ...p, ready: false }));
  }, []);

  const measureActive = useCallback(() => {
    if (!morphCompleteRef.current) return;
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

  // Re-measure on active tab change. measureActive() is internally gated by
  // morphCompleteRef → no-op while the cards→tabs morph is animating.
  // Initial measurement after a morph is triggered by onLayoutAnimationComplete.
  useLayoutEffect(() => {
    if (view !== "tabs") return;
    measureActive();
  }, [active, measureActive, view]);

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

  const handleShowAllDetails = useCallback(() => {
    morphCompleteRef.current = false;
    setActive("sites-web");
    setView("tabs");
    // Hide active pill until the morph completes — it will be re-measured by onLayoutAnimationComplete
    setActivePill((p) => ({ ...p, ready: false }));
  }, []);

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
      {/* ── Tab bar — always rendered, morphs from "Détail des services" pill to 4 tabs ── */}
      {!lockedTab && (
        <div className="mb-7 flex justify-center md:mb-9">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 220, damping: 30, mass: 1 }}
            onLayoutAnimationComplete={() => {
              morphCompleteRef.current = true;
              if (view === "tabs") measureActive();
            }}
            ref={tabsListRef}
            onPointerMove={!showPillarGrid ? handleTabsPointerMove : undefined}
            onPointerLeave={!showPillarGrid ? handleTabsPointerLeave : undefined}
            onKeyDown={!showPillarGrid ? handleTabsKeyDown : undefined}
            role={!showPillarGrid ? "tablist" : undefined}
            aria-orientation={!showPillarGrid ? "horizontal" : undefined}
            aria-label={!showPillarGrid ? "Catégories de services" : undefined}
            className="relative grid grid-cols-2 gap-1 rounded-2xl border border-foreground/15 p-1 sm:inline-flex sm:flex-nowrap sm:rounded-full"
          >
            {/* Sliding pills — only relevant in tabs view, hidden on mobile (wrapping breaks absolute positioning) */}
            {!showPillarGrid && (
              <>
                <div
                  className="pointer-events-none absolute inset-y-1 left-0 hidden rounded-full bg-foreground/[0.04] will-change-transform sm:block"
                  style={{
                    width: hoverPill.width,
                    opacity: hoverPill.opacity,
                    transform: `translate3d(${hoverPill.x}px, 0, 0)`,
                    transition:
                      "transform 450ms cubic-bezier(0.32, 0.72, 0, 1), width 450ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms ease-out",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-y-1 left-0 hidden rounded-full bg-background-surface shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)] ring-1 ring-foreground/[0.08] will-change-transform sm:block"
                  style={{
                    width: activePill.width,
                    opacity: activePill.ready ? 1 : 0,
                    transform: `translate3d(${activePill.x}px, 0, 0)`,
                    transition: activePill.ready
                      ? "transform 550ms cubic-bezier(0.32, 0.72, 0, 1), width 550ms cubic-bezier(0.32, 0.72, 0, 1)"
                      : "none",
                  }}
                />
              </>
            )}

            <AnimatePresence mode="popLayout" initial={false}>
              {showPillarGrid ? (
                <motion.button
                  key="cta"
                  layout
                  type="button"
                  onClick={handleShowAllDetails}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative z-10 col-span-2 cursor-pointer rounded-full px-5 py-1.5 text-sm font-medium whitespace-nowrap text-foreground/70 transition-colors duration-500 ease-out hover:text-foreground sm:col-span-1"
                >
                  Détail des services
                </motion.button>
              ) : (
                TABS.map((tab) => {
                  const isActive = active === tab.key;
                  return (
                    <motion.button
                      key={tab.key}
                      layout
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-center text-sm font-medium whitespace-nowrap outline-none transition-all duration-500 ease-out focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:py-1.5 ${
                        isActive
                          ? "text-foreground bg-background-surface shadow-sm ring-1 ring-foreground/[0.08] sm:bg-transparent sm:shadow-none sm:ring-0"
                          : "text-foreground/55 hover:text-foreground/90"
                      }`}
                    >
                      {tab.label}
                    </motion.button>
                  );
                })
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      {/* ── Body — pillar grid OR offer cards (smooth fade swap, mode=wait) ── */}
      <AnimatePresence mode="wait" initial={false}>
        {showPillarGrid ? (
          <motion.div
            key="cards-pillars"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="mx-auto grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6">
              {PILLARS.map((pillar, i) => (
                <PillarEntryCard
                  key={pillar.key}
                  pillar={pillar}
                  index={i}
                  onClick={() => handlePillarClick(pillar.key)}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="cards-offers"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="relative flex flex-col"
          >
            <div
              key={active}
              id={`tabpanel-${active}`}
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              className="animate-fade-in"
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
            </div>

            {/* Footer link */}
            <div className="mt-6 flex items-center justify-center md:mt-7">
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
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}

/* ──────────────────────────────────────────────
   Pillar entry card — simple tile with title + short subtitle
   ────────────────────────────────────────────── */
function PillarEntryCard({
  pillar,
  onClick,
  index,
}: {
  pillar: PillarEntry;
  onClick: () => void;
  index: number;
}) {
  const { title, services, Mockup, accent } = pillar;
  const isEven = index % 2 === 0;
  return (
    <div className="group relative h-full w-full">
      {/* ── Desktop: vertical card (mockup top, text bottom) ── */}
      <Card className="relative hidden h-full w-full flex-col overflow-hidden rounded-3xl sm:flex">
        <button
          type="button"
          onClick={onClick}
          aria-label={`Voir les offres ${title}`}
          className="flex h-full w-full cursor-pointer flex-col text-left"
        >
          <div className="relative aspect-[16/10] w-full shrink-0">
            <div
              className="absolute inset-0 rounded-t-3xl"
              style={{
                background: `linear-gradient(135deg, ${accent.from}18 0%, ${accent.to}18 100%)`,
              }}
            >
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full opacity-45 blur-3xl"
                style={{ background: accent.from }}
              />
              <div
                className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full opacity-35 blur-3xl"
                style={{ background: accent.to }}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2 p-6 transition-transform duration-700 ease-in-out group-hover:-translate-y-2 md:p-7">
            <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground whitespace-nowrap">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/60 transition-colors duration-700 ease-in-out group-hover:text-foreground/85">
              {services.join(" · ")}
            </p>
          </div>
        </button>
      </Card>
      {/* Desktop mockup overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden aspect-[16/10] items-center justify-center p-4 transition-transform duration-700 ease-in-out group-hover:-translate-y-6 group-hover:scale-[1.06] sm:flex">
        <Mockup />
      </div>

      {/* ── Mobile: horizontal card (mockup + text side by side, alternating) ── */}
      <Card className="relative flex h-full w-full overflow-hidden rounded-2xl sm:hidden">
        <button
          type="button"
          onClick={onClick}
          aria-label={`Voir les offres ${title}`}
          className={`flex h-full w-full cursor-pointer items-center gap-0 text-left ${isEven ? "flex-row" : "flex-row-reverse"}`}
        >
          <div className="flex flex-1 flex-col gap-1.5 p-5">
            <h3 className="font-heading text-xl font-bold leading-tight tracking-tight text-foreground">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/60">
              {services.join(" · ")}
            </p>
          </div>
          <div
            className={`relative flex w-[45%] shrink-0 items-center justify-center self-stretch ${isEven ? "rounded-r-2xl" : "rounded-l-2xl"}`}
            style={{
              background: `linear-gradient(135deg, ${accent.from}18 0%, ${accent.to}18 100%)`,
            }}
          >
            <div
              className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full opacity-45 blur-2xl"
              style={{ background: accent.from }}
            />
            <div
              className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full opacity-35 blur-2xl"
              style={{ background: accent.to }}
            />
            <div className="relative z-10 w-full max-w-[140px] p-3">
              <Mockup />
            </div>
          </div>
        </button>
      </Card>

      {/* Arrow */}
      <span
        className="pointer-events-none absolute right-3 top-3 z-30 flex size-7 items-center justify-center rounded-full bg-background-surface/85 text-foreground/70 backdrop-blur-sm"
        aria-hidden
      >
        <ArrowUpRight
          className="size-3.5 transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2.25}
        />
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Mini-mockups — colored, simple, distinct per pillar
   ────────────────────────────────────────────── */

function WebsiteMini() {
  return (
    <div className="relative aspect-[16/10] w-full max-w-[220px] overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
      {/* Browser chrome */}
      <div className="flex items-center gap-1 bg-slate-100 px-2 py-1.5">
        <span className="size-1.5 rounded-full bg-red-400" />
        <span className="size-1.5 rounded-full bg-yellow-400" />
        <span className="size-1.5 rounded-full bg-green-400" />
        <div className="ml-2 h-2 flex-1 rounded-full bg-slate-200" />
      </div>
      {/* Hero with gradient bg */}
      <div className="relative flex flex-col gap-1.5 bg-gradient-to-br from-blue-500 to-cyan-400 px-3 py-3">
        <div className="h-1.5 w-3/4 rounded-full bg-white/90" />
        <div className="h-1.5 w-1/2 rounded-full bg-white/70" />
        <div className="mt-1 h-3 w-14 rounded-md bg-white/95" />
      </div>
      {/* Content blocks */}
      <div className="flex gap-1.5 px-3 py-2 pb-3">
        <div className="h-6 flex-1 rounded bg-slate-100" />
        <div className="h-6 flex-1 rounded bg-slate-100" />
      </div>
    </div>
  );
}

function SaasMini() {
  return (
    <div className="relative flex aspect-[16/10] w-full max-w-[220px] overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
      {/* Sidebar */}
      <div className="flex w-9 flex-col gap-1.5 bg-slate-900 px-1.5 py-2">
        <div className="h-1.5 rounded-full bg-violet-400" />
        <div className="h-1.5 rounded-full bg-white/30" />
        <div className="h-1.5 rounded-full bg-white/30" />
        <div className="h-1.5 rounded-full bg-white/30" />
      </div>
      {/* Main */}
      <div className="flex flex-1 flex-col gap-1.5 p-2">
        {/* Top stats */}
        <div className="flex gap-1">
          <div className="flex-1 rounded bg-violet-100 px-1 py-1">
            <div className="h-1 w-3/4 rounded bg-violet-400" />
            <div className="mt-0.5 h-1.5 w-1/2 rounded bg-violet-600" />
          </div>
          <div className="flex-1 rounded bg-pink-100 px-1 py-1">
            <div className="h-1 w-3/4 rounded bg-pink-400" />
            <div className="mt-0.5 h-1.5 w-1/2 rounded bg-pink-600" />
          </div>
        </div>
        {/* Chart */}
        <div className="flex flex-1 items-end justify-around gap-0.5 rounded bg-slate-50 p-1">
          {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-sm"
              style={{
                height: `${h}%`,
                background: `linear-gradient(180deg, #8B5CF6 0%, #EC4899 100%)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function YoutubeMini() {
  return (
    <div className="relative aspect-[16/10] w-full max-w-[220px] overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
      {/* Video thumbnail */}
      <div className="relative aspect-video w-full bg-gradient-to-br from-slate-900 via-slate-800 to-red-900">
        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(239,68,68,0.3),transparent_50%)]" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-9 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-600/40">
            <Play className="size-4 fill-white text-white" />
          </div>
        </div>
        {/* Duration badge */}
        <span className="absolute bottom-1.5 right-1.5 flex h-3 w-9 items-center justify-center rounded-sm bg-black/80">
          <span className="h-0.5 w-5 rounded-full bg-white" />
        </span>
        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20">
          <div className="h-full w-1/3 bg-red-600" />
        </div>
      </div>
      {/* Title bar */}
      <div className="flex flex-col gap-1 px-2 py-2">
        <div className="h-1.5 w-full rounded-full bg-slate-300" />
        <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function OrgChartMini() {
  const ceoColor = "#F97316";
  const childColor = "#EAB308";
  return (
    <div className="relative flex aspect-[16/10] w-full max-w-[220px] flex-col items-center justify-center gap-1.5 rounded-lg bg-white p-2 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
      {/* CEO node */}
      <div
        className="relative z-10 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 shadow-md"
        style={{ background: `linear-gradient(135deg, ${ceoColor} 0%, #EA580C 100%)` }}
      >
        <span className="flex size-3 items-center justify-center rounded-full bg-white/30">
          <span className="size-1.5 rounded-full bg-white" />
        </span>
        <span className="h-1 w-10 rounded-full bg-white" />
      </div>
      {/* Connector lines — 2 children on mobile, 3 on desktop */}
      <svg
        viewBox="0 0 200 32"
        className="hidden h-6 w-full sm:block"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M100 0 L100 12 M30 32 L30 20 L170 20 L170 32 M100 12 L100 20"
          stroke={ceoColor}
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
      </svg>
      <svg
        viewBox="0 0 200 32"
        className="h-6 w-full sm:hidden"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M100 0 L100 12 M50 32 L50 20 L150 20 L150 32 M100 12 L100 20"
          stroke={ceoColor}
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
      </svg>
      {/* Children — 2 on mobile, 3 on desktop */}
      <div className="hidden w-full justify-between gap-1.5 sm:flex">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-1 items-center justify-center gap-0.5 rounded-md px-1 py-1.5 shadow-sm"
            style={{ background: `linear-gradient(135deg, ${childColor} 0%, #CA8A04 100%)` }}
          >
            <span className="size-1.5 rounded-full bg-white/80" />
            <span className="h-1 w-6 rounded-full bg-white/90" />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-3 sm:hidden">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex flex-1 items-center justify-center gap-0.5 rounded-md px-1 py-1.5 shadow-sm"
            style={{ background: `linear-gradient(135deg, ${childColor} 0%, #CA8A04 100%)` }}
          >
            <span className="size-1.5 rounded-full bg-white/80" />
            <span className="h-1 w-6 rounded-full bg-white/90" />
          </div>
        ))}
      </div>
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

        {/* Mockup viewport — hidden on mobile to save space */}
        <div className="mockup-viewport relative hidden aspect-[16/11] w-full shrink-0 overflow-hidden rounded-xl border border-foreground/[0.08] bg-white transition-all duration-700 ease-in-out group-hover:border-foreground/20 group-hover:shadow-[0_0_50px_rgba(228,85,18,0.08)] group-hover:scale-[1.02] dark:bg-background-surface md:block">
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
            <span className="group/cta relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-lg px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-500 ease-in-out group-hover:opacity-90">
              <LowPolyCoralBg />
              <span className="relative">Découvrir</span>
              <ArrowUpRight className="relative h-3.5 w-3.5 transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
