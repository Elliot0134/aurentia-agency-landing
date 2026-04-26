// src/components/v2/ressources/sections/claude/SectionCTAFinalClaude.tsx
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { finalCtas } from "@/data/v2/implementer-claude";
import { cardClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

export function SectionCTAFinalClaude() {
  return (
    <section className="w-full px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Aller plus loin
          </p>
          <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Trois pistes pour pousser l&apos;implémentation
          </h2>
          <p className="max-w-xl text-base text-foreground/65 md:text-lg">
            Tu veux qu&apos;on déploie le kit chez toi, qu&apos;on forme ton équipe, ou tu veux creuser la doc
            officielle ? Choisis ton angle.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {finalCtas.map((c) => {
            const Icon = c.icon;
            const Wrapper = c.external ? "a" : Link;
            const props = c.external
              ? { href: c.cta.href, target: "_blank", rel: "noopener noreferrer" as const }
              : { href: c.cta.href };
            return (
              <Wrapper
                key={c.title}
                {...(props as { href: string })}
                className={cn(
                  cardClasses,
                  "group flex flex-col gap-5 p-7 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:border-accent-primary/40 md:p-8"
                )}
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                </div>
                <h3 className="font-heading text-xl text-foreground md:text-2xl">{c.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-foreground/65 md:text-base">
                  {c.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all duration-500 ease-in-out group-hover:gap-3 group-hover:text-accent-primary">
                  {c.cta.label}
                  {c.external ? (
                    <ExternalLink className="size-4" aria-hidden />
                  ) : (
                    <ArrowRight className="size-4" aria-hidden />
                  )}
                </span>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
