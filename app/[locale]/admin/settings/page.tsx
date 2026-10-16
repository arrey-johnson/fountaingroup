import { setRequestLocale } from "next-intl/server";
import { getSettings } from "@/lib/data/repository";
import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";

export default async function AdminSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-display text-3xl">Site settings</h1>
      <p className="mt-2 text-sm text-muted">
        Update contact details and currency display used across the storefront.
      </p>
      <div className="mt-8 max-w-xl">
        <AdminSettingsForm settings={settings} />
      </div>
    </div>
  );
}
