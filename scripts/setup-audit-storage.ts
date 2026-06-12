/**
 * Crée le bucket privé `audit-pdfs` (idempotent) et liste les buckets pour vérification.
 * Usage : pnpm exec tsx scripts/setup-audit-storage.ts
 * Requiert NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY dans .env.local.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal(): Record<string, string> {
  const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  const env: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

async function main(): Promise<void> {
  const env = loadEnvLocal();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local");
  }

  const supabase = createClient(url, serviceRoleKey);

  const { error: createError } = await supabase.storage.createBucket("audit-pdfs", { public: false });
  if (createError && !/already exists/i.test(createError.message)) {
    throw new Error(`createBucket audit-pdfs: ${createError.message}`);
  }
  console.log(createError ? "Bucket audit-pdfs existe déjà." : "Bucket audit-pdfs créé.");

  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw new Error(`listBuckets: ${listError.message}`);
  for (const bucket of buckets) {
    console.log(`- ${bucket.name} (${bucket.public ? "public" : "privé"})`);
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
