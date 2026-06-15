import { NextResponse, type NextRequest } from "next/server";
import { start } from "workflow/api";
import { flashAuditWorkflow } from "@/workflows/audit-workflows";
import { createJob, updateJob } from "@/lib/audit/jobs";
import { assertSafeUrl, UnsafeUrlError } from "@/lib/audit/url-safety";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SLACK_WEBHOOK_URL = process.env.SLACK_AUDIT_WEBHOOK_URL;

/** Notification Slack à l'équipe pour qu'aucun lead ne passe à la trappe. */
async function notifySlack(site: string, email: string, source: string) {
  if (!SLACK_WEBHOOK_URL) return;
  await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `🔔 *Nouveau pré-audit Flash (inbound)*\n• Site : ${site}\n• Email : ${email}\n• Source : ${source}`,
    }),
  });
}

/**
 * Formulaire public de la page /audit : un visiteur laisse son site + email
 * pour recevoir son audit Flash gratuit.
 *
 * On ne renvoie PAS de mail de confirmation : on lance directement le moteur
 * d'audit Flash (job `inbound`), qui génère le Flash et l'ENVOIE au visiteur
 * via Resend dans la foulée (le Flash se produit en quelques minutes).
 * Anti-SSRF obligatoire : l'URL vient d'un visiteur et sera fetchée/capturée
 * par le moteur.
 */
export async function POST(req: NextRequest) {
  try {
    const { site, email, source } = (await req.json()) as {
      site?: string;
      email?: string;
      source?: string | null;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (!site || site.trim().length < 3) {
      return NextResponse.json({ error: "invalid_site" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanSource = source ?? "page-audit";

    // URL publique uniquement (schéma http(s), pas d'IP privée ni d'hôte interne).
    // Retourne l'URL normalisée (https par défaut).
    let safeUrl: URL;
    try {
      safeUrl = await assertSafeUrl(site.trim());
    } catch (err) {
      if (err instanceof UnsafeUrlError) {
        return NextResponse.json({ error: "invalid_site" }, { status: 400 });
      }
      throw err;
    }

    // Crée le job Flash inbound et lance le workflow durable (fire and forget :
    // start() retourne dès l'enqueue). Le canal inbound déclenche l'envoi direct
    // du Flash au visiteur.
    const job = await createJob({
      email: cleanEmail,
      url: safeUrl.toString(),
      tier: "flash",
      channel: "inbound",
    });
    const run = await start(flashAuditWorkflow, [job.id]);
    await updateJob(job.id, { workflowRunId: run.runId });

    // Slack best-effort : ne bloque pas la demande, ne la fait pas échouer.
    const slack = await Promise.allSettled([
      notifySlack(safeUrl.toString(), cleanEmail, cleanSource),
    ]);
    if (slack[0].status === "rejected") {
      console.error("[api/audit] slack failed", slack[0].reason);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/audit]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
