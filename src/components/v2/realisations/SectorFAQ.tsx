import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

type Props = {
  faq?: { question: string; answer: string }[];
};

export function SectorFAQ({ faq }: Props) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="w-full px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 font-heading text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
            Questions fréquentes
          </h2>
          <FAQAccordion items={faq} />
        </div>
      </div>
    </section>
  );
}
