"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");

  return (
    <section className="relative overflow-hidden texture-soft pt-24 sm:pt-28">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-12">
        <div className="lg:col-span-6 xl:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal"
          >
            Fountain Group
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
          >
            {t("headlineLine1")}
            <br />
            <span className="brand-gradient-text">{t("headlineLine2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {t("supporting")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <Link href="/shop">{t("ctaShop")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/wholesale">{t("ctaBulk")}</Link>
            </Button>
          </motion.div>
          <p className="mt-8 text-sm text-muted">{t("trust")}</p>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-7">
          <div className="absolute -right-8 top-8 h-64 w-64 rounded-full bg-brand-teal/20 blur-3xl" />
          <div className="absolute bottom-0 left-4 h-48 w-48 rounded-full bg-brand-green/10 blur-3xl" />
          <div className="relative grid grid-cols-12 items-end gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="col-span-5 -mb-4"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream shadow-[0_30px_60px_-28px_rgba(23,33,27,0.35)]">
                <Image
                  src="/products/coconut-oil.png"
                  alt="Fountain Group Coconut Oil"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="col-span-7"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#e8f7f5] shadow-[0_36px_70px_-30px_rgba(11,61,56,0.35)]">
                <Image
                  src="/products/mamas-red-oil.png"
                  alt="Mama's Red Oil"
                  fill
                  className="object-contain p-3"
                  priority
                />
              </div>
              <p className="mt-4 text-center text-xs uppercase tracking-[0.16em] text-muted">
                {tc("brandName")} · Retail & Bulk
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
