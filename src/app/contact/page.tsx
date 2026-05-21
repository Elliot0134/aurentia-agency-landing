// src/app/contact/page.tsx
import type { ReactElement } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { ContactSplitForm } from "@/components/v2/contact/ContactSplitForm";
import { HomeBookingEmbed } from "@/components/v2/home/HomeBookingEmbed";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { localBusiness, breadcrumb } from "@/lib/seo/schema";
import { pageMeta } from "@/lib/seo/metadata";
import { WhatsAppIcon, WHATSAPP_HREF } from "@/components/shared/icons/WhatsAppIcon";

export const metadata = pageMeta({
  title: "Contact — Discutons de votre projet",
  description:
    "Discutons de votre projet web, SaaS ou IA. Réponse sous 24h, directement avec l'équipe technique d'Aurentia Agency à Avignon.",
  path: "/contact",
});

type CoordIcon = (props: { className?: string }) => ReactElement;

const COORDONNEES: {
  icon: CoordIcon;
  label: string;
  value: string;
  href?: string;
}[] = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "07 81 95 80 90",
    href: WHATSAPP_HREF,
  },
  {
    icon: ({ className }) => <Mail className={className} strokeWidth={1.7} />,
    label: "E-mail",
    value: "contact@aurentia.agency",
    href: "mailto:contact@aurentia.agency",
  },
  {
    icon: ({ className }) => <MapPin className={className} strokeWidth={1.7} />,
    label: "Localisation",
    value: "Avignon · interventions partout en France",
  },
  {
    icon: ({ className }) => <Clock className={className} strokeWidth={1.7} />,
    label: "Disponibilités",
    value: "24h / 24, 7j / 7",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusiness()} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/" },
        { name: "Contact", url: "/contact" },
      ])} />
    <section
      id="hero"
      className="relative overflow-hidden lg:flex lg:min-h-screen lg:items-center"
    >
      {/* Halo orange discret en haut */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse 130% 100% at 50% 0%,
              color-mix(in srgb, var(--orange-500) 32%, transparent) 0%,
              color-mix(in srgb, var(--orange-500) 18%, transparent) 30%,
              color-mix(in srgb, var(--orange-500) 8%, transparent) 55%,
              transparent 100%
            )`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-6 pb-20 pt-28 md:px-10 md:pb-24 md:pt-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ─────────── LEFT: contenu ─────────── */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 bg-background px-3 py-1 text-sm uppercase tracking-[0.16em] text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange-500)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orange-500)]" />
                </span>
                Réponse sous 24h
              </span>

              <h1 className="!text-3xl !leading-[1.05] text-foreground sm:!text-4xl lg:!text-[2.75rem]">
                Parlons de votre projet.
              </h1>

              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Un site, un SaaS, une formation IA — ou juste une idée à
                challenger. Contactez-nous directement ou via le formulaire.
                Pas de SDR, pas de pitch — directement l&apos;équipe technique.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {COORDONNEES.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <span className="flex items-center gap-3.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-foreground/70 transition-colors duration-500 ease-in-out group-hover:bg-foreground/10 group-hover:text-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm uppercase tracking-[0.14em] text-foreground/55">
                        {label}
                      </span>
                      <span className="text-base font-semibold text-foreground">
                        {value}
                      </span>
                    </span>
                  </span>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <Link
                        href={href}
                        className="group block transition-colors duration-500 ease-in-out"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="group">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ─────────── RIGHT: formulaire ─────────── */}
          <div className="lg:col-span-7">
            <ContactSplitForm />
          </div>
        </div>
      </div>
    </section>
    <HomeBookingEmbed />
    </>
  );
}
