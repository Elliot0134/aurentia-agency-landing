// src/app/v2/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MessageSquare,
  Phone,
  Mail,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";
import { HomeContactV2 } from "@/components/v2/home/HomeContactV2";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SubNavSetter } from "@/components/shared/SubNavContext";
import { homeData } from "@/data/v2/home";
import type { FAQItem } from "@/data/v2/types";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discutons de votre projet. Réponse en moins de 24h, directement avec l'équipe technique.",
};

const subNavItems = [
  { label: "Projet", sectionId: "hero" },
  { label: "Comment ça marche", sectionId: "expect" },
  { label: "Contact", sectionId: "contact" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Témoignages", sectionId: "testimonials" },
];

// ──────────────────────────────────────────────
// Value cards — "What happens after you send"
// ──────────────────────────────────────────────
const EXPECTATIONS: {
  icon: typeof Clock;
  step: string;
  title: string;
  description: string;
}[] = [
  {
    icon: Clock,
    step: "01",
    title: "Réponse sous 24h",
    description:
      "On lit chaque message et on revient vers vous sous 24h ouvrées — pas de chatbot, pas de SDR. Directement avec l'équipe qui livrera votre projet.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Un appel de 30 minutes",
    description:
      "On cale un créneau qui vous arrange. Vous nous expliquez votre besoin, on pose les bonnes questions et on vous partage notre vision du projet.",
  },
  {
    icon: ShieldCheck,
    step: "03",
    title: "Un devis clair sous 72h",
    description:
      "Périmètre détaillé, deadline ferme, prix transparent. Pas de mensualité cachée, pas de surprise. Vous savez exactement ce que vous payez et ce que vous obtenez.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Livraison en jours, pas en mois",
    description:
      "Sites vitrines en 72h à 5 jours, MVP SaaS en 1 à 2 semaines. On ne traîne pas : grâce à l'IA, on livre 5× plus vite à qualité égale.",
  },
];

// ──────────────────────────────────────────────
// FAQ — contact-specific
// ──────────────────────────────────────────────
const CONTACT_FAQ: FAQItem[] = [
  {
    question: "Sous combien de temps recevrai-je une réponse ?",
    answer:
      "On répond à tous les messages sous 24h ouvrées. Si vous nous écrivez un weekend, vous aurez notre retour le lundi matin au plus tard. Pour les urgences, précisez-le dans le message — on priorise.",
  },
  {
    question: "Avec qui est-ce que je vais échanger ?",
    answer:
      "Directement avec l'équipe technique : Elliot, Matthieu ou Fabien selon le type de projet. Pas de commercial, pas de chef de projet intermédiaire. La personne qui répond est celle qui travaillera sur votre projet.",
  },
  {
    question: "Faut-il préparer quelque chose pour le premier échange ?",
    answer:
      "Non. Venez comme vous êtes. Un besoin flou, une idée, un cahier des charges — tout nous intéresse. Si vous avez déjà des documents (wireframes, specs, maquettes), c'est un plus mais ce n'est jamais requis.",
  },
  {
    question: "Est-ce que le premier appel est gratuit ?",
    answer:
      "Oui, toujours. Le premier appel de cadrage est gratuit et sans engagement. On vous donne un retour honnête — y compris si on pense que votre projet n'est pas fait pour nous, on vous oriente vers la bonne personne.",
  },
  {
    question: "Quelle taille de projet vous intéresse ?",
    answer:
      "On travaille aussi bien avec des indépendants qu'avec des groupes de 200 personnes. Nos projets vont de 1 200 € (site vitrine) à 80 000 € (SaaS complet avec IA). Si votre budget est en dessous, on peut vous orienter vers des solutions adaptées.",
  },
  {
    question: "Je ne suis pas à Avignon, on peut quand même travailler ensemble ?",
    answer:
      "Évidemment. On travaille avec des clients partout en France et en Europe. 95% de nos échanges se font en visio et sur WhatsApp. Si vous préférez nous rencontrer, vous êtes les bienvenus à Avignon.",
  },
  {
    question: "Vous signez un NDA avant qu'on vous partage notre projet ?",
    answer:
      "Sans problème. On signe des NDA régulièrement — envoyez-nous le vôtre ou utilisez le nôtre. Par défaut, tout ce que vous nous partagez reste confidentiel, NDA ou pas.",
  },
];

// ──────────────────────────────────────────────
// Direct contact methods (hero CTAs)
// ──────────────────────────────────────────────
const DIRECT_CHANNELS: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
}[] = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@aurentia.ai",
    href: "mailto:contact@aurentia.ai",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "Réponse en moins de 2h",
    href: "https://wa.me/33000000000",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "Sur rendez-vous",
    href: "#contact",
  },
];

