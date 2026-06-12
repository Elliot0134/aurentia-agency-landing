import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * URL signée d'un PDF d'audit dans le bucket PRIVÉ `audit-pdfs`. Seule façon
 * légitime d'exposer un PDF à l'extérieur sans clé Supabase : la page de
 * relecture (gate humain) et l'API jobs (archivage Drive n8n) passent ici.
 *
 * Le storage est injectable (défaut : supabaseAdmin.storage) pour les tests,
 * même pattern que AuditJobsDb dans jobs.ts.
 */

const BUCKET = 'audit-pdfs';

interface StorageError {
  message: string;
}

/** Sous-ensemble structurel du client Storage Supabase utilisé ici. */
export interface PdfStorage {
  from(bucket: string): {
    createSignedUrl(
      path: string,
      expiresIn: number,
    ): PromiseLike<{ data: { signedUrl: string } | null; error: StorageError | null }>;
  };
}

export async function signedPdfUrl(
  pdfPath: string,
  ttlSeconds: number,
  storage: PdfStorage = supabaseAdmin.storage,
): Promise<string | null> {
  const { data, error } = await storage.from(BUCKET).createSignedUrl(pdfPath, ttlSeconds);
  if (error || !data?.signedUrl) {
    console.error(`[audit/pdf-url] URL signée impossible pour ${pdfPath}`, error);
    return null;
  }
  return data.signedUrl;
}
