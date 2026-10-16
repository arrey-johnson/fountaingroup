import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCertifications } from "@/lib/data/repository";

export default async function QualityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, certs] = await Promise.all([
    getTranslations("quality"),
    getCertifications(),
  ]);

  const blocks = [
    [t("philosophyTitle"), t("philosophyBody")],
    [t("materialsTitle"), t("materialsBody")],
    [t("productionTitle"), t("productionBody")],
    [t("packagingTitle"), t("packagingBody")],
    [t("storageTitle"), t("storageBody")],
    [t("handlingTitle"), t("handlingBody")],
    [t("assuranceTitle"), t("assuranceBody")],
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-3xl text-muted">{t("intro")}</p>
      <div className="mt-14 grid gap-8">
        {blocks.map(([title, body]) => (
          <section key={title} className="border-l-2 border-brand-green/40 pl-6">
            <h2 className="font-display text-2xl">{title}</h2>
            <p className="mt-3 text-muted">{body}</p>
          </section>
        ))}
      </div>

      {certs.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl">{t("certsTitle")}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {certs.map((c) => (
              <li key={c.id} className="border border-border p-4">
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-muted">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="mt-16 border border-dashed border-border bg-cream/30 p-6">
          <h2 className="font-display text-2xl">{t("certsTitle")}</h2>
          <p className="mt-3 text-sm text-muted">{t("certsEmpty")}</p>
        </section>
      )}
    </div>
  );
}
