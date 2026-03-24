"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { conciergeriesSocialProofContent } from "@/data/conciergeries-content";
import { ExternalLink, Quote } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ConciergerieSocialProof() {
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!mockupRef.current) return;

    // Subtle 3D tilt on hover via mousemove
    const mockup = mockupRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mockup.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(mockup, {
        rotateY: x * 5,
        rotateX: -y * 5,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(mockup, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    mockup.addEventListener("mousemove", handleMouseMove);
    mockup.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mockup.removeEventListener("mousemove", handleMouseMove);
      mockup.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  const { badge, title, client, ctaLabel, fallback } =
    conciergeriesSocialProofContent;

  const hasTestimonial =
    client.testimonial && !client.testimonial.quote.startsWith("[");
  const hasScreenshot = client.screenshot && !client.url.startsWith("#");

  return (
    <Section theme="dark-alt" className="py-32 min-h-[70vh] relative">
      {/* Growing orbs — narrative: more light */}
      <SectionBackground
        variant="alt"
        orbs={[
          { color: "orange", position: "top-[20%] left-[10%]", size: "w-[400px] h-[400px]", opacity: "[0.09]" },
          { color: "ambre", position: "bottom-[25%] right-[5%]", size: "w-[350px] h-[350px]", opacity: "[0.07]" },
          { color: "rose", position: "top-[50%] left-[60%]", size: "w-[300px] h-[300px]", opacity: "[0.05]" },
        ]}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Badge */}
        <BlurReveal className="text-center mb-6">
          <span className="inline-block text-sm font-mono tracking-widest uppercase text-accent-primary">
            {badge}
          </span>
        </BlurReveal>

        {/* Title */}
        <div className="text-center mb-16">
          <TextReveal
            text={title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight justify-center"
          />
        </div>

        {/* Client site mockup */}
        <BlurReveal className="mb-12">
          <div
            ref={mockupRef}
            className="relative mx-auto"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            {/* Glow behind — enhanced */}
            <div
              className="absolute inset-0 -m-8 rounded-3xl blur-3xl transition-opacity duration-700"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,100,66,0.12), transparent 70%)" }}
            />

            {/* Laptop frame */}
            <div className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.03] overflow-hidden transition-all duration-700 hover:border-foreground/20 hover:shadow-[0_0_60px_-15px_rgba(201,100,66,0.15)]">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-foreground/10 bg-foreground/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 rounded-md bg-foreground/5 flex items-center justify-center">
                    <span className="text-sm text-foreground/30 font-mono">
                      {client.url !== "#" ? client.url : "www.example.com"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Screenshot area */}
              <div className="aspect-video relative bg-foreground/[0.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.screenshot}
                  alt={`Site web de ${client.name}`}
                  className="w-full h-full object-cover transition-opacity duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Placeholder if no screenshot */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-foreground/20 pointer-events-none">
                  <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-foreground/15 flex items-center justify-center">
                    <span className="text-3xl">🌐</span>
                  </div>
                  <span className="text-sm font-mono">
                    {client.name}
                  </span>
                  <span className="text-sm text-foreground/15">
                    {client.city}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA link to live site */}
            {hasScreenshot ? (
              <div className="mt-6 text-center">
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-medium text-accent-primary hover:text-foreground transition-colors duration-500 group"
                >
                  <span>{ctaLabel}</span>
                  <ExternalLink className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </div>
            ) : (
              <div className="mt-6 text-center">
                <span className="text-sm text-foreground/40 font-mono">
                  Site en cours de production
                </span>
              </div>
            )}
          </div>
        </BlurReveal>

        {/* Testimonial or Fallback */}
        {hasTestimonial ? (
          <BlurReveal delay={0.3}>
            <div
              className="max-w-2xl mx-auto text-center rounded-3xl border border-foreground/5 bg-foreground/[0.02] p-8 md:p-12 transition-all duration-700 hover:border-foreground/10"
              style={{ boxShadow: "0 0 40px -15px rgba(201,100,66,0.08)" }}
            >
              <Quote className="h-8 w-8 text-accent-primary/40 mx-auto mb-6" />
              <blockquote className="text-lg md:text-xl text-foreground/80 leading-relaxed italic mb-6">
                &ldquo;{client.testimonial!.quote}&rdquo;
              </blockquote>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">
                  {client.testimonial!.author}
                </p>
                <p className="text-sm text-foreground/50">
                  {client.testimonial!.role} &mdash;{" "}
                  {client.testimonial!.city}
                </p>
              </div>
            </div>
          </BlurReveal>
        ) : (
          <BlurReveal delay={0.3}>
            <div
              className="max-w-2xl mx-auto text-center rounded-3xl border border-foreground/5 bg-foreground/[0.02] p-8 md:p-12 transition-all duration-700 hover:border-foreground/10"
              style={{ boxShadow: "0 0 40px -15px rgba(201,100,66,0.08)" }}
            >
              {/* Fallback metric */}
              <div className="mb-6">
                <div className="text-5xl md:text-6xl font-black text-accent-primary">
                  <NumberMorph
                    value={fallback.metric.value}
                    suffix={fallback.metric.suffix}
                    className="text-5xl md:text-6xl font-black"
                  />
                </div>
                <p className="text-base text-foreground/50 mt-2">
                  {fallback.metric.label}
                </p>
              </div>

              {/* Fallback quote */}
              <Quote className="h-6 w-6 text-accent-primary/40 mx-auto mb-4" />
              <blockquote className="text-lg md:text-xl text-foreground/70 leading-relaxed italic mb-4">
                &ldquo;{fallback.quote}&rdquo;
              </blockquote>
              <p className="text-sm text-foreground/50 font-medium">
                &mdash; {fallback.quoteAuthor}
              </p>
            </div>
          </BlurReveal>
        )}
      </div>
    </Section>
  );
}
