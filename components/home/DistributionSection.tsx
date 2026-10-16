import { getTranslations } from "next-intl/server";

export async function DistributionSection() {
  const t = await getTranslations("home");
  const items = [t("dist1"), t("dist2"), t("dist3"), t("dist4")];

  return (
    <section className="border-y border-border bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl">{t("distributionTitle")}</h2>
        <p className="mt-3 max-w-2xl text-muted">{t("distributionIntro")}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={item} className="bg-surface p-6">
              <span className="font-display text-3xl text-brand-green/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
