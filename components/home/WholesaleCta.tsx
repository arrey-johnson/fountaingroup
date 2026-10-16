import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function WholesaleCta() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden bg-ink px-8 py-14 text-cream sm:px-14">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-teal/25 blur-2xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl text-white sm:text-4xl">
            {t("wholesaleCtaTitle")}
          </h2>
          <p className="mt-4 text-cream/75">{t("wholesaleCtaDesc")}</p>
          <p className="mt-4 text-sm text-cream/55">
            Wholesalers · Distributors · Supermarkets · Restaurants · Hotels · Institutions
          </p>
          <Button asChild variant="secondary" className="mt-8">
            <Link href="/wholesale">{t("wholesaleCtaButton")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
