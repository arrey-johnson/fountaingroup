import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { getOrderByNumber } from "@/lib/data/repository";
import { Button } from "@/components/ui/button";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ locale: string; orderNumber: string }>;
}) {
  const { locale, orderNumber } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("order");
  const order = await getOrderByNumber(orderNumber);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-28 text-center">
      <h1 className="font-display text-4xl">{t("confirmationTitle")}</h1>
      <p className="mt-4 text-muted">{t("confirmationIntro")}</p>
      <p className="mt-8 text-sm uppercase tracking-[0.16em] text-brand-green">
        {t("orderNumber")}
      </p>
      <p className="mt-2 font-display text-3xl">{order.orderNumber}</p>
      <Button asChild className="mt-10">
        <Link href="/shop">{t("backToShop")}</Link>
      </Button>
    </div>
  );
}
