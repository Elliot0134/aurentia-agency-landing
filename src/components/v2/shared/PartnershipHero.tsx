// src/components/v2/shared/PartnershipHero.tsx
//
// Hero "partenariat" réutilisable — pour les ressources / interventions
// produites conjointement avec un partenaire (incubateur, accélérateur,
// école, club d'entrepreneurs, etc.).
//
// Layout : 2 colonnes (lg+) — texte à gauche, visuel co-brandé à droite.
//   Gauche  : contextLabel · headline · subheadline · CTAs (alignés left)
//   Droite  : carte "image de la ressource" avec lockup Aurentia × Partner
//             sur dégradé orange (le branding partenariat est porté par
//             le visuel, pas par du texte qui ferait doublon).
//
// Sur mobile/tablet, on revient à un stack vertical : visuel d'abord
// (immédiatement reconnaissable), puis le texte en-dessous.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DualCTA } from "@/data/v2/types";
import { LowPolyCoralBg } from "./LowPolyCoralBg";

export type PartnershipHeroPartner = {
  /** Nom complet du partenaire (alt fallback + accessibilité) */
  name: string;
  /** Petit label au-dessus du headline, ex. "Intervention exclusive · Mai 2026" */
  contextLabel?: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Si fourni, le logo partenaire devient cliquable vers son site */
  href?: string;
};

type PartnershipHeroProps = {
  partner: PartnershipHeroPartner;
  headline: string;
  subHeadline: string;
  cta: DualCTA;
};

const LOGO_LINK_CLASS =
  "inline-flex items-center transition-opacity duration-500 ease-in-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange-500)] focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-md";

function AurentiaLogo({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/images/logo-aurentia-light.svg"
        alt="Aurentia Agency"
        width={220}
        height={40}
        priority
        className={`${className} dark:hidden`}
      />
      <Image
        src="/images/logo-aurentia-dark.svg"
        alt="Aurentia Agency"
        width={220}
        height={40}
        priority
        className={`hidden ${className} dark:block`}
      />
    </>
  );
}

export function PartnershipHero({
  partner,
  headline,
  subHeadline,
  cta,
}: PartnershipHeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Halo orange */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[500px]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse 130% 100% at 50% 0%,
              color-mix(in srgb, var(--orange-500) 45%, transparent) 0%,
              color-mix(in srgb, var(--orange-500) 36%, transparent) 12%,
              color-mix(in srgb, var(--orange-500) 26%, transparent) 25%,
              color-mix(in srgb, var(--orange-500) 18%, transparent) 38%,
              color-mix(in srgb, var(--orange-500) 11%, transparent) 52%,
              color-mix(in srgb, var(--orange-500) 6%, transparent) 66%,
              color-mix(in srgb, var(--orange-500) 2%, transparent) 82%,
              transparent 100%
            )`,
          }}
        />
      </div>

      <div className="relative z-10 pt-20 md:pt-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-12 md:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            {/* Visuel co-brandé — order-1 sur mobile (rendu d'abord), order-2 sur desktop (à droite) */}
            <div className="order-1 lg:order-2">
              <CoBrandedCard partner={partner} />
            </div>

            {/* Bloc texte — order-2 sur mobile, order-1 sur desktop (à gauche) */}
            <div className="order-2 flex flex-col items-start gap-6 text-left lg:order-1 lg:gap-7">
              {partner.contextLabel && (
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {partner.contextLabel}
                </p>
              )}

              <h1 className="whitespace-pre-line text-foreground">{headline}</h1>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {subHeadline}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={cta.primary.href}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
                >
                  <LowPolyCoralBg />
                  <span className="relative">{cta.primary.label}</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-500 ease-in-out" />
                </Link>
                <Link
                  href={cta.secondary.href}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40"
                >
                  {cta.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoBrandedCard({ partner }: { partner: PartnershipHeroPartner }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-foreground/10 bg-background-surface shadow-sm">
      {/* Gradient orange en fond */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 90% 110% at 50% 50%,
            color-mix(in srgb, var(--orange-500) 28%, transparent) 0%,
            color-mix(in srgb, var(--orange-500) 18%, transparent) 28%,
            color-mix(in srgb, var(--orange-500) 10%, transparent) 50%,
            color-mix(in srgb, var(--orange-500) 4%, transparent) 72%,
            transparent 100%
          )`,
        }}
        aria-hidden
      />
      {/* Grille fine décorative */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      {/* Lockup co-brandé centré */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <Link href="/" aria-label="Aurentia — aller à l'accueil" className={LOGO_LINK_CLASS}>
            <AurentiaLogo className="block h-9 w-auto md:h-12" />
          </Link>

          <span
            aria-hidden
            className="text-2xl font-light text-foreground/30 md:text-4xl"
          >
            ×
          </span>

          {partner.href ? (
            <Link
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.name} — ouvrir le site`}
              className={LOGO_LINK_CLASS}
            >
              <Image
                src={partner.logo.src}
                alt={partner.logo.alt || partner.name}
                width={partner.logo.width}
                height={partner.logo.height}
                priority
                className="h-20 w-auto md:h-28"
              />
            </Link>
          ) : (
            <Image
              src={partner.logo.src}
              alt={partner.logo.alt || partner.name}
              width={partner.logo.width}
              height={partner.logo.height}
              priority
              className="h-20 w-auto md:h-28"
            />
          )}
        </div>
      </div>
    </div>
  );
}
