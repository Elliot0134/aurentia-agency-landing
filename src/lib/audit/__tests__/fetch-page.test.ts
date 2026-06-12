import { describe, it, expect } from 'vitest';
import { fetchPage } from '../fetch-page';

const fakeFetch = (body: string, status = 200): typeof fetch =>
  (async () => new Response(body, { status, headers: { 'content-type': 'text/html' } })) as typeof fetch;

describe('fetchPage', () => {
  it('retourne le HTML et un cheerio chargé', async () => {
    const page = await fetchPage('https://exemple.fr', fakeFetch('<html><title>Hello</title></html>'));
    expect(page.status).toBe(200);
    expect(page.$('title').text()).toBe('Hello');
  });
  it('conserve l\'URL demandée comme finalUrl si la Response n\'en expose pas', async () => {
    const page = await fetchPage('https://exemple.fr', fakeFetch('<html></html>'));
    expect(page.finalUrl).toBe('https://exemple.fr');
  });
});
