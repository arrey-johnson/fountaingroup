import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const sections = [
    [t("storyTitle"), t("storyBody")],
    [t("produceTitle"), t("produceBody")],
    [t("approachTitle"), t("approachBody")],
    [t("visionTitle"), t("visionBody")],
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl sm:text-6xl">{t("title")}</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted">{t("intro")}</p>

      <section className="mt-16 grid items-start gap-10 border-y border-border py-14 lg:grid-cols-12">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden bg-cream lg:col-span-5 lg:mx-0">
          <Image
            src="/about/ngome-lifanje-ngale.jpg"
            alt={`${t("founderName")}, ${t("founderRole")}`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 400px"
            priority
          />
        </div>
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
            {t("leadershipTitle")}
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            {t("founderMessageTitle")}
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
            <p>{t("founderMessageP1")}</p>
            <p>{t("founderMessageP2")}</p>
          </div>
          <p className="mt-8 font-display text-xl text-ink">{t("founderName")}</p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
            {t("founderRole")}
          </p>
        </div>
      </section>

      <div className="mt-16 space-y-14">
        {sections.map(([title, body], i) => (
          <section
            key={title}
            className={`grid gap-6 lg:grid-cols-12 ${i % 2 ? "lg:text-right" : ""}`}
          >
            <h2 className={`font-display text-3xl lg:col-span-4 ${i % 2 ? "lg:col-start-9" : ""}`}>
              {title}
            </h2>
            <p className={`leading-relaxed text-muted lg:col-span-7 ${i % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6"}`}>
              {body}
            </p>
          </section>
        ))}
      </div>
      <section className="mt-20 border-t border-border pt-12">
        <h2 className="font-display text-3xl">{t("valuesTitle")}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {["Clarity", "Care", "Partnership"].map((v) => (
            <div key={v} className="bg-cream p-6">
              <p className="font-semibold">{v}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
