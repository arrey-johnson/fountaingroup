"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { SiteSettings } from "@/types";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();
  const socials = [
    { href: settings.socialLinks.facebook, label: "Facebook" },
    { href: settings.socialLinks.instagram, label: "Instagram" },
    { href: settings.socialLinks.linkedin, label: "LinkedIn" },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="bg-brand-green text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-4">
          <Image
            src={settings.logoUrl || "/brand/logo.png"}
            alt={settings.companyName}
            width={160}
            height={150}
            className="h-16 w-auto object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
            {t("description")}
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="rounded-md border border-white/15 px-3 py-1.5 text-xs uppercase tracking-wider hover:bg-white/10"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-amber">
            {t("quickLinks")}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li><Link href="/shop" className="hover:text-white">{tn("products")}</Link></li>
            <li><Link href="/wholesale" className="hover:text-white">{tn("wholesale")}</Link></li>
            <li><Link href="/about" className="hover:text-white">{tn("about")}</Link></li>
            <li><Link href="/quality" className="hover:text-white">{tn("quality")}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{tn("contact")}</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-amber">
            {t("customer")}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li><Link href="/admin/login" className="hover:text-white">My Account</Link></li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link href="/faq" className="hover:text-white">{tn("faq")}</Link></li>
            <li><Link href="/become-a-distributor" className="hover:text-white">{tn("becomeDistributor")}</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-amber">
            {t("contact")}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li>{settings.phone}</li>
            <li>{settings.email}</li>
            <li>{settings.address}</li>
            <li>{settings.city}, {settings.country}</li>
          </ul>
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium text-white">{t("newsletter")}</p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{t("copyright", { year })}</p>
          <p>
            Designed & Developed by{" "}
            <a
              href={settings.promptstackUrl || "#"}
              className="text-cream/70 underline-offset-2 hover:text-white hover:underline"
            >
              Promptstack Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
