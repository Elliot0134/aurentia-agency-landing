import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { makeReviewToken } from '../review-token';
import { evaluateReviewGate } from '../review-gate';

beforeEach(() => {
  vi.stubEnv('AUDIT_REVIEW_SECRET', 'secret-de-test');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('evaluateReviewGate', () => {
  it("'invalid' sans token", () => {
    expect(evaluateReviewGate('job-1', undefined, 'ready_for_review')).toBe('invalid');
  });

  it("'invalid' avec un token faux", () => {
    expect(evaluateReviewGate('job-1', 'deadbeef', 'ready_for_review')).toBe('invalid');
  });

  it("'invalid' avec le token d'un autre job", () => {
    expect(evaluateReviewGate('job-1', makeReviewToken('job-2'), 'ready_for_review')).toBe('invalid');
  });

  it("'invalid' si le job est inconnu (status null), même avec un token valide", () => {
    expect(evaluateReviewGate('job-1', makeReviewToken('job-1'), null)).toBe('invalid');
  });

  it("'invalid' (sans throw) si AUDIT_REVIEW_SECRET est absent : gate fermée par défaut", () => {
    vi.stubEnv('AUDIT_REVIEW_SECRET', '');
    expect(evaluateReviewGate('job-1', 'a'.repeat(64), 'ready_for_review')).toBe('invalid');
  });

  it("'ok' token valide + status ready_for_review", () => {
    expect(evaluateReviewGate('job-1', makeReviewToken('job-1'), 'ready_for_review')).toBe('ok');
  });

  it("'ok' token valide + status delivered (relecture après envoi)", () => {
    expect(evaluateReviewGate('job-1', makeReviewToken('job-1'), 'delivered')).toBe('ok');
  });

  it.each(['queued', 'running', 'ready_to_send', 'failed', 'refunded'] as const)(
    "'not-ready' token valide + status %s",
    (status) => {
      expect(evaluateReviewGate('job-1', makeReviewToken('job-1'), status)).toBe('not-ready');
    },
  );
});
