import { setRequestLocale, getTranslations, getLocale } from "next-intl/server";
import { getSettings } from "@/lib/data/repository";
import { ContactForm } from "@/components/forms/ContactForm";
import { t as tl } from "@/lib/utils";
import type { Locale } from "@/types";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, settings] = await Promise.all([getTranslations("contact"), getSettings()]);
  const loc = (await getLocale()) as Locale;

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-36 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <h1 className="font-display text-4xl sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("intro")}</p>
        <ul className="mt-8 space-y-2 text-sm">
          <li>{settings.phone}</li>
          <li>{settings.email}</li>
          <li>{settings.whatsapp || "WhatsApp: [to be configured]"}</li>
          <li>{settings.address}</li>
          <li>{settings.city}, {settings.country}</li>
          <li className="pt-2 text-muted">{tl(settings.businessHours, loc)}</li>
        </ul>
        <p className="mt-6 text-sm text-muted">{t("hours")}</p>
        <div className="mt-8 flex min-h-48 items-center justify-center border border-dashed border-border bg-cream/40 p-6 text-center text-sm text-muted">
          {t("mapPlaceholder")}
        </div>
      </div>
      <div className="border border-border bg-white p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
