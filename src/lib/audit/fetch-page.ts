import * as cheerio from 'cheerio';

export interface FetchedPage {
  finalUrl: string;
  status: number;
  html: string;
  $: cheerio.CheerioAPI;
  headers: Headers;
}

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.5',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
};

export async function fetchPage(url: string, fetchFn: typeof fetch = fetch): Promise<FetchedPage> {
  const res = await fetchFn(url, {
    headers: BROWSER_HEADERS,
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
  });
  const html = await res.text();
  return {
    finalUrl: res.url || url,
    status: res.status,
    html,
    $: cheerio.load(html),
    headers: res.headers,
  };
}
