// src/components/v2/shared/TestimonialCard.tsx
import type { Testimonial } from "@/data/v2/types";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-5 rounded-2xl border border-foreground/10 bg-background-surface p-7 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <Quote className="size-6 text-accent-primary opacity-70" />
      <p className="flex-1 text-base leading-relaxed text-foreground/85">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="flex items-center gap-3">
        {testimonial.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.avatarUrl}
            alt={testimonial.author}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <div className="size-11 rounded-full bg-foreground/10" aria-hidden />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{testimonial.author}</span>
          <span className="text-sm text-foreground/55">
            {testimonial.role}{testimonial.company ? ` — ${testimonial.company}` : ""}
          </span>
        </div>
      </footer>
    </article>
  );
}
