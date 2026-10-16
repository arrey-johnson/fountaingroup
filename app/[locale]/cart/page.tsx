"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useCartStore } from "@/lib/cart/store";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const t = useTranslations("cart");
  const tc = useTranslations("common");
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const total = subtotal();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 pt-36 text-center">
        <h1 className="font-display text-4xl">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("empty")}</p>
        <Button asChild className="mt-6">
          <Link href="/shop">{t("emptyCta")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl">{t("title")}</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <li key={item.variantId} className="flex gap-4 border border-border bg-white p-4">
              <div className="relative h-24 w-20 bg-cream">
                <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1" unoptimized={item.imageUrl.endsWith(".svg")} />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted">{item.size}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button type="button" className="h-8 w-8 border" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button type="button" className="h-8 w-8 border" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>+</button>
                  <button type="button" className="ml-auto text-xs underline" onClick={() => removeItem(item.variantId)}>{t("remove")}</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit border border-border bg-cream/40 p-6">
          <div className="flex justify-between text-sm">
            <span>{t("subtotal")}</span>
            <span className="font-semibold">
              {total == null ? tc("contactForPrice") : `${total.toLocaleString()} FCFA`}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted">{t("deliveryEstimate")}: —</p>
          <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold">
            <span>{t("total")}</span>
            <span>{total == null ? tc("contactForPrice") : `${total.toLocaleString()} FCFA`}</span>
          </div>
          <Button asChild className="mt-6 w-full">
            <Link href="/checkout">{tc("proceedToCheckout")}</Link>
          </Button>
          <Button asChild variant="outline" className="mt-3 w-full">
            <Link href="/shop">{tc("continueShopping")}</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
