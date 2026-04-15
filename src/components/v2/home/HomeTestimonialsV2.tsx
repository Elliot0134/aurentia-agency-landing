// src/components/v2/home/HomeTestimonialsV2.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { TestimonialCard } from "@/components/v2/shared/TestimonialCard";

export function HomeTestimonialsV2() {
  return (
    <SectionContainer
      eyebrow="Témoignages"
      title="Ce qu'ils en disent"
      className="bg-background-surface"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {homeData.testimonials.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>
    </SectionContainer>
  );
}
