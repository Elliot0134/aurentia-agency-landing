// src/components/v2/formation-ia/FormationHeroV2.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";
import { BlurReveal } from "@/components/animations/BlurReveal";

const SOLUTION_TAGS = [
  { label: "Audit IA", href: "/solutions-ia/audit" },
  { label: "Configuration Claude", href: "/solutions-ia/configuration-claude" },
  { label: "Implémentation IA", href: "/solutions-ia/implementation-ia" },
];

const FLOATING_SKILLS = [
  { label: "Reformulation propale", category: "Sales", delay: "0s" },
  { label: "Audit RGPD", category: "Juridique", delay: "1.5s" },
  { label: "Hiring scorecard", category: "RH", delay: "3s" },
  { label: "SEO content brief", category: "Marketing", delay: "4.5s" },
  { label: "Pricing strategy", category: "Produit", delay: "6s" },
];

export function FormationHeroV2() {
  const { hero } = solutionsIaFormationData;

  return (
    <section className="relative overflow-hidden">
      {/* Top halo — same as sister pages */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[600px]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse 130% 100% at 50% 0%,
              color-mix(in srgb, var(--orange-500) 45%, transparent) 0%,
              color-mix(in srgb, var(--orange-500) 32%, transparent) 14%,
              color-mix(in srgb, var(--orange-500) 22%, transparent) 28%,
              color-mix(in srgb, var(--orange-500) 14%, transparent) 42%,
              color-mix(in srgb, var(--orange-500) 8%, transparent) 58%,
              color-mix(in srgb, var(--orange-500) 3%, transparent) 75%,
              transparent 100%
            )`,
          }}
        />
      </div>

      <div className="relative z-10 pt-20 md:pt-24">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-6 py-12 md:px-12 md:py-20 lg:grid-cols-[1.05fr,1fr] lg:items-center lg:gap-16">
          {/* Left — copy */}
          <div className="flex flex-col items-start gap-6 text-left">
            <BlurReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange-500)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orange-500)]" />
                </span>
                {hero.badge}
              </span>
            </BlurReveal>

            <BlurReveal delay={0.05}>
              <h1 className="whitespace-pre-line text-foreground">
                {hero.headline}
              </h1>
            </BlurReveal>

            <BlurReveal delay={0.1}>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {hero.subHeadline}
              </p>
            </BlurReveal>

            <BlurReveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-2">
                {SOLUTION_TAGS.map((tag) => (
                  <Link
                    key={tag.href}
                    href={tag.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3 py-1 text-sm text-muted-foreground transition-all duration-500 ease-in-out hover:border-foreground/40 hover:text-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/50 transition-colors duration-500 ease-in-out group-hover:bg-[var(--orange-500)]" />
                    {tag.label}
                  </Link>
                ))}
              </div>
            </BlurReveal>

            <BlurReveal delay={0.2}>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                {hero.badges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <li
                      key={badge.label}
                      className="flex items-center gap-2 text-sm text-foreground/70"
                    >
                      <Icon className="size-4 text-accent-primary" aria-hidden />
                      <span>{badge.label}</span>
                    </li>
                  );
                })}
              </ul>
            </BlurReveal>

            <BlurReveal delay={0.25}>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={hero.cta.primary.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
                >
                  {hero.cta.primary.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-in-out" />
                </Link>
                <Link
                  href={hero.cta.secondary.href}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40"
                >
                  {hero.cta.secondary.label}
                </Link>
              </div>
            </BlurReveal>
          </div>

          {/* Right — interactive Claude mock */}
          <BlurReveal delay={0.3}>
            <div className="relative">
              {/* Floating skill cards */}
              {FLOATING_SKILLS.map((skill, i) => (
                <div
                  key={skill.label}
                  className="absolute z-20 hidden md:block"
                  style={{
                    top: `${[6, 18, 38, 60, 78][i]}%`,
                    left: i % 2 === 0 ? "-8%" : "auto",
                    right: i % 2 === 1 ? "-8%" : "auto",
                    animation: `float-y 6s ease-in-out ${skill.delay} infinite`,
                  }}
                >
                  <div className="flex items-center gap-2 rounded-full border border-foreground/15 bg-background/90 px-3 py-1.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-md">
                    <Sparkles className="size-3.5 text-accent-primary" />
                    <span className="text-foreground/80">{skill.category}</span>
                    <span className="text-foreground/30">/</span>
                    <span>{skill.label}</span>
                  </div>
                </div>
              ))}

              {/* Claude window mock */}
              <div className="relative rounded-3xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.05] shadow-2xl overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="size-3 rounded-full bg-foreground/15" />
                    <span className="size-3 rounded-full bg-foreground/15" />
                    <span className="size-3 rounded-full bg-foreground/15" />
                  </div>
                  <div className="ml-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="size-3.5 text-accent-primary" />
                    <span>Claude · Skill « Reformulation propale »</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 md:p-6 space-y-4">
                  {/* User input */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-accent-primary/10 px-4 py-2.5 text-sm text-foreground">
                      <span className="font-mono text-sm text-accent-primary">/</span>
                      reformuler-propale brief-acme.md
                    </div>
                  </div>

                  {/* Claude response — typing effect */}
                  <div className="flex justify-start">
                    <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-foreground/10 bg-background dark:bg-foreground/[0.04] px-4 py-3 text-sm leading-relaxed text-foreground/85">
                      <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-accent-primary">
                        <Sparkles className="size-3.5" />
                        Skill activé
                      </div>
                      <p className="mb-2">
                        Brief lu. Je structure la propale avec votre template{" "}
                        <span className="rounded bg-accent-primary/10 px-1.5 py-0.5 font-mono text-sm text-accent-primary">
                          v2-services
                        </span>{" "}
                        et le ton{" "}
                        <span className="rounded bg-accent-primary/10 px-1.5 py-0.5 font-mono text-sm text-accent-primary">
                          direct
                        </span>{" "}
                        de votre brand voice guide.
                      </p>
                      <p className="text-foreground/65">
                        ✓ Contexte client extrait
                        <br />✓ Périmètre + livrables formulés
                        <br />✓ Planning + chiffrage alignés sur grille interne
                        <br />
                        <span className="inline-flex items-center gap-1 text-accent-primary">
                          <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent-primary" />
                          Rédaction en cours…
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Output preview tile */}
                  <div className="rounded-2xl border border-dashed border-foreground/15 bg-background/50 dark:bg-foreground/[0.02] p-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-mono text-foreground/55">propale-acme.md</span>
                      <span className="font-mono text-accent-primary">42s</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-3/4 rounded-full bg-foreground/10" />
                      <div className="h-2 w-full rounded-full bg-foreground/10" />
                      <div className="h-2 w-5/6 rounded-full bg-foreground/10" />
                      <div className="h-2 w-2/3 rounded-full bg-foreground/10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow under mock */}
              <div
                className="pointer-events-none absolute -inset-x-8 -bottom-8 h-32 -z-10 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 100% at 50% 50%, color-mix(in srgb, var(--orange-500) 40%, transparent) 0%, transparent 70%)",
                }}
                aria-hidden
              />
            </div>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
