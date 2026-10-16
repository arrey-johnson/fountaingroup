"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={cn("flex items-center gap-1 text-xs font-semibold uppercase tracking-wider", className)}>
      {(["en", "fr"] as const).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "rounded px-1.5 py-0.5 transition-colors",
            locale === loc ? "bg-brand-teal text-white" : "text-ink/60 hover:text-ink",
          )}
          aria-label={loc === "en" ? "English" : "Français"}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
