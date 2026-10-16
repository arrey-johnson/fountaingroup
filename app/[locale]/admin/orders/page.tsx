import { setRequestLocale } from "next-intl/server";
import { getOrders } from "@/lib/data/repository";
import { AdminOrderActions } from "@/components/admin/AdminOrderActions";

export default async function AdminOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const orders = await getOrders();

  return (
    <div>
      <h1 className="font-display text-3xl">Orders</h1>
      {orders.length === 0 ? (
        <p className="mt-6 text-muted">No orders yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border border-border bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{o.orderNumber}</p>
                  <p className="text-sm text-muted">
                    {o.customerName} · {o.phone} · {o.email}
                  </p>
                  <p className="mt-1 text-sm">
                    {o.status} / {o.paymentStatus} ·{" "}
                    {o.total == null ? "Contact for Price" : `${o.total.toLocaleString()} FCFA`}
                  </p>
                </div>
                <AdminOrderActions orderNumber={o.orderNumber} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
