"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type AuditLeadFormProps = {
  source: string;
  className?: string;
  /** "dark" when placed over a dark/accent surface (inverts input colors). */
  tone?: "default" | "dark";
};

type Status = "idle" | "submitting" | "success" | "error";

export function AuditLeadForm({ source, className, tone = "default" }: AuditLeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const site = String(data.get("site") ?? "");
    const email = String(data.get("email") ?? "");

    setStatus("submitting");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, email, source }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-start gap-3 rounded-2xl border border-accent-primary/30 bg-accent-primary/10 p-5 text-sm md:text-base",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-primary" />
        <p className="text-foreground/85">
          Merci ! Votre pré-audit gratuit arrive par email. Pensez à vérifier vos spams.
        </p>
      </div>
    );
  }

  const inputClasses =
    tone === "dark"
      ? "bg-background/95 text-foreground placeholder:text-foreground/40 border-transparent"
      : "bg-background-surface text-foreground placeholder:text-foreground/40 border-foreground/10";

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          name="site"
          required
          inputMode="url"
          placeholder="https://votre-site.com"
          className={cn(
            "min-w-0 flex-1 rounded-full border px-5 py-3.5 text-sm outline-none transition-colors duration-500 ease-in-out focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30 md:text-base",
            inputClasses,
          )}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="vous@email.com"
          className={cn(
            "min-w-0 flex-1 rounded-full border px-5 py-3.5 text-sm outline-none transition-colors duration-500 ease-in-out focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30 md:text-base",
            inputClasses,
          )}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-colors duration-500 ease-in-out hover:bg-accent-secondary disabled:opacity-70 md:text-base"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Envoi…
          </>
        ) : (
          <>
            Recevoir mon pré-audit gratuit
            <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </>
        )}
      </button>

      {status === "error" && (
        <p className="mt-2 text-sm text-red-500">
          Une erreur est survenue. Réessayez ou écrivez-nous à contact@aurentia.agency.
        </p>
      )}
    </form>
  );
}
