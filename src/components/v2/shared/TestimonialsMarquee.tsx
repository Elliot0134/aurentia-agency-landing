// src/components/v2/shared/TestimonialsMarquee.tsx
"use client";

import type { Testimonial } from "@/data/v2/types";
import { SectionContainer } from "./SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

type TestimonialsMarqueeProps = {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
};

/* ──────────────────────────────────────────────
   Testimonial card — visual twin of HomeTestimonialsV2
   ────────────────────────────────────────────── */

const AVATAR_GRADIENTS = [
  "from-violet-500 via-purple-500 to-indigo-600",
  "from-sky-500 via-blue-500 to-cyan-600",
  "from-emerald-500 via-teal-500 to-green-600",
  "from-amber-500 via-orange-500 to-yellow-600",
  "from-rose-500 via-pink-500 to-fuchsia-600",
];

function pickGradient(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

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

function MarqueeCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, author, role, company, avatarUrl, stat } = testimonial;
  const gradient = pickGradient(author);
  const initials = getInitials(author);

  return (
    <div className="relative z-10 flex h-full flex-col gap-6 p-8 rounded-3xl border border-transparent dark:border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] transition-colors duration-500 ease-in-out">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <StarRating />
        {stat && (
          <span className="inline-flex items-center px-3 py-1 rounded-full font-mono text-sm font-semibold tracking-wide bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
            {stat}
          </span>
        )}
      </div>

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

      <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
        {avatarUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatarUrl}
            alt={author}
            className="h-12 w-12 flex-shrink-0 rounded-full object-cover shadow-lg"
          />
        ) : (
          <div
            className={cn(
              "relative w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg",
              gradient
            )}
            aria-hidden="true"
          >
            <span className="text-white font-bold text-base select-none">{initials}</span>
          </div>
        )}
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="font-semibold text-base text-foreground leading-tight truncate">
            {author}
          </span>
          <span className="text-sm text-foreground/55 leading-tight truncate">
            {role}{company ? ` — ${company}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsMarquee({
  testimonials,
  title = "Ce que nos clients disent",
  subtitle,
  id = "testimonials",
  className,
}: TestimonialsMarqueeProps) {
  if (testimonials.length === 0) return null;

  // Duplicate for seamless loop — keep at least 4 cards in the track
  const items = testimonials.length < 4
    ? [...testimonials, ...testimonials, ...testimonials, ...testimonials]
    : [...testimonials, ...testimonials];

  return (
    <SectionContainer
      id={id}
      title={title}
      subtitle={subtitle}
      surface
      className={className}
      innerClassName="!max-w-none"
    >
      <BlurReveal>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 md:w-40 bg-gradient-to-r from-background-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 md:w-40 bg-gradient-to-l from-background-surface to-transparent" />

          <div className="flex w-max animate-marquee gap-6 py-2">
            {items.map((t, i) => (
              <div
                key={`${t.author}-${i}`}
                className="w-[340px] md:w-[420px] flex-shrink-0"
              >
                <MarqueeCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
