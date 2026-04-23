import Image from "next/image";
import type { ProjectTestimonial } from "@/data/realisations/schemas";

type Props = {
  testimonial?: ProjectTestimonial;
};

export function CaseStudyTestimonial({ testimonial }: Props) {
  if (!testimonial) return null;

  return (
    <section id="temoignage" className="flex flex-col gap-8 scroll-mt-28">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Témoignage
        </p>
      </header>
      <figure className="flex flex-col gap-8 rounded-[2rem] bg-background-surface p-8 md:p-12">
        <blockquote className="font-heading text-2xl leading-snug text-foreground md:text-3xl">
          « {testimonial.quote} »
        </blockquote>
        <figcaption className="flex items-center gap-4">
          {testimonial.avatar && (
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-foreground/10">
              <Image
                src={testimonial.avatar}
                alt={testimonial.author}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {testimonial.author}
            </span>
            <span className="text-sm text-foreground/60">{testimonial.role}</span>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
