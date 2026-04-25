import Link from "next/link";

type Crumb = { label: string; href?: string };

export function ReaBreadcrumbs({ items }: { items?: Crumb[] }) {
  const crumbs: Crumb[] = items ?? [
    { label: "Accueil", href: "/" },
    { label: "Réalisations" },
  ];

  return (
    <nav
      aria-label="Fil d'Ariane"
      className="w-full px-6 pt-24 md:px-12 md:pt-28"
    >
      <ol className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center gap-2 text-sm text-foreground/60">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !isLast ? (
                <Link
                  href={c.href}
                  className="transition-colors duration-500 ease-in-out hover:text-foreground"
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast ? "text-foreground" : "text-foreground/60"
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {c.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="text-foreground/30">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
