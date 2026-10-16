import { getTranslations } from "next-intl/server";

export async function BrandStatement() {
  const t = await getTranslations("home");

  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal lg:col-span-3">
          Natural Goodness
        </p>
        <div className="lg:col-span-9">
          <p className="font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            {t("brandStatementLine1")}
            <span className="text-brand-green"> {t("brandStatementLine2")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
