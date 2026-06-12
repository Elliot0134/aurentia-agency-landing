import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { getJob, type AuditJob } from '@/lib/audit/jobs';
import { evaluateReviewGate } from '@/lib/audit/review-gate';
import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * Gate humain de relecture des PDF Pro. Page utilitaire INTERNE (lien Slack
 * /audit/review/<jobId>?token=<hmac>) : volontairement hors design system du
 * site (styles inline, pas de composants v2, pas de SEO). Relire + envoyer,
 * rien n'est modifiable ici ; retoucher le PDF = régénérer (hors scope v1).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Relecture audit Pro',
  robots: { index: false, follow: false },
};

const BUCKET = 'audit-pdfs';
const SIGNED_URL_TTL_SECONDS = 3600; // 1h : le temps d'une relecture.

const styles = {
  page: {
    minHeight: '100vh',
    margin: 0,
    padding: '32px 16px',
    background: '#f0ece2',
    color: '#2b2b28',
    fontFamily: "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  card: {
    maxWidth: 960,
    margin: '0 auto',
    background: '#ffffff',
    border: '1px solid #e9e4d8',
    borderRadius: 16,
    padding: 28,
  },
  h1: { margin: '0 0 16px', fontSize: 22, fontWeight: 700 },
  muted: { color: '#83817a' },
  dl: {
    display: 'grid',
    gridTemplateColumns: '160px 1fr',
    rowGap: 8,
    columnGap: 12,
    margin: '0 0 20px',
    fontSize: 15,
  },
  dt: { color: '#83817a', margin: 0 },
  dd: { margin: 0, fontWeight: 600 },
  iframe: {
    width: '100%',
    height: '75vh',
    border: '1px solid #e9e4d8',
    borderRadius: 12,
    marginBottom: 20,
  },
  button: {
    display: 'inline-block',
    background: '#c96442',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 600,
    border: 'none',
    padding: '14px 26px',
    borderRadius: 12,
    cursor: 'pointer',
  },
  buttonDisabled: {
    background: '#e9e4d8',
    color: '#83817a',
    cursor: 'not-allowed',
  },
} satisfies Record<string, CSSProperties>;

function Shell({ children }: { children: ReactNode }) {
  return (
    <main style={styles.page}>
      <div style={styles.card}>{children}</div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <>
      <dt style={styles.dt}>{label}</dt>
      <dd style={styles.dd}>{value}</dd>
    </>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Paris' });
}

async function signedPdfUrl(job: AuditJob): Promise<string | null> {
  if (!job.pdfPath) return null;
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(job.pdfPath, SIGNED_URL_TTL_SECONDS);
  if (error || !data?.signedUrl) {
    console.error(`[audit/review] URL signée impossible pour ${job.pdfPath}`, error);
    return null;
  }
  return data.signedUrl;
}

export default async function ReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ jobId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { jobId } = await params;
  const sp = await searchParams;
  const token = typeof sp.token === 'string' ? sp.token : undefined;

  // Passe 1 sans statut : token absent/faux → on s'arrête avant tout accès DB.
  if (evaluateReviewGate(jobId, token, 'ready_for_review') === 'invalid') {
    return (
      <Shell>
        <h1 style={styles.h1}>Lien invalide</h1>
        <p style={styles.muted}>Ce lien de relecture est invalide ou expiré. Reprends le lien depuis Slack.</p>
      </Shell>
    );
  }

  const job = await getJob(jobId);
  const gate = evaluateReviewGate(jobId, token, job?.status ?? null);

  if (gate === 'invalid' || !job) {
    return (
      <Shell>
        <h1 style={styles.h1}>Lien invalide</h1>
        <p style={styles.muted}>Job introuvable. Reprends le lien depuis Slack.</p>
      </Shell>
    );
  }

  if (gate === 'not-ready') {
    return (
      <Shell>
        <h1 style={styles.h1}>Job pas en relecture</h1>
        <p style={styles.muted}>
          Statut actuel : <strong style={{ color: '#2b2b28' }}>{job.status}</strong>. La page de relecture ne
          s&apos;ouvre que pour un job <code>ready_for_review</code> (ou déjà <code>delivered</code>).
        </p>
      </Shell>
    );
  }

  const delivered = job.status === 'delivered';
  const pdfUrl = await signedPdfUrl(job);

  return (
    <Shell>
      <h1 style={styles.h1}>Relecture audit Pro</h1>

      <dl style={styles.dl}>
        <Row
          label="Site audité"
          value={
            <a href={job.url} target="_blank" rel="noreferrer" style={{ color: '#c96442' }}>
              {job.url}
            </a>
          }
        />
        <Row label="Email client" value={job.email} />
        <Row label="Score" value={job.score ?? '?'} />
        <Row label="Impact estimé" value={job.impactPercent !== null ? `${job.impactPercent} %` : '?'} />
        <Row label="Modèle rédacteur" value={job.writerModel ?? '?'} />
        <Row label="Créé le" value={formatDate(job.createdAt)} />
        <Row label="Statut" value={delivered ? `delivered (envoyé le ${formatDate(job.updatedAt)})` : job.status} />
      </dl>

      {pdfUrl ? (
        <iframe title="PDF de l'audit Pro" src={pdfUrl} style={styles.iframe} />
      ) : (
        <p style={{ ...styles.muted, marginBottom: 20 }}>
          PDF introuvable dans le bucket ({job.pdfPath ?? 'chemin absent'}) : ne pas envoyer, voir les logs.
        </p>
      )}

      <form method="POST" action={`/api/audit/review/${jobId}/send`}>
        <input type="hidden" name="token" value={token} />
        <button
          type="submit"
          disabled={delivered || !pdfUrl}
          style={delivered || !pdfUrl ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        >
          {delivered ? `Envoyé au client le ${formatDate(job.updatedAt)}` : 'Envoyer au client'}
        </button>
      </form>
      {!delivered && (
        <p style={{ ...styles.muted, fontSize: 13, marginTop: 12 }}>
          L&apos;envoi part immédiatement par email à {job.email} avec le PDF en pièce jointe, puis passe le job en
          delivered. Pour retoucher le rapport : régénérer l&apos;audit, pas de retouche ici.
        </p>
      )}
    </Shell>
  );
}
