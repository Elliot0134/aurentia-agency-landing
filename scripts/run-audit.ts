import { config } from 'dotenv';
import { collectAudit } from '../src/lib/audit/collect';
import { renderReport } from '../src/lib/audit/render/render';
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
  const doRender = rest.includes('--render');

  const required = ['PSI_API_KEY', 'BROWSERLESS_TOKEN', 'EXA_API_KEY'] as const;
  for (const k of required) {
    if (!process.env[k]) {
      console.error(`Variable manquante dans .env.local : ${k}`);
      process.exit(1);
    }
  }

  if (doRender) {
    const renderRequired = ['OPENROUTER_API_KEY', 'OPENROUTER_MODEL'] as const;
    for (const k of renderRequired) {
      if (!process.env[k]) {
        console.error(`--render nécessite ${k} dans l'environnement (.env.local).`);
        process.exit(1);
      }
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
  if (audit.impact && audit.impact.headlinePercent > 0) console.log(`\nImpact estimé : ~${audit.impact.headlinePercent}% de visiteurs perdus à cause de la lenteur`);
  console.log(`\nJSON complet : ${outDir}/audit.json`);

  if (doRender) {
    console.log(`\nRendu ${tier} (LLM réel + Browserless)...`);
    const result = await renderReport(audit, {
      browserless: { token: process.env.BROWSERLESS_TOKEN!, baseUrl: process.env.BROWSERLESS_URL },
      fetchFn: undefined,
      generateFn: undefined,
    });

    if (result.emailHtml !== undefined) {
      const htmlPath = path.join(outDir, 'report.html');
      await writeFile(htmlPath, result.emailHtml);
      console.log(`Mail Flash : ${htmlPath}`);
    }
    if (result.pdfBuffer !== undefined) {
      const pdfPath = path.join(outDir, 'report.pdf');
      await writeFile(pdfPath, result.pdfBuffer);
      console.log(`PDF Pro : ${pdfPath}`);
    }
    console.log(`Score : ${result.score}/100 — recommandation : ${result.content.recommendation}`);
    console.log(`Modèle rédacteur : ${result.writerModel}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
