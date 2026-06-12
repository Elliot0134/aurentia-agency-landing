import { describe, expect, it } from 'vitest';
import { CADENCES } from '../sequences';
import { lintEmail } from '../linter';
import {
  DEFAULT_AUDIT_URL,
  NICHE_KEYS,
  nicheKeyFromName,
  renderTemplate,
  senderNameFromAssignee,
  TEMPLATE_TYPES,
  type NicheKey,
  type TemplateVars,
} from '../templates';

const FULL_VARS: TemplateVars = {
  contactName: 'Marie Dupont',
  entreprise: 'Boulangerie Dupont',
  siteUrl: 'https://boulangerie-dupont.fr',
  auditUrl: 'https://buy.stripe.com/test_audit',
  calUrl: 'https://cal.com/elliot-test/appel',
  score: 42,
  senderName: 'Stéphane',
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

const COLD_TYPES = CADENCES.cold.map((s) => s.type);

/** Toutes les variantes d'une touche cold : générique + les 4 niches. */
const ALL_COLD_VARIANTS: Array<NicheKey | null> = [null, ...NICHE_KEYS];

/** URLs http(s) d'un rendu, ponctuation de fin de phrase retirée. */
function extractUrls(s: string): string[] {
  return (s.match(/https?:\/\/[^\s"<]+/g) ?? []).map((u) => u.replace(/[.,;:!?]+$/, ''));
}

/**
 * Toutes les variantes rendables : les 13 types en générique (nicheKey null)
 * + les 3 touches cold déclinées pour chacune des 4 niches = 25 rendus.
 */
const ALL_VARIANT_CASES: Array<{ type: string; nicheKey: NicheKey | null }> = [
  ...ALL_CADENCE_TYPES.map((type) => ({ type, nicheKey: null })),
  ...COLD_TYPES.flatMap((type) => NICHE_KEYS.map((nicheKey) => ({ type, nicheKey }))),
];

describe('TEMPLATE_TYPES', () => {
  it('couvre exactement les 13 types de touches des cadences', () => {
    expect([...TEMPLATE_TYPES].sort()).toEqual([...ALL_CADENCE_TYPES].sort());
    expect(TEMPLATE_TYPES).toHaveLength(13);
  });
});

describe('senderNameFromAssignee', () => {
  it('mappe chaque assigné connu vers son prénom signé', () => {
    expect(senderNameFromAssignee('elliot')).toBe('Elliot');
    expect(senderNameFromAssignee('stephane')).toBe('Stéphane');
    expect(senderNameFromAssignee('olivier')).toBe('Olivier');
    expect(senderNameFromAssignee('matthieu')).toBe('Matthieu');
    expect(senderNameFromAssignee('fabien')).toBe('Fabien');
  });

  it('tolère la casse, les espaces et les accents Airtable', () => {
    expect(senderNameFromAssignee(' ELLIOT ')).toBe('Elliot');
    expect(senderNameFromAssignee('Stéphane')).toBe('Stéphane');
    expect(senderNameFromAssignee('Matthieu')).toBe('Matthieu');
  });

  it("retombe sur Elliot si null, vide ou inconnu (jamais de signature vide)", () => {
    expect(senderNameFromAssignee(null)).toBe('Elliot');
    expect(senderNameFromAssignee('')).toBe('Elliot');
    expect(senderNameFromAssignee('quelqu_un_d_autre')).toBe('Elliot');
  });
});

describe('nicheKeyFromName', () => {
  it('reconnaît les 4 niches actives (noms réels Airtable)', () => {
    expect(nicheKeyFromName('Conciergeries — PACA')).toBe('conciergeries');
    expect(nicheKeyFromName('OF / EdTech B2B — France')).toBe('of-edtech');
    expect(nicheKeyFromName('Agences immo — Yvelines (78)')).toBe('agences-immo');
    expect(nicheKeyFromName('Cuisinistes — PACA')).toBe('cuisinistes');
  });

  it('reconnaît les motifs au singulier, EdTech seul, immo en variantes', () => {
    expect(nicheKeyFromName('Conciergerie Airbnb — Luberon')).toBe('conciergeries');
    expect(nicheKeyFromName('EdTech — Lyon')).toBe('of-edtech');
    expect(nicheKeyFromName('Immobilier de prestige')).toBe('agences-immo');
    expect(nicheKeyFromName('Cuisiniste indépendant — 84')).toBe('cuisinistes');
  });

  it('retourne null si nom inconnu ou absent (fallback générique)', () => {
    expect(nicheKeyFromName(null)).toBeNull();
    expect(nicheKeyFromName('Restaurants — Lyon')).toBeNull();
    expect(nicheKeyFromName('')).toBeNull();
  });

  it("ne confond pas un 'of' minuscule contenu dans un mot avec la niche OF", () => {
    expect(nicheKeyFromName('Offices de tourisme')).toBeNull();
    expect(nicheKeyFromName('Coiffeurs professionnels')).toBeNull();
  });
});

describe('renderTemplate', () => {
  it('lève une erreur sur un type inconnu', () => {
    expect(() => renderTemplate('flash', FULL_VARS)).toThrow(/inconnu/i);
    expect(() => renderTemplate('cold_9', FULL_VARS)).toThrow(/inconnu/i);
  });

  it.each(ALL_VARIANT_CASES)(
    '$type ($nicheKey) rend un email complet, versionné et conforme au linter',
    ({ type, nicheKey }) => {
      const email = renderTemplate(type, { ...FULL_VARS, nicheKey });
      expect(email.subject.trim().length).toBeGreaterThan(0);
      expect(email.subject.length).toBeLessThanOrEqual(120);
      expect(email.html).toContain('<p');
      expect(email.text.trim().length).toBeGreaterThan(0);
      expect(lintEmail(email.subject, email.html, email.text)).toEqual([]);
    },
  );

  it.each(ALL_VARIANT_CASES)(
    '$type ($nicheKey) passe le linter avec les variables minimales',
    ({ type, nicheKey }) => {
      const email = renderTemplate(type, { ...MIN_VARS, nicheKey });
      expect(lintEmail(email.subject, email.html, email.text)).toEqual([]);
    },
  );

  it.each(ALL_VARIANT_CASES)('$type ($nicheKey) mentionne le site et salue le contact', ({ type, nicheKey }) => {
    const email = renderTemplate(type, { ...FULL_VARS, nicheKey });
    expect(email.text).toContain(FULL_VARS.siteUrl);
    expect(email.text).toContain('Bonjour Marie Dupont');
  });

  it('salue sans nom quand contactName est null', () => {
    const email = renderTemplate('cold_1', MIN_VARS);
    expect(email.text).toContain('Bonjour,');
  });

  it.each(ALL_COLD_VARIANTS)(
    'cold_1 (%s) ne contient aucun lien CTA et finit sur la question ouverte',
    (nicheKey) => {
      const email = renderTemplate('cold_1', { ...FULL_VARS, nicheKey });
      // Seules URLs tolérées : le site du prospect (corps), la bannière et
      // www.aurentia.agency (signature).
      const SIGNATURE_URLS = [
        'https://www.aurentia.agency',
        'https://brfsrpbfqlydzhguqexj.supabase.co/storage/v1/object/public/audit-captures/brand/aurentia-banner.jpg',
      ];
      for (const url of extractUrls(email.html)) {
        expect([FULL_VARS.siteUrl, ...SIGNATURE_URLS]).toContain(url);
      }
      for (const url of extractUrls(email.text)) {
        expect([FULL_VARS.siteUrl, 'https://www.aurentia.agency']).toContain(url);
      }
      expect(email.html).not.toContain('stripe');
      expect(email.html).not.toContain('cal.com');
      // Le corps se termine par la question ouverte, juste avant la signature.
      expect(email.text).toMatch(/\?\n\nStéphane - Aurentia\.agency\n/);
    },
  );

  it.each(['cold_2', 'cold_3'])(
    '%s (relance cold) pointe vers cal.com, jamais vers Stripe',
    (type) => {
      for (const nicheKey of ALL_COLD_VARIANTS) {
        const email = renderTemplate(type, { ...FULL_VARS, nicheKey });
        expect(email.html).toContain('https://cal.com/elliot-test/appel');
        expect(email.text).toContain('https://cal.com/elliot-test/appel');
        expect(email.html).not.toContain('stripe');
        expect(email.text).not.toContain('stripe');
        expect(email.text).not.toContain('audit complet');
      }
    },
  );

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
    '%s (refonte) contient le CTA de prise de RDV et lui seul',
    (type) => {
      const email = renderTemplate(type, FULL_VARS);
      expect(email.html).toContain('https://cal.com/elliot-test/appel');
      expect(email.text).toContain('https://cal.com/elliot-test/appel');
      expect(email.html).not.toContain('https://buy.stripe.com/test_audit');
    },
  );

  it('cold_1 cite le score mesuré quand il est fourni (générique et variantes)', () => {
    for (const nicheKey of [null, ...NICHE_KEYS]) {
      const email = renderTemplate('cold_1', { ...FULL_VARS, nicheKey });
      expect(email.text).toContain('42/100');
    }
  });

  it('cold_1 ne cite aucun score quand il est absent', () => {
    for (const nicheKey of [null, ...NICHE_KEYS]) {
      const email = renderTemplate('cold_1', { ...MIN_VARS, nicheKey });
      expect(email.text).not.toContain('/100');
    }
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

describe('renderTemplate — variantes par niche (cold uniquement)', () => {
  it.each(COLD_TYPES)('%s : templateVersion suffixée par niche, @v2 en générique', (type) => {
    expect(renderTemplate(type, FULL_VARS).templateVersion).toBe(`${type}@v2`);
    expect(renderTemplate(type, { ...FULL_VARS, nicheKey: null }).templateVersion).toBe(`${type}@v2`);
    for (const nicheKey of NICHE_KEYS) {
      expect(renderTemplate(type, { ...FULL_VARS, nicheKey }).templateVersion).toBe(
        `${type}.${nicheKey}@v2`,
      );
    }
  });

  it.each([...CADENCES.inbound, ...CADENCES.refonte].map((s) => s.type))(
    '%s : nicheKey ignoré (inbound et refonte restent génériques)',
    (type) => {
      const email = renderTemplate(type, { ...FULL_VARS, nicheKey: 'of-edtech' });
      expect(email.templateVersion).toBe(`${type}@v2`);
      expect(email.text).not.toContain('ChatGPT');
    },
  );

  it("cold_1 of-edtech parle de ChatGPT (l'angle de vente), pas la générique", () => {
    const ofEdtech = renderTemplate('cold_1', { ...FULL_VARS, nicheKey: 'of-edtech' });
    expect(ofEdtech.text).toContain('ChatGPT');
    const generique = renderTemplate('cold_1', FULL_VARS);
    expect(generique.text).not.toContain('ChatGPT');
    expect(generique.text).not.toContain('Perplexity');
  });

  it('chaque variante cold_1 porte son angle de niche', () => {
    expect(renderTemplate('cold_1', { ...FULL_VARS, nicheKey: 'conciergeries' }).text).toContain(
      'propriétaire',
    );
    expect(renderTemplate('cold_1', { ...FULL_VARS, nicheKey: 'agences-immo' }).text).toContain('mandat');
    expect(renderTemplate('cold_1', { ...FULL_VARS, nicheKey: 'cuisinistes' }).text).toContain('devis');
  });

  it('les montants des variantes restent dans les fourchettes des fiches niche', () => {
    const conciergeries = renderTemplate('cold_2', { ...FULL_VARS, nicheKey: 'conciergeries' });
    expect(conciergeries.text).toContain('2 000 à 4 000 €');
    const cuisinistes = renderTemplate('cold_1', { ...FULL_VARS, nicheKey: 'cuisinistes' });
    expect(cuisinistes.text).toContain('8 000 et 25 000 €');
  });
});

describe('renderTemplate — signature dynamique', () => {
  /** Regex d'un numéro FR, formats 0X XX XX XX XX ou +33 X XX XX XX XX. */
  const PHONE_RE = /(?:\+33[ .]?|0)\d(?:[ .]?\d{2}){4}/;
  const BANNER_URL =
    'https://brfsrpbfqlydzhguqexj.supabase.co/storage/v1/object/public/audit-captures/brand/aurentia-banner.jpg';

  it('signe avec la ligne nom du senderName et le filet de séparation', () => {
    const email = renderTemplate('cold_1', FULL_VARS);
    expect(email.text).toContain('Stéphane - Aurentia.agency\nSite web : https://www.aurentia.agency');
    expect(email.html).toContain('<strong>Stéphane</strong> - Aurentia.agency');
    expect(email.html).toContain('border-top:1px solid #ddd');
  });

  it('inclut la bannière Aurentia dans le HTML, jamais dans le text', () => {
    const email = renderTemplate('cold_1', FULL_VARS);
    expect(email.html).toContain(`<img src="${BANNER_URL}"`);
    expect(email.html).toContain('alt="Aurentia.agency"');
    expect(email.text).not.toContain(BANNER_URL);
  });

  it('Elliot signe avec ses coordonnées complètes (nom, rôle, mail, tél, Linkedin)', () => {
    const email = renderTemplate('cold_1', { ...FULL_VARS, senderName: 'Elliot' });
    expect(email.html).toContain('<strong>Estrade Elliot</strong> - Founder / AI lead - Aurentia.agency');
    expect(email.html).toContain('<strong>Mail</strong> : <a href="mailto:elliot.estrade@gmail.com"');
    expect(email.html).toContain('<strong>Tél</strong> : +33 7 81 95 80 90');
    expect(email.html).toContain(
      '<strong>Linkedin</strong> : <a href="https://www.linkedin.com/in/elliot-estrade-8b7754201/"',
    );
    expect(email.text).toContain('Estrade Elliot - Founder / AI lead - Aurentia.agency');
    expect(email.text).toContain('Mail : elliot.estrade@gmail.com');
    expect(email.text).toContain('Tél : +33 7 81 95 80 90');
    expect(email.text).toContain('Linkedin : https://www.linkedin.com/in/elliot-estrade-8b7754201/');
  });

  it("les autres signataires n'ont ni tél, ni mail, ni Linkedin (inconnus, jamais inventés)", () => {
    for (const senderName of ['Stéphane', 'Olivier', 'Matthieu', 'Fabien']) {
      const email = renderTemplate('inbound_1', { ...FULL_VARS, senderName });
      expect(email.text).toContain(`${senderName} - Aurentia.agency`);
      for (const rendered of [email.text, email.html]) {
        expect(rendered).not.toMatch(PHONE_RE);
        expect(rendered).not.toContain('elliot.estrade@gmail.com');
        expect(rendered).not.toContain('linkedin.com');
        expect(rendered).not.toContain('Founder / AI lead');
      }
    }
  });

  it('retombe sur Elliot (coordonnées complètes) si senderName absent, null ou vide', () => {
    for (const senderName of [undefined, null, '', '   ']) {
      const email = renderTemplate('cold_1', { ...MIN_VARS, senderName });
      expect(email.text).toContain('Estrade Elliot - Founder / AI lead - Aurentia.agency');
      expect(email.text).toContain('+33 7 81 95 80 90');
    }
  });

  it.each(ALL_VARIANT_CASES)(
    '$type ($nicheKey) inclut le lien www.aurentia.agency et la bannière en signature',
    ({ type, nicheKey }) => {
      const email = renderTemplate(type, { ...FULL_VARS, nicheKey });
      expect(email.html).toContain('href="https://www.aurentia.agency"');
      expect(email.html).toContain(BANNER_URL);
      expect(email.text).toContain('Site web : https://www.aurentia.agency');
      expect(email.text).not.toContain(BANNER_URL);
    },
  );
});
