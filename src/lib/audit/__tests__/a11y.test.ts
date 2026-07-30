import { describe, it, expect, vi, afterEach } from 'vitest';
import { runAxe, a11yToMeasurements, type A11yPageResult, type AxeViolation } from '../a11y';

const v = (id: string, impact: string, nodes: number, description = `desc ${id}`): AxeViolation => ({
  id,
  impact,
  description,
  nodes,
});

describe('runAxe', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('POST sur /function avec le code axe et parse data.violations', async () => {
    let captured: { url: string; body: { code: string; context: { url: string } } } | null = null;
    const fakeFetch: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      captured = { url: String(input), body: JSON.parse(String(init?.body)) as { code: string; context: { url: string } } };
      return new Response(
        JSON.stringify({
          data: { violations: [{ id: 'color-contrast', impact: 'serious', description: 'Contraste insuffisant', nodes: 5 }] },
          type: 'application/json',
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const result = await runAxe('https://exemple.fr/', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);

    expect(captured!.url).toBe('https://bl.test/function?token=T');
    expect(captured!.body.context.url).toBe('https://exemple.fr/');
    expect(captured!.body.code).toContain('axe.min.js');
    expect(captured!.body.code).toContain('wcag22aa');
    expect(result.url).toBe('https://exemple.fr/');
    expect(result.violations).toEqual([
      { id: 'color-contrast', impact: 'serious', description: 'Contraste insuffisant', nodes: 5 },
    ]);
  });

  it('remonte le nombre de règles axe RESPECTÉES (dénominateur du score a11y)', async () => {
    let body: { code: string } | null = null;
    const fakeFetch: typeof fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      body = JSON.parse(String(init?.body)) as { code: string };
      return new Response(
        JSON.stringify({
          data: { violations: [{ id: 'color-contrast', impact: 'serious', description: 'x', nodes: 5 }], passes: 94 },
          type: 'application/json',
        }),
        { status: 200 },
      );
    }) as typeof fetch;

    const result = await runAxe('https://exemple.fr/', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);

    // axe renvoie results.passes : sans lui, aucun dénominateur honnête possible.
    expect(body!.code).toContain('passes');
    expect(result.passes).toBe(94);
  });

  it('throw après 5 échecs HTTP persistants (jamais de faux "conforme")', async () => {
    vi.useFakeTimers();
    let calls = 0;
    const fakeFetch: typeof fetch = (async () => {
      calls++;
      return new Response('boom', { status: 500 });
    }) as typeof fetch;
    const promise = runAxe('https://exemple.fr/', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    const assertion = expect(promise).rejects.toThrow(/5 tentatives/);
    await vi.runAllTimersAsync();
    await assertion;
    expect(calls).toBe(5);
  });

  it('throw si la réponse 200 ne contient pas data.violations (réponse inexploitable)', async () => {
    vi.useFakeTimers();
    const fakeFetch: typeof fetch = (async () =>
      new Response(JSON.stringify({ type: 'application/json' }), { status: 200 })) as typeof fetch;
    const promise = runAxe('https://exemple.fr/', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    const assertion = expect(promise).rejects.toThrow();
    await vi.runAllTimersAsync();
    await assertion;
  });
});

describe('a11yToMeasurements', () => {
  it('zéro violation → a11y.violations.total pass', () => {
    const results: A11yPageResult[] = [
      { url: 'https://exemple.fr/', violations: [], passes: 95 },
      { url: 'https://exemple.fr/contact', violations: [], passes: 95 },
    ];
    const ms = a11yToMeasurements(results);
    expect(ms.find((m) => m.id === 'a11y.violations.total')).toMatchObject({
      id: 'a11y.violations.total',
      module: 'a11y',
      status: 'pass',
      value: 0,
      details: 'Aucune violation WCAG 2.2 AA détectée (axe-core)',
    });
    // Zéro violation → 100 % des règles respectées.
    expect(ms.find((m) => m.id === 'a11y.rules.passrate')).toMatchObject({ status: 'info', value: 100 });
  });

  it('émet a11y.rules.passrate : taux de règles axe respectées, en info', () => {
    // 3 pages, 94 + 94 + 94 = 282 règles respectées, 9 violations cumulées.
    // 282 / (282 + 9) = 96,9 %.
    const results: A11yPageResult[] = [
      { url: 'https://exemple.fr/', violations: [v('meta-viewport', 'critical', 1), v('color-contrast', 'serious', 3), v('link-name', 'serious', 1)], passes: 94 },
      { url: 'https://exemple.fr/sitemap', violations: [v('meta-viewport', 'critical', 1), v('color-contrast', 'serious', 2), v('link-name', 'serious', 1)], passes: 94 },
      { url: 'https://exemple.fr/404', violations: [v('meta-viewport', 'critical', 1), v('color-contrast', 'serious', 2), v('link-name', 'serious', 1)], passes: 94 },
    ];
    const ms = a11yToMeasurements(results);

    const rate = ms.find((m) => m.id === 'a11y.rules.passrate');
    expect(rate).toBeDefined();
    // info : ne doit PAS entrer dans le calcul générique de taux de réussite,
    // ni s'afficher comme un faux pass/fail dans le rapport.
    expect(rate!.status).toBe('info');
    expect(rate!.value).toBe(96.9);
    expect(rate!.unit).toBe('%');
    expect(rate!.proof).toContain('282');
    expect(rate!.proof).toContain('9');
  });

  it('aucune règle exécutée (passes 0) → pas de passrate inventé', () => {
    const results: A11yPageResult[] = [{ url: 'https://exemple.fr/', violations: [], passes: 0 }];
    const ms = a11yToMeasurements(results);
    expect(ms.find((m) => m.id === 'a11y.rules.passrate')).toBeUndefined();
  });

  it('violations serious → total fail + une measurement par type avec nodes cumulés', () => {
    const results: A11yPageResult[] = [
      {
        url: 'https://exemple.fr/',
        violations: [v('color-contrast', 'serious', 5, 'Contraste insuffisant'), v('image-alt', 'moderate', 2)],
        passes: 93,
      },
      { url: 'https://exemple.fr/contact', violations: [v('color-contrast', 'serious', 3, 'Contraste insuffisant')], passes: 94 },
    ];
    const ms = a11yToMeasurements(results);

    const total = ms.find((m) => m.id === 'a11y.violations.total');
    expect(total).toBeDefined();
    expect(total!.status).toBe('fail'); // serious présent
    expect(total!.value).toBe(3); // 3 violations cumulées toutes pages
    expect(total!.details).toContain('color-contrast (serious)');
    expect(total!.details).toContain('/');

    const contrast = ms.find((m) => m.id === 'a11y.color-contrast');
    expect(contrast).toBeDefined();
    expect(contrast!.module).toBe('a11y');
    expect(contrast!.status).toBe('fail');
    expect(contrast!.value).toBe(8); // 5 + 3 nodes cumulés
    expect(contrast!.proof).toContain('/contact');
    expect(contrast!.details).toBe('Contraste insuffisant');

    const alt = ms.find((m) => m.id === 'a11y.image-alt');
    expect(alt).toBeDefined();
    expect(alt!.status).toBe('warn'); // moderate seulement
    expect(alt!.value).toBe(2);
  });

  it('violations uniquement minor/moderate → total warn', () => {
    const results: A11yPageResult[] = [
      { url: 'https://exemple.fr/', violations: [v('landmark-one-main', 'moderate', 1), v('region', 'minor', 4)], passes: 93 },
    ];
    const ms = a11yToMeasurements(results);
    const total = ms.find((m) => m.id === 'a11y.violations.total');
    expect(total!.status).toBe('warn');
    expect(total!.value).toBe(2);
  });

  it('cap à 8 types de violations distincts', () => {
    const violations = Array.from({ length: 12 }, (_, i) => v(`rule-${i}`, 'serious', i + 1));
    const results: A11yPageResult[] = [{ url: 'https://exemple.fr/', violations, passes: 83 }];
    const ms = a11yToMeasurements(results);
    expect(ms.filter((m) => m.id.startsWith('a11y.') && !m.id.startsWith('a11y.violations.') && m.id !== 'a11y.rules.passrate')).toHaveLength(8);
    // ids uniques
    const ids = ms.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
