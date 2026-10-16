import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { routing } from "@/lib/i18n/routing";
import { getSettings } from "@/lib/data/repository";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MiniCart } from "@/components/layout/MiniCart";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "fr")) notFound();
  setRequestLocale(locale);

  const [messages, settings] = await Promise.all([getMessages(), getSettings()]);

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </div>
      <MiniCart settings={settings} />
      <Toaster position="top-center" richColors />
    </NextIntlClientProvider>
  );
}
