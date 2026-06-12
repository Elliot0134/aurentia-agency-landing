import { describe, expect, it } from 'vitest';
import { CADENCES } from '../sequences';
import { lintEmail } from '../linter';
import {
  DEFAULT_AUDIT_URL,
  renderTemplate,
  TEMPLATE_TYPES,
  type TemplateVars,
} from '../templates';

const FULL_VARS: TemplateVars = {
  contactName: 'Marie Dupont',
  entreprise: 'Boulangerie Dupont',
  siteUrl: 'https://boulangerie-dupont.fr',
  auditUrl: 'https://buy.stripe.com/test_audit',
  calUrl: 'https://cal.com/elliot-test/appel',
  score: 42,
};

/** Variables minimales : tout l'optionnel absent ou null. */
const MIN_VARS: TemplateVars = {
  contactName: null,
  entreprise: null,
  siteUrl: 'https://exemple.fr',
  calUrl: 'https://cal.com/elliot-test/appel',
};

const ALL_CADENCE_TYPES = [
  ...CADENCES.cold,
  ...CADENCES.inbound,
  ...CADENCES.refonte,
].map((s) => s.type);

describe('TEMPLATE_TYPES', () => {
  it('couvre exactement les 13 types de touches des cadences', () => {
    expect([...TEMPLATE_TYPES].sort()).toEqual([...ALL_CADENCE_TYPES].sort());
    expect(TEMPLATE_TYPES).toHaveLength(13);
  });
});

describe('renderTemplate', () => {
  it('lève une erreur sur un type inconnu', () => {
    expect(() => renderTemplate('flash', FULL_VARS)).toThrow(/inconnu/i);
    expect(() => renderTemplate('cold_9', FULL_VARS)).toThrow(/inconnu/i);
  });

  it.each(TEMPLATE_TYPES)('%s rend un email complet et versionné', (type) => {
    const email = renderTemplate(type, FULL_VARS);
    expect(email.subject.trim().length).toBeGreaterThan(0);
    expect(email.subject.length).toBeLessThanOrEqual(120);
    expect(email.html).toContain('<p');
    expect(email.text.trim().length).toBeGreaterThan(0);
    expect(email.templateVersion).toBe(`${type}@v1`);
  });

  it.each(TEMPLATE_TYPES)('%s passe le linter avec les variables complètes', (type) => {
    const email = renderTemplate(type, FULL_VARS);
    expect(lintEmail(email.subject, email.html, email.text)).toEqual([]);
  });

  it.each(TEMPLATE_TYPES)('%s passe le linter avec les variables minimales', (type) => {
    const email = renderTemplate(type, MIN_VARS);
    expect(lintEmail(email.subject, email.html, email.text)).toEqual([]);
  });

  it.each(TEMPLATE_TYPES)('%s mentionne le site et salue le contact', (type) => {
    const email = renderTemplate(type, FULL_VARS);
    expect(email.text).toContain(FULL_VARS.siteUrl);
    expect(email.text).toContain('Bonjour Marie Dupont');
  });

  it('salue sans nom quand contactName est null', () => {
    const email = renderTemplate('cold_1', MIN_VARS);
    expect(email.text).toContain('Bonjour,');
  });

  it.each(CADENCES.cold.map((s) => s.type))('%s (cold) pointe vers le lien audit', (type) => {
    const email = renderTemplate(type, FULL_VARS);
    expect(email.html).toContain('https://buy.stripe.com/test_audit');
    expect(email.text).toContain('https://buy.stripe.com/test_audit');
  });

  it.each(CADENCES.inbound.map((s) => s.type))(
    '%s (inbound) pointe vers le lien audit Pro',
    (type) => {
      const email = renderTemplate(type, FULL_VARS);
      expect(email.html).toContain('https://buy.stripe.com/test_audit');
      expect(email.text).toContain('https://buy.stripe.com/test_audit');
    },
  );

  it('inbound sans auditUrl retombe sur le lien Stripe par défaut', () => {
    const email = renderTemplate('inbound_1', MIN_VARS);
    expect(email.html).toContain(DEFAULT_AUDIT_URL);
  });

  it.each(CADENCES.refonte.map((s) => s.type))(
    '%s (refonte) contient le CTA de prise de RDV',
    (type) => {
      const email = renderTemplate(type, FULL_VARS);
      expect(email.html).toContain('https://cal.com/elliot-test/appel');
      expect(email.text).toContain('https://cal.com/elliot-test/appel');
    },
  );

  it('cold_1 cite le score mesuré quand il est fourni', () => {
    const email = renderTemplate('cold_1', FULL_VARS);
    expect(email.text).toContain('42/100');
  });

  it('cold_1 ne cite aucun score quand il est absent', () => {
    const email = renderTemplate('cold_1', MIN_VARS);
    expect(email.text).not.toContain('/100');
  });

  it('échappe les variables injectées dans le HTML', () => {
    const email = renderTemplate('cold_1', {
      ...MIN_VARS,
      contactName: 'Jean <Test> & Fils',
    });
    expect(email.html).toContain('Jean &lt;Test&gt; &amp; Fils');
    expect(email.html).not.toContain('<Test>');
  });
});
