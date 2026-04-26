// src/components/v2/ressources/sections/SectionStack.tsx
import { ExternalLink } from "lucide-react";
import { stackCategories } from "@/data/v2/vibe-coding";

export function SectionStack() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stackCategories.map((cat, i) => {
        const Icon = cat.icon;
        return (
          <div
            key={cat.title}
            className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-all duration-500 ease-in-out hover:border-accent-primary/30 hover:bg-foreground/[0.04] md:p-7"
          >
            {/* Decorative gradient corner */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-accent-primary/[0.06] blur-2xl transition-opacity duration-500 ease-in-out group-hover:bg-accent-primary/[0.12]"
              aria-hidden
            />

            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary/15">
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                </div>
                <h3 className="font-heading text-lg text-foreground md:text-xl">
                  {cat.title}
                </h3>
              </div>
              <span className="font-mono text-sm text-foreground/30">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="relative flex flex-wrap gap-2">
              {cat.items.map((item) =>
                item.url ? (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/chip inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:border-accent-primary/50 hover:text-accent-primary"
                  >
                    {item.name}
                    <ExternalLink
                      className="size-3 opacity-40 transition-all duration-500 ease-in-out group-hover/chip:opacity-100"
                      aria-hidden
                    />
                  </a>
                ) : (
                  <span
                    key={item.name}
                    className="inline-flex items-center rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/80"
                  >
                    {item.name}
                  </span>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
