// src/components/v2/ressources/EmailGate.tsx
"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type EmailGateProps = {
  /** Identifiant unique de la ressource (utilisé pour le tracking backend). */
  resourceId: string;
  /** Libellé de la ressource — ex : « le skill brainstorm + PRD ». */
  resourceLabel: string;
  /** Phrase courte expliquant ce que l'utilisateur va récupérer. */
  description?: string;
  /** Le contenu débloqué (le bloc copyable). */
  children: ReactNode;
};

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
      JSON.stringify({ email, submittedAt: Date.now() } satisfies Auth)
    );
  } catch {
    /* ignore */
  }
}

type Step = "hydrating" | "form" | "submitting" | "unlocked";

export function EmailGate({
  resourceId,
  resourceLabel,
  description,
  children,
}: EmailGateProps) {
  const [step, setStep] = useState<Step>("hydrating");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = readAuth();
    setStep(auth ? "unlocked" : "form");
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
          source: typeof window !== "undefined" ? window.location.pathname : null,
          newsletter,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("[EmailGate] API error", res.status, body);
        setError(`Erreur ${res.status}, réessayez.`);
        setStep("form");
        return;
      }
      writeAuth(email);
      setStep("unlocked");
    } catch (err) {
      console.error("[EmailGate] Network error", err);
      setError("Erreur réseau, réessayez.");
      setStep("form");
    }
  };

  if (step === "hydrating") {
    return <div className="h-32 animate-pulse rounded-2xl bg-foreground/[0.04]" />;
  }

  if (step === "unlocked") {
    return <>{children}</>;
  }

  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-8">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
          <Lock className="size-4" strokeWidth={2} aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Ressource verrouillée
          </p>
          <h4 className="text-base font-bold text-foreground md:text-lg">
            Recevoir {resourceLabel}
          </h4>
          {description && (
            <p className="text-sm leading-relaxed text-foreground/65">{description}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor={`email-${resourceId}`} className="sr-only">
            Adresse email
          </label>
          <div className="relative flex-1">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-foreground/40"
              aria-hidden
            />
            <input
              id={`email-${resourceId}`}
              type="email"
              required
              autoComplete="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full rounded-full border border-foreground/15 bg-background py-3 pl-11 pr-5 text-base text-foreground placeholder:text-foreground/40 outline-none transition-colors duration-500 ease-in-out focus:border-accent-primary/60"
            />
          </div>
          <button
            type="submit"
            disabled={step === "submitting"}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90",
              step === "submitting" && "cursor-wait opacity-70"
            )}
          >
            {step === "submitting" ? "Envoi…" : "Accéder"}
            <ArrowRight className="size-4" />
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
            Me prévenir aussi des prochaines ressources publiées par Aurentia
            (désinscription en un clic).
          </span>
        </label>
      </form>

      {error && (
        <p className="mt-3 text-sm text-[var(--destructive)]" role="alert">
          {error}
        </p>
      )}

      <p className="mt-4 text-sm text-foreground/45">
        Email validé une seule fois — les autres ressources Aurentia se débloquent
        automatiquement ensuite.
      </p>
    </div>
  );
}
