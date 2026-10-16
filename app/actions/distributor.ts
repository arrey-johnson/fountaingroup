"use server";

import { createDistributorApplication } from "@/lib/data/repository";
import { distributorSchema } from "@/lib/validators";

export async function submitDistributorAction(form: unknown) {
  const parsed = distributorSchema.safeParse(form);
  if (!parsed.success) {
    return { ok: false as const, error: "Please complete the form correctly." };
  }
  await createDistributorApplication(parsed.data);
  return { ok: true as const };
}
