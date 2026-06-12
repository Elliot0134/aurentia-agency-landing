import { IA_LEXICON } from '@/lib/audit/render/contract';

/**
 * Linter d'envoi BLOQUANT des emails de séquence (spec
 * 2026-06-12-sequences-relances-n8n-design.md §7) : toute violation empêche
 * l'envoi du mail (l'engine le met en skipped, jamais en due).
 *
 * Réutilise le lexique d'auto-attribution IA du contrat de véracité des
 * rapports (src/lib/audit/render/contract.ts) : une seule liste à maintenir.
 */

const EM_OR_EN_DASH = /[—–]/; // tiret long (em dash) ou tiret moyen (en dash)
const MUSTACHE_VAR = /\{\{[^}]*\}\}/;
const TEMPLATE_LITERAL_VAR = /\$\{[^}]*\}/;
const SUBJECT_MAX_LENGTH = 120;

/**
 * Retourne la liste des violations (vide = OK, le mail peut partir).
 * Bloque : tiret long/moyen, auto-attribution IA, variable non interpolée
 * (`{{...}}` ou `${...}`), sujet vide ou trop long, HTML vide.
 */
export function lintEmail(subject: string, html: string, text: string): string[] {
  const violations: string[] = [];
  const all = `${subject}\n${html}\n${text}`;

  if (EM_OR_EN_DASH.test(all)) {
    violations.push('tiret long interdit (em dash U+2014 ou en dash U+2013)');
  }
  const lower = all.toLowerCase();
  for (const term of IA_LEXICON) {
    if (lower.includes(term)) {
      violations.push(`mention IA interdite : "${term.trim()}"`);
    }
  }
  if (MUSTACHE_VAR.test(all)) {
    violations.push('variable {{...}} non interpolée');
  }
  if (TEMPLATE_LITERAL_VAR.test(all)) {
    violations.push('variable ${...} non interpolée');
  }
  if (subject.trim().length === 0) {
    violations.push('sujet vide');
  } else if (subject.length > SUBJECT_MAX_LENGTH) {
    violations.push(`sujet trop long (${subject.length} > ${SUBJECT_MAX_LENGTH} caractères)`);
  }
  if (html.trim().length === 0) {
    violations.push('html vide');
  }
  return violations;
}
