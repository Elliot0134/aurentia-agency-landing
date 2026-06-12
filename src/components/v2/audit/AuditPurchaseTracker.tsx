"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackConversion } from "@/lib/gtag";

/**
 * Tire la conversion Google Ads "achat audit" à l'arrivée sur /audit/merci
 * (redirection post-paiement du Stripe Payment Link).
 *
 * Le `session_id` ajouté par Stripe ({CHECKOUT_SESSION_ID}) sert de
 * transaction_id : Google déduplique si la page est rechargée.
 */
export function AuditPurchaseTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id") ?? undefined;
    trackConversion("auditPurchase", {
      value: 99,
      currency: "EUR",
      transactionId: sessionId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
