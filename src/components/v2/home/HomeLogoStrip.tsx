// src/components/v2/home/HomeLogoStrip.tsx
const CLIENT_LOGOS = [
  "Comparateur IA Facile",
  "French Tech",
  "AlloRestau",
  "Friend'iz",
  "HiLove",
  "Maison Enileh",
  "Golf Mentor",
];

export function HomeLogoStrip() {
  return (
    <section id="trust" className="relative py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <p className="mb-5 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Ils nous font confiance
        </p>
        <div className="relative overflow-hidden">
          {/* Left fade mask */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background/85 to-transparent md:w-32"
            aria-hidden
          />
          {/* Right fade mask */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background/85 to-transparent md:w-32"
            aria-hidden
          />

          {/* Marquee track — duplicated 2x for seamless loop (scroll-x translates -50%) */}
          <div className="marquee-track flex gap-x-16">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 text-sm font-medium uppercase tracking-[0.14em] text-foreground/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
