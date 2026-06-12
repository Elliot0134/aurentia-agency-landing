import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import { detectBusinessType } from '../business-type';

describe('detectBusinessType', () => {
  it('détecte un business local (schema LocalBusiness + NAP + ville répétée)', () => {
    const $ = cheerio.load(`<html><head>
      <title>Conciergerie Marseille | Gestion Airbnb</title>
      <script type="application/ld+json">{"@type":"LocalBusiness","address":"x"}</script>
      </head><body>
      <h1>Votre conciergerie à Marseille</h1>
      <p>Conciergerie au coeur de Marseille. Nos équipes sillonnent Marseille.</p>
      <footer>12 rue de la République, 13001 Marseille — 04 91 00 00 00</footer>
      </body></html>`);
    const d = detectBusinessType($);
    expect(d.type).toBe('local');
    expect(d.city).toBe('marseille');
    expect(d.sector).toBe('conciergerie');
  });

  it('détecte un SaaS national (SoftwareApplication + pricing €/mois)', () => {
    const $ = cheerio.load(`<html><head>
      <title>Notory — La plateforme de gestion documentaire</title>
      <script type="application/ld+json">{"@type":"SoftwareApplication"}</script>
      </head><body><h1>Le logiciel SaaS de gestion</h1>
      <p>À partir de 29 € / mois. Essai gratuit de la plateforme.</p></body></html>`);
    const d = detectBusinessType($);
    expect(d.type).toBe('national');
    expect(d.sector).toBe('saas-b2b');
  });

  it('retourne hybrid quand les signaux s\'équilibrent', () => {
    const $ = cheerio.load('<html><head><title>Site</title></head><body><p>Bienvenue.</p></body></html>');
    expect(detectBusinessType($).type).toBe('hybrid');
  });
});
