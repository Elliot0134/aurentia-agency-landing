import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { listReviewableProJobs, type AuditJob } from '@/lib/audit/jobs';
import { signedPdfUrl } from '@/lib/audit/pdf-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · Audits à relire',
  robots: { index: false, follow: false },
};

const SIGNED_URL_TTL_SECONDS = 3600;

const C = {
  bg: '#f0ece2',
  card: '#ffffff',
  border: '#e9e4d8',
  text: '#2b2b28',
  muted: '#83817a',
  accent: '#c96442',
  ok: '#3f7d4f',
  bad: '#b4453a',
};

const styles = {
  page: {
    minHeight: '100vh',
    margin: 0,
    padding: '40px 16px',
    background: C.bg,
    color: C.text,
    fontFamily: "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  shell: { maxWidth: 860, margin: '0 auto' },
  wordmark: { fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: C.accent },
  h1: { fontSize: 24, fontWeight: 700, margin: '20px 0 4px' },
  card: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22, marginBottom: 16 },
  row: { display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: 6, columnGap: 12, fontSize: 14, margin: '0 0 16px' },
  dt: { color: C.muted, margin: 0 },
  dd: { margin: 0, fontWeight: 600, wordBreak: 'break-all' },
  actions: { display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' },
  btn: {
    display: 'inline-block',
    background: C.accent,
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 600,
    textDecoration: 'none',
    padding: '11px 20px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
  },
  btnGhost: {
    display: 'inline-block',
    background: C.card,
    color: C.accent,
    fontSize: 15,
    fontWeight: 600,
    textDecoration: 'none',
    padding: '10px 19px',
    borderRadius: 10,
    border: `1px solid ${C.accent}`,
    cursor: 'pointer',
  },
  input: { fontSize: 15, padding: '11px 14px', borderRadius: 10, border: `1px solid ${C.border}`, background: C.card },
  banner: { padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, marginBottom: 20 },
  summary: { cursor: 'pointer', fontSize: 14, fontWeight: 600, color: C.accent },
  iframe: { width: '100%', height: '75vh', border: `1px solid ${C.border}`, borderRadius: 12, marginTop: 12 },
} satisfies Record<string, CSSProperties>;

function Shell({ children }: { children: ReactNode }) {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.wordmark}>
          Aurentia<span style={{ color: C.text }}>.agency</span>
        </div>
        {children}
      </div>
    </main>
  );
}

function LoginForm({ error }: { error: boolean }) {
  return (
    <Shell>
      <h1 style={styles.h1}>Espace de relecture</h1>
      <p style={{ color: C.muted, marginBottom: 20 }}>Cet espace est réservé. Entrez le mot de passe.</p>
      {error && (
        <div style={{ ...styles.banner, background: '#f7e4e1', color: C.bad }}>Mot de passe incorrect.</div>
      )}
      <form method="POST" action="/admin/login" style={styles.actions}>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          autoComplete="current-password"
          required
          style={{ ...styles.input, minWidth: 240 }}
        />
        <button type="submit" style={styles.btn}>
          Entrer
        </button>
      </form>
    </Shell>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Paris' });
}

function cleanDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <>
      <dt style={styles.dt}>{label}</dt>
      <dd style={styles.dd}>{value}</dd>
    </>
  );
}

const SEND_MESSAGES: Record<string, { text: string; ok: boolean }> = {
  ok: { text: 'Audit envoyé au client.', ok: true },
  already_sent: { text: 'Cet audit a déjà été envoyé.', ok: false },
  not_ready: { text: "Le job n'est plus en relecture.", ok: false },
  not_found: { text: 'Job introuvable.', ok: false },
  resend_failed: { text: "L'envoi a échoué (Resend). Statut intact, réessaie.", ok: false },
  pdf_download_failed: { text: 'PDF introuvable dans le bucket.', ok: false },
};

