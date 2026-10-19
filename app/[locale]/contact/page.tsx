import { setRequestLocale, getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { getSettings } from "@/lib/data/repository";
import { ContactForm } from "@/components/forms/ContactForm";

function isRealSocialUrl(href?: string) {
  if (!href) return false;
  const trimmed = href.trim();
  if (!trimmed || trimmed === "#") return false;
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "facebook.com" && (url.pathname === "/" || url.pathname === "")) {
      return false;
    }
    return Boolean(url.href);
  } catch {
    return false;
  }
}

function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 9) {
    return `+237 ${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
  }
  if (digits.startsWith("237") && digits.length === 12) {
    const local = digits.slice(3);
    return `+237 ${local.slice(0, 1)} ${local.slice(1, 3)} ${local.slice(3, 5)} ${local.slice(5, 7)} ${local.slice(7)}`;
  }
  return phone.startsWith("+") ? phone : `+237 ${phone}`;
}

function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const full = digits.startsWith("237") ? digits : `237${digits}`;
  return `tel:+${full}`;
}

function whatsappHref(whatsapp: string) {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, settings] = await Promise.all([
    getTranslations("contact"),
    getSettings(),
  ]);

  const phoneDisplay = formatPhoneDisplay(settings.phone);
  const location = [settings.address, settings.city, settings.country]
    .filter(Boolean)
    .join(", ");
  const mapQuery = location ? encodeURIComponent(location) : "";
  const instagram = isRealSocialUrl(settings.socialLinks.instagram)
    ? settings.socialLinks.instagram
    : "";
  const facebook = isRealSocialUrl(settings.socialLinks.facebook)
    ? settings.socialLinks.facebook
    : "";

  return (
    <div className="bg-surface">
      <section className="border-b border-border bg-cream/50">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-36 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
            Fountain Group
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl text-ink sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {t("intro")}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
        <div className="space-y-6 lg:col-span-5">
          <div className="space-y-3">
            {settings.phone && (
              <a
                href={telHref(settings.phone)}
                className="flex items-start gap-4 rounded-md border border-border bg-white p-4 transition-colors hover:border-brand-teal/40"
              >
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-teal/15 text-brand-green">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {t("phoneLabel")}
                  </span>
                  <span className="mt-1 block text-base font-medium text-ink">
                    {phoneDisplay}
                  </span>
                </span>
              </a>
            )}

            {settings.whatsapp && (
              <a
                href={whatsappHref(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-md border border-border bg-white p-4 transition-colors hover:border-brand-teal/40"
              >
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-teal/15 text-brand-green">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {t("whatsappLabel")}
                  </span>
                  <span className="mt-1 block text-base font-medium text-ink">
                    {formatPhoneDisplay(settings.whatsapp)}
                  </span>
                </span>
              </a>
            )}

            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-4 rounded-md border border-border bg-white p-4 transition-colors hover:border-brand-teal/40"
              >
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-teal/15 text-brand-green">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {t("emailLabel")}
                  </span>
                  <span className="mt-1 block text-base font-medium text-ink">
                    {settings.email}
                  </span>
                </span>
              </a>
            )}

            {location && (
              <div className="flex items-start gap-4 rounded-md border border-border bg-white p-4">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-teal/15 text-brand-green">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {t("addressLabel")}
                  </span>
                  <span className="mt-1 block text-base font-medium leading-relaxed text-ink">
                    {location}
                  </span>
                </span>
              </div>
            )}
          </div>

          {(instagram || facebook) && (
            <div className="rounded-md border border-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {t("socialLabel")}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-brand-teal hover:text-brand-green"
                  >
                    Instagram
                  </a>
                )}
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-brand-teal hover:text-brand-green"
                  >
                    Facebook
                  </a>
                )}
              </div>
            </div>
          )}

          {location && mapQuery && (
            <div className="overflow-hidden rounded-md border border-border bg-white">
              <iframe
                title={t("mapTitle")}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="border-t border-border px-4 py-3 text-sm text-muted">
                {location}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="border border-border bg-white p-6 shadow-[0_20px_50px_-40px_rgba(6,47,41,0.45)] sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
