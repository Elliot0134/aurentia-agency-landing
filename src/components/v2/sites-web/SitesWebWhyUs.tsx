// src/components/v2/sites-web/SitesWebWhyUs.tsx
import type { LucideIcon } from "lucide-react";
import { Rocket, Sparkles, Search, Smartphone, Code2, Headphones } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

type WhyItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const DEFAULT_ITEMS: WhyItem[] = [
  {
    icon: Rocket,
    title: "Livré en jours, pas en mois",
    description:
      "Grâce à l'IA, on livre 3× plus vite qu'une agence classique. Un site vitrine en 72h, une landing page en moins d'une semaine — sans rogner sur le design ni sur le code.",
  },
  {
    icon: Sparkles,
    title: "100% sur-mesure, zéro template",
    description:
      "On ne recycle pas de template acheté sur ThemeForest. Chaque design est pensé pour votre marque et votre audience — vous ne ressemblerez à personne d'autre.",
  },
  {
    icon: Search,
    title: "SEO technique inclus",
    description:
      "Sitemap, metas, structured data, Core Web Vitals au vert. Vous partez déjà en pole position pour être trouvé sur Google — pas besoin de repasser derrière.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first, vraiment",
    description:
      "70% de votre trafic vient du mobile. On conçoit d'abord pour le téléphone, puis on adapte — pas l'inverse. Le résultat : des pages qui convertissent partout.",
  },
  {
    icon: Code2,
    title: "Propriétaire de votre code",
    description:
      "Votre site, votre code source, votre domaine, votre hébergement. Aucun lock-in. Vous pouvez partir quand vous voulez, avec n'importe quel dev.",
  },
  {
    icon: Headphones,
    title: "Support inclus 30 jours",
    description:
      "Après la livraison, on reste joignables sur WhatsApp pour les petits ajustements. Pas de ticket qui traîne, pas de facturation surprise.",
  },
];

export function SitesWebWhyUs({
  items = DEFAULT_ITEMS,
  title = "Pourquoi nous confier votre site",
  subtitle = "Ce qui nous différencie des autres agences web. Pas des promesses — des engagements concrets.",
}: {
  items?: WhyItem[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <SectionContainer
      id="why"
      title={title}
      subtitle={subtitle}
      className="py-32 md:py-40"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <BlurReveal key={item.title} delay={idx * 0.08}>
              <div className="group flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] p-7 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-sm">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-base text-foreground/65 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
