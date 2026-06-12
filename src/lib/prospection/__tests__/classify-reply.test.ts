import { describe, expect, it, vi } from 'vitest';
import { classifyReply, isBounceHeuristic, type ClassifyReplyFn } from '../classify-reply';

describe('isBounceHeuristic', () => {
  it('vrai si expéditeur mailer-daemon ou postmaster', () => {
    expect(isBounceHeuristic('mailer-daemon@googlemail.com', 'Bonjour')).toBe(true);
    expect(isBounceHeuristic('MAILER-DAEMON@googlemail.com', 'Bonjour')).toBe(true);
    expect(isBounceHeuristic('postmaster@exemple.fr', 'Bonjour')).toBe(true);
  });

  it("vrai si le snippet est une notification de non-livraison", () => {
    expect(isBounceHeuristic('jean@exemple.fr', 'Your message was UNDELIVERED to the recipient')).toBe(true);
    expect(isBounceHeuristic(undefined, 'Delivery Status Notification (Failure)')).toBe(true);
    expect(isBounceHeuristic(undefined, 'Address not found')).toBe(true);
  });

  it('faux pour une vraie réponse de prospect', () => {
    expect(isBounceHeuristic('jean@exemple.fr', 'Merci pour votre audit, on peut en parler ?')).toBe(false);
    expect(isBounceHeuristic(undefined, 'Pas intéressé merci')).toBe(false);
  });
});

describe('classifyReply', () => {
  it('court-circuite le LLM sur un bounce (heuristique, confidence 1)', async () => {
    const fn = vi.fn<ClassifyReplyFn>();
    const verdict = await classifyReply('delivery status notification', 'mailer-daemon@googlemail.com', fn);
    expect(verdict).toEqual({ classification: 'bounce', confidence: 1 });
    expect(fn).not.toHaveBeenCalled();
  });

  it('délègue au LLM injecté sinon', async () => {
    const fn = vi.fn<ClassifyReplyFn>().mockResolvedValue({ classification: 'interesse', confidence: 0.9 });
    const verdict = await classifyReply('Oui ça m\'intéresse, appelez-moi', 'jean@exemple.fr', fn);
    expect(verdict).toEqual({ classification: 'interesse', confidence: 0.9 });
    expect(fn).toHaveBeenCalledWith("Oui ça m'intéresse, appelez-moi");
  });
});
