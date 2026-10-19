import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { partners } from "@/lib/data/partners";
import { cn } from "@/lib/utils";

export async function Partners() {
  const t = await getTranslations("home");

  return (
    <section className="border-y border-border bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
            {t("partnersEyebrow")}
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            {t("partnersTitle")}
          </h2>
          <p className="mt-4 text-muted">{t("partnersIntro")}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 items-stretch gap-4 sm:grid-cols-4">
          {partners.map((partner) => (
            <li
              key={partner.id}
              className="flex min-h-[140px] flex-col items-center justify-center border border-border bg-surface px-3 py-5 transition-colors hover:border-brand-green/30"
            >
              <div
                className={cn(
                  "relative flex h-16 w-full items-center justify-center rounded-sm px-3",
                  partner.darkPlate ? "bg-[#111]" : "bg-white",
                )}
              >
                <div className="relative h-12 w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              </div>
              <p className="mt-4 text-center text-xs font-medium text-muted">
                {partner.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
