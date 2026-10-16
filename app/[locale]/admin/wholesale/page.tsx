import { setRequestLocale } from "next-intl/server";
import { getWholesaleRequests } from "@/lib/data/repository";
import { AdminWholesaleActions } from "@/components/admin/AdminWholesaleActions";

export default async function AdminWholesalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const requests = await getWholesaleRequests();

  return (
    <div>
      <h1 className="font-display text-3xl">Wholesale RFQs</h1>
      {requests.length === 0 ? (
        <p className="mt-6 text-muted">No wholesale requests yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="border border-border bg-white p-4">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="font-semibold">{r.rfqNumber}</p>
                  <p className="text-sm text-muted">
                    {r.companyName} · {r.fullName} · {r.city}, {r.country}
                  </p>
                  <p className="mt-1 text-sm">
                    {r.products.map((p) => `${p.productName} (${p.quantity} ${p.unit})`).join("; ")}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-brand-teal">{r.status}</p>
                </div>
                <AdminWholesaleActions rfqNumber={r.rfqNumber} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
