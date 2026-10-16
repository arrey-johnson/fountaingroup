import { setRequestLocale, getTranslations } from "next-intl/server";
import { WholesaleForm } from "@/components/forms/WholesaleForm";

export default async function WholesalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("wholesale");

  const steps = [
    [t("step1"), t("step1Desc")],
    [t("step2"), t("step2Desc")],
    [t("step3"), t("step3Desc")],
    [t("step4"), t("step4Desc")],
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">B2B</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-3xl text-muted">{t("intro")}</p>

      <section className="mt-14">
        <h2 className="font-display text-2xl">{t("processTitle")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, desc], i) => (
            <div key={title} className="border-t border-brand-green/40 pt-4">
              <span className="font-display text-2xl text-brand-green/40">0{i + 1}</span>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border border-border bg-white p-6 sm:p-10">
        <WholesaleForm />
      </section>
    </div>
  );
}
