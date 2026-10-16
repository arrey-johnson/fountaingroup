import { setRequestLocale, getTranslations } from "next-intl/server";
import { DistributorForm } from "@/components/forms/DistributorForm";

export default async function DistributorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("distributor");

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("intro")}</p>
      <div className="mt-10 border border-border bg-white p-6 sm:p-8">
        <DistributorForm />
      </div>
    </div>
  );
}
