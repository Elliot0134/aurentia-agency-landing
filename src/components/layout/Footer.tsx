import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/content";

const footerServices = [
  { label: "Sites Vitrines", href: "/sites-vitrines" },
  { label: "Conciergeries", href: "/conciergeries" },
  { label: "SaaS & Logiciels", href: "/saas" },
  { label: "Landing Pages", href: "/landing-pages" },
  { label: "Identité Visuelle", href: "/identite-visuelle" },
];

const footerAgence = [
  { label: "À propos", href: "/a-propos" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Formation", href: "/formation", badge: "À VENIR" },
  { label: "Apport d'affaires", href: "/apport-affaires", badge: "À VENIR" },
  { label: "Blog", href: "/blog", badge: "À VENIR" },
];

const footerLegal = [
  { label: "CGV", href: "/cgv" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Top — Logo + tagline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo-dark.webp"
                alt="Aurentia Agency"
                width={180}
                height={40}
                className="h-10 w-auto block dark:hidden"
              />
              <Image
                src="/images/logo-light.webp"
                alt="Aurentia Agency"
                width={180}
                height={40}
                className="h-10 w-auto hidden dark:block"
              />
            </Link>
            <p className="text-foreground/50 text-sm max-w-md">
              On crée des expériences digitales uniques — propulsées par l&apos;IA et 20 ans d&apos;expertise web.
            </p>
          </div>
          <p className="text-sm text-foreground/30 font-mono tracking-widest uppercase">
            Du potentiel à la lumière
          </p>
        </div>

        {/* Middle — Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground/60">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-foreground transition-colors duration-500"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+33${siteConfig.phone.replace(/\s+/g, "").slice(1)}`}
                  className="hover:text-foreground transition-colors duration-500"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-500"
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-500"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground/60">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors duration-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agence */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">L&apos;agence</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground/60">
              {footerAgence.map((item) => (
                <li key={item.label}>
                  {item.badge ? (
                    <span className="flex items-center gap-2 text-foreground/30 cursor-not-allowed">
                      {item.label}
                      <span className="px-1.5 py-0.5 text-[11px] font-bold leading-none rounded-full bg-foreground/10 text-foreground/30 uppercase tracking-wide">
                        {item.badge}
                      </span>
                    </span>
                  ) : (
                    <Link href={item.href} className="hover:text-foreground transition-colors duration-500">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-semibold text-foreground mb-6 text-sm uppercase tracking-wider">Légal</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground/60">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors duration-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/40">
            &copy; {currentYear} Aurentia Agency. Tous droits réservés.
          </p>
          <p className="text-sm text-foreground/40">
            Fait avec passion à Bordeaux
          </p>
        </div>
      </div>
    </footer>
  );
}
