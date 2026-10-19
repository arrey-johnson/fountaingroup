"use server";

import { createContactMessage } from "@/lib/data/repository";
import { contactSchema } from "@/lib/validators";

export async function submitContactAction(form: unknown) {
  const parsed = contactSchema.safeParse(form);
  if (!parsed.success) {
    return { ok: false as const, error: "Please complete the form correctly." };
  }
  await createContactMessage(parsed.data);
  return {
    ok: true as const,
    message: "Thank you. Your message has been sent. We will respond shortly.",
  };
}
