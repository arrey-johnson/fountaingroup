import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const products = await getProducts();
  const staticPaths = [
    "",
    "/shop",
    "/wholesale",
    "/about",
    "/quality",
    "/contact",
    "/faq",
    "/become-a-distributor",
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of ["en", "fr"]) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const product of products) {
      entries.push({
        url: `${base}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }
  return entries;
}
