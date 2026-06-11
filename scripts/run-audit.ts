import { config } from 'dotenv';
import { collectAudit } from '../src/lib/audit/collect';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

config({ path: '.env.local' });

async function main() {
  const [rawUrl, ...rest] = process.argv.slice(2);
  if (!rawUrl) {
    console.error('Usage: pnpm audit:run <url> [--tier pro]');
    process.exit(1);
  }
  const tier = rest.includes('--tier') && rest[rest.indexOf('--tier') + 1] === 'pro' ? 'pro' : 'flash';

  const required = ['PSI_API_KEY', 'BROWSERLESS_TOKEN', 'EXA_API_KEY'] as const;
  for (const k of required) {
    if (!process.env[k]) {
      console.error(`Variable manquante dans .env.local : ${k}`);
      process.exit(1);
    }
  }

  const domain = rawUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  const outDir = path.join('output', domain);

  console.log(`Audit ${tier} de ${rawUrl}...`);
  const audit = await collectAudit(rawUrl, tier, {
    psiApiKey: process.env.PSI_API_KEY!,
    browserless: { token: process.env.BROWSERLESS_TOKEN!, baseUrl: process.env.BROWSERLESS_URL },
    exaApiKey: process.env.EXA_API_KEY!,
    outDir,
  });

  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'audit.json'), JSON.stringify(audit, null, 2));

  const fails = audit.measurements.filter((m) => m.status === 'fail');
  console.log(`\n${audit.measurements.length} mesures, dont ${fails.length} en échec :`);
  for (const m of fails) console.log(`  ✗ [${m.id}] ${m.label} = ${m.value}${m.unit ? ' ' + m.unit : ''}`);
  if (audit.revenue) console.log(`\nManque à gagner estimé : ~${audit.revenue.totalMonthlyLossEur} €/mois`);
  console.log(`\nJSON complet : ${outDir}/audit.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
