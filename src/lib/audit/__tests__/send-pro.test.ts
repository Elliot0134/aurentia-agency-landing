import { describe, it, expect, vi } from 'vitest';

// supabaseAdmin est créé au chargement du module : on le neutralise pour l'import.
vi.mock('@/lib/supabase/admin', () => ({
  supabaseAdmin: { storage: { from: () => ({}) } },
}));

import { writeLeadProSent } from '../send-pro';
import { AIRTABLE_TABLES } from '@/lib/prospection/db';
import type { AirtableApi } from '@/lib/prospection/airtable';

describe('writeLeadProSent', () => {
  it('passe le Statut funnel du lead à "Pro envoyé"', async () => {
    const updateRecord = vi.fn().mockResolvedValue({});
    await writeLeadProSent({ updateRecord } as unknown as AirtableApi, 'rec1');
    expect(updateRecord).toHaveBeenCalledWith(AIRTABLE_TABLES.leads, 'rec1', { 'Statut funnel': 'Pro envoyé' });
  });

  it('ne throw jamais si Airtable échoue (best-effort)', async () => {
    const api = { updateRecord: vi.fn().mockRejectedValue(new Error('Airtable 500')) } as unknown as AirtableApi;
    await expect(writeLeadProSent(api, 'rec1')).resolves.toBeUndefined();
  });
});
