"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const CONSENT_COOKIE = "aurentia_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 182; // 6 mois

type ConsentValue = "granted" | "denied";

function readConsent(): ConsentValue | null {
  const match = document.cookie.match(/(?:^|; )aurentia_consent=(granted|denied)/);
  return match ? (match[1] as ConsentValue) : null;
}

function writeConsent(value: ConsentValue) {
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
}

function updateGtagConsent(value: ConsentValue) {
  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() !== null) return;
    // Laisse la page respirer avant d'afficher la bannière
    const timer = window.setTimeout(() => setVisible(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = useCallback((value: ConsentValue) => {
    writeConsent(value);
    updateGtagConsent(value);
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          role="dialog"
          aria-label="Consentement aux cookies"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 z-[90] w-auto sm:max-w-md rounded-3xl p-6 sm:p-7"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--background-surface) 92%, transparent)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            boxShadow:
              "0 20px 60px -20px color-mix(in srgb, var(--foreground) 25%, transparent), 0 8px 24px -12px color-mix(in srgb, var(--foreground) 15%, transparent)",
          }}
        >
          <div className="flex flex-col gap-4">
            <p className="font-heading text-base font-bold text-foreground">
              Un cookie, et un seul objectif
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              On utilise des cookies Google Ads pour mesurer si nos campagnes
              servent à quelque chose. Aucun tracking tant que tu n&rsquo;as pas
              accepté.{" "}
              <Link
                href="/politique-confidentialite"
                className="underline underline-offset-2 text-foreground/80 hover:text-foreground transition-colors duration-500 ease-in-out"
              >
                En savoir plus
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => choose("granted")}
                className="flex-1 px-5 py-3 text-sm font-semibold rounded-2xl bg-foreground text-background hover:opacity-90 transition-opacity duration-500 ease-in-out"
              >
                Accepter
              </button>
              <button
                type="button"
                onClick={() => choose("denied")}
                className="flex-1 px-5 py-3 text-sm font-semibold rounded-2xl border border-foreground/15 text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all duration-500 ease-in-out"
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
