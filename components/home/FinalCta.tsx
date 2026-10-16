import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function FinalCta() {
  const t = await getTranslations("home");

  return (
    <section className="bg-gradient-to-br from-brand-green via-[#005c30] to-[#004825] py-20 text-center text-cream">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-display text-3xl text-white sm:text-5xl">{t("finalCtaTitle")}</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href="/shop">{t("finalCtaShop")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
            <Link href="/wholesale">{t("finalCtaBulk")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
