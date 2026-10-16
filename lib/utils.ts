import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale, LocalizedString } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function t(value: LocalizedString, locale: Locale): string {
  return value[locale] ?? value.en;
}

export function isDemoMode(): boolean {
  return !(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
