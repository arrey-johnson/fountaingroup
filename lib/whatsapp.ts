import type { SiteSettings } from "@/types";

export function buildWhatsAppOrderUrl(
  settings: SiteSettings,
  details: { productName: string; size: string; quantity: number },
): string | null {
  const number = settings.whatsapp?.replace(/\D/g, "");
  if (!number) return null;

  const message = [
    "Hello Fountain Group,",
    "I would like to order:",
    "",
    `Product: ${details.productName}`,
    `Size: ${details.size}`,
    `Quantity: ${details.quantity}`,
    "",
    "Please confirm availability and delivery.",
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
