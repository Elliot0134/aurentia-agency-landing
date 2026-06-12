import { describe, expect, it } from 'vitest';
import type { AirtableApi, AirtableRecord, ListRecordsOptions } from '../airtable';
import {
  AIRTABLE_TABLES,
  createLead,
  findReplyByGmailMessageId,
  findTouchByMessageId,
  getConfig,
  getLeadByEmail,
  getLeadByGmailThreadId,
  getLeadById,
  insertReply,
  insertTouch,
  listLeadsByStatus,
  listTouches,
  phaseFromStatutFunnel,
  setConfig,
  sourceFromAirtable,
  statutFunnelFromAirtable,
  statutFunnelToAirtable,
  touchesForLead,
  updateLead,
} from '../db';
import type { StatutFunnel } from '../sequences';

/**
 * Tests de la couche db sur Airtable : un stub AirtableApi capture les appels
 * (table, formule, fields) et renvoie des fixtures. Zéro réseau. Les codes
 * internes (nouveau, flash_envoye...) ne sortent jamais du moteur : la
 * traduction se fait ici, à la frontière Airtable.
 */

interface Captured {
  list: Array<{ table: string; options?: ListRecordsOptions }>;
  create: Array<{ table: string; records: ReadonlyArray<Record<string, unknown>> }>;
  update: Array<{ table: string; recordId: string; fields: Record<string, unknown> }>;
  get: Array<{ table: string; recordId: string }>;
}

function fakeApi(handlers: {
  list?: (table: string, options?: ListRecordsOptions) => AirtableRecord[];
  get?: (table: string, recordId: string) => AirtableRecord | null;
  createdRecord?: (table: string, fields: Record<string, unknown>) => AirtableRecord;
  updatedRecord?: (table: string, recordId: string, fields: Record<string, unknown>) => AirtableRecord;
}): { api: AirtableApi; captured: Captured } {
  const captured: Captured = { list: [], create: [], update: [], get: [] };
  let seq = 0;
  const api: AirtableApi = {
    async listRecords(table, options) {
      captured.list.push({ table, options });
      return handlers.list?.(table, options) ?? [];
    },
    async createRecords(table, records) {
      captured.create.push({ table, records });
      return records.map(
        (fields) =>
          handlers.createdRecord?.(table, fields) ?? {
            id: `rec-created-${++seq}`,
            createdTime: '2026-06-12T10:00:00.000Z',
            fields,
          },
      );
    },
    async updateRecord(table, recordId, fields) {
      captured.update.push({ table, recordId, fields });
      return (
        handlers.updatedRecord?.(table, recordId, fields) ?? {
          id: recordId,
          createdTime: '2026-06-12T10:00:00.000Z',
          fields,
        }
      );
    },
    async updateRecords() {
      throw new Error('non utilisé par db.ts');
    },
    async getRecord(table, recordId) {
      captured.get.push({ table, recordId });
      return handlers.get?.(table, recordId) ?? null;
    },
  };
  return { api, captured };
}

function leadRecord(id: string, fields: Record<string, unknown> = {}, createdTime = '2026-06-01T08:00:00.000Z'): AirtableRecord {
  return {
    id,
    createdTime,
    fields: {
      Entreprise: 'Test SARL',
      Email: 'jean@exemple.fr',
      Téléphone: '0600000000',
      Site: 'https://exemple.fr',
      Source: 'Outbound',
      'Statut funnel': 'Nouveau',
      Dirigeant: 'Jean Test',
      ...fields,
    },
  };
}

