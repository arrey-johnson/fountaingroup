import { getTranslations } from "next-intl/server";
import { Leaf, Package, Store, Truck } from "lucide-react";

export async function WhyFountain() {
  const t = await getTranslations("home");
  const items = [
    { icon: Leaf, title: t("why1Title"), desc: t("why1Desc") },
    { icon: Package, title: t("why2Title"), desc: t("why2Desc") },
    { icon: Store, title: t("why3Title"), desc: t("why3Desc") },
    { icon: Truck, title: t("why4Title"), desc: t("why4Desc") },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl sm:text-4xl">{t("whyTitle")}</h2>
        <p className="mt-4 text-muted">{t("whyIntro")}</p>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="border-t border-brand-green/30 pt-6">
            <Icon className="h-5 w-5 text-brand-green" aria-hidden />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
