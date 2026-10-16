import { setRequestLocale } from "next-intl/server";
import { getDistributorApplications } from "@/lib/data/repository";

export default async function AdminDistributorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const apps = await getDistributorApplications();

  return (
    <div>
      <h1 className="font-display text-3xl">Distributor applications</h1>
      {apps.length === 0 ? (
        <p className="mt-6 text-muted">No applications yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {apps.map((a) => (
            <li key={a.id} className="border border-border bg-white p-4 text-sm">
              <p className="font-semibold">{a.company} · {a.fullName}</p>
              <p className="text-muted">{a.city}, {a.country} · {a.email}</p>
              <p className="mt-1">{a.productsInterested.join(", ")}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-teal">{a.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