describe('traduction statuts / source / phase (frontière Airtable)', () => {
  it('statutFunnelToAirtable ↔ statutFunnelFromAirtable : round-trip des 12 statuts', () => {
    const statuts: StatutFunnel[] = [
      'nouveau', 'flash_envoye', 'en_sequence', 'repondu', 'a_trier', 'a_appeler',
      'pro_paye', 'pro_envoye', 'gagne', 'perdu', 'nurture', 'stop',
    ];
    for (const statut of statuts) {
      expect(statutFunnelFromAirtable(statutFunnelToAirtable(statut))).toBe(statut);
    }
    expect(statutFunnelToAirtable('flash_envoye')).toBe('Flash envoyé');
    expect(statutFunnelToAirtable('a_appeler')).toBe('À appeler');
  });

  it('statutFunnelFromAirtable : libellé inconnu → erreur claire (jamais de statut deviné)', () => {
    expect(() => statutFunnelFromAirtable('Statut custom')).toThrow(/Statut custom/);
  });

  it("sourceFromAirtable : 'Outbound' / 'Inbound site', inconnu → erreur", () => {
    expect(sourceFromAirtable('Outbound')).toBe('outbound');
    expect(sourceFromAirtable('Inbound site')).toBe('inbound');
    expect(() => sourceFromAirtable('Newsletter')).toThrow(/Newsletter/);
  });

  it('phaseFromStatutFunnel : pro_paye → audit (gate humain), pro_envoye/gagne → refonte, sinon pre_audit', () => {
    expect(phaseFromStatutFunnel('pro_paye')).toBe('audit');
    expect(phaseFromStatutFunnel('pro_envoye')).toBe('refonte');
    expect(phaseFromStatutFunnel('gagne')).toBe('refonte');
    expect(phaseFromStatutFunnel('nouveau')).toBe('pre_audit');
    expect(phaseFromStatutFunnel('en_sequence')).toBe('pre_audit');
  });
});

describe('leads : lectures', () => {
  it('getLeadByEmail : formule LOWER échappée, mapping complet champs FR → camelCase', async () => {
    const { api, captured } = fakeApi({
      list: () => [
        leadRecord('recAAA', {
          'Statut funnel': 'Flash envoyé',
          Niche: ['recNICHE1'],
          'Score Flash': 62,
          Notes: 'rappeler lundi',
          'Opt-out': true,
          'Gmail Thread': 'thread-1',
          Assigné: 'elliot',
          'Dernier contact': '2026-06-10T08:00:00.000Z',
        }),
      ],
    });
    const lead = await getLeadByEmail("  Jean.O'Neil@Exemple.FR ", api);
    expect(captured.list[0].table).toBe(AIRTABLE_TABLES.leads);
    expect(captured.list[0].options?.filterByFormula).toBe("LOWER({Email}) = 'jean.o\\'neil@exemple.fr'");
    expect(captured.list[0].options?.maxRecords).toBe(1);
    expect(lead).not.toBeNull();
    expect(lead?.id).toBe('recAAA');
    expect(lead?.entreprise).toBe('Test SARL');
    expect(lead?.contactName).toBe('Jean Test');
    expect(lead?.email).toBe('jean@exemple.fr');
    expect(lead?.phone).toBe('0600000000');
    expect(lead?.siteUrl).toBe('https://exemple.fr');
    expect(lead?.source).toBe('outbound');
    expect(lead?.nicheId).toBe('recNICHE1');
    expect(lead?.statutFunnel).toBe('flash_envoye');
    expect(lead?.phase).toBe('pre_audit');
    expect(lead?.scoreFlash).toBe(62);
    expect(lead?.notes).toBe('rappeler lundi');
    expect(lead?.optOut).toBe(true);
    expect(lead?.bounce).toBe(false); // checkbox décochée = champ absent → false
    expect(lead?.gmailThreadId).toBe('thread-1');
    expect(lead?.assignedTo).toBe('elliot');
    expect(lead?.dernierContact).toBe('2026-06-10T08:00:00.000Z');
    expect(lead?.createdAt).toBe('2026-06-01T08:00:00.000Z');
  });

  it('getLeadByEmail : null si absent ; statut absent → nouveau ; email absent → chaîne vide', async () => {
    const { api } = fakeApi({ list: () => [] });
    expect(await getLeadByEmail('inconnu@exemple.fr', api)).toBeNull();

    const { api: api2 } = fakeApi({
      list: () => [leadRecord('recBBB', { 'Statut funnel': undefined, Email: undefined })],
    });
    const lead = await getLeadByEmail('x@y.fr', api2);
    expect(lead?.statutFunnel).toBe('nouveau');
    expect(lead?.email).toBe('');
  });

  it('getLeadById : GET du record (table Leads), null si 404', async () => {
    const { api, captured } = fakeApi({
      get: (_table, recordId) => (recordId === 'recAAA' ? leadRecord('recAAA') : null),
    });
    expect((await getLeadById('recAAA', api))?.email).toBe('jean@exemple.fr');
    expect(await getLeadById('recZZZ', api)).toBeNull();
    expect(captured.get[0]).toEqual({ table: AIRTABLE_TABLES.leads, recordId: 'recAAA' });
  });

  it('getLeadByGmailThreadId : formule sur {Gmail Thread}', async () => {
    const { api, captured } = fakeApi({ list: () => [leadRecord('recAAA', { 'Gmail Thread': 'thread-9' })] });
    const lead = await getLeadByGmailThreadId('thread-9', api);
    expect(captured.list[0].options?.filterByFormula).toBe("{Gmail Thread} = 'thread-9'");
    expect(lead?.id).toBe('recAAA');
  });

  it('listLeadsByStatus : OR de libellés traduits, tri par createdTime croissant puis id', async () => {
    const { api, captured } = fakeApi({
      list: () => [
        leadRecord('rec2', { Email: 'l2@x.fr' }, '2026-06-02T00:00:00.000Z'),
        leadRecord('rec1', { Email: 'l1@x.fr', 'Statut funnel': 'Flash envoyé' }, '2026-06-01T00:00:00.000Z'),
      ],
    });
    const leads = await listLeadsByStatus(['nouveau', 'flash_envoye'], api);
    expect(captured.list[0].options?.filterByFormula).toBe(
      "OR({Statut funnel} = 'Nouveau', {Statut funnel} = 'Flash envoyé')",
    );
    expect(leads.map((l) => l.id)).toEqual(['rec1', 'rec2']);
  });
});

