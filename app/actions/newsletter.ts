"use server";

import { subscribeNewsletter } from "@/lib/data/repository";
import { newsletterSchema } from "@/lib/validators";

export async function subscribeAction(email: string) {
  const parsed = newsletterSchema.safeParse({ email });
  if (!parsed.success) {
    return { ok: false as const, message: "Please enter a valid email." };
  }
  await subscribeNewsletter(parsed.data.email);
  return { ok: true as const, message: "Thanks — you are on the list." };
}
