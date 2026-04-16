// src/components/v2/shared/TestimonialCard.tsx
import type { Testimonial } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

// Deterministic gradient picker based on author name, so the same person
// always renders with the same avatar colors across rerenders.
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
  const idx = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[idx];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
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
          className="h-4 w-4 text-amber-400"
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

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { quote, author, role, company, avatarUrl, stat } = testimonial;
  const gradient = pickGradient(author);
  const initials = getInitials(author);

  return (
    <article
      className={cn(
        "relative z-10 flex h-full flex-col gap-6 rounded-3xl border border-transparent dark:border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] p-8 transition-colors duration-500 ease-in-out dark:hover:border-foreground/25",
        className
      )}
    >
      {/* Top row: stars + optional stat badge */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <StarRating />
        {stat && (
          <span className="inline-flex items-center rounded-full border border-accent-primary/20 bg-accent-primary/10 px-3 py-1 font-mono text-sm font-semibold tracking-wide text-accent-primary">
            {stat}
          </span>
        )}
      </div>

      {/* Quote */}
      <blockquote className="relative flex-1">
        <span
          className="pointer-events-none absolute -left-1 -top-2 select-none font-heading text-5xl leading-none text-accent-primary/25"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="relative z-10 pl-4 text-base italic leading-relaxed text-foreground/80 md:text-lg">
          {quote}
        </p>
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-4 border-t border-foreground/10 pt-4">
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
              "relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg",
              gradient
            )}
            aria-hidden="true"
          >
            <span className="select-none text-base font-bold text-white">{initials}</span>
          </div>
        )}
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-base font-semibold leading-tight text-foreground">
            {author}
          </span>
          <span className="truncate text-sm leading-tight text-foreground/55">
            {role}
            {company ? ` — ${company}` : ""}
          </span>
        </div>
      </footer>
    </article>
  );
}