describe('leads : écritures', () => {
  it('createLead : champs FR + libellés traduits, email normalisé, lien Niche', async () => {
    const { api, captured } = fakeApi({
      createdRecord: (_table, fields) => ({ id: 'recNEW', createdTime: '2026-06-12T10:00:00.000Z', fields }),
    });
    const lead = await createLead(
      {
        source: 'inbound',
        email: 'New@Exemple.fr',
        entreprise: 'Nouveau SARL',
        contactName: 'Léa',
        siteUrl: 'https://nouveau.fr',
        nicheId: 'recNICHE1',
        statutFunnel: 'flash_envoye',
      },
      api,
    );
    expect(captured.create[0].table).toBe(AIRTABLE_TABLES.leads);
    expect(captured.create[0].records[0]).toEqual({
      Email: 'new@exemple.fr',
      Source: 'Inbound site',
      Entreprise: 'Nouveau SARL',
      Dirigeant: 'Léa',
      Site: 'https://nouveau.fr',
      Niche: ['recNICHE1'],
      'Statut funnel': 'Flash envoyé',
    });
    expect(lead.id).toBe('recNEW');
    expect(lead.email).toBe('new@exemple.fr');
    expect(lead.source).toBe('inbound');
  });

  it('updateLead : patch camelCase → champs FR, statut traduit ; patch vide = aucun appel', async () => {
    const { api, captured } = fakeApi({});
    await updateLead(
      'recAAA',
      {
        statutFunnel: 'en_sequence',
        gmailThreadId: 'thread-9',
        optOut: true,
        bounce: false,
        notes: 'note',
        dernierContact: '2026-06-12T11:00:00.000Z',
        scoreFlash: 70,
      },
      api,
    );
    expect(captured.update[0]).toEqual({
      table: AIRTABLE_TABLES.leads,
      recordId: 'recAAA',
      fields: {
        'Statut funnel': 'En séquence',
        'Gmail Thread': 'thread-9',
        'Opt-out': true,
        Bounce: false,
        Notes: 'note',
        'Dernier contact': '2026-06-12T11:00:00.000Z',
        'Score Flash': 70,
      },
    });

    await updateLead('recAAA', {}, api);
    expect(captured.update).toHaveLength(1); // patch vide : no-op
  });
});

