import { getLocale, getTranslations } from "next-intl/server";
import { getTestimonials } from "@/lib/data/repository";
import { t as tl } from "@/lib/utils";
import type { Locale } from "@/types";

export async function Testimonials() {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const locale = (await getLocale()) as Locale;
  const items = await getTestimonials();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl sm:text-4xl">{t("testimonialsTitle")}</h2>
        <span className="rounded-full bg-brand-orange/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-orange">
          {tc("demoBadge")}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-muted">{t("testimonialsNote")}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <blockquote key={item.id} className="border border-border bg-white p-8">
            {item.isDemo && (
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                {tc("demoBadge")} · editable seed
              </p>
            )}
            <p className="font-display text-xl leading-relaxed text-ink">
              “{tl(item.quote, locale)}”
            </p>
            <footer className="mt-6 text-sm">
              <p className="font-semibold">{item.author}</p>
              <p className="text-muted">{tl(item.role, locale)}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
