import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import { checkImages } from '../checks-images';

const router = (statuses: Record<string, number>): typeof fetch =>
  (async (input: RequestInfo | URL) => {
    const u = String(input);
    const hit = Object.entries(statuses).find(([path]) => u.endsWith(path));
    return new Response(null, { status: hit ? hit[1] : 404 });
  }) as typeof fetch;

describe('checkImages', () => {
  it('pass quand toutes les images répondent 200', async () => {
    const $ = cheerio.load('<body><img src="/a.jpg"><img src="https://cdn.exemple.fr/b.png"></body>');
    const ms = await checkImages($, 'https://exemple.fr', router({ '/a.jpg': 200, '/b.png': 200 }));
    expect(ms).toHaveLength(1);
    expect(ms[0].id).toBe('images.broken');
    expect(ms[0].status).toBe('pass');
    expect(ms[0].value).toBe(0);
  });

  it('fail avec une measurement par image cassée, preuve = code HTTP', async () => {
    const $ = cheerio.load('<body><img src="/ok.jpg"><img src="/dead.jpg"></body>');
    const ms = await checkImages($, 'https://exemple.fr', router({ '/ok.jpg': 200, '/dead.jpg': 404 }));
    const broken = ms.find((m) => m.id === 'images.broken');
    expect(broken?.status).toBe('fail');
    expect(broken?.value).toBe(1);
    const item = ms.find((m) => m.id === 'images.broken.1');
    expect(item?.proof).toContain('404');
    expect(item?.details).toContain('/dead.jpg');
  });

  it('ignore les data-URI et les srcs vides', async () => {
    const $ = cheerio.load('<body><img src="data:image/png;base64,xyz"><img src=""></body>');
    const ms = await checkImages($, 'https://exemple.fr', router({}));
    expect(ms[0].value).toBe(0);
  });
});
