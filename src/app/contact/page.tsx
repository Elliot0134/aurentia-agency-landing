// src/app/contact/page.tsx
import type { Metadata } from "next";
import type { ReactElement } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { ContactSplitForm } from "@/components/v2/contact/ContactSplitForm";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.473-8.413z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discutons de votre projet. Réponse sous 24h, directement avec l'équipe technique.",
};

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
    href: "https://wa.me/33781958090",
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
    value: "Lun – Ven · 9h – 19h",
  },
];

export default function ContactPage() {
  return (
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
  );
}
