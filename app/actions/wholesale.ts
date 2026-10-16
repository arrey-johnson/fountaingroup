"use server";

import { createWholesaleRequest } from "@/lib/data/repository";
import { wholesaleSchema } from "@/lib/validators";

export async function submitWholesaleAction(form: unknown) {
  const parsed = wholesaleSchema.safeParse(form);
  if (!parsed.success) {
    return { ok: false as const, error: "Please complete all required fields." };
  }

  const d = parsed.data;
  const productNames: Record<string, string> = {
    "coconut-oil": "Fountain Group Coconut Oil",
    "mamas-red-oil": "Mama's Red Oil",
    "pure-honey": "Fountain Group Pure Honey",
    "organic-coconut-flour": "Organic Coconut Flour",
    multiple: "Multiple Products",
  };
  const productName = productNames[d.productSelection] ?? "Multiple Products";

  const request = await createWholesaleRequest({
    fullName: d.fullName,
    companyName: d.companyName,
    businessType: d.businessType,
    email: d.email,
    phone: d.phone,
    whatsapp: d.whatsapp,
    country: d.country,
    city: d.city,
    products: [
      {
        productSlug: d.productSelection,
        productName,
        packaging: d.packaging,
        quantity: d.quantity,
        unit: d.unit,
      },
    ],
    frequency: d.frequency,
    deliveryDate: d.deliveryDate,
    deliveryPreference: d.deliveryPreference,
    additionalRequirements: d.additionalRequirements,
    destinationPort: d.isExport ? d.destinationPort : undefined,
    preferredIncoterm: d.isExport ? d.preferredIncoterm : undefined,
  });

  return { ok: true as const, rfqNumber: request.rfqNumber };
}
