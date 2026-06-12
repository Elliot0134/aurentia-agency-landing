import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { start } from 'workflow/api';
import { flashAuditWorkflow, proAuditWorkflow } from '@/workflows/audit-workflows';
import { createJob, getJob, updateJob, listArchivableProJobs, type AuditJob } from '@/lib/audit/jobs';
import { signedPdfUrl } from '@/lib/audit/pdf-url';
import { assertSafeUrl, UnsafeUrlError } from '@/lib/audit/url-safety';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Endpoint machine-to-machine de création/consultation des jobs d'audit.
 * Consommé par : le webhook Stripe (jobs pro), n8n (jobs flash cold + polling
 * du HTML prêt à déposer en draft Gmail + archivage Drive des PDF Pro livrés),
 * le formulaire inbound (via backend).
 *
 * Protégé par header `x-audit-secret` (env AUDIT_JOBS_SECRET). Si l'env est
 * absente, l'endpoint est FERMÉ (401 systématique) : jamais d'endpoint ouvert
 * par oubli de config.
 */

const bodySchema = z.object({
  url: z.string().min(1),
  email: z.email(),
  tier: z.enum(['flash', 'pro']),
  channel: z.enum(['inbound', 'cold']).default('inbound'),
});

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.AUDIT_JOBS_SECRET;
  if (!secret) return false;
  return req.headers.get('x-audit-secret') === secret;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_body', details: parsed.error.issues }, { status: 400 });
  }

  // Anti-SSRF : URL publique uniquement (schéma http(s), pas d'IP privée,
  // pas d'hôte interne). Retourne l'URL normalisée (https par défaut).
  let safeUrl: URL;
  try {
    safeUrl = await assertSafeUrl(parsed.data.url);
  } catch (err) {
    if (err instanceof UnsafeUrlError) {
      return NextResponse.json({ error: 'unsafe_url', message: err.message }, { status: 400 });
    }
    throw err;
  }

  try {
    const job = await createJob({
      email: parsed.data.email.trim().toLowerCase(),
      url: safeUrl.toString(),
      tier: parsed.data.tier,
      channel: parsed.data.channel,
    });

    // Lancement du workflow durable (fire and forget : start() retourne dès
    // que le run est enqueué, cf. doc WDK foundations/starting-workflows.mdx).
    // Deux appels distincts : les deux workflows n'ont pas le même type de
    // retour, l'union ne matche aucune surcharge de start().
    const run =
      parsed.data.tier === 'flash'
        ? await start(flashAuditWorkflow, [job.id])
        : await start(proAuditWorkflow, [job.id]);
    await updateJob(job.id, { workflowRunId: run.runId });

    return NextResponse.json({ jobId: job.id }, { status: 202 });
  } catch (err) {
    console.error('[api/audit/jobs] POST failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

/**
 * TTL des URL signées du bucket privé `audit-pdfs` exposées par cette API :
 * 30 min, le temps pour n8n de télécharger le PDF et l'uploader sur Drive.
 */
const SIGNED_PDF_TTL_SECONDS = 30 * 60;

/**
 * Mode liste : seule la combinaison « jobs Pro livrés pas encore archivés »
 * est supportée (les littéraux sont volontairement stricts : tout autre
 * filtre → 400, pas de listing générique de la table).
 */
const listQuerySchema = z.object({
  status: z.literal('delivered'),
  tier: z.literal('pro'),
  archived: z.literal('false'),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/** Projection liste pour n8n : le strict nécessaire, sans html ni token. */
async function toArchivableJobJson(job: AuditJob) {
  return {
    id: job.id,
    leadId: job.leadId,
    email: job.email,
    url: job.url,
    pdfPath: job.pdfPath,
    score: job.score,
    pdfUrl: job.pdfPath ? await signedPdfUrl(job.pdfPath, SIGNED_PDF_TTL_SECONDS) : null,
  };
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get('id');

  // Mode liste (archivage Drive n8n) : pas d'id, filtres stricts.
  if (!id) {
    const parsed = listQuerySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid_query', details: parsed.error.issues }, { status: 400 });
    }
    try {
      const jobs = await listArchivableProJobs(parsed.data.limit);
      return NextResponse.json({ jobs: await Promise.all(jobs.map(toArchivableJobJson)) });
    } catch (err) {
      console.error('[api/audit/jobs] GET list failed', err);
      return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
  }

  try {
    const job = await getJob(id);
    if (!job) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    if (!job.pdfPath) return NextResponse.json(job);
    // PDF présent : on joint une URL signée pour le télécharger sans clé.
    return NextResponse.json({ ...job, pdfUrl: await signedPdfUrl(job.pdfPath, SIGNED_PDF_TTL_SECONDS) });
  } catch (err) {
    console.error('[api/audit/jobs] GET failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

const patchBodySchema = z.object({
  driveUrl: z.url(),
});

/**
 * Marque un job Pro livré comme archivé sur Google Drive (n8n, après upload
 * du PDF). Uniquement sur un job `delivered` : 404 sinon (même réponse que
 * job inconnu, pas d'oracle sur l'existence des jobs). Idempotent : un
 * re-PATCH écrase drive_url et répond 200.
 */
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'missing_id' }, { status: 400 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = patchBodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_body', details: parsed.error.issues }, { status: 400 });
  }

  try {
    const job = await getJob(id);
    if (!job || job.status !== 'delivered') {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }
    await updateJob(id, { driveUrl: parsed.data.driveUrl });
    return NextResponse.json({ id, driveUrl: parsed.data.driveUrl });
  } catch (err) {
    console.error('[api/audit/jobs] PATCH failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
