import Link from "next/link";

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
  { label: "Formation", href: "/formation" },
  { label: "Apport d'affaires", href: "/apport-affaires" },
  { label: "Blog", href: "/blog" },
];

const footerLegal = [
  { label: "CGV", href: "/cgv" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background pt-24 pb-12 section-divider-orange">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight text-foreground mb-6 block">
              Aurentia <span className="text-orange-gradient">Agency</span>
            </Link>
            <p className="text-foreground-muted text-sm mb-6 max-w-xs">
              On crée des expériences digitales uniques — propulsées par l&apos;IA et 20 ans d&apos;expertise web.
            </p>
            <div className="flex flex-col gap-2 text-sm font-medium">
              <a href="mailto:contact@aurentia.agency" className="text-foreground hover:text-accent-primary transition-colors duration-500">
                contact@aurentia.agency
              </a>
              <a href="tel:+33123456789" className="text-foreground hover:text-accent-primary transition-colors duration-500">
                +33 1 23 45 67 89
              </a>
            </div>
            {/* Social links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com/company/aurentia-agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-500"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/aurentia.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-500"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground-muted">
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
            <h4 className="font-semibold text-foreground mb-6">L&apos;agence</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground-muted">
              {footerAgence.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors duration-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Légal</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground-muted">
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

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground-muted">
            &copy; {currentYear} Aurentia Agency. Tous droits réservés.
          </p>
          <p className="text-sm text-foreground-muted font-mono tracking-wider">
            DU POTENTIEL À LA LUMIÈRE
          </p>
        </div>
      </div>
    </footer>
  );
}
