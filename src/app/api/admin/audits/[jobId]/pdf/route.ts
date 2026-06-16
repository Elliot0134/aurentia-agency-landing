import { NextResponse, type NextRequest } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { getJob } from '@/lib/audit/jobs';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BUCKET = 'audit-pdfs';

/** Réponse selon le client : redirige (form HTML) ou JSON (machine). */
function respond(req: NextRequest, jobId: string, htmlStatus: string, json: object, code: number) {
  if ((req.headers.get('accept') ?? '').includes('text/html')) {
    return NextResponse.redirect(new URL(`/admin/audits?upload=${htmlStatus}#${jobId}`, req.url), 303);
  }
  return NextResponse.json(json, { status: code });
}

/**
 * Remplace le PDF d'un job Pro par un PDF uploadé (correction manuelle avant
 * envoi). Gardé par le cookie admin. Écrase le pdf_path existant dans le bucket
 * privé. Refuse un job déjà delivered (on ne réécrit pas un audit déjà parti).
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ jobId: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { jobId } = await ctx.params;

  const job = await getJob(jobId);
  if (!job) return respond(req, jobId, 'not_found', { error: 'not_found' }, 404);
  if (job.status === 'delivered') return respond(req, jobId, 'already_sent', { error: 'already_sent' }, 409);
  if (!job.pdfPath) return respond(req, jobId, 'missing_pdf_path', { error: 'missing_pdf_path' }, 409);

  const form = await req.formData().catch(() => null);
  const file = form?.get('pdf');
  if (!(file instanceof File) || file.size === 0) {
    return respond(req, jobId, 'no_file', { error: 'no_file' }, 400);
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  // Validation : vrai PDF (entête %PDF). Empêche d'uploader autre chose par erreur.
  if (!bytes.subarray(0, 5).toString('latin1').startsWith('%PDF')) {
    return respond(req, jobId, 'not_a_pdf', { error: 'not_a_pdf' }, 400);
  }

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(job.pdfPath, bytes, { contentType: 'application/pdf', upsert: true });
  if (error) {
    console.error(`[admin/pdf] upload échoué (${job.pdfPath})`, error);
    return respond(req, jobId, 'upload_failed', { error: 'upload_failed' }, 502);
  }
  return respond(req, jobId, 'ok', { ok: true }, 200);
}
