import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCategories, getProducts, getSettings } from "@/lib/data/repository";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("title"), description: t("intro") };
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const query = await searchParams;
  const [products, categories, settings, t] = await Promise.all([
    getProducts(),
    getCategories(),
    getSettings(),
    getTranslations("shop"),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("intro")}</p>
      </header>
      <ShopCatalog
        products={products}
        categories={categories}
        settings={settings}
        initialQuery={query}
      />
    </div>
  );
}
