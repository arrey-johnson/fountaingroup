"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/lib/cart/store";
import { placeOrderAction } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CheckoutForm() {
  const t = useTranslations("checkout");
  const router = useRouter();
  const { items, clear, subtotal } = useCartStore();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const total = subtotal();

  if (!items.length) {
    return <p className="pt-28 text-center text-muted">Your cart is empty.</p>;
  }

  return (
    <form
      className="mx-auto grid max-w-5xl gap-10 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-5 lg:px-8"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const form = Object.fromEntries(fd.entries());
        start(async () => {
          const res = await placeOrderAction({ form, items });
          if (!res.ok) {
            setError(res.error);
            return;
          }
          clear();
          router.push(`/orders/${res.orderNumber}`);
        });
      }}
    >
      <div className="space-y-4 lg:col-span-3">
        <h1 className="font-display text-4xl">{t("title")}</h1>
        {[
          ["fullName", t("fullName")],
          ["phone", t("phone")],
          ["whatsapp", t("whatsapp")],
          ["email", t("email")],
          ["address", t("address")],
          ["city", t("city")],
          ["region", t("region")],
        ].map(([name, label]) => (
          <div key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input id={name} name={name} required={name !== "whatsapp"} className="mt-1" />
          </div>
        ))}
        <div>
          <Label htmlFor="notes">{t("notes")}</Label>
          <Textarea id="notes" name="notes" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="paymentMethod">{t("paymentMethod")}</Label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="mt-1 h-11 w-full rounded-md border border-border bg-transparent px-3 text-sm"
            defaultValue="manual"
          >
            <option value="manual">Manual confirmation</option>
            <option value="bank_transfer">Bank transfer</option>
            <option value="mobile_money">Mobile money (coming soon)</option>
            <option value="cash_on_delivery">Cash on delivery</option>
            <option value="card">Card (coming soon)</option>
          </select>
          <p className="mt-2 text-xs text-muted">{t("manualPaymentNote")}</p>
        </div>
        {error && <p className="text-sm text-brand-orange">{error}</p>}
        <Button type="submit" size="lg" disabled={pending}>
          {t("placeOrder")}
        </Button>
      </div>
      <aside className="h-fit border border-border bg-cream/40 p-6 lg:col-span-2">
        <h2 className="font-semibold">{t("orderSummary")}</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((i) => (
            <li key={i.variantId} className="flex justify-between gap-3">
              <span>
                {i.name} · {i.size} × {i.quantity}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-semibold">
          Total: {total == null ? "Contact for Price" : `${total.toLocaleString()} FCFA`}
        </p>
      </aside>
    </form>
  );
}
