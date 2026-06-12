// src/lib/gtag.ts
//
// Source de vérité unique pour le tracking Google Ads.
// Le tag de base (gtag.js + consent mode) est chargé dans app/layout.tsx.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GOOGLE_ADS_ID = "AW-18228632740";

/**
 * Labels des actions de conversion Google Ads.
 *
 * À récupérer dans Google Ads : Objectifs > Conversions > [action] >
 * "Configurer le tag manuellement" — le label est la partie après le slash
 * dans `send_to: 'AW-18228632740/XXXXXXXX'`.
 *
 * Tant qu'un label est vide, l'événement de conversion correspondant
 * n'est pas envoyé (et un warning s'affiche en console en dev).
 */
export const CONVERSION_LABELS = {
  /** Formulaire pré-audit rempli (email + site). */
  auditLead: "",
  /** Paiement Stripe de l'audit complet (99 € HT). */
  auditPurchase: "",
} as const;

type ConversionName = keyof typeof CONVERSION_LABELS;

type ConversionParams = {
  value?: number;
  currency?: string;
  /** Identifiant unique (ex: session Stripe) — permet à Google de dédupliquer. */
  transactionId?: string;
};

/** Envoie une conversion Google Ads. No-op côté serveur ou sans label configuré. */
export function trackConversion(name: ConversionName, params: ConversionParams = {}) {
  if (typeof window === "undefined") return;
  const label = CONVERSION_LABELS[name];
  if (!label) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[gtag] Conversion "${name}" non envoyée : label manquant dans src/lib/gtag.ts`);
    }
    return;
  }
  window.gtag?.("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    ...(params.value !== undefined && { value: params.value }),
    ...(params.currency && { currency: params.currency }),
    ...(params.transactionId && { transaction_id: params.transactionId }),
  });
}
