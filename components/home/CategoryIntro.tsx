import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

export async function CategoryIntro() {
  const t = await getTranslations("home");

  const items = [
    {
      title: t("coconutTitle"),
      desc: t("coconutDesc"),
      cta: t("coconutCta"),
      href: "/products/coconut-oil",
      image: "/products/coconut-oil.png",
      tone: "bg-[#e8f7f6]",
    },
    {
      title: t("redOilTitle"),
      desc: t("redOilDesc"),
      cta: t("redOilCta"),
      href: "/products/mamas-red-oil",
      image: "/products/mamas-red-oil-family.jpg",
      tone: "bg-[#eef8f7]",
    },
    {
      title: t("honeyTitle"),
      desc: t("honeyDesc"),
      cta: t("honeyCta"),
      href: "/products/pure-honey",
      image: "/products/pure-honey.png",
      tone: "bg-[#f3fafa]",
    },
    {
      title: t("flourTitle"),
      desc: t("flourDesc"),
      cta: t("flourCta"),
      href: "/products/organic-coconut-flour",
      image: "/products/organic-coconut-flour.png",
      tone: "bg-[#eaf5f4]",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="max-w-xl font-display text-3xl text-ink sm:text-4xl">
        {t("categoryIntroTitle")}
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {items.map((item) => (
          <article key={item.href} className="group relative">
            <div className={`relative overflow-visible ${item.tone} px-6 pb-10 pt-8 sm:px-10`}>
              <div className="relative mx-auto aspect-[4/5] max-w-sm -mt-2 transition-transform duration-500 group-hover:-translate-y-2">
                <Image src={item.image} alt={item.title} fill className="object-contain drop-shadow-xl" />
              </div>
              <h3 className="mt-6 font-display text-2xl">{item.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{item.desc}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex text-sm font-semibold text-brand-green underline-offset-4 hover:underline"
              >
                {item.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
