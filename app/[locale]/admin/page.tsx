import { setRequestLocale } from "next-intl/server";
import { getDashboardStats } from "@/lib/data/repository";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const stats = await getDashboardStats();

  const cards = [
    ["Total Orders", stats.totalOrders],
    ["Pending Orders", stats.pendingOrders],
    ["Completed Orders", stats.completedOrders],
    ["Revenue", `${stats.revenue.toLocaleString()} FCFA`],
    ["Products", stats.products],
    ["Customers", stats.customers],
    ["Wholesale Requests", stats.wholesaleRequests],
    ["Distributor Applications", stats.distributorApplications],
    ["Contact Messages", stats.contactMessages],
  ] as const;

  return (
    <div>
      <h1 className="font-display text-3xl">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">Demo-mode overview from local store data.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="border border-border bg-white p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
            <p className="mt-3 font-display text-3xl">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
