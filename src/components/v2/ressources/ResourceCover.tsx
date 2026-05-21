// src/components/v2/ressources/ResourceCover.tsx
//
// Cover image générique pour les ressources style article-blog.
//   - Si on passe une `image`, on l'affiche en object-cover (16:9).
//   - Sinon, on render un placeholder visuel : dégradé orange + lockup
//     "Aurentia × Partner" (ou Aurentia seul si pas de partenaire).
//
// Réutilisable pour toutes les ressources : avec ou sans partenariat.

import Image from "next/image";

export type ResourceCoverPartner = {
  name: string;
  logo: { src: string; alt: string; width: number; height: number };
};

type ResourceCoverProps = {
  /** Si fourni, on render cette image au lieu du placeholder. */
  image?: { src: string; alt: string };
  /** Pour le placeholder co-brandé. Si absent, on n'affiche que Aurentia. */
  partner?: ResourceCoverPartner;
  /** Petit label optionnel (ex. "Ressource exclusive · Mai 2026"). */
  label?: string;
};

export function ResourceCover({ image, partner, label }: ResourceCoverProps) {
  if (image) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/60 bg-background-surface shadow-sm">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 1024px, 100vw"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-background-surface shadow-sm">
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

      {/* Lockup centré */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center md:gap-6">
        {label && (
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {label}
          </p>
        )}

        <div className="flex items-center justify-center gap-6 md:gap-10">
          <Image
            src="/images/logo-aurentia-light.svg"
            alt="Aurentia Agency"
            width={220}
            height={40}
            className="h-9 w-auto dark:hidden md:h-12"
          />
          <Image
            src="/images/logo-aurentia-dark.svg"
            alt="Aurentia Agency"
            width={220}
            height={40}
            className="hidden h-9 w-auto dark:block md:h-12"
          />

          {partner && (
            <>
              <span
                aria-hidden
                className="text-2xl font-light text-foreground/30 md:text-4xl"
              >
                ×
              </span>
              <Image
                src={partner.logo.src}
                alt={partner.logo.alt || partner.name}
                width={partner.logo.width}
                height={partner.logo.height}
                className="h-14 w-auto md:h-20"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
