import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { makeReviewToken, verifyReviewToken } from '../review-token';

beforeEach(() => {
  vi.stubEnv('AUDIT_REVIEW_SECRET', 'secret-de-test');
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('makeReviewToken', () => {
  it('produit un HMAC hex de 64 caractères, déterministe pour un même jobId', () => {
    const token = makeReviewToken('job-1');
    expect(token).toMatch(/^[0-9a-f]{64}$/);
    expect(makeReviewToken('job-1')).toBe(token);
  });

  it('produit des tokens différents pour des jobIds différents', () => {
    expect(makeReviewToken('job-1')).not.toBe(makeReviewToken('job-2'));
  });

  it('dépend du secret', () => {
    const before = makeReviewToken('job-1');
    vi.stubEnv('AUDIT_REVIEW_SECRET', 'autre-secret');
    expect(makeReviewToken('job-1')).not.toBe(before);
  });

  it('throw si AUDIT_REVIEW_SECRET est absent', () => {
    vi.stubEnv('AUDIT_REVIEW_SECRET', '');
    expect(() => makeReviewToken('job-1')).toThrow(/AUDIT_REVIEW_SECRET/);
  });
});

describe('verifyReviewToken', () => {
  it('accepte le token légitime', () => {
    expect(verifyReviewToken('job-1', makeReviewToken('job-1'))).toBe(true);
  });

  it('rejette un token altéré', () => {
    const token = makeReviewToken('job-1');
    const tampered = (token[0] === 'a' ? 'b' : 'a') + token.slice(1);
    expect(verifyReviewToken('job-1', tampered)).toBe(false);
  });

  it("rejette le token d'un autre jobId", () => {
    expect(verifyReviewToken('job-2', makeReviewToken('job-1'))).toBe(false);
  });

  it('rejette les tokens malformés (non-hex, vide, tronqué)', () => {
    expect(verifyReviewToken('job-1', '')).toBe(false);
    expect(verifyReviewToken('job-1', 'pas-du-hex')).toBe(false);
    expect(verifyReviewToken('job-1', makeReviewToken('job-1').slice(0, 32))).toBe(false);
  });
});
