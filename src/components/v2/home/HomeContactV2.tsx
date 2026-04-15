// src/components/v2/home/HomeContactV2.tsx
"use client";

import { useState } from "react";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { cn } from "@/lib/utils";

const TYPE_PROJET_OPTIONS = [
  "Site vitrine",
  "Landing page",
  "SaaS sur-mesure",
  "Formation IA",
  "Configuration Claude",
  "Audit IA",
  "Implémentation IA",
  "Autre",
];

const BUDGET_OPTIONS = [
  "< 2 000 €",
  "2 000 € — 5 000 €",
  "5 000 € — 15 000 €",
  "15 000 € — 50 000 €",
  "> 50 000 €",
  "Pas encore défini",
];

const N8N_WEBHOOK_URL =
  "https://aurentia-agency.app.n8n.cloud/webhook/contact-form-aurentia-landing";

export function HomeContactV2() {
  const { contactCta } = homeData;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      nom: String(formData.get("nom") ?? ""),
      email: String(formData.get("email") ?? ""),
      tel: String(formData.get("tel") ?? ""),
      type_projet: String(formData.get("type_projet") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  }

  const inputBase =
    "rounded-xl border border-foreground/15 bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-accent-primary focus:outline-none transition-colors duration-500 ease-in-out";

  return (
    <SectionContainer alignHeader="center" innerClassName="max-w-2xl">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {contactCta.title}
        </h2>
        <p className="text-base text-foreground/70 md:text-lg">{contactCta.subtitle}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-background-surface p-8 md:p-10"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input name="nom" type="text" required placeholder="Votre nom" className={inputBase} />
          <input name="email" type="email" required placeholder="Votre email" className={inputBase} />
        </div>
        <input name="tel" type="tel" placeholder="Votre téléphone (optionnel)" className={inputBase} />
        <div className="grid gap-4 md:grid-cols-2">
          <select name="type_projet" required defaultValue="" className={inputBase}>
            <option value="" disabled>Type de projet</option>
            {TYPE_PROJET_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <select name="budget" required defaultValue="" className={inputBase}>
            <option value="" disabled>Budget</option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <textarea
          name="message"
          required
          placeholder="Parlez-nous de votre projet"
          rows={5}
          className={inputBase}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90 disabled:opacity-50",
          )}
        >
          {status === "submitting" ? "Envoi…" : contactCta.cta.label}
        </button>
        {status === "success" && (
          <p className="text-base text-accent-primary">
            Message reçu, on revient vers vous sous 24h.
          </p>
        )}
        {status === "error" && errorMessage && (
          <p className="text-base text-destructive">{errorMessage}</p>
        )}
      </form>
    </SectionContainer>
  );
}
