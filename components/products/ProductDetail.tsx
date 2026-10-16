"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/lib/format";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { t as tl } from "@/lib/utils";
import type { Locale, Product, SiteSettings } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ProductDetail({
  product,
  settings,
  related,
}: {
  product: Product;
  settings: SiteSettings;
  related: Product[];
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("product");
  const tc = useTranslations("common");
  const addItem = useCartStore((s) => s.addItem);
  const defaultVariant = product.variants.find((v) => v.isDefault) ?? product.variants[0];
  const [variantId, setVariantId] = useState(defaultVariant?.id);
  const [qty, setQty] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) ?? defaultVariant;
  const [imageIndex, setImageIndex] = useState(0);
  const image = product.images[imageIndex] ?? product.images[0];
  const hasPrice = variant?.price != null;
  const wa = buildWhatsAppOrderUrl(settings, {
    productName: tl(product.name, locale),
    size: variant?.size ?? "",
    quantity: qty,
  });

  const addToCart = () => {
    if (!variant || !hasPrice) return;
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
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-28 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/5] bg-cream">
            {image && (
              <Image
                src={image.url}
                alt={tl(image.alt, locale)}
                fill
                className="object-contain p-8"
                unoptimized={image.url.endsWith(".svg")}
                priority
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setImageIndex(idx)}
                  className={`relative aspect-square border bg-cream p-1 ${
                    idx === imageIndex ? "border-brand-green" : "border-border"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={tl(img.alt, locale)}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
            {tl(product.tagline, locale)}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            {tl(product.name, locale)}
          </h1>
          <p className="mt-4 text-muted">{tl(product.shortDescription, locale)}</p>
          <p className="mt-6 text-2xl font-semibold">
            {formatPrice(variant?.price ?? null, settings, tc("contactForPrice"))}
          </p>

          <div className="mt-6">
            <p className="text-sm font-semibold">{t("variants")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  className={`rounded border px-3 py-2 text-sm ${
                    v.id === variantId
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-border"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold">{t("quantity")}</p>
            <div className="mt-2 inline-flex items-center border border-border">
              <button type="button" className="h-11 w-11" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="w-10 text-center">{qty}</span>
              <button type="button" className="h-11 w-11" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted">
            {t("stock")}: {(variant?.stock ?? 0) > 0 ? "Available" : "Unavailable"}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {hasPrice ? (
              <>
                <Button size="lg" onClick={addToCart}>{tc("addToCart")}</Button>
                <Button size="lg" variant="secondary" onClick={addToCart}>{tc("buyNow")}</Button>
              </>
            ) : (
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">{tc("contactForPrice")}</Link>
              </Button>
            )}
            {wa ? (
              <Button asChild size="lg" variant="ghost">
                <a href={wa} target="_blank" rel="noreferrer">{t("orderWhatsApp")}</a>
              </Button>
            ) : null}
          </div>

          <div className="mt-10 border border-border bg-cream/50 p-5">
            <p className="font-semibold">{t("buyingBulk")}</p>
            <Button asChild variant="outline" className="mt-3">
              <Link href="/wholesale">{tc("requestQuote")}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">{t("description")}</h2>
          <p className="mt-3 leading-relaxed text-muted">{tl(product.description, locale)}</p>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold">{t("packaging")}</h3>
            <p className="mt-2 text-sm text-muted">{tl(product.packagingInfo, locale)}</p>
          </div>
          <div>
            <h3 className="font-semibold">{t("storage")}</h3>
            <p className="mt-2 text-sm text-muted">{tl(product.storageInfo, locale)}</p>
          </div>
          <div>
            <h3 className="font-semibold">{t("usage")}</h3>
            <p className="mt-2 text-sm text-muted">{tl(product.usageInfo, locale)}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-3xl">{t("related")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="border border-border bg-white p-4 hover:border-brand-green">
                <p className="font-display text-xl">{tl(p.name, locale)}</p>
                <p className="mt-1 text-sm text-muted">{tl(p.tagline, locale)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur md:hidden">
        {hasPrice ? (
          <Button className="w-full" size="lg" onClick={addToCart}>{tc("addToCart")}</Button>
        ) : (
          <Button asChild className="w-full" size="lg" variant="outline">
            <Link href="/contact">{tc("contactForPrice")}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
