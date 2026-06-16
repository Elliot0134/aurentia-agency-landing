import { NextResponse, type NextRequest } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { getJob } from '@/lib/audit/jobs';
import { signedPdfUrl } from '@/lib/audit/pdf-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SIGNED_URL_TTL_SECONDS = 3600;

/**
 * Lien STABLE vers le PDF d'un audit Pro : c'est l'URL mise dans Slack et dans
 * Airtable (champ Audit PDF) à ready_for_review. Gardé par le cookie admin ; si
 * loggé, génère une URL signée fraîche du bucket privé et redirige dessus →
 * le navigateur ouvre le PDF directement. Le lien ne périme jamais (l'URL
 * signée éphémère est regénérée à chaque clic).
 */
export async function GET(req: NextRequest, ctx: { params: Promise<{ jobId: string }> }) {
  if (!(await isAdminAuthenticated())) {
    // Pas de session : on renvoie vers l'écran mot de passe.
    return NextResponse.redirect(new URL('/admin/audits', req.url), 307);
  }
  const { jobId } = await ctx.params;
  const job = await getJob(jobId);
  if (!job?.pdfPath) {
    return NextResponse.redirect(new URL('/admin/audits?pdf=introuvable', req.url), 307);
  }
  const url = await signedPdfUrl(job.pdfPath, SIGNED_URL_TTL_SECONDS);
  if (!url) {
    return NextResponse.redirect(new URL('/admin/audits?pdf=introuvable', req.url), 307);
  }
  return NextResponse.redirect(url, 307);
}
