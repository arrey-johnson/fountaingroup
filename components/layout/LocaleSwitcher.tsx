"use client";

import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const locales = [
  { code: "en" as const, label: "English", flag: "🇬🇧", short: "EN" },
  { code: "fr" as const, label: "Français", flag: "🇫🇷", short: "FR" },
];

export function LocaleSwitcher({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const current = locales.find((l) => l.code === locale) ?? locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-brand-green/40",
          variant === "dark"
            ? "text-white/90 hover:bg-white/10 hover:text-white"
            : "text-ink/80 hover:bg-ink/5 hover:text-ink",
          className,
        )}
        aria-label="Change language"
      >
        <span className="text-sm leading-none" aria-hidden>
          {current.flag}
        </span>
        <span>{current.short}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onSelect={() => router.replace(pathname, { locale: loc.code })}
            className={cn(
              "font-medium",
              locale === loc.code && "bg-cream text-brand-green",
            )}
          >
            <span className="text-base leading-none" aria-hidden>
              {loc.flag}
            </span>
            <span>{loc.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
