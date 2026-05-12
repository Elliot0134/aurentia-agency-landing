"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { cardClasses } from "@/components/v2/shared/Card";
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

export function ContactSplitForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
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
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur serveur, veuillez réessayer.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Une erreur est survenue",
      );
    }
  }

  const labelBase =
    "text-sm font-bold uppercase tracking-[0.12em] text-accent-primary";
  const inputBase =
    "w-full rounded-2xl border border-foreground/10 bg-background/60 px-4 py-2.5 text-base text-foreground placeholder:text-foreground/35 focus:border-foreground/30 focus:outline-none transition-colors duration-500 ease-in-out";

  return (
    <div className={cn(cardClasses, "relative overflow-hidden p-5 md:p-7")}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5 py-10 text-center md:py-14"
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex size-16 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary"
            >
              <Check className="size-8" strokeWidth={2.5} />
            </motion.span>
            <div className="flex flex-col gap-2">
              <h2 className="!text-xl font-bold text-foreground md:!text-2xl">
                Message envoyé !
              </h2>
              <p className="max-w-sm text-base text-foreground/65">
                On revient vers vous sous 24h ouvrées, directement avec
                l&apos;équipe technique.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm font-medium text-foreground/60 underline-offset-4 transition-colors duration-500 ease-in-out hover:text-foreground hover:underline"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <h2 className="!text-xl font-bold text-foreground md:!text-2xl">
                Envoyez-nous un message
              </h2>
              <p className="text-sm text-foreground/60">
                Réponse sous 24h ouvrées, directement avec l&apos;équipe.
              </p>
            </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nom" className={labelBase}>
            Nom *
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            placeholder="Votre nom"
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelBase}>
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="vous@exemple.com"
            className={inputBase}
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tel" className={labelBase}>
            Téléphone
          </label>
          <input
            id="tel"
            name="tel"
            type="tel"
            placeholder="06 XX XX XX XX"
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="type_projet" className={labelBase}>
            Sujet *
          </label>
          <select
            id="type_projet"
            name="type_projet"
            required
            defaultValue=""
            className={inputBase}
          >
            <option value="" disabled>
              Choisir un sujet
            </option>
            {TYPE_PROJET_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="budget" className={labelBase}>
          Budget
        </label>
        <select
          id="budget"
          name="budget"
          required
          defaultValue=""
          className={inputBase}
        >
          <option value="" disabled>
            Sélectionner un budget
          </option>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={labelBase}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre projet ou votre demande…"
          className={inputBase}
        />
      </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:opacity-90 disabled:opacity-50"
              >
                {status === "submitting" ? "Envoi…" : "Envoyer le message"}
                <Send className="size-4" strokeWidth={2} />
              </button>

              {status === "error" && errorMessage && (
                <p className="text-sm text-destructive">{errorMessage}</p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
