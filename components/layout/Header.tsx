"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { useCartStore } from "@/lib/cart/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./LocaleSwitcher";

const navKeys = [
  { href: "/", key: "home" },
  { href: "/shop", key: "products" },
  { href: "/wholesale", key: "wholesale" },
  { href: "/about", key: "about" },
  { href: "/quality", key: "quality" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const itemCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0),
  );
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-surface/95 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center gap-2.5 overflow-visible"
          aria-label="Fountain Group home"
        >
          <Image
            src="/brand/logo.jpg"
            alt="Fountain Group"
            width={160}
            height={150}
            className="h-10 w-auto object-contain sm:h-12"
            priority
          />
          <span className="sr-only">Fountain Group</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navKeys.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-ink/80 transition-colors hover:text-brand-green"
            >
              {t(item.key)}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-green transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LocaleSwitcher className="mr-1 hidden sm:flex" />
          <Link
            href="/shop"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink/80 hover:bg-ink/5 hover:text-ink"
            aria-label={tc("search")}
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/admin/login"
            className="hidden h-10 w-10 items-center justify-center rounded-md text-ink/80 hover:bg-ink/5 hover:text-ink sm:inline-flex"
            aria-label={tc("account")}
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-ink/80 hover:bg-ink/5 hover:text-ink"
            aria-label={tc("cart")}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-teal px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <Button asChild size="sm" className="ml-1 hidden md:inline-flex">
            <Link href="/shop">{tc("shopNow")}</Link>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? tc("close") : "Menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-4 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {navKeys.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-ink"
              >
                {t(item.key)}
              </Link>
            ))}
            <LocaleSwitcher />
            <Button asChild className="mt-2 w-full">
              <Link href="/shop" onClick={() => setOpen(false)}>
                {tc("shopNow")}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
