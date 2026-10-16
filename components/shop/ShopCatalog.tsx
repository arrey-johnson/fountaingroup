"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { t as tl } from "@/lib/utils";
import type { Category, Locale, Product, SiteSettings } from "@/types";

export function ShopCatalog({
  products,
  categories,
  settings,
  initialQuery,
}: {
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
  initialQuery: Record<string, string | undefined>;
}) {
  const t = useTranslations("shop");
  const locale = useLocale() as Locale;
  const [search, setSearch] = useState(initialQuery.q ?? "");
  const [category, setCategory] = useState(initialQuery.category ?? "all");
  const [size, setSize] = useState(initialQuery.size ?? "all");
  const [sort, setSort] = useState(initialQuery.sort ?? "featured");

  const sizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.variants.forEach((v) => set.add(v.size)));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          tl(p.name, locale).toLowerCase().includes(q) ||
          tl(p.shortDescription, locale).toLowerCase().includes(q),
      );
    }
    if (category !== "all") {
      list = list.filter((p) => p.categoryId === category);
    }
    if (size !== "all") {
      list = list.filter((p) => p.variants.some((v) => v.size === size));
    }
    list.sort((a, b) => {
      if (sort === "name") {
        return tl(a.name, locale).localeCompare(tl(b.name, locale));
      }
      if (sort === "price-asc" || sort === "price-desc") {
        const pa = a.variants[0]?.price;
        const pb = b.variants[0]?.price;
        if (pa == null && pb == null) return 0;
        if (pa == null) return 1;
        if (pb == null) return -1;
        return sort === "price-asc" ? pa - pb : pb - pa;
      }
      return Number(b.featured) - Number(a.featured);
    });
    return list;
  }, [products, search, category, size, sort, locale]);

  return (
    <div className="mt-10">
      <div className="grid gap-3 rounded-sm border border-border bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
        />
        <select
          className="h-11 rounded-md border border-border bg-transparent px-3 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label={t("filterCategory")}
        >
          <option value="all">{t("filterCategory")}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {tl(c.name, locale)}
            </option>
          ))}
        </select>
        <select
          className="h-11 rounded-md border border-border bg-transparent px-3 text-sm"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          aria-label={t("filterSize")}
        >
          <option value="all">{t("filterSize")}</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="h-11 rounded-md border border-border bg-transparent px-3 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={t("sortLabel")}
        >
          <option value="featured">{t("sortFeatured")}</option>
          <option value="name">{t("sortName")}</option>
          <option value="price-asc">{t("sortPriceAsc")}</option>
          <option value="price-desc">{t("sortPriceDesc")}</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted">{t("noResults")}</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} settings={settings} />
          ))}
        </div>
      )}
    </div>
  );
}
