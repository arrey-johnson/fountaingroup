"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/lib/format";
import type { SiteSettings } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function MiniCart({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("cart");
  const tc = useTranslations("common");
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } =
    useCartStore();
  const total = subtotal();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">{t("title")}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-2 text-center">
            <p className="text-muted">{t("empty")}</p>
            <Button asChild onClick={closeCart}>
              <Link href="/shop">{t("emptyCta")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-1 py-4">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-3 border-b border-border pb-4">
                  <div className="relative h-20 w-16 overflow-hidden rounded bg-cream">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted">{item.size}</p>
                    <p className="mt-1 text-sm">
                      {formatPrice(item.price, settings, tc("contactForPrice"))}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="h-7 w-7 rounded border border-border"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        className="h-7 w-7 rounded border border-border"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-xs text-muted underline"
                        onClick={() => removeItem(item.variantId)}
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span>{t("subtotal")}</span>
                <span className="font-semibold">
                  {formatPrice(total, settings, tc("contactForPrice"))}
                </span>
              </div>
              <Button asChild className="w-full" onClick={closeCart}>
                <Link href="/cart">{tc("proceedToCheckout")}</Link>
              </Button>
              <Button asChild variant="outline" className="w-full" onClick={closeCart}>
                <Link href="/shop">{tc("continueShopping")}</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
