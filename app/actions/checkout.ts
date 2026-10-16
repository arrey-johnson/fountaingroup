"use server";

import { randomUUID } from "crypto";
import { createOrder } from "@/lib/data/repository";
import { getActivePaymentProvider } from "@/lib/payments";
import { checkoutSchema } from "@/lib/validators";
import type { CartItem, PaymentMethod } from "@/types";

export async function placeOrderAction(input: {
  form: unknown;
  items: CartItem[];
}) {
  const parsed = checkoutSchema.safeParse(input.form);
  if (!parsed.success) {
    return { ok: false as const, error: "Please check your details and try again." };
  }
  if (!input.items.length) {
    return { ok: false as const, error: "Your cart is empty." };
  }

  const priced = input.items.every((i) => i.price != null);
  const subtotal = priced
    ? input.items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0)
    : null;

  const order = await createOrder({
    customerName: parsed.data.fullName,
    phone: parsed.data.phone,
    whatsapp: parsed.data.whatsapp,
    email: parsed.data.email,
    address: parsed.data.address,
    city: parsed.data.city,
    region: parsed.data.region,
    notes: parsed.data.notes,
    paymentMethod: parsed.data.paymentMethod as PaymentMethod,
    subtotal,
    total: subtotal,
    items: input.items.map((i) => ({
      id: randomUUID(),
      productId: i.productId,
      variantId: i.variantId,
      productName: i.name,
      size: i.size,
      unitPrice: i.price,
      quantity: i.quantity,
    })),
  });

  const provider = getActivePaymentProvider();
  await provider.charge({
    orderId: order.id,
    orderNumber: order.orderNumber,
    amount: order.total,
    currency: "XAF",
    method: order.paymentMethod,
    customerEmail: order.email,
  });

  return { ok: true as const, orderNumber: order.orderNumber };
}
