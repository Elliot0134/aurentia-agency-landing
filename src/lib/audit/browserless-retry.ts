export const BROWSERLESS_MAX_ATTEMPTS = 5;

/** Réessaie un appel Browserless sur erreur réseau, timeout, ou HTTP >= 500. Max 5 tentatives. */
export async function withBrowserlessRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= BROWSERLESS_MAX_ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === BROWSERLESS_MAX_ATTEMPTS) break;
      // back-off court : 1s, 2s, 3s, 4s
      await new Promise((r) => setTimeout(r, attempt * 1000));
    }
  }
  throw new Error(`Browserless ${label} a échoué après ${BROWSERLESS_MAX_ATTEMPTS} tentatives : ${String(lastErr)}`);
}
