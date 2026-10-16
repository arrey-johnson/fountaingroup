import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function RetailWholesaleSplit() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="bg-cream px-8 py-12 sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
          For your home
        </p>
        <h2 className="mt-3 font-display text-3xl">{t("retailTitle")}</h2>
        <p className="mt-4 max-w-md text-muted">{t("retailDesc")}</p>
        <Button asChild className="mt-8">
          <Link href="/shop">{t("retailCta")}</Link>
        </Button>
      </div>
      <div className="bg-brand-green px-8 py-12 text-cream sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
          For your business
        </p>
        <h2 className="mt-3 font-display text-3xl text-white">{t("businessTitle")}</h2>
        <p className="mt-4 max-w-md text-cream/80">{t("businessDesc")}</p>
        <Button asChild variant="secondary" className="mt-8">
          <Link href="/wholesale">{t("businessCta")}</Link>
        </Button>
      </div>
    </section>
  );
}
