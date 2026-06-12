import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import { checkLocalSeo, localSeoBreakdown } from '../local-seo';
import type { BusinessDetection, Measurement } from '../types';

const localBiz = (city: string | null = 'marseille'): BusinessDetection => ({
  type: 'local',
  scoreLocal: 6,
  scoreNational: 0,
  city,
  sector: 'conciergerie',
});

/** Site local complet : phone + adresse dans le corps + schema complet + ville dans le title. */
const FULL_HTML = `<html><head>
  <title>Conciergerie Marseille | Gestion Airbnb clé en main</title>
  <script type="application/ld+json">${JSON.stringify({
    '@type': 'LocalBusiness',
    name: 'Conciergerie Exemple',
    geo: { '@type': 'GeoCoordinates', latitude: 43.2965, longitude: 5.3698 },
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', opens: '09:00' },
  })}</script>
  </head><body>
  <h1>Votre conciergerie à Marseille</h1>
  <p>Contactez-nous au 04 91 00 00 00. Agence : 12 rue de la République, 13001 Marseille.</p>
  <footer>Mentions légales</footer>
  </body></html>`;

/** Site local lacunaire : pas de téléphone, adresse uniquement en footer, aucun schema. */
const POOR_HTML = `<html><head>
  <title>Conciergerie haut de gamme</title>
  </head><body>
  <h1>Votre bien entre de bonnes mains</h1>
  <p>Nous gérons votre logement de A à Z.</p>
  <footer>12 rue de la République, 13001 Marseille</footer>
  </body></html>`;

const byId = (ms: Measurement[], id: string): Measurement => {
  const m = ms.find((x) => x.id === id);
  expect(m, `measurement ${id} absente`).toBeDefined();
  return m as Measurement;
};

describe('checkLocalSeo', () => {
  it('site local complet : tout pass, module local-seo, ids local.*', () => {
    const ms = checkLocalSeo(cheerio.load(FULL_HTML), localBiz());
    expect(ms.every((m) => m.module === 'local-seo')).toBe(true);
    expect(ms.every((m) => m.id.startsWith('local.'))).toBe(true);
    expect(byId(ms, 'local.nap.phone').status).toBe('pass');
    expect(String(byId(ms, 'local.nap.phone').value)).toContain('04 91');
    expect(byId(ms, 'local.nap.address').status).toBe('pass');
    expect(byId(ms, 'local.nap.address').proof).toContain('13001');
    expect(byId(ms, 'local.schema.localbusiness').status).toBe('pass');
    expect(byId(ms, 'local.schema.geo').status).toBe('pass');
    expect(byId(ms, 'local.schema.hours').status).toBe('pass');
    expect(byId(ms, 'local.city.title').status).toBe('pass');
  });

  it('site local lacunaire : phone fail avec details, adresse footer-only warn, schema fail', () => {
    const ms = checkLocalSeo(cheerio.load(POOR_HTML), localBiz());
    const phone = byId(ms, 'local.nap.phone');
    expect(phone.status).toBe('fail');
    expect(phone.details).toContain('aucun numéro de téléphone visible');
    const address = byId(ms, 'local.nap.address');
    expect(address.status).toBe('warn');
    expect(address.details).toContain('pied de page');
    expect(byId(ms, 'local.schema.localbusiness').status).toBe('fail');
    expect(byId(ms, 'local.schema.geo').status).toBe('fail');
    expect(byId(ms, 'local.schema.hours').status).toBe('fail');
    expect(byId(ms, 'local.city.title').status).toBe('fail');
  });

  it('la ligne local.gbp.unverified est toujours info (jamais de score GBP inventé)', () => {
    for (const html of [FULL_HTML, POOR_HTML]) {
      const gbp = byId(checkLocalSeo(cheerio.load(html), localBiz()), 'local.gbp.unverified');
      expect(gbp.status).toBe('info');
      expect(gbp.value).toBeNull();
      expect(gbp.details).toContain('relecture humaine');
    }
  });

  it('ville non détectée (city null) : local.city.title fail, pas de plantage', () => {
    const ms = checkLocalSeo(cheerio.load(FULL_HTML), localBiz(null));
    expect(byId(ms, 'local.city.title').status).toBe('fail');
  });
});

describe('localSeoBreakdown', () => {
  it('site complet : total 55/55, non-mesurés (GBP/CITATIONS/REVIEWS) exclus du total et du max', () => {
    const ms = checkLocalSeo(cheerio.load(FULL_HTML), localBiz());
    const { total, max, rows } = localSeoBreakdown(ms);
    expect(total).toBe(55);
    expect(max).toBe(55); // PAS 100 : GBP /25, CITATIONS /10, REVIEWS /10 non comptés
    expect(rows.map((r) => r.label)).toEqual(['GBP', 'ON PAGE', 'SCHEMA', 'NAP', 'CITATIONS', 'REVIEWS']);
    for (const label of ['GBP', 'CITATIONS', 'REVIEWS']) {
      const row = rows.find((r) => r.label === label)!;
      expect(row.measured).toBe(false);
      expect(row.score).toBe(0);
    }
    expect(rows.find((r) => r.label === 'ON PAGE')).toEqual({ label: 'ON PAGE', score: 20, max: 20, measured: true });
    expect(rows.find((r) => r.label === 'SCHEMA')).toEqual({ label: 'SCHEMA', score: 20, max: 20, measured: true });
    expect(rows.find((r) => r.label === 'NAP')).toEqual({ label: 'NAP', score: 15, max: 15, measured: true });
  });

  it('site lacunaire : breakdown bas (adresse warn = points réduits)', () => {
    const ms = checkLocalSeo(cheerio.load(POOR_HTML), localBiz());
    const { total, max, rows } = localSeoBreakdown(ms);
    // ON PAGE : city.title fail (0) + adresse warn (5) = 5/20
    expect(rows.find((r) => r.label === 'ON PAGE')!.score).toBe(5);
    // SCHEMA : tout fail = 0/20
    expect(rows.find((r) => r.label === 'SCHEMA')!.score).toBe(0);
    // NAP : phone fail (0) + adresse warn (3) = 3/15
    expect(rows.find((r) => r.label === 'NAP')!.score).toBe(3);
    expect(total).toBe(8);
    expect(max).toBe(55);
  });

  it('sans aucune mesure locale : total 0, max 0, toutes les lignes non mesurées', () => {
    const { total, max, rows } = localSeoBreakdown([]);
    expect(total).toBe(0);
    expect(max).toBe(0);
    expect(rows.every((r) => !r.measured && r.score === 0)).toBe(true);
  });
});
