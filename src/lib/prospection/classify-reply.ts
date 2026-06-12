import { generateObject } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from 'zod';
import type { ReplyClassification } from './db';

/**
 * Classification des réponses prospects (WF1). Deux étages :
 * 1. heuristique bounce SANS LLM (mailer-daemon / notification de
 *    non-livraison) : déterministe, gratuite, confidence 1 ;
 * 2. sinon LLM via OpenRouter (même pattern que
 *    src/lib/audit/render/write-report.ts : createOpenRouter + OPENROUTER_MODEL),
 *    sortie structurée validée par zod.
 *
 * La fonction LLM est injectable (ClassifyReplyFn) : les tests stubent,
 * zéro réseau.
 */

export const REPLY_CLASSIFICATIONS = [
  'interesse',
  'question',
  'pas_interesse',
  'stop',
  'absent',
  'bounce',
] as const satisfies readonly ReplyClassification[];

export interface ReplyVerdict {
  classification: ReplyClassification;
  confidence: number;
}

export type ClassifyReplyFn = (snippet: string) => Promise<ReplyVerdict>;

const VerdictSchema = z.object({
  classification: z.enum(REPLY_CLASSIFICATIONS),
  confidence: z.number().min(0).max(1),
});

const SYSTEM = `Tu classes la réponse d'un prospect à un email de prospection (audit de site web).
Catégories possibles :
- interesse : le prospect veut avancer (demande d'appel, d'audit, de prix, accord explicite).
- question : le prospect pose une question avant de décider.
- pas_interesse : refus poli ou explicite, "pas le moment", "déjà un prestataire".
- stop : demande explicite de ne plus être contacté, de désinscription, menace légale.
- absent : réponse automatique d'absence (congés, out of office).
- bounce : notification technique de non-livraison.
Réponds avec la classification et ta confiance (0 à 1).`;

const BOUNCE_SENDER_MARKERS = ['mailer-daemon', 'postmaster'];
const BOUNCE_SNIPPET_MARKERS = ['undelivered', 'delivery status', 'address not found', 'delivery incomplete'];

/**
 * Heuristique bounce AVANT tout appel LLM : expéditeur mailer-daemon ou
 * snippet de notification de non-livraison Gmail. Déterministe et gratuite.
 */
export function isBounceHeuristic(senderEmail: string | undefined, snippet: string): boolean {
  const sender = (senderEmail ?? '').toLowerCase();
  if (BOUNCE_SENDER_MARKERS.some((m) => sender.includes(m))) return true;
  const lower = snippet.toLowerCase();
  return BOUNCE_SNIPPET_MARKERS.some((m) => lower.includes(m));
}

const defaultClassify: ClassifyReplyFn = async (snippet) => {
  const model = process.env.OPENROUTER_MODEL;
  if (!model) {
    throw new Error("OPENROUTER_MODEL manquant dans l'environnement");
  }
  const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  const { object } = await generateObject({
    model: openrouter(model),
    schema: VerdictSchema,
    system: SYSTEM,
    prompt: snippet,
  });
  return object;
};

/**
 * Classifie le snippet d'une réponse prospect : heuristique bounce d'abord,
 * LLM sinon. `fn` injectable pour les tests (défaut : OpenRouter).
 */
export async function classifyReply(
  snippet: string,
  senderEmail?: string,
  fn: ClassifyReplyFn = defaultClassify,
): Promise<ReplyVerdict> {
  if (isBounceHeuristic(senderEmail, snippet)) {
    return { classification: 'bounce', confidence: 1 };
  }
  return fn(snippet);
}