const UPLOAD_MESSAGES: Record<string, { text: string; ok: boolean }> = {
  ok: { text: 'PDF remplacé. Tu peux le retélécharger pour vérifier, puis envoyer.', ok: true },
  not_a_pdf: { text: "Le fichier n'est pas un PDF.", ok: false },
  no_file: { text: 'Aucun fichier reçu.', ok: false },
  upload_failed: { text: 'Upload échoué, réessaie.', ok: false },
  already_sent: { text: 'Audit déjà envoyé : remplacement refusé.', ok: false },
};

function Banner({ map, code }: { map: Record<string, { text: string; ok: boolean }>; code?: string }) {
  const m = code ? map[code] : undefined;
  if (!m) return null;
  return (
    <div style={{ ...styles.banner, background: m.ok ? '#e3f0e6' : '#f7e4e1', color: m.ok ? C.ok : C.bad }}>
      {m.text}
    </div>
  );
}

function JobCard({ job, pdfUrl }: { job: AuditJob; pdfUrl: string | null }) {
  const domain = cleanDomain(job.url);
  return (
    <div id={job.id} style={styles.card}>
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 14px' }}>{domain}</h2>
      <dl style={styles.row}>
        <Row label="Site" value={<a href={job.url} target="_blank" rel="noreferrer" style={{ color: C.accent }}>{job.url}</a>} />
        <Row label="Client" value={job.email} />
        <Row label="Score" value={job.score ?? '?'} />
        <Row label="Impact" value={job.impactPercent !== null ? `${job.impactPercent} %` : '?'} />
        <Row label="Créé le" value={formatDate(job.createdAt)} />
      </dl>
      <div style={styles.actions}>
        {pdfUrl ? (
          <a href={pdfUrl} target="_blank" rel="noreferrer" style={styles.btnGhost}>
            Télécharger le PDF
          </a>
        ) : (
          <span style={{ color: C.bad, fontSize: 14 }}>PDF introuvable ({job.pdfPath ?? 'chemin absent'})</span>
        )}

        <form method="POST" action={`/api/admin/audits/${job.id}/pdf`} encType="multipart/form-data" style={styles.actions}>
          <input type="file" name="pdf" accept="application/pdf" required style={{ fontSize: 13 }} />
          <button type="submit" style={styles.btnGhost}>
            Remplacer le PDF
          </button>
        </form>

        <form method="POST" action={`/api/admin/audits/${job.id}/send`}>
          <button type="submit" style={styles.btn}>
            Envoyer au client
          </button>
        </form>
      </div>

      {pdfUrl && (
        <details style={{ marginTop: 16 }}>
          <summary style={styles.summary}>Prévisualiser le PDF</summary>
          <iframe title={`Aperçu de l'audit ${domain}`} src={pdfUrl} style={styles.iframe} />
        </details>
      )}
    </div>
  );
}

export default async function AdminAuditsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  if (!(await isAdminAuthenticated())) {
    return <LoginForm error={sp.error === '1'} />;
  }

  const jobs = await listReviewableProJobs(50);
  const withUrls = await Promise.all(
    jobs.map(async (job) => ({ job, pdfUrl: job.pdfPath ? await signedPdfUrl(job.pdfPath, SIGNED_URL_TTL_SECONDS) : null })),
  );

  const sendCode = typeof sp.send === 'string' ? sp.send : undefined;
  const uploadCode = typeof sp.upload === 'string' ? sp.upload : undefined;

  return (
    <Shell>
      <h1 style={styles.h1}>Audits Pro à relire</h1>
      <p style={{ color: C.muted, marginBottom: 20 }}>
        {withUrls.length === 0 ? 'Aucun audit en attente de relecture.' : `${withUrls.length} audit(s) en attente.`}
      </p>
      <Banner map={SEND_MESSAGES} code={sendCode} />
      <Banner map={UPLOAD_MESSAGES} code={uploadCode} />
      {withUrls.map(({ job, pdfUrl }) => (
        <JobCard key={job.id} job={job} pdfUrl={pdfUrl} />
      ))}
    </Shell>
  );
}
