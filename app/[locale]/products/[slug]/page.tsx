import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  getProductBySlug,
  getProducts,
  getSettings,
} from "@/lib/data/repository";
import { ProductDetail } from "@/components/products/ProductDetail";
import { t as tl } from "@/lib/utils";
import type { Locale } from "@/types";
import { productJsonLd } from "@/lib/seo/jsonld";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.flatMap((p) => [
    { locale: "en", slug: p.slug },
    { locale: "fr", slug: p.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: tl(product.seoTitle, locale as Locale),
    description: tl(product.seoDescription, locale as Locale),
    openGraph: {
      title: tl(product.name, locale as Locale),
      description: tl(product.shortDescription, locale as Locale),
      images: product.images[0] ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [product, settings, all] = await Promise.all([
    getProductBySlug(slug),
    getSettings(),
    getProducts(),
  ]);
  if (!product) notFound();
  const related = all.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product, locale as Locale)),
        }}
      />
      <ProductDetail product={product} settings={settings} related={related} />
    </>
  );
}
