"use client";

import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { Card } from "@/components/v2/shared/Card";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  stat: string;
  avatarGradient: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophie Martin",
    role: "CEO",
    company: "La Belle Époque",
    quote:
      "Aurentia a transformé notre présence en ligne. Le site est magnifique et nos réservations ont littéralement explosé depuis le lancement.",
    stat: "Trafic ×3",
    avatarGradient: "from-violet-500 via-purple-500 to-indigo-600",
    initials: "SM",
  },
  {
    name: "Thomas Durand",
    role: "Fondateur",
    company: "Savistas",
    quote:
      "Du concept au lancement en 72h. L'équipe est incroyablement réactive et le résultat dépasse largement nos attentes initiales.",
    stat: "Livré en 72h",
    avatarGradient: "from-sky-500 via-blue-500 to-cyan-600",
    initials: "TD",
  },
  {
    name: "Marie Lefèvre",
    role: "CMO",
    company: "DataFlow",
    quote:
      "Notre landing page convertit 4× mieux qu'avant. Le design et l'UX sont au niveau des plus grandes startups de la tech.",
    stat: "+340% conversions",
    avatarGradient: "from-emerald-500 via-teal-500 to-green-600",
    initials: "ML",
  },
  {
    name: "Lucas Bernard",
    role: "CTO",
    company: "GreenTech",
    quote:
      "Architecture solide, code propre, déploiement sans accroc. Exactement ce qu'on attendait d'une équipe vraiment senior.",
    stat: "0 bug en prod",
    avatarGradient: "from-amber-500 via-orange-500 to-yellow-600",
    initials: "LB",
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-1" aria-label="5 étoiles sur 5" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-amber-400"
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
  );
}

function StatBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full font-mono text-sm font-semibold tracking-wide bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
      {label}
    </span>
  );
}

function Avatar({ gradient, initials }: { gradient: string; initials: string }) {
  return (
    <div
      className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
      aria-hidden="true"
    >
      <span className="text-white font-bold text-base select-none">{initials}</span>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, role, company, quote, stat, avatarGradient, initials } = testimonial;
  return (
    <Card className="relative z-10 flex flex-col gap-6 p-8 h-full">
      {/* Top row: stars + stat badge */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <StarRating />
        <StatBadge label={stat} />
      </div>

      {/* Quote */}
      <blockquote className="relative flex-1">
        <span
          className="absolute -top-2 -left-1 text-5xl leading-none text-accent-primary/25 font-heading select-none pointer-events-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="relative z-10 italic text-base md:text-lg leading-relaxed text-foreground/80 pl-4">
          {quote}
        </p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
        <Avatar gradient={avatarGradient} initials={initials} />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="font-semibold text-base text-foreground leading-tight truncate">
            {name}
          </span>
          <span className="text-sm text-foreground/55 leading-tight truncate">
            {role} — {company}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function HomeTestimonialsV2() {
  return (
    <SectionContainer
      id="testimonials"
      title="Ce que nos clients disent"
      subtitle="Des résultats concrets. Des livraisons rapides. Des partenaires qui reviennent."
      className="bg-background-surface"
      innerClassName="!max-w-none"
    >
      {/* Marquee — break out of container */}
      <BlurReveal>
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 md:w-40 bg-gradient-to-r from-background-surface to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 md:w-40 bg-gradient-to-l from-background-surface to-transparent" />

          <div className="flex w-max animate-marquee gap-6 py-2">
            {/* Double the items for seamless loop */}
            {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, i) => (
              <div
                key={`${testimonial.name}-${i}`}
                className="w-[340px] md:w-[420px] flex-shrink-0"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
