// src/components/v2/home/HomeLogoStrip.tsx
import { homeData } from "@/data/v2/home";

export function HomeLogoStrip() {
  const { logoStrip } = homeData;
  return (
    <section className="border-b border-foreground/10 bg-background-surface">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-12 md:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">
          {logoStrip.label}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logoStrip.logos.map((logo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              className="h-8 w-auto opacity-65 grayscale transition-opacity duration-500 ease-in-out hover:opacity-100 hover:grayscale-0 md:h-10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
