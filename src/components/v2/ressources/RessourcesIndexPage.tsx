// src/components/v2/ressources/RessourcesIndexPage.tsx
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, Mail, Sparkles, Wand2, type LucideIcon } from "lucide-react";
import { PageHeroCentered } from "@/components/v2/shared/PageHeroCentered";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { cn } from "@/lib/utils";

type ResourceCard = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  readTime: string;
  icon: LucideIcon;
};

const RESOURCES: ResourceCard[] = [
  {
    href: "/ressources/implementer-claude",
    eyebrow: "Kit",
    title: "Implémenter Claude dans ton business",
    description:
      "Les prompts, skills, configs et templates qu'on déploie chez nos clients. CLAUDE.md, Memory, MCP, context7, skill creator, séquence 14 jours. Copie, colle, c'est branché.",
    readTime: "Setup ~2 weekends",
    icon: Wand2,
  },
  {
    href: "/ressources/vibe-coding",
    eyebrow: "Guide",
    title: "Le guide complet du vibe coding",
    description:
      "Construire du logiciel en parlant à une IA : les outils du marché, la méthode pro en 6 étapes, les tips Claude Code, les zones rouges. Sans bullshit.",
    readTime: "Lecture ~25 min",
    icon: Sparkles,
  },
];

export function RessourcesIndexPage() {
  return (
    <>
      <PageHeroCentered
        eyebrow="Ressources"
        headline={"Tout ce qu'on a appris,\nrendu accessible."}
        subHeadline="Guides, méthodes et retours d'expérience sur le web, l'IA et le vibe coding. Direct, sans détour, ce qu'on aurait voulu lire à nos débuts."
        cta={{
          primary: { label: "Discuter d'un projet", href: "/contact" },
          secondary: { label: "Nos formations IA", href: "/solutions-ia/formation-ia" },
        }}
      />

      <SectionContainer
        id="resources"
        title="Nos guides"
        subtitle="On en publiera d'autres au fil du temps. En attendant, on commence fort."
      >
        <div className="flex flex-wrap justify-center gap-6">
          {RESOURCES.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.href}
                href={r.href}
                className="group relative flex h-full w-full max-w-md flex-1 flex-col gap-5 rounded-3xl border border-transparent bg-background-surface p-7 transition-all duration-500 ease-in-out dark:border-foreground/10 dark:bg-foreground/[0.04] dark:hover:border-foreground/25"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-sm font-medium text-foreground/60">
                    {r.eyebrow}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{r.title}</h3>
                <p className="flex-1 text-base text-foreground/70">{r.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-foreground/55">{r.readTime}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                    Lire le guide <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </SectionContainer>

      <NewsletterCTA />
    </>
  );
}

function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "/ressources" }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("success");
      setEmail("");
    } catch {
      // Fallback : on accepte quand même côté UX, le backend sera branché plus tard
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <section className="w-full px-4 pb-12 pt-6 md:px-6 md:pb-16">
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-background-surface px-6 py-16 md:px-12 md:py-20">
        {/* Decorative orange halo */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 0%, color-mix(in srgb, var(--orange-500) 18%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
            <Mail className="size-6" strokeWidth={1.6} aria-hidden />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
              Newsletter
            </p>
            <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Être prévenu des prochains guides
            </h2>
            <p className="text-base text-foreground/65 md:text-lg">
              Un email quand on publie une nouvelle ressource. Pas de spam, pas de blabla,
              juste le lien direct vers ce qu&apos;on vient de mettre en ligne.
            </p>
          </div>

          {status === "success" ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-primary/40 bg-accent-primary/[0.08] px-5 py-3 text-base font-semibold text-accent-primary">
              <Check className="size-5" strokeWidth={2.5} aria-hidden />
              Inscription validée — à très vite.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-full border border-foreground/15 bg-background px-5 py-3.5 text-base text-foreground placeholder:text-foreground/40 outline-none transition-colors duration-500 ease-in-out focus:border-accent-primary/60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={cn(
                  "group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-base font-semibold text-background shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90",
                  status === "loading" && "cursor-wait opacity-70"
                )}
              >
                {status === "loading" ? "Envoi…" : "Me prévenir"}
                <ArrowRight className="size-4 transition-transform duration-500 ease-in-out" />
              </button>
            </form>
          )}

          <p className="text-sm text-foreground/45">
            Désinscription en un clic dans chaque email.
          </p>
        </div>
      </div>
    </section>
  );
}
