import { describe, it, expect } from 'vitest';
import { renderPdf } from '../render-pdf';

describe('renderPdf', () => {
  it('POST /pdf et retourne le binaire', async () => {
    let captured: { url: string; body: unknown } | null = null;
    const fakeFetch: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      captured = { url: String(input), body: JSON.parse(String(init?.body)) };
      return new Response(new Uint8Array([37, 80, 68, 70]), { status: 200 }); // %PDF
    }) as typeof fetch;
    const buf = await renderPdf('<html><body>hi</body></html>', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    expect(buf.subarray(0, 4).toString()).toBe('%PDF');
    expect(captured!.url).toBe('https://bl.test/pdf?token=T');
    expect((captured!.body as { html: string }).html).toContain('hi');
  });
});
