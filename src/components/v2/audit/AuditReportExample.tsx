import { Check, Download, FileText } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { AuditReportCarousel } from "./AuditReportCarousel";
import { auditData } from "@/data/v2/audit";

const { reportExample } = auditData;

export function AuditReportExample() {
  return (
    <SectionContainer
      id="exemple"
      surface
      eyebrow={reportExample.eyebrow}
      title={reportExample.title}
      subtitle={reportExample.subtitle}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Aperçu PDF — carrousel navigable des pages réelles */}
        <AuditReportCarousel
          pagesPath={reportExample.pagesPath}
          pagesCount={reportExample.pagesCount}
          fileMeta={reportExample.fileMeta}
        />

        {/* Contenu + download */}
        <div>
          <p className="font-heading text-xl text-foreground md:text-2xl">
            Ce que contient le rapport
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {reportExample.contents.map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm text-foreground/75 md:text-base">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-primary/10">
                  <Check className="size-3.5 text-accent-primary" strokeWidth={2.6} />
                </span>
                {line}
              </li>
            ))}
          </ul>

          <a
            href={reportExample.pdfHref}
            download
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-colors duration-500 ease-in-out hover:bg-foreground/90 md:text-base"
          >
            <Download className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-y-0.5" />
            {reportExample.downloadLabel}
          </a>

          <p className="mt-4 flex items-center gap-2 text-sm text-foreground/50">
            <FileText className="size-4" />
            Exemple anonymisable sur demande · votre rapport sera 100 % personnalisé.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