export default function ContactV2Page() {
  return (
    <>
      <SubNavSetter items={subNavItems} />

      {/* ══════════════════════════════════════════════
           HERO — contact-specific, orange halo matching homepage
           ══════════════════════════════════════════════ */}
      <section id="hero" className="relative overflow-hidden border-b border-foreground/10">
        {/* Halo décoratif — même style que le homepage */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[500px]"
          aria-hidden
        >
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
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 py-12 text-center md:px-12 md:py-20">
            {/* Pill — status */}
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange-500)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orange-500)]" />
              </span>
              Contact · Réponse sous 24h
            </span>

            <h1 className="max-w-4xl text-foreground">
              Parlons de votre projet.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Un site, un SaaS, une formation IA — ou juste une idée à challenger.
              On répond à tout, directement avec l&apos;équipe technique.
              Pas de SDR, pas de pitch.
            </p>

            {/* Direct channels — pills */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              {DIRECT_CHANNELS.map((channel) => {
                const Icon = channel.icon;
                return (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-4 py-2 text-sm text-muted-foreground transition-all duration-500 ease-in-out hover:border-foreground/40 hover:text-foreground"
                  >
                    <Icon
                      className="size-4 text-foreground/60 transition-colors duration-500 ease-in-out group-hover:text-[var(--orange-500)]"
                      strokeWidth={1.8}
                    />
                    <span className="font-semibold text-foreground/80">
                      {channel.label}
                    </span>
                    <span className="hidden sm:inline">—</span>
                    <span className="hidden sm:inline">{channel.value}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
              >
                Remplir le formulaire
                <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-in-out" />
              </Link>
              <Link
                href="#expect"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40"
              >
                Comment ça marche
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           EXPECTATIONS — "What happens after you send"
           ══════════════════════════════════════════════ */}
      <SectionContainer
        id="expect"
        eyebrow="Ce qui vous attend"
        title="De votre message à la livraison, ce qui se passe"
        subtitle="Un parcours clair, sans zone grise. Vous savez à chaque étape où en est votre projet et ce qu'il vous reste à faire."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXPECTATIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <BlurReveal key={item.step} delay={idx * 0.1}>
                <div className="relative flex h-full flex-col gap-5 rounded-3xl border border-transparent bg-background-surface p-8 transition-colors duration-500 ease-in-out dark:border-foreground/10 dark:bg-foreground/[0.04] dark:hover:border-foreground/25">
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                      <Icon className="size-6" strokeWidth={1.5} />
                    </div>
                    <span className="select-none font-mono text-4xl font-black text-accent-primary/15">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/65">
                    {item.description}
                  </p>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </SectionContainer>

      {/* ══════════════════════════════════════════════
           CONTACT FORM — reuse HomeContactV2 (id="contact" already set)
           ══════════════════════════════════════════════ */}
      <HomeContactV2 />

      {/* ══════════════════════════════════════════════
           FAQ — contact-specific questions
           ══════════════════════════════════════════════ */}
      <SectionContainer
        id="faq"
        title="Vos questions avant de nous écrire"
        subtitle="Tout ce qu'on nous demande souvent avant de se lancer. Si votre question n'y est pas, écrivez-la dans le formulaire."
        className="bg-background-surface"
        innerClassName="max-w-3xl"
      >
        <FAQAccordion items={CONTACT_FAQ} />
      </SectionContainer>

      {/* ══════════════════════════════════════════════
           TESTIMONIALS — reuse home marquee pattern (small version)
           Note: data comes from home.ts but we render a light inline marquee
                 to avoid importing a section that sets its own id.
           ══════════════════════════════════════════════ */}
      <SectionContainer
        id="testimonials"
        title="Des clients qui ont sauté le pas"
        subtitle="Ils nous ont écrit, on leur a répondu. Voilà ce qu'ils en disent quelques semaines plus tard."
        innerClassName="!max-w-none"
      >
        <BlurReveal>
          <div className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-background to-transparent md:w-40"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-background to-transparent md:w-40"
              aria-hidden
            />
            <div className="flex w-max animate-marquee gap-6 py-2">
              {[...homeData.testimonials, ...homeData.testimonials].map((t, i) => (
                <div
                  key={`${t.author}-${i}`}
                  className="w-[340px] flex-shrink-0 md:w-[420px]"
                >
                  <article className="relative z-10 flex h-full flex-col gap-6 rounded-3xl border border-foreground/10 bg-background p-8">
                    {t.stat && (
                      <div className="flex items-center justify-between gap-4">
                        <div
                          className="flex items-center gap-1"
                          aria-label="5 étoiles sur 5"
                          role="img"
                        >
                          {Array.from({ length: 5 }).map((_, starIdx) => (
                            <svg
                              key={starIdx}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4 text-amber-400"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.543 2.826c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.007z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="inline-flex items-center rounded-full border border-accent-primary/20 bg-accent-primary/10 px-3 py-1 font-mono text-sm font-semibold tracking-wide text-accent-primary">
                          {t.stat}
                        </span>
                      </div>
                    )}
                    <blockquote className="relative flex-1">
                      <span
                        className="pointer-events-none absolute -left-1 -top-2 select-none font-heading text-5xl leading-none text-accent-primary/25"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>
                      <p className="relative z-10 pl-4 text-base italic leading-relaxed text-foreground/80 md:text-lg">
                        {t.quote}
                      </p>
                    </blockquote>
                    <div className="flex items-center gap-4 border-t border-foreground/10 pt-4">
                      <div
                        className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary via-orange-500 to-amber-500 shadow-lg"
                        aria-hidden="true"
                      >
                        <Users className="size-5 text-white" strokeWidth={2} />
                      </div>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="truncate text-base font-semibold leading-tight text-foreground">
                          {t.author}
                        </span>
                        <span className="truncate text-sm leading-tight text-foreground/55">
                          {t.role} — {t.company}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </BlurReveal>
      </SectionContainer>
    </>
  );
}
