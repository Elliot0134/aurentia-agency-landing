"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  agenceTeam,
  agenceTeamSection,
  type AgenceTeamMember,
} from "@/data/v2/agence-content";

function MemberCard({ member, index }: { member: AgenceTeamMember; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] md:min-h-[480px]">
      {/* ── Mobile: stacked image + text ── */}
      <div className="flex flex-col md:hidden">
        <div className="relative h-[320px] w-full overflow-hidden">
          <Image
            src={member.image}
            alt={`Portrait de ${member.name}`}
            fill
            className="object-contain object-bottom"
            sizes="100vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(255,255,255,0.04)] to-transparent opacity-0 dark:opacity-100" />
        </div>

        <div className="relative z-10 flex flex-col gap-3 p-5">
          <span className="inline-flex items-center self-start rounded-full bg-accent-primary/10 px-3 py-1.5 font-mono text-sm uppercase tracking-wider text-accent-primary">
            {member.badge}
          </span>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {member.name}
            </h3>
            <p className="mt-1 text-base font-medium text-foreground/50">
              {member.role}
            </p>
          </div>

          <p className="text-base leading-relaxed text-foreground/70">
            {member.bio}
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            {member.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-sm text-foreground/60 transition-colors duration-500 ease-in-out hover:border-accent-primary/30 hover:text-accent-primary/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 self-start text-foreground/50 transition-colors duration-500 ease-in-out hover:text-accent-primary"
            aria-label={`Profil LinkedIn de ${member.name}`}
          >
            <Linkedin className="h-5 w-5" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* ── Desktop: side-by-side with photo bleed ── */}
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-0 md:block dark:opacity-100"
        style={{
          background: isEven
            ? "linear-gradient(to right, transparent 40%, color-mix(in srgb, var(--foreground) 10%, transparent) 60%, color-mix(in srgb, var(--foreground) 18%, transparent) 100%)"
            : "linear-gradient(to left, transparent 40%, color-mix(in srgb, var(--foreground) 10%, transparent) 60%, color-mix(in srgb, var(--foreground) 18%, transparent) 100%)",
        }}
      />

      <div
        className={`pointer-events-none absolute bottom-0 hidden h-[110%] w-[55%] md:block ${
          isEven ? "right-0" : "left-0 md:-left-[4%]"
        }`}
      >
        <Image
          src={member.image}
          alt={`Portrait de ${member.name}`}
          fill
          className="object-contain object-bottom"
          sizes="55vw"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 hidden opacity-0 md:block dark:opacity-100"
        style={{
          background: isEven
            ? "linear-gradient(to right, var(--color-background-surface) 0%, var(--color-background-surface) 25%, color-mix(in srgb, var(--color-background-surface) 80%, transparent) 40%, color-mix(in srgb, var(--color-background-surface) 30%, transparent) 55%, transparent 70%)"
            : "linear-gradient(to left, var(--color-background-surface) 0%, var(--color-background-surface) 25%, color-mix(in srgb, var(--color-background-surface) 80%, transparent) 40%, color-mix(in srgb, var(--color-background-surface) 30%, transparent) 55%, transparent 70%)",
        }}
      />

      <div
        className={`relative z-10 hidden min-h-[480px] flex-col justify-center gap-4 p-10 md:flex lg:p-12 ${
          isEven ? "md:w-[55%]" : "md:ml-auto md:w-[55%]"
        }`}
      >
        <span className="inline-flex items-center self-start rounded-full bg-accent-primary/10 px-3 py-1.5 font-mono text-sm uppercase tracking-wider text-accent-primary">
          {member.badge}
        </span>

        <div>
          <h3 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            {member.name}
          </h3>
          <p className="mt-1 text-base font-medium text-foreground/50">
            {member.role}
          </p>
        </div>

        <p className="text-base leading-relaxed text-foreground/70 lg:text-lg">
          {member.bio}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {member.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-sm text-foreground/60 transition-colors duration-500 ease-in-out hover:border-accent-primary/30 hover:text-accent-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 self-start text-foreground/50 transition-colors duration-500 ease-in-out hover:text-accent-primary"
          aria-label={`Profil LinkedIn de ${member.name}`}
        >
          <Linkedin className="h-5 w-5" />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

export function AgenceTeamFull() {
  return (
    <SectionContainer
      id="equipe"
      title={agenceTeamSection.title}
      subtitle={agenceTeamSection.subtitle}
    >
      <div className="flex flex-col gap-10 md:gap-14">
        {agenceTeam.map((member, index) => (
          <BlurReveal key={member.name} delay={0.1}>
            <MemberCard member={member} index={index} />
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
