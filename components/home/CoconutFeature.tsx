import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export async function CoconutFeature() {
  const t = await getTranslations("home");

  return (
    <section className="overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/5] bg-cream">
          <Image
            src="/products/coconut-oil.png"
            alt="Fountain Group Coconut Oil"
            fill
            className="object-contain p-8"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
            Pure
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">{t("coconutStoryTitle")}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">{t("coconutStoryDesc")}</p>
          <ul className="mt-6 space-y-2 text-sm text-ink/80">
            <li>— 1L glass bottle presentation</li>
            <li>— Suited to retail shelves and home kitchens</li>
            <li>— Available for wholesale inquiry</li>
          </ul>
          <Button asChild className="mt-8">
            <Link href="/products/coconut-oil">{t("coconutStoryCta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
