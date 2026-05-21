// src/components/v2/ressources/ResourceContentGate.tsx
//
// Email gate "overlay" pour le contenu central d'une page ressource.
//
// Différence vs EmailGate (mode bloc) : ici le contenu (children) est rendu en
// arrière-plan, flouté + non-interactif, et un formulaire centré flotte au-dessus.
// Le hero et la TOC du ResourceArticleLayout restent visibles autour, intacts.
//
// Cache local partagé avec EmailGate (même clé `aurentia:ressources:auth`) :
// dès qu'un utilisateur valide son email sur n'importe quelle ressource, toutes
// les autres se débloquent automatiquement.

"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTH_KEY = "aurentia:ressources:auth";

type Auth = { email: string; submittedAt: number };

function readAuth(): Auth | null {
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Auth;
    if (!parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeAuth(email: string) {
  try {
    window.localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({ email, submittedAt: Date.now() } satisfies Auth),
    );
  } catch {
    /* ignore */
  }
}

type Step = "hydrating" | "form" | "submitting" | "unlocked";

type ResourceContentGateProps = {
  /** Identifiant unique de la ressource (utilisé pour le tracking backend). */
  resourceId: string;
  /** Libellé court de la ressource — non rendu visuellement (gardé pour le tracking). */
  resourceLabel?: string;
  /** Le contenu central à floutter / révéler. */
  children: ReactNode;
};

export function ResourceContentGate({
  resourceId,
  children,
}: ResourceContentGateProps) {
  const [step, setStep] = useState<Step>("hydrating");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(readAuth() ? "unlocked" : "form");

    // Sync entre tabs : si l'utilisateur débloque dans un autre onglet,
    // on débloque ici aussi sans refresh manuel.
    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTH_KEY && e.newValue) {
        setStep("unlocked");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStep("submitting");
    try {
      const res = await fetch("/api/ressources/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          resource: resourceId,
          source:
            typeof window !== "undefined" ? window.location.pathname : null,
          newsletter,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("[ResourceContentGate] API error", res.status, body);
        setError(`Erreur ${res.status}, réessayez.`);
        setStep("form");
        return;
      }
      writeAuth(email);
      setStep("unlocked");
    } catch (err) {
      console.error("[ResourceContentGate] Network error", err);
      setError("Erreur réseau, réessayez.");
      setStep("form");
    }
  };

  // Hydration : rien à montrer côté contenu, juste un placeholder bas pour éviter le CLS.
  if (step === "hydrating") {
    return (
      <div className="min-h-[40vh] animate-pulse rounded-2xl bg-foreground/[0.04]" />
    );
  }

  if (step === "unlocked") {
    return <>{children}</>;
  }

  // Étapes "form" et "submitting" — gate actif.
  // Layout : grille 1 cellule où les 2 enfants se superposent — le contenu
  // flouté en arrière, le sticky form en avant. Le sticky vit dans le flux
  // normal (pas dans un absolute), donc `position: sticky` fonctionne.
  return (
    <div className="relative grid">
      {/* Contenu en arrière-plan, flouté + non interactif */}
      <div
        aria-hidden
        className="col-start-1 row-start-1 select-none"
        style={{
          filter: "blur(8px)",
          WebkitFilter: "blur(8px)",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>

      {/* Couche superposée pour la card sticky.
          pointer-events: none sur le wrapper pour laisser passer le scroll,
          pointer-events: auto sur la card pour la rendre interactive. */}
      <div className="pointer-events-none col-start-1 row-start-1 flex justify-center px-4">
        <div className="sticky top-28 z-10 mt-6 h-fit w-full max-w-md pointer-events-auto md:mt-10">
          <div className="rounded-2xl border border-foreground/10 bg-background/95 p-5 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Lock className="size-4" strokeWidth={2} aria-hidden />
              </div>
              <h4 className="font-display text-base font-bold tracking-tight text-foreground">
                Remplir votre mail pour accéder à la ressource
              </h4>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
              <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor={`gate-email-${resourceId}`} className="sr-only">
                  Adresse email
                </label>
                <div className="relative flex-1">
                  <Mail
                    className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/40"
                    aria-hidden
                  />
                  <input
                    id={`gate-email-${resourceId}`}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="vous@exemple.com"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="w-full rounded-full border border-foreground/15 bg-background py-2.5 pl-11 pr-5 text-sm text-foreground placeholder:text-foreground/40 outline-none transition-colors duration-500 ease-in-out focus:border-accent-primary/60 md:text-base"
                  />
                </div>
                <button
                  type="submit"
                  disabled={step === "submitting"}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90 md:text-base",
                    step === "submitting" && "cursor-wait opacity-70",
                  )}
                >
                  {step === "submitting" ? "Envoi…" : "Accéder"}
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground/65">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(ev) => setNewsletter(ev.target.checked)}
                  className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-foreground/30 text-accent-primary focus:ring-accent-primary/40"
                />
                <span>
                  Me prévenir aussi des prochaines ressources publiées par
                  Aurentia.
                </span>
              </label>
            </form>

            {error && (
              <p
                className="mt-3 text-sm text-[var(--destructive)]"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
