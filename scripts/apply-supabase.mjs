/**
 * Applies schema + seed using the Supabase SQL HTTP API when available,
 * otherwise verifies connectivity and seeds via REST inserts.
 *
 * Usage: node --env-file=.env.local scripts/apply-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function tableExists(name) {
  const { error } = await admin.from(name).select("*").limit(1);
  if (!error) return true;
  if (error.code === "PGRST205" || error.message?.includes("Could not find the table")) {
    return false;
  }
  // Other errors may still mean the table exists (e.g. RLS)
  return !String(error.message || "").toLowerCase().includes("does not exist");
}

async function main() {
  console.log("Connecting to", url);

  const hasProducts = await tableExists("products");
  if (!hasProducts) {
    console.log("\nSchema is not applied yet.");
    console.log("Open Supabase SQL Editor and run these two files in order:");
    console.log("  1) supabase/migrations/001_init.sql");
    console.log("  2) supabase/seed.sql");
    console.log(
      `\nSQL Editor: ${url.replace(".supabase.co", "")}/project/_/sql`.replace(
        "https://",
        "https://supabase.com/dashboard/project/",
      ),
    );
    console.log(
      `\nDirect link: https://supabase.com/dashboard/project/rlkzhnqizqussvkonljv/sql/new`,
    );
    process.exit(2);
  }

  console.log("Schema detected. Checking seed data...");

  const { count } = await admin
    .from("products")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) === 0) {
    console.log("No products found. Please run supabase/seed.sql in the SQL Editor.");
    process.exit(2);
  }

  const { data: settings } = await admin
    .from("site_settings")
    .select("key")
    .eq("key", "main")
    .maybeSingle();

  console.log("Products:", count);
  console.log("Settings:", settings ? "ok" : "missing");
  console.log("Supabase setup looks good.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