describe('touches', () => {
  const touchRecord = (id: string, fields: Record<string, unknown>): AirtableRecord => ({
    id,
    createdTime: '2026-06-12T10:00:00.000Z',
    fields,
  });

  it('insertTouch : lien Lead + primary lisible "<type> <entreprise>", Envoyé le par défaut', async () => {
    const { api, captured } = fakeApi({});
    const touch = await insertTouch(
      { leadId: 'recAAA', leadLabel: 'Test SARL', type: 'flash', channel: 'gmail', messageId: 'msg-1', templateVersion: 'flash@v1' },
      api,
    );
    expect(captured.create[0].table).toBe(AIRTABLE_TABLES.touches);
    const fields = captured.create[0].records[0];
    expect(fields.Touche).toBe('flash Test SARL');
    expect(fields.Lead).toEqual(['recAAA']);
    expect(fields.Type).toBe('flash');
    expect(fields.Canal).toBe('gmail');
    expect(fields['Message ID']).toBe('msg-1');
    expect(fields['Template version']).toBe('flash@v1');
    expect(typeof fields['Envoyé le']).toBe('string'); // défaut : maintenant (ISO)
    expect(touch.leadId).toBe('recAAA');
    expect(touch.type).toBe('flash');
  });

  it('insertTouch sans leadLabel : primary retombe sur le record id', async () => {
    const { api, captured } = fakeApi({});
    await insertTouch({ leadId: 'recAAA', type: 'cold_1', channel: 'gmail', sentAt: '2026-06-13T08:00:00.000Z' }, api);
    expect(captured.create[0].records[0].Touche).toBe('cold_1 recAAA');
    expect(captured.create[0].records[0]['Envoyé le']).toBe('2026-06-13T08:00:00.000Z');
  });

  it('listTouches + touchesForLead : mapping, filtre client par lead lié, tri sent_at croissant', async () => {
    const { api } = fakeApi({
      list: () => [
        touchRecord('recT2', { Lead: ['recAAA'], Type: 'cold_1', Canal: 'gmail', 'Envoyé le': '2026-06-13T08:00:00.000Z', 'Message ID': 'msg-2' }),
        touchRecord('recT1', { Lead: ['recAAA'], Type: 'flash', Canal: 'gmail', 'Envoyé le': '2026-06-10T08:00:00.000Z' }),
        touchRecord('recT3', { Lead: ['recBBB'], Type: 'flash', Canal: 'resend', 'Envoyé le': '2026-06-11T08:00:00.000Z' }),
      ],
    });
    const all = await listTouches(api);
    expect(all).toHaveLength(3);
    const mine = await touchesForLead('recAAA', api);
    expect(mine.map((t) => t.type)).toEqual(['flash', 'cold_1']);
    expect(mine[1].messageId).toBe('msg-2');
    expect(mine[1].channel).toBe('gmail');
  });

  it("listTouches : 'Envoyé le' absent → retombe sur createdTime ; type inconnu → erreur claire", async () => {
    const { api } = fakeApi({
      list: () => [touchRecord('recT1', { Lead: ['recAAA'], Type: 'flash', Canal: 'gmail' })],
    });
    expect((await listTouches(api))[0].sentAt).toBe('2026-06-12T10:00:00.000Z');

    const { api: apiBad } = fakeApi({
      list: () => [touchRecord('recT9', { Lead: ['recAAA'], Type: 'spam_1', Canal: 'gmail' })],
    });
    await expect(listTouches(apiBad)).rejects.toThrow(/spam_1/);
  });

  it('findTouchByMessageId : formule sur {Message ID}, null si absent', async () => {
    const { api, captured } = fakeApi({
      list: () => [touchRecord('recT1', { Lead: ['recAAA'], Type: 'cold_1', Canal: 'gmail', 'Message ID': 'msg-42' })],
    });
    const touch = await findTouchByMessageId('msg-42', api);
    expect(captured.list[0].options?.filterByFormula).toBe("{Message ID} = 'msg-42'");
    expect(touch?.leadId).toBe('recAAA');

    const { api: apiEmpty } = fakeApi({ list: () => [] });
    expect(await findTouchByMessageId('msg-absent', apiEmpty)).toBeNull();
  });
});

