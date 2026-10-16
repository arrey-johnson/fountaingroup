import { getTranslations } from "next-intl/server";
import { getFeaturedProducts, getSettings } from "@/lib/data/repository";
import { ProductCard } from "@/components/products/ProductCard";

export async function FeaturedProducts() {
  const t = await getTranslations("home");
  const [products, settings] = await Promise.all([
    getFeaturedProducts(),
    getSettings(),
  ]);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl">{t("featuredTitle")}</h2>
          <p className="mt-3 text-muted">{t("featuredIntro")}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} settings={settings} />
          ))}
        </div>
      </div>
    </section>
  );
}
