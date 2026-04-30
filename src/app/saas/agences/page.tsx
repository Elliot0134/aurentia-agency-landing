"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ClipboardList,
  Code2,
  EyeOff,
  Handshake,
  Lock,
  PenTool,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SubNavSetter } from "@/components/shared/SubNavContext";
import { HomeTeamV2 } from "@/components/v2/home/HomeTeamV2";
import { HomeBookingCTA } from "@/components/v2/home/HomeBookingCTA";
import { HomeBookingEmbed } from "@/components/v2/home/HomeBookingEmbed";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";

const subNavItems = [
  { label: "Le constat", sectionId: "problem" },
  { label: "Comment ça marche", sectionId: "how" },
  { label: "L'économie", sectionId: "economics" },
  { label: "Pour qui", sectionId: "for-who" },
  { label: "Engagements", sectionId: "engagements" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Équipe", sectionId: "equipe" },
  { label: "FAQ", sectionId: "faq" },
  { label: "RDV", sectionId: "rdv" },
];

const problems = [
  "Vos clients vous demandent des outils, dashboards, plateformes — mais vous codez pas.",
  "Vous refusez les projets tech (et le client part chez un concurrent).",
  "Vous voulez recruter 2 devs senior, mais c'est 140k€/an de charge fixe.",
  "Vous sous-traitez en offshore, et la qualité tue votre réputation.",
];

const solutions = [
  "Vous prenez les projets tech et facturez votre prix marché.",
  "On code en backstage, le client final ne voit que vous.",
  "Vous activez la capacité dev quand vous en avez besoin — zéro charge fixe.",
  "On code en France, qualité production, votre réputation est protégée.",
];

const steps = [
  {
    icon: Handshake,
    title: "Setup partenariat",
    duration: "Semaine 1",
    description:
      "On signe un NDA, on cale les SLAs, on s'aligne sur vos process commerciaux. Vous avez un interlocuteur dédié.",
  },
  {
    icon: ClipboardList,
    title: "Cadrage du projet",
    duration: "À chaque mission, 2-3 jours",
    description:
      "On rejoint votre call de cadrage avec votre client (en marque blanche), on chiffre en 48h, vous validez le devis client.",
  },
  {
    icon: Code2,
    title: "Build en backstage",
    duration: "Selon projet",
    description:
      "On dev en sprints courts, vous avez accès aux Preview deploys, vous communiquez les avancées à votre client comme si c'était votre équipe.",
  },
  {
    icon: Rocket,
    title: "Livraison & support",
    duration: "Jour J + 30 jours",
    description:
      "Le client final reçoit son outil au nom de votre agence. On reste 30 jours en support, toujours en backstage.",
  },
];

const economics = [
  {
    label: "Petit projet",
    sub: "Outil interne client, dashboard simple",
    youCharge: "12 000 €",
    weCharge: "5 000 €",
    margin: "7 000 €",
  },
  {
    label: "Projet moyen",
    sub: "Plateforme custom, MVP SaaS",
    youCharge: "30 000 €",
    weCharge: "10 000 €",
    margin: "20 000 €",
  },
  {
    label: "Gros projet",
    sub: "SaaS complet, refonte produit",
    youCharge: "60 000 €",
    weCharge: "20 000 €",
    margin: "40 000 €",
  },
];

const targetAgencies = [
  {
    icon: Briefcase,
    title: "Agences marketing & branding",
    description:
      "Vos clients vous demandent des dashboards reporting, portails clients, mini-outils marketing. Vous étendez votre offre sans recruter.",
  },
  {
    icon: Building2,
    title: "Cabinets de conseil",
    description:
      "Vous vendez des outils de diagnostic, calculateurs, plateformes RH ou finance à vos clients. On les code à votre nom.",
  },
  {
    icon: PenTool,
    title: "Studios design & UX",
    description:
      "Vous maquettez en Figma mais ne codez pas. On transforme vos designs en SaaS production-ready, livré sous votre marque.",
  },
  {
    icon: Users,
    title: "Agences digitales",
    description:
      "Vous gérez des sites WordPress / Webflow et avez des clients qui réclament une vraie app web. On prend le relais tech.",
  },
];

const engagements = [
  {
    icon: EyeOff,
    title: "Marque blanche stricte",
    description:
      "Aucune mention d'Aurentia dans le livrable. Pas de footer, pas de credit, pas de mention dans le code. Le client final ne sait pas qu'on existe.",
  },
  {
    icon: Lock,
    title: "NDA & confidentialité",
    description:
      "On signe un NDA dès le premier appel. Vos clients restent vos clients — on ne les contactera jamais en direct, jamais.",
  },
  {
    icon: ShieldCheck,
    title: "Code 100% à vous",
    description:
      "Le repo est sous votre nom (ou celui de votre client). Vous avez la propriété intellectuelle complète. Pas de vendor lock-in.",
  },
  {
    icon: Handshake,
    title: "Engagement long terme",
    description:
      "Si la relation se passe bien, on devient votre département tech officieux. Pricing dégressif au volume, créneaux prioritaires.",
  },
];

const faqs = [
  {
    q: "Mon client va savoir que vous êtes derrière ?",
    a: "Non. On signe un NDA, on n'apparaît pas dans le livrable, on ne communique jamais avec votre client. Pour lui, c'est votre équipe tech.",
  },
  {
    q: "Et si mon client veut une réunion technique ?",
    a: "Soit vous nous présentez comme votre 'lead tech externe' (cas classique en agence), soit on rejoint le call sous votre branding (email avec votre domaine, présentation neutre). Vous choisissez.",
  },
  {
    q: "Comment je facture mon client si je débute ?",
    a: "On vous aide à cadrer votre prix de vente. En général, vous facturez 2,5× à 5× notre prix selon la taille du projet. Le delta paye votre commercial, votre PM, votre marge.",
  },
  {
    q: "Et si vous arrêtez de bosser avec moi du jour au lendemain ?",
    a: "Le code est à vous, le repo est sous votre nom, la doc est à jour. N'importe quel dev peut reprendre le projet en quelques jours. Zéro lock-in.",
  },
  {
    q: "Vous prenez quels types de projets ?",
    a: "Tout sauf : sites vitrine WordPress (on fait pas), apps mobiles natives (on fait pas), projets à moins de 5 000 €. Tout le reste : MVP SaaS, dashboards, outils internes, plateformes B2B, intégrations IA.",
  },
  {
    q: "Combien de projets vous pouvez gérer en parallèle pour moi ?",
    a: "Selon notre charge, généralement 2-3 projets simultanés par agence partenaire. Pour des volumes plus élevés, on cale un retainer mensuel avec capacité dédiée.",
  },
  {
    q: "C'est quoi le délai de réponse sur un nouveau projet ?",
    a: "Devis chiffré en 48h après votre brief. Démarrage du dev sous 1 semaine. Pour les agences avec qui on a déjà bossé, c'est encore plus rapide.",
  },
];

export default function SaasAgencesPage() {
  return (
    <>
      <SubNavSetter items={subNavItems} />
      <ScrollToTop />

      {/* HERO */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Soft accent glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-accent-primary/[0.08] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
        />
        <div className="container relative mx-auto max-w-[1400px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            {/* LEFT */}
            <div className="flex flex-col gap-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/[0.08] px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.1em] text-accent-primary">
                <EyeOff className="size-3.5" strokeWidth={2} />
                Marque blanche · Pour les agences
              </span>

              <h1 className="font-heading text-4xl font-normal leading-[1.02] tracking-tight text-foreground md:text-5xl lg:text-7xl">
                <span className="block">Votre département</span>
                <span className="block">tech en{" "}
                  <span className="relative inline-block text-accent-primary">
                    marque blanche
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-1 h-2 -skew-x-6 rounded-full bg-accent-primary/15"
                    />
                  </span>
                  .
                </span>
                <span className="mt-1 block text-foreground/45">Sans charge fixe.</span>
              </h1>

              <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
                Vos clients vous demandent des SaaS, outils, plateformes — mais
                vous ne codez pas. On devient votre équipe tech invisible : on
                code en backstage sous votre marque, vous gardez 100% de la
                relation client et de la marge.
              </p>

              {/* Trust badges */}
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-foreground/70">
                <li className="inline-flex items-center gap-2">
                  <Check className="size-4 text-accent-primary" strokeWidth={2.5} />
                  NDA signé dès le premier appel
                </li>
                <li className="inline-flex items-center gap-2">
                  <Check className="size-4 text-accent-primary" strokeWidth={2.5} />
                  Code 100% à votre nom
                </li>
                <li className="inline-flex items-center gap-2">
                  <Check className="size-4 text-accent-primary" strokeWidth={2.5} />
                  Devis chiffré en 48h
                </li>
              </ul>

              <div className="mt-2 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-base font-medium text-background transition-all duration-500 ease-in-out hover:gap-3"
                >
                  Discuter d&apos;un partenariat
                  <ArrowRight
                    className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
                <Link
                  href="#economics"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-6 py-3.5 text-base font-medium text-foreground transition-colors duration-500 hover:border-foreground"
                >
                  Voir l&apos;économie du modèle
                </Link>
              </div>
            </div>

            {/* RIGHT: stacked whitelabel diagram */}
            <BlurReveal delay={0.2}>
              <div className="relative">
                {/* Outer glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-accent-primary/10 blur-3xl"
                />
                <div className="relative overflow-hidden rounded-[2rem] border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-8 md:p-10">
                  {/* Subtle scan line */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_bottom,transparent_0%,transparent_calc(100%_-_1px),rgba(255,255,255,0.04)_100%)] [background-size:100%_4px]"
                  />

                  {/* Client final */}
                  <div className="relative rounded-2xl border border-foreground/10 bg-background p-5 transition-colors duration-700 hover:border-foreground/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/55">
                        Client final
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-0.5 text-sm text-foreground/55">
                        🎯 cible
                      </span>
                    </div>
                    <p className="mt-2 font-heading text-lg font-bold text-foreground">
                      &quot;Vous nous livrez un super outil 👌&quot;
                    </p>
                  </div>

                  {/* Connector */}
                  <div className="my-2 flex flex-col items-center">
                    <span aria-hidden className="h-5 w-px bg-foreground/15" />
                    <ArrowRight className="size-4 rotate-90 text-foreground/40" strokeWidth={2} />
                    <span aria-hidden className="h-5 w-px bg-foreground/15" />
                  </div>

                  {/* Votre agence */}
                  <div className="relative rounded-2xl border border-accent-primary/40 bg-accent-primary/[0.08] p-5 shadow-[0_0_0_1px_rgba(0,0,0,0)] transition-all duration-700 hover:bg-accent-primary/[0.12]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold uppercase tracking-[0.1em] text-accent-primary">
                        Votre agence
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-primary/15 px-2.5 py-0.5 text-sm font-medium text-accent-primary">
                        ★ visible
                      </span>
                    </div>
                    <p className="mt-2 font-heading text-lg font-bold text-foreground">
                      Facture · gère le client · garde la marge
                    </p>
                  </div>

                  {/* Connector */}
                  <div className="my-2 flex flex-col items-center">
                    <span aria-hidden className="h-5 w-px bg-foreground/15" />
                    <ArrowRight className="size-4 rotate-90 text-foreground/40" strokeWidth={2} />
                    <span aria-hidden className="h-5 w-px bg-foreground/15" />
                  </div>

                  {/* Aurentia (hidden) */}
                  <div className="relative rounded-2xl border border-dashed border-foreground/25 bg-background/40 p-5 transition-colors duration-700 hover:border-foreground/40">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/45">
                        Aurentia · backstage
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.06] px-2.5 py-0.5 text-sm text-foreground/55">
                        <EyeOff className="size-3" strokeWidth={2} />
                        invisible
                      </span>
                    </div>
                    <p className="mt-2 font-heading text-lg font-bold text-foreground/65">
                      Code · livre · 0 contact direct
                    </p>
                  </div>
                </div>

                {/* Floating stat chip */}
                <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-accent-primary/30 bg-background-surface px-4 py-3 shadow-xl md:block">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="size-5 text-accent-primary" strokeWidth={2} />
                    <div className="flex flex-col">
                      <span className="font-heading text-base font-bold text-foreground">
                        +150 k€ CA
                      </span>
                      <span className="text-sm text-foreground/55">
                        en 90 j sans recruter
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <SectionContainer
        id="problem"
        eyebrow="Le constat"
        title="Vous refusez encore des projets tech."
        subtitle="Et chaque refus, c'est un client qui part voir un concurrent qui a une équipe dev."
        className="py-20 md:py-24"
        titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <BlurReveal>
            <div className="flex h-full flex-col gap-5 rounded-[2rem] border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-8 md:p-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-foreground/10 font-heading text-base font-bold text-foreground/55">
                  ✕
                </span>
                <h3 className="font-heading text-xl font-bold text-foreground/70 md:text-2xl">
                  Sans nous
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {problems.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-base text-foreground/65"
                  >
                    <X className="mt-0.5 size-4 shrink-0 text-foreground/40" strokeWidth={2.5} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurReveal>
          <BlurReveal delay={0.15}>
            <div className="flex h-full flex-col gap-5 rounded-[2rem] border border-accent-primary/30 bg-background-surface p-8 transition-colors duration-500 hover:border-accent-primary/60 md:p-10">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent-primary/15 font-heading text-base font-bold text-accent-primary">
                  ✓
                </span>
                <h3 className="font-heading text-xl font-bold text-accent-primary md:text-2xl">
                  Avec nous
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {solutions.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 text-base text-foreground/85"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" strokeWidth={2.5} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurReveal>
        </div>
      </SectionContainer>

      {/* Booking CTA — placée avant le process */}
      <HomeBookingCTA />

      {/* HOW IT WORKS */}
      <SectionContainer
        id="how"
        eyebrow="Le process"
        title="Comment ça marche concrètement."
        subtitle="Quatre étapes, du premier appel au livrable final. Vous gardez la main du début à la fin."
        className="py-20 md:py-24"
        titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <BlurReveal key={step.title} delay={idx * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-8 transition-all duration-500 hover:border-accent-primary/40 md:p-10">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-heading text-[8rem] font-bold leading-none text-foreground/[0.04] transition-colors duration-500 group-hover:text-accent-primary/[0.10] md:text-[10rem]"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex items-center gap-4">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 group-hover:bg-accent-primary group-hover:text-white">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/55">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="relative mt-6 font-heading text-2xl font-bold text-foreground md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 text-base text-foreground/65">
                    {step.description}
                  </p>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </SectionContainer>

      {/* ECONOMICS */}
      <SectionContainer
        id="economics"
        eyebrow="Les chiffres"
        title="L'économie du partenariat."
        subtitle="Vous facturez votre prix marché agence. On vous facture notre prix dev. Le delta, c'est votre marge."
        className="py-20 md:py-24"
        titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
        surface
      >
        <BlurReveal>
          <div className="overflow-hidden rounded-[2rem] border border-foreground/10 bg-background">
            {/* Header */}
            <div className="hidden grid-cols-[1.6fr_1fr_1fr_1fr] divide-x divide-foreground/10 border-b border-foreground/10 bg-background-surface md:grid">
              <div className="px-6 py-5">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/55">
                  Type de projet
                </span>
              </div>
              <div className="px-6 py-5 text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/55">
                  Vous facturez
                </span>
              </div>
              <div className="px-6 py-5 text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground/55">
                  On vous facture
                </span>
              </div>
              <div className="bg-accent-primary/[0.08] px-6 py-5 text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-accent-primary">
                  Votre marge
                </span>
              </div>
            </div>

            {/* Rows */}
            {economics.map((row, idx) => (
              <div
                key={row.label}
                className={`grid gap-2 border-b border-foreground/10 px-6 py-6 last:border-0 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-0 md:divide-x md:divide-foreground/10 md:px-0 md:py-0 ${
                  idx % 2 === 0 ? "md:bg-background-surface/40" : ""
                }`}
              >
                <div className="md:px-6 md:py-6">
                  <div className="font-heading text-lg font-bold text-foreground">
                    {row.label}
                  </div>
                  <div className="text-sm text-foreground/55">{row.sub}</div>
                </div>
                <div className="flex items-center justify-between text-base md:justify-center md:px-6 md:py-6">
                  <span className="text-foreground/55 md:hidden">Vous facturez</span>
                  <span className="font-heading text-xl font-bold text-foreground">
                    {row.youCharge}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base md:justify-center md:px-6 md:py-6">
                  <span className="text-foreground/55 md:hidden">On vous facture</span>
                  <span className="font-heading text-xl font-bold text-foreground/70">
                    {row.weCharge}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-accent-primary/[0.06] -mx-6 px-6 md:mx-0 md:justify-center md:py-6">
                  <span className="text-accent-primary md:hidden">Votre marge</span>
                  <span className="font-heading text-xl font-bold text-accent-primary md:text-2xl">
                    {row.margin}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-foreground/55">
            Tarifs indicatifs. Le prix exact dépend du périmètre et de la
            complexité — chiffrage précis en 48h.
          </p>
        </BlurReveal>
      </SectionContainer>

      {/* FOR WHO */}
      <SectionContainer
        id="for-who"
        eyebrow="Pour qui"
        title="Les agences avec qui ça marche le mieux."
        className="py-20 md:py-24"
        titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {targetAgencies.map((agency, idx) => {
            const Icon = agency.icon;
            return (
              <BlurReveal key={agency.title} delay={idx * 0.08}>
                <div className="group flex h-full flex-col gap-4 rounded-2xl border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-8 transition-colors duration-500 hover:shadow-sm dark:hover:border-foreground/25 md:p-10">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 group-hover:bg-accent-primary group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                    {agency.title}
                  </h3>
                  <p className="text-base text-foreground/65">{agency.description}</p>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </SectionContainer>

      {/* ENGAGEMENTS */}
      <SectionContainer
        id="engagements"
        eyebrow="Nos engagements"
        title="Ce qu'on garantit dès le premier jour."
        subtitle="Le whitelabel ne marche que si la confiance est totale. Voici les 4 engagements non négociables."
        className="py-20 md:py-24"
        titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {engagements.map((eng, idx) => {
            const Icon = eng.icon;
            return (
              <BlurReveal key={eng.title} delay={idx * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-8 md:p-10">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {eng.title}
                  </h3>
                  <p className="text-base text-foreground/65">{eng.description}</p>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </SectionContainer>

      <HomeRealisationsPreview filterTags={["SaaS"]} title="Des SaaS livrés en marque blanche" subtitle="Quelques projets — vos clients, notre code, votre nom." />

      {/* TEAM (réutilise le composant home) */}
      <HomeTeamV2 />

      {/* FAQ — container surface, comme la home */}
      <SectionContainer
        id="faq"
        title="Vos questions, nos réponses"
        surface
        innerClassName="max-w-3xl"
      >
        <FAQAccordion items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      </SectionContainer>

      {/* Booking embed final */}
      <HomeBookingEmbed />
    </>
  );
}
