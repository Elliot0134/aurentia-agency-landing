// src/app/audit/merci/page.tsx
//
// Page de confirmation post-paiement Stripe (audit complet 99 € HT).
// Le Payment Link doit rediriger ici avec ?session_id={CHECKOUT_SESSION_ID}.

import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { pageMeta } from "@/lib/seo/metadata";
import { AuditPurchaseTracker } from "@/components/v2/audit/AuditPurchaseTracker";

export const metadata = pageMeta({
  title: "Merci — votre audit est lancé",
  description: "Paiement confirmé. Votre audit complet arrive sous 24h ouvrées.",
  path: "/audit/merci",
  noindex: true,
});

export default function Page() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-24 sm:px-6">
      <Suspense fallback={null}>
        <AuditPurchaseTracker />
      </Suspense>

      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
        <span className="flex size-16 items-center justify-center rounded-full border border-accent-primary/30 bg-accent-primary/10">
          <CheckCircle2 className="size-8 text-accent-primary" />
        </span>

        <h1 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          Paiement confirmé, votre audit est lancé
        </h1>

        <p className="text-base leading-relaxed text-foreground/70">
          Merci pour votre confiance. On lance l&rsquo;audit complet de votre
          site : vous recevrez le rapport PDF par email sous 24h ouvrées, relu
          par un humain. Pensez à vérifier vos spams.
        </p>

        <p className="text-sm text-foreground/60">
          Une question entre-temps ?{" "}
          <a
            href="mailto:contact@aurentia.agency"
            className="underline underline-offset-2 text-foreground/80 hover:text-foreground transition-colors duration-500 ease-in-out"
          >
            contact@aurentia.agency
          </a>
        </p>

        <Link
          href="/"
          className="group mt-2 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity duration-500 ease-in-out hover:opacity-90 md:text-base"
        >
          Retour à l&rsquo;accueil
          <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
