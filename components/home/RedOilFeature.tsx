import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function RedOilFeature() {
  const t = await getTranslations("home");

  return (
    <section className="bg-gradient-to-br from-[#FFF4EC] via-white to-[#F3F8F5]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
            {t("redOilStorySub")}
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-5xl">
            {t("redOilStoryTitle")}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">{t("redOilStoryDesc")}</p>
          <Button asChild variant="destructive" className="mt-8">
            <Link href="/products/mamas-red-oil">{t("redOilStoryCta")}</Link>
          </Button>
        </div>
        <div className="relative order-1 aspect-square lg:order-2">
          <div className="absolute inset-6 rounded-full bg-brand-orange/10" />
          <Image
            src="/products/mamas-red-oil.png"
            alt="Mama's Red Oil packaging"
            fill
            className="object-contain p-6"
          />
        </div>
      </div>
    </section>
  );
}
