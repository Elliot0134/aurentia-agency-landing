import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";

type Props = {
  project: ProjectFrontmatter;
};

export function CaseStudyCTA({ project }: Props) {
  const href =
    `/v2/contact?type=${encodeURIComponent(project.type)}` +
    `&secteur=${encodeURIComponent(project.secteur)}`;

  return (
    <section className="flex flex-col items-start gap-6 rounded-[2rem] bg-background-surface p-8 md:p-12">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
          Vous avez un projet similaire&nbsp;?
        </h2>
        <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
          On étudie votre besoin en 30 minutes et on vous dit si on est la bonne
          équipe pour le livrer. Pas de blabla, juste du concret.
        </p>
      </div>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-500 ease-in-out hover:gap-3"
      >
        Parler de votre projet
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-in-out group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}
