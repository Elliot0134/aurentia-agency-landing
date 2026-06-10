// src/data/v2/payment.ts
//
// Source de vérité unique pour les liens de paiement.
// Importé à la fois par le front (AuditPricing) et l'API (mail de pré-audit).
// Aucune dépendance lourde ici → safe à importer dans une API route.

/** Lien Stripe Payment Link pour l'audit complet à 99 € HT. */
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/28E6oGaA43WGgL72Bf0x200";
