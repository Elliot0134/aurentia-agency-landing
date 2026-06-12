import { describe, expect, it } from 'vitest';
import { lintEmail } from '../linter';

const OK = {
  subject: 'Votre pré-audit',
  html: '<p>Bonjour, voici votre pré-audit.</p>',
  text: 'Bonjour, voici votre pré-audit.',
};

describe('lintEmail', () => {
  it('email propre : aucune violation', () => {
    expect(lintEmail(OK.subject, OK.html, OK.text)).toEqual([]);
  });

  it('détecte le tiret long (em dash) dans le texte', () => {
    const violations = lintEmail(OK.subject, OK.html, 'Bonjour — voici.');
    expect(violations.some((v) => v.includes('tiret long'))).toBe(true);
  });

  it('détecte le tiret moyen (en dash) dans le sujet', () => {
    const violations = lintEmail('Audit – site', OK.html, OK.text);
    expect(violations.some((v) => v.includes('tiret long'))).toBe(true);
  });

  it('détecte le tiret long dans le HTML', () => {
    const violations = lintEmail(OK.subject, '<p>a — b</p>', OK.text);
    expect(violations.some((v) => v.includes('tiret long'))).toBe(true);
  });

  it("détecte l'auto-attribution IA, insensible à la casse", () => {
    const violations = lintEmail(OK.subject, OK.html, 'Rapport produit par notre IA maison.');
    expect(violations.some((v) => v.includes('mention IA'))).toBe(true);
  });

  it("détecte « généré par » dans le HTML", () => {
    const violations = lintEmail(OK.subject, '<p>Généré par un robot.</p>', OK.text);
    expect(violations.some((v) => v.includes('mention IA'))).toBe(true);
  });

  it('détecte une variable {{...}} résiduelle', () => {
    const violations = lintEmail(OK.subject, OK.html, 'Bonjour {{prenom}},');
    expect(violations.some((v) => v.includes('{{'))).toBe(true);
  });

  it('détecte une variable ${...} résiduelle', () => {
    // eslint-disable-next-line no-template-curly-in-string
    const violations = lintEmail(OK.subject, '<p>Voir ${url}</p>', OK.text);
    expect(violations.some((v) => v.includes('${'))).toBe(true);
  });

  it('détecte un sujet vide (espaces compris)', () => {
    const violations = lintEmail('   ', OK.html, OK.text);
    expect(violations.some((v) => v.includes('sujet vide'))).toBe(true);
  });

  it('détecte un sujet de plus de 120 caractères', () => {
    const violations = lintEmail('a'.repeat(121), OK.html, OK.text);
    expect(violations.some((v) => v.includes('sujet trop long'))).toBe(true);
  });

  it('accepte un sujet de 120 caractères exactement', () => {
    expect(lintEmail('a'.repeat(120), OK.html, OK.text)).toEqual([]);
  });

  it('détecte un HTML vide', () => {
    const violations = lintEmail(OK.subject, '', OK.text);
    expect(violations.some((v) => v.includes('html vide'))).toBe(true);
  });

  it('cumule plusieurs violations', () => {
    const violations = lintEmail('', '', 'Texte — {{var}} rédigé par une IA.');
    expect(violations.length).toBeGreaterThanOrEqual(4);
  });
});