describe('replies', () => {
  it('insertReply : lien Lead + primary lisible, champs FR, Reçu le par défaut', async () => {
    const { api, captured } = fakeApi({});
    const reply = await insertReply(
      {
        leadId: 'recAAA',
        leadLabel: 'Test SARL',
        gmailMessageId: 'gm-1',
        classification: 'interesse',
        confidence: 0.92,
        snippet: 'Oui, appelez-moi',
      },
      api,
    );
    expect(captured.create[0].table).toBe(AIRTABLE_TABLES.replies);
    const fields = captured.create[0].records[0];
    expect(fields['Réponse']).toBe('interesse Test SARL');
    expect(fields.Lead).toEqual(['recAAA']);
    expect(fields.Classification).toBe('interesse');
    expect(fields.Confiance).toBe(0.92);
    expect(fields.Snippet).toBe('Oui, appelez-moi');
    expect(fields['Gmail Message ID']).toBe('gm-1');
    expect(typeof fields['Reçu le']).toBe('string');
    expect(reply.classification).toBe('interesse');
    expect(reply.gmailMessageId).toBe('gm-1');
  });

  it('findReplyByGmailMessageId : formule échappée, null si absent (idempotence classify)', async () => {
    const { api, captured } = fakeApi({
      list: () => [
        {
          id: 'recR1',
          createdTime: '2026-06-12T10:00:00.000Z',
          fields: { Lead: ['recAAA'], Classification: 'question', 'Gmail Message ID': 'gm-1', 'Reçu le': '2026-06-12T09:00:00.000Z' },
        },
      ],
    });
    const reply = await findReplyByGmailMessageId('gm-1', api);
    expect(captured.list[0].table).toBe(AIRTABLE_TABLES.replies);
    expect(captured.list[0].options?.filterByFormula).toBe("{Gmail Message ID} = 'gm-1'");
    expect(reply?.leadId).toBe('recAAA');
    expect(reply?.classification).toBe('question');

    const { api: apiEmpty } = fakeApi({ list: () => [] });
    expect(await findReplyByGmailMessageId('gm-absent', apiEmpty)).toBeNull();
  });
});

describe('config', () => {
  const configRecord = (id: string, cle: string, valeur?: string): AirtableRecord => ({
    id,
    createdTime: '2026-06-12T10:00:00.000Z',
    fields: { Clé: cle, ...(valeur !== undefined ? { Valeur: valeur } : {}) },
  });

  it('getConfig : valeur string si présente, null si clé absente ou Valeur vide', async () => {
    const { api, captured } = fakeApi({ list: () => [configRecord('recC1', 'sequences_paused', 'true')] });
    expect(await getConfig('sequences_paused', api)).toBe('true');
    expect(captured.list[0].table).toBe(AIRTABLE_TABLES.config);
    expect(captured.list[0].options?.filterByFormula).toBe("{Clé} = 'sequences_paused'");

    const { api: apiEmpty } = fakeApi({ list: () => [] });
    expect(await getConfig('clef_absente', apiEmpty)).toBeNull();

    const { api: apiNoValue } = fakeApi({ list: () => [configRecord('recC2', 'cle_vide')] });
    expect(await getConfig('cle_vide', apiNoValue)).toBeNull();
  });

  it('setConfig : update si la clé existe, create sinon', async () => {
    const { api, captured } = fakeApi({ list: () => [configRecord('recC1', 'cold_daily_cap', '10')] });
    await setConfig('cold_daily_cap', '20', api);
    expect(captured.update[0]).toEqual({
      table: AIRTABLE_TABLES.config,
      recordId: 'recC1',
      fields: { Valeur: '20' },
    });

    const { api: apiEmpty, captured: capturedEmpty } = fakeApi({ list: () => [] });
    await setConfig('nouvelle_cle', 'true', apiEmpty);
    expect(capturedEmpty.create[0].records[0]).toEqual({ Clé: 'nouvelle_cle', Valeur: 'true' });
  });
});

describe('garde-fou', () => {
  it("ProspectionLead.id est le record id Airtable (plus d'uuid Supabase)", async () => {
    const { api } = fakeApi({ list: () => [leadRecord('recAAA')] });
    const lead = await getLeadByEmail('jean@exemple.fr', api);
    expect(lead?.id).toMatch(/^rec/);
  });
});
