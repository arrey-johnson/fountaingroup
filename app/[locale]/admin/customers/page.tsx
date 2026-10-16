import { setRequestLocale } from "next-intl/server";
import { getOrders } from "@/lib/data/repository";

export default async function AdminCustomersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const orders = await getOrders();
  const customers = Array.from(
    new Map(orders.map((o) => [o.email, { name: o.customerName, email: o.email, phone: o.phone }])).values(),
  );

  return (
    <div>
      <h1 className="font-display text-3xl">Customers</h1>
      {customers.length === 0 ? (
        <p className="mt-6 text-muted">Customers appear after retail orders are placed.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {customers.map((c) => (
            <li key={c.email} className="border border-border bg-white p-4 text-sm">
              <p className="font-semibold">{c.name}</p>
              <p className="text-muted">{c.email} · {c.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
