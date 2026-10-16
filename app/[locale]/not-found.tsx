import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("errors");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 pt-36 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
        Fountain Group
      </p>
      <h1 className="mt-4 font-display text-4xl">{t("notFoundTitle")}</h1>
      <p className="mt-4 text-muted">{t("notFoundBody")}</p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop">Shop</Link>
        </Button>
      </div>
    </div>
  );
}
