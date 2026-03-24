"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";

// ---------------------------------------------------------------------------
// Inline SVG icons (card headers)
// ---------------------------------------------------------------------------

const CodeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
  </svg>
);

const TagIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const LayersIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
  </svg>
);

const HeadsetIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 16.98h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2z" />
    <path d="M6 16.98H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2z" />
    <path d="M3 11.98v-1a9 9 0 0 1 18 0v1" />
    <path d="M21 17.98v.02a3 3 0 0 1-3 3h-3" />
  </svg>
);

// ---------------------------------------------------------------------------
// Brand logos (image-based, with colored glow)
// ---------------------------------------------------------------------------

const TECH_LOGOS = [
  { src: "/images/icons/supaabse-icon.webp", alt: "Supabase", glow: "#3ECF8E" },
  { src: "/images/icons/claude-icon.webp", alt: "Claude Code", glow: "#D4A574" },
  { src: "/images/icons/github-icon.webp", alt: "GitHub", glow: "#8B949E" },
  { src: "/images/icons/vercel-icon.webp", alt: "Vercel", glow: "#888888" },
  { src: "/images/icons/canva-icon.webp", alt: "Canva", glow: "#00C4CC" },
  { src: "/images/icons/illustrator-icon.webp", alt: "Illustrator", glow: "#FF9A00" },
  { src: "/images/icons/n8n-icon.webp", alt: "N8N", glow: "#EA4B71" },
  { src: "/images/icons/google-drive-icon.webp", alt: "Google Drive", glow: "#4285F4" },
];

function BrandLogoImg({ src, alt, glow }: { src: string; alt: string; glow: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="w-12 h-12 object-contain transition-transform duration-500 ease-in-out hover:scale-110"
      style={{ filter: `drop-shadow(0 4px 8px ${glow}40)` }}
      title={alt}
    />
  );
}

// WhatsApp icon for card header
const WhatsAppIcon = () => (
  <Image
    src="/images/icons/whatsapp-icon.webp"
    alt="WhatsApp"
    width={48}
    height={48}
    className="w-12 h-12 object-contain"
    style={{ filter: "drop-shadow(0 4px 8px #25D36640)" }}
  />
);

// Placeholder — marquee is rendered directly in the card
const TechLogosIcon = () => null;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Advantage {
  icon: React.FC;
  title: string;
  description: string;
  extra?: React.FC;
  iconStyle?: "default" | "whatsapp" | "logos";
}

const ADVANTAGES: Advantage[] = [
  {
    icon: CodeIcon,
    title: "Propriétaire de votre code",
    description:
      "Votre projet, votre code source. Aucune dépendance, aucun lock-in. Vous pouvez le faire évoluer avec n'importe quel développeur.",
  },
  {
    icon: WhatsAppIcon,
    title: "Support sur WhatsApp",
    description:
      "Une question ? Un bug ? Écrivez-nous directement sur WhatsApp. Réponse en moins de 2h, pas de ticket sans réponse.",
    iconStyle: "whatsapp",
  },
  {
    icon: SparklesIcon,
    title: "Propulsé par l'IA",
    description:
      "On utilise l'intelligence artificielle à chaque étape. Résultat : des livraisons 3× plus rapides sans compromis sur la qualité.",
  },
  {
    icon: TagIcon,
    title: "Prix transparent",
    description:
      "Un devis clair dès le départ. Pas d'abonnement mensuel caché, pas de frais surprise. Un prix, un projet livré.",
  },
  {
    icon: TechLogosIcon,
    title: "Technologies modernes",
    description:
      "Next.js, React, TypeScript, Supabase. Des technos performantes, maintenables et scalables. Pas de WordPress, pas de no-code.",
    iconStyle: "logos",
  },
  {
    icon: HeadsetIcon,
    title: "30 jours de support inclus",
    description:
      "On ne disparaît pas après le lancement. Ajustements, corrections, questions — on reste à vos côtés pendant 30 jours.",
  },
];

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Tech logos marquee — uses CSS mask to fade icons in/out from edges
// ---------------------------------------------------------------------------

function TechLogosMarquee() {
  return (
    <div
      className="relative py-4"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 35%, black 65%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 35%, black 65%, transparent)",
        overflowX: "clip",
        overflowY: "visible",
      }}
    >
      <div className="flex w-max animate-marquee gap-8" style={{ animationDuration: "18s" }}>
        {[...TECH_LOGOS, ...TECH_LOGOS].map((logo, i) => (
          <BrandLogoImg key={`${logo.alt}-${i}`} {...logo} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function AdvantageCard({ icon: Icon, title, description, extra: Extra, iconStyle }: Advantage) {
  if (iconStyle === "logos") {
    return (
      <SpotlightCard className="h-full !overflow-visible">
        <div className="relative z-10 flex flex-col gap-4 p-8">
          {/* Logos marquee */}
          <TechLogosMarquee />

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground leading-snug">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-foreground-muted">
            {description}
          </p>
        </div>
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard className="h-full">
      <div className="relative z-10 flex flex-col gap-4 p-8">
        {/* Icon */}
        {iconStyle === "whatsapp" ? (
          <Icon />
        ) : (
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-primary/10 text-accent-primary">
            <Icon />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-foreground-muted">
          {description}
        </p>

        {/* Extra content (logos, badges) */}
        {Extra && <Extra />}
      </div>
    </SpotlightCard>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function HomeAdvantages() {
  return (
    <Section theme="dark-alt-2" className="section-divider-orange py-32">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.03] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <TextReveal
            text="Pourquoi Aurentia."
            elementType="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight justify-center mb-6"
          />
          <BlurReveal>
            <p className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              Ce qui nous différencie des autres agences. Pas des promesses — des engagements concrets.
            </p>
          </BlurReveal>
        </div>

        {/* Grid */}
        <BlurReveal stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map((advantage) => (
              <AdvantageCard key={advantage.title} {...advantage} />
            ))}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
