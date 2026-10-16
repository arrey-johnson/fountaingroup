"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/lib/format";
import { t as tl } from "@/lib/utils";
import type { Locale, Product, SiteSettings } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ProductCard({
  product,
  settings,
}: {
  product: Product;
  settings: SiteSettings;
}) {
  const locale = useLocale() as Locale;
  const tc = useTranslations("common");
  const addItem = useCartStore((s) => s.addItem);
  const defaultVariant = product.variants.find((v) => v.isDefault) ?? product.variants[0];
  const [variantId, setVariantId] = useState(defaultVariant?.id);
  const [qty, setQty] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) ?? defaultVariant;
  const image = product.images[0];
  const hasPrice = variant?.price != null;

  return (
    <article className="group flex flex-col border border-border/80 bg-white p-4 transition-shadow hover:shadow-[0_20px_40px_-28px_rgba(23,33,27,0.35)]">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] bg-cream">
        {image && (
          <Image
            src={image.url}
            alt={tl(image.alt, locale)}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs uppercase tracking-[0.14em] text-brand-teal">
          {tl(product.tagline, locale)}
        </p>
        <Link href={`/products/${product.slug}`} className="mt-1 font-display text-xl hover:text-brand-green">
          {tl(product.name, locale)}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {tl(product.shortDescription, locale)}
        </p>

        {product.variants.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={`rounded border px-2 py-1 text-xs ${
                  v.id === variantId
                    ? "border-brand-green bg-brand-green text-white"
                    : "border-border"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        )}

        <p className="mt-3 text-sm font-semibold">
          {formatPrice(variant?.price ?? null, settings, tc("contactForPrice"))}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center border border-border">
            <button type="button" className="h-10 w-9" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="w-8 text-center text-sm">{qty}</span>
            <button type="button" className="h-10 w-9" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          {hasPrice ? (
            <Button
              onClick={() => {
                if (!variant) return;
                addItem({
                  productId: product.id,
                  variantId: variant.id,
                  slug: product.slug,
                  name: tl(product.name, locale),
                  size: variant.size,
                  unit: variant.unit,
                  price: variant.price,
                  quantity: qty,
                  imageUrl: image?.url ?? "",
                });
                toast.success(tc("addToCart"));
              }}
            >
              {tc("addToCart")}
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/contact">{tc("contactForPrice")}</Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="sm">
            <Link href={`/products/${product.slug}`}>{tc("viewProduct")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
