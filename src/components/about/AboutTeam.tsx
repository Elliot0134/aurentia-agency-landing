"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { teamMembers, aboutTeamSection } from "@/data/about-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function MemberCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        x: isEven ? -80 : 80,
        filter: "blur(8px)",
      },
      {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        delay: index * 0.3,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );

    // Tags staggered fade-in
    if (tagsRef.current) {
      const tags = tagsRef.current.children;
      gsap.fromTo(
        tags,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tagsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: cardRef });

  // 3D tilt on mouse move
  const isFirstMove = useRef(true);

  const handleMouseEnter = useCallback(() => {
    isFirstMove.current = true;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(tiltRef.current, {
      rotateY: x * 8,
      rotateX: -y * 6,
      duration: isFirstMove.current ? 0.8 : 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
    isFirstMove.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!tiltRef.current) return;
    gsap.to(tiltRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="opacity-0"
      style={{ perspective: "1000px" }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={tiltRef}
        style={{ transformStyle: "preserve-3d" }}
      >
        <SpotlightCard
          className={`
            group relative md:min-h-[520px]
            !bg-background/60 backdrop-blur-xl !border-foreground/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)]
            hover:shadow-[0_0_40px_rgba(201,100,66,0.12)]
            hover:!translate-y-0 !transition-shadow !will-change-auto
            duration-700 ease-in-out
            overflow-hidden
          `}
        >
          {/* ===== MOBILE LAYOUT: stacked image on top + text below ===== */}
          <div className="md:hidden flex flex-col">
            {/* Image — prominent, centered */}
            <div className="relative w-full h-[320px] overflow-hidden">
              <Image
                src={member.image}
                alt={`Portrait de ${member.name}`}
                fill
                className="object-contain object-bottom transition-transform duration-700 ease-in-out group-hover:scale-105"
                sizes="100vw"
              />
              {/* Bottom fade into card bg */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Text content */}
            <div className="relative z-10 flex flex-col p-5 gap-3">
              <span className="inline-flex items-center self-start px-3 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary font-mono text-sm tracking-wider uppercase">
                {member.badge}
              </span>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  {member.name}
                </h3>
                <p className="text-base text-foreground/50 font-medium mt-1">
                  {member.role}
                </p>
              </div>

              <p className="text-base text-foreground/70 leading-relaxed">
                {member.bio}
              </p>

              <div className="flex flex-wrap gap-2 mt-1">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-foreground/10 bg-foreground/[0.03] text-foreground/60 text-sm transition-colors duration-500 ease-in-out hover:border-accent-primary/30 hover:text-accent-primary/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start mt-2 text-foreground/50 hover:text-accent-primary transition-colors duration-500 ease-in-out"
                aria-label={`Profil LinkedIn de ${member.name}`}
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* ===== DESKTOP LAYOUT: side-by-side (original) ===== */}
          {/* Dark gradient behind image — full card width */}
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background: isEven
                ? "linear-gradient(to right, transparent 40%, color-mix(in srgb, var(--foreground) 15%, transparent) 60%, color-mix(in srgb, var(--foreground) 25%, transparent) 100%)"
                : "linear-gradient(to left, transparent 40%, color-mix(in srgb, var(--foreground) 15%, transparent) 60%, color-mix(in srgb, var(--foreground) 25%, transparent) 100%)",
            }}
          />

          {/* Image — absolute, bleeds into the card */}
          <div className={`absolute bottom-0 ${isEven ? "right-0" : "left-0 md:-left-[8%]"} w-[55%] h-[110%] pointer-events-none hidden md:block`}>
            <Image
              src={member.image}
              alt={`Portrait de ${member.name}`}
              fill
              className="object-contain object-bottom transition-transform duration-700 ease-in-out group-hover:scale-105"
              sizes="55vw"
            />
          </div>

          {/* Gradient fade — blends image into card from text side */}
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background: isEven
                ? "linear-gradient(to right, var(--background) 0%, var(--background) 25%, color-mix(in srgb, var(--background) 80%, transparent) 40%, color-mix(in srgb, var(--background) 30%, transparent) 55%, transparent 70%)"
                : "linear-gradient(to left, var(--background) 0%, var(--background) 25%, color-mix(in srgb, var(--background) 80%, transparent) 40%, color-mix(in srgb, var(--background) 30%, transparent) 55%, transparent 70%)",
            }}
          />

          {/* Content side — desktop only */}
          <div className={`relative z-10 hidden md:flex flex-col justify-center p-10 lg:p-12 gap-4 w-full ${
            isEven ? "md:w-[55%]" : "md:w-[55%] md:ml-auto"
          }`}>
            <span className="inline-flex items-center self-start px-3 py-1.5 rounded-full bg-accent-primary/10 text-accent-primary font-mono text-sm tracking-wider uppercase">
              {member.badge}
            </span>

            <div>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                {member.name}
              </h3>
              <p className="text-base text-foreground/50 font-medium mt-1">
                {member.role}
              </p>
            </div>

            <p className="text-base lg:text-lg text-foreground/70 leading-relaxed">
              {member.bio}
            </p>

            <div ref={tagsRef} className="flex flex-wrap gap-2 mt-2">
              {member.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-foreground/10 bg-foreground/[0.03] text-foreground/60 text-sm transition-colors duration-500 ease-in-out hover:border-accent-primary/30 hover:text-accent-primary/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start mt-2 text-foreground/50 hover:text-accent-primary transition-colors duration-500 ease-in-out"
              aria-label={`Profil LinkedIn de ${member.name}`}
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

export function AboutTeam() {
  return (
    <Section id="equipe" className="relative overflow-hidden">
      <SectionBackground
        showGrid gridOpacity={0.1} gridFadeDirection="bottom"
        orbs={[
          { color: "orange", position: "top-[30%] left-[10%]", size: "w-[450px] h-[450px]", opacity: "[0.07]" },
          { color: "violet", position: "top-[50%] left-[50%]", size: "w-[350px] h-[350px]", opacity: "[0.05]" },
          { color: "cyan", position: "bottom-[20%] right-[10%]", size: "w-[300px] h-[300px]", opacity: "[0.04]" },
        ]}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <TextReveal
            text={aboutTeamSection.title}
            elementType="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter justify-center text-foreground"
          />
          <BlurReveal delay={0.2}>
            <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto mt-6">
              {aboutTeamSection.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Team members */}
        <div className="flex flex-col gap-10 md:gap-14">
          {teamMembers.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
