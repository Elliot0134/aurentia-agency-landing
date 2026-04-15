// src/components/v2/layout/FooterV2.tsx
import Link from "next/link";
import { footerConfig } from "@/data/v2/footer";

export function FooterV2() {
  return (
    <footer className="mt-32 border-t border-foreground/10 bg-background-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="font-heading text-2xl font-bold text-foreground">
              {footerConfig.logo.label}
            </span>
            <p className="max-w-xs text-base text-foreground/65">
              {footerConfig.logo.tagline}
            </p>
            <div className="mt-2 flex items-center gap-3">
              {footerConfig.socials.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="rounded-full border border-foreground/15 p-2.5 text-foreground/70 transition-all duration-500 ease-in-out hover:border-foreground/30 hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {footerConfig.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-base text-foreground/75 transition-colors duration-500 ease-in-out hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-foreground/10 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-foreground/55">{footerConfig.legalLine}</p>
          <p className="text-sm text-foreground/55">
            Construit avec amour à Paris ✦ {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
