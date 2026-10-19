"use client";

import { MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/types";
import { LocaleSwitcher } from "./LocaleSwitcher";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.12.18 2.12.18v2.33h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.48V23h-4V8.5z" />
    </svg>
  );
}

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
    return true;
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

export function TopBar({ settings }: { settings: SiteSettings }) {
  const location = [settings.address, settings.city, settings.country]
    .filter(Boolean)
    .join(", ");
  const socials = [
    { href: settings.socialLinks.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: settings.socialLinks.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: settings.socialLinks.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  ].filter((s) => isRealSocialUrl(s.href));

  return (
    <div className="bg-brand-green text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 px-4 text-[11px] sm:h-10 sm:px-6 sm:text-xs lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          {settings.phone && (
            <a
              href={telHref(settings.phone)}
              className="inline-flex shrink-0 items-center gap-1.5 text-white/90 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              <span className="font-medium tracking-wide">
                {formatPhoneDisplay(settings.phone)}
              </span>
            </a>
          )}
          {location && (
            <span className="hidden min-w-0 items-center gap-1.5 text-white/80 sm:inline-flex">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">{location}</span>
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {socials.length > 0 && (
            <div className="flex items-center gap-1 border-r border-white/20 pr-2 sm:pr-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          )}
          <LocaleSwitcher variant="dark" />
        </div>
      </div>
    </div>
  );
}
