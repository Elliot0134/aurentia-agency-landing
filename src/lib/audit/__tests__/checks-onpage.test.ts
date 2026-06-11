import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import { checkOnPage } from '../checks-onpage';
import type { Measurement } from '../types';

const page = (html: string) => cheerio.load(html);
const byId = (ms: Measurement[], id: string): Measurement | undefined => ms.find((m) => m.id === id);

describe('checkOnPage', () => {
  it('valide une page correcte', () => {
    const $ = page(`<html><head>
      <title>Conciergerie à Marseille | Gestion Airbnb clé en main</title>
      <meta name="description" content="Gestion complète de votre location courte durée à Marseille : annonces, voyageurs, ménage. Estimation gratuite de vos revenus en 2 minutes.">
      <link rel="canonical" href="https://exemple.fr/">
      </head><body><h1>Conciergerie Airbnb à Marseille</h1><img src="/a.jpg" alt="appartement"></body></html>`);
    const ms = checkOnPage($, 'https://exemple.fr');
    expect(byId(ms, 'seo.title.present')?.status).toBe('pass');
    expect(byId(ms, 'seo.title.length')?.status).toBe('pass');
    expect(byId(ms, 'seo.meta-description.present')?.status).toBe('pass');
    expect(byId(ms, 'seo.h1.unique')?.status).toBe('pass');
    expect(byId(ms, 'seo.images.alt')?.status).toBe('pass');
    expect(byId(ms, 'seo.canonical.present')?.status).toBe('pass');
  });

  it('détecte les défauts classiques', () => {
    const $ = page(`<html><head><title>Accueil</title></head>
      <body><h1>Un</h1><h1>Deux</h1><img src="/a.jpg"><img src="/b.jpg" alt=""></body></html>`);
    const ms = checkOnPage($, 'https://exemple.fr');
    expect(byId(ms, 'seo.title.length')?.status).toBe('fail'); // trop court
    expect(byId(ms, 'seo.meta-description.present')?.status).toBe('fail');
    expect(byId(ms, 'seo.h1.unique')?.status).toBe('fail'); // 2 h1
    expect(byId(ms, 'seo.images.alt')?.status).toBe('fail'); // 2 sans alt
    expect(byId(ms, 'seo.images.alt')?.value).toBe(2);
  });
});
