import { describe, it, expect, vi } from 'vitest';
import { signedPdfUrl, type PdfStorage } from '../pdf-url';

function fakeStorage(result: { data: { signedUrl: string } | null; error: { message: string } | null }): {
  storage: PdfStorage;
  calls: Array<{ bucket: string; path: string; expiresIn: number }>;
} {
  const calls: Array<{ bucket: string; path: string; expiresIn: number }> = [];
  const storage: PdfStorage = {
    from: (bucket: string) => ({
      createSignedUrl: (path: string, expiresIn: number) => {
        calls.push({ bucket, path, expiresIn });
        return Promise.resolve(result);
      },
    }),
  };
  return { storage, calls };
}

describe('signedPdfUrl', () => {
  it('signe le chemin dans le bucket privé audit-pdfs avec le TTL demandé', async () => {
    const { storage, calls } = fakeStorage({
      data: { signedUrl: 'https://supabase.example/sign/audit-pdfs/pro/job-1/audit.pdf?token=abc' },
      error: null,
    });
    const url = await signedPdfUrl('pro/job-1/audit.pdf', 1800, storage);
    expect(url).toBe('https://supabase.example/sign/audit-pdfs/pro/job-1/audit.pdf?token=abc');
    expect(calls).toEqual([{ bucket: 'audit-pdfs', path: 'pro/job-1/audit.pdf', expiresIn: 1800 }]);
  });

  it('retourne null (et log) si le storage répond en erreur', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { storage } = fakeStorage({ data: null, error: { message: 'Object not found' } });
    expect(await signedPdfUrl('pro/job-x/audit.pdf', 1800, storage)).toBeNull();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('retourne null si la réponse ne contient pas de signedUrl', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { storage } = fakeStorage({ data: null, error: null });
    expect(await signedPdfUrl('pro/job-x/audit.pdf', 1800, storage)).toBeNull();
    errorSpy.mockRestore();
  });
});
