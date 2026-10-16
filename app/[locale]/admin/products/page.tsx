import { setRequestLocale } from "next-intl/server";
import { getProducts } from "@/lib/data/repository";

export default async function AdminProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const products = await getProducts();

  return (
    <div>
      <h1 className="font-display text-3xl">Products</h1>
      <div className="mt-6 overflow-x-auto border border-border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-cream/50">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Variants</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.name.en}</td>
                <td className="p-3">{p.sku}</td>
                <td className="p-3">{p.variants.map((v) => v.size).join(", ")}</td>
                <td className="p-3">{p.featured ? "Yes" : "No"}</td>
                <td className="p-3">{p.active ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted">
        Full create/edit UI can be extended; seed data is editable via repository/demo store.
      </p>
    </div>
  );
}
