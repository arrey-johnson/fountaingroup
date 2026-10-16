import type { SiteSettings } from "@/types";

export function formatPrice(
  amount: number | null | undefined,
  settings: Pick<SiteSettings, "currencyDisplay">,
  contactLabel = "Contact for Price",
): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return contactLabel;
  }
  return `${new Intl.NumberFormat("en-US").format(amount)} ${settings.currencyDisplay}`;
}

export function formatDate(iso: string, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}
