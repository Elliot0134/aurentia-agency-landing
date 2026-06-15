import { describe, it, expect, beforeEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { UnsafeUrlError } from "@/lib/audit/url-safety";
import type { AuditJob } from "@/lib/audit/jobs";

const { startMock, createJobMock, updateJobMock, assertSafeUrlMock, getLeadByEmailMock, createLeadMock } =
  vi.hoisted(() => ({
    startMock: vi.fn(),
    createJobMock: vi.fn(),
    updateJobMock: vi.fn(),
    assertSafeUrlMock: vi.fn(),
    getLeadByEmailMock: vi.fn(),
    createLeadMock: vi.fn(),
  }));

vi.mock("workflow/api", () => ({ start: startMock }));
vi.mock("@/lib/audit/jobs", () => ({ createJob: createJobMock, updateJob: updateJobMock }));
vi.mock("@/lib/prospection/db", () => ({ getLeadByEmail: getLeadByEmailMock, createLead: createLeadMock }));
// Le workflow réel tire tout le moteur (sharp, browserless...) : inutile ici,
// la route ne fait que le passer à start() qui est mocké.
vi.mock("@/workflows/audit-workflows", () => ({ flashAuditWorkflow: vi.fn() }));
vi.mock("@/lib/audit/url-safety", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/audit/url-safety")>();
  return { ...actual, assertSafeUrl: assertSafeUrlMock };
});

import { POST } from "../route";
import { flashAuditWorkflow } from "@/workflows/audit-workflows";

function fakeJob(overrides: Partial<AuditJob> = {}): AuditJob {
  return {
    id: "job-1",
    leadId: null,
    email: "visiteur@exemple.fr",
    url: "https://exemple.fr/",
    tier: "flash",
    channel: "inbound",
    status: "queued",
    stripeSessionId: null,
    workflowRunId: null,
    score: null,
    impactPercent: null,
    writerModel: null,
    subject: null,
    html: null,
    pdfPath: null,
    driveUrl: null,
    error: null,
    ...overrides,
  } as AuditJob;
}

function postReq(body: unknown): NextRequest {
  return new NextRequest("https://www.aurentia.agency/api/audit", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/audit (formulaire public Flash)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.SLACK_AUDIT_WEBHOOK_URL; // pas de réseau Slack en test
    assertSafeUrlMock.mockResolvedValue(new URL("https://exemple.fr/"));
    createJobMock.mockResolvedValue(fakeJob());
    startMock.mockResolvedValue({ runId: "wrun_test" });
    updateJobMock.mockResolvedValue(undefined);
    getLeadByEmailMock.mockResolvedValue(null);
    createLeadMock.mockResolvedValue({ id: "lead-1" });
  });

  it("crée un lead inbound Airtable + un job Flash inbound, et lance le workflow", async () => {
    const res = await POST(postReq({ site: "exemple.fr", email: "Visiteur@Exemple.fr", source: "hero" }));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });

    expect(createLeadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        source: "inbound",
        email: "visiteur@exemple.fr",
        siteUrl: "https://exemple.fr/",
        statutFunnel: "flash_envoye",
      }),
    );
    expect(createJobMock).toHaveBeenCalledWith({
      email: "visiteur@exemple.fr",
      url: "https://exemple.fr/",
      tier: "flash",
      channel: "inbound",
      leadId: "lead-1",
    });
    expect(startMock).toHaveBeenCalledWith(flashAuditWorkflow, ["job-1"]);
    expect(updateJobMock).toHaveBeenCalledWith("job-1", { workflowRunId: "wrun_test" });
  });

  it("ne crée pas de doublon si le lead existe déjà (dédup par email)", async () => {
    getLeadByEmailMock.mockResolvedValueOnce({ id: "lead-existant" });
    const res = await POST(postReq({ site: "exemple.fr", email: "visiteur@exemple.fr" }));
    expect(res.status).toBe(200);
    expect(createLeadMock).not.toHaveBeenCalled();
    expect(createJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ leadId: "lead-existant", channel: "inbound" }),
    );
  });

  it("envoie quand même le Flash si Airtable échoue (best-effort)", async () => {
    getLeadByEmailMock.mockRejectedValueOnce(new Error("airtable down"));
    const res = await POST(postReq({ site: "exemple.fr", email: "visiteur@exemple.fr" }));
    expect(res.status).toBe(200);
    expect(createJobMock).toHaveBeenCalledWith(
      expect.objectContaining({ channel: "inbound", leadId: undefined }),
    );
    expect(startMock).toHaveBeenCalled();
  });

  it("refuse un email invalide sans rien lancer", async () => {
    const res = await POST(postReq({ site: "exemple.fr", email: "pas-un-email" }));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "invalid_email" });
    expect(createJobMock).not.toHaveBeenCalled();
    expect(startMock).not.toHaveBeenCalled();
  });

  it("refuse une URL non sûre (SSRF) en invalid_site", async () => {
    assertSafeUrlMock.mockRejectedValueOnce(new UnsafeUrlError("ip privée"));
    const res = await POST(postReq({ site: "http://169.254.169.254/", email: "visiteur@exemple.fr" }));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "invalid_site" });
    expect(createJobMock).not.toHaveBeenCalled();
    expect(startMock).not.toHaveBeenCalled();
  });
});
