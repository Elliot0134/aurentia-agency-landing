// src/components/v2/pillar/AgencyPillarPage.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { AgencyPillarData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { DualCTA } from "@/components/v2/shared/DualCTA";

type AgencyPillarPageProps = {
  data: AgencyPillarData;
};

type SubPageWrapperProps = {
  href: string;
  available: boolean;
  children: ReactNode;
};

function SubPageWrapper({ href, available, children }: SubPageWrapperProps) {
  if (available) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface p-7 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
      >
        {children}
      </Link>
    );
  }
  return (
    <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface p-7 opacity-70">
      <span className="absolute right-4 top-4 rounded-full bg-foreground/10 px-2.5 py-1 text-sm font-semibold text-foreground/65">
        Bientôt
      </span>
      {children}
    </div>
  );
}

export function AgencyPillarPage({ data }: AgencyPillarPageProps) {
  return (
    <>
      <section className="border-b border-foreground/10">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {data.hero.eyebrow}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {data.hero.headline}
          </h1>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">{data.hero.subHeadline}</p>
          <DualCTA primary={data.hero.cta.primary} secondary={data.hero.cta.secondary} size="lg" />
        </div>
      </section>

      <SectionContainer eyebrow="L'agence" title="Tout ce qui constitue Aurentia">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.subPages.map((p) => {
            const Icon = p.icon;
            return (
              <SubPageWrapper key={p.title} href={p.href} available={p.available}>
                <div className="flex size-12 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{p.title}</h3>
                <p className="flex-1 text-base text-foreground/65">{p.description}</p>
                {p.available && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                    Découvrir <ArrowUpRight className="size-4" />
                  </span>
                )}
              </SubPageWrapper>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer
        eyebrow="Notre histoire"
        title={data.story.title}
        className="bg-background-surface"
        innerClassName="max-w-3xl"
      >
        <p className="text-base leading-relaxed text-foreground/75 md:text-lg">{data.story.paragraph}</p>
      </SectionContainer>

      <SectionContainer eyebrow="L'équipe" title={data.teamPreview.title}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.teamPreview.members.map((m) => (
            <div key={m.name} className="flex flex-col items-center gap-3 text-center">
              {m.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.avatarUrl} alt={m.name} className="size-24 rounded-full object-cover" />
              ) : (
                <div className="size-24 rounded-full bg-foreground/10" aria-hidden />
              )}
              <h3 className="font-heading text-lg font-bold text-foreground">{m.name}</h3>
              <p className="text-sm text-foreground/55">{m.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href={data.teamPreview.seeAllHref}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-base font-semibold text-foreground transition-all duration-500 ease-in-out hover:border-foreground/40"
          >
            Voir l&apos;équipe complète
          </Link>
        </div>
      </SectionContainer>

      <SectionContainer alignHeader="center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {data.finalCta.title}
          </h2>
          <p className="text-base text-foreground/70 md:text-lg">{data.finalCta.subtitle}</p>
          <DualCTA primary={data.finalCta.cta} size="lg" />
        </div>
      </SectionContainer>
    </>
  );
}
