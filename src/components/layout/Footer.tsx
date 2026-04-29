import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight text-foreground mb-6 block">
              Aurentia <span className="text-accent-primary">Agency</span>
            </Link>
            <p className="text-foreground-muted text-sm mb-6 max-w-xs">
              On crée des expériences digitales uniques — propulsées par l'IA et 20 ans d'expertise web.
            </p>
            <div className="flex flex-col gap-2 text-sm font-medium">
              <a href="mailto:contact@aurentia.agency" className="text-foreground hover:text-accent-primary transition-colors">
                contact@aurentia.agency
              </a>
              <a href="tel:+33123456789" className="text-foreground hover:text-accent-primary transition-colors">
                +33 1 23 45 67 89
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground-muted">
              <li><Link href="/#services" className="hover:text-foreground transition-colors">Sites vitrines</Link></li>
              <li><Link href="/#services" className="hover:text-foreground transition-colors">Applications SaaS</Link></li>
              <li><Link href="/#services" className="hover:text-foreground transition-colors">Landing Pages</Link></li>
            </ul>
          </div>

          {/* Niches */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Expertises</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground-muted">
              <li><Link href="/conciergeries" className="hover:text-foreground transition-colors">Conciergeries Airbnb</Link></li>
              <li><span className="opacity-50 cursor-not-allowed">Restaurants (Bientôt)</span></li>
              <li><span className="opacity-50 cursor-not-allowed">Salles de sport (Bientôt)</span></li>
              <li><span className="opacity-50 cursor-not-allowed">SaaS (Bientôt)</span></li>
            </ul>
          </div>

          {/* Legals & Socials */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Réseaux</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground-muted mb-8">
              <li>
                <a href="https://linkedin.com/company/aurentia-agency" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com/aurentia.agency" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mb-6">Légal</h4>
            <ul className="flex flex-col gap-4 text-sm text-foreground-muted">
              <li><Link href="/mentions-legales" className="hover:text-foreground transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgv" className="hover:text-foreground transition-colors">CGV</Link></li>
              <li><Link href="/confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link></li>
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
