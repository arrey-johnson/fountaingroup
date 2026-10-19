"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { submitContactAction } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const t = useTranslations("contact");
  const [pending, start] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.currentTarget).entries());
        start(async () => {
          const res = await submitContactAction(form);
          setStatus({
            ok: res.ok,
            text: res.ok ? res.message : res.error,
          });
          if (res.ok) e.currentTarget.reset();
        });
      }}
    >
      <div>
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          {t("formTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted">{t("formIntro")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" name="name" required className="mt-1" autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input id="phone" name="phone" required className="mt-1" autoComplete="tel" />
        </div>
      </div>

      <div>
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1"
          autoComplete="email"
        />
      </div>

      <div>
        <Label htmlFor="category">{t("category")}</Label>
        <select
          id="category"
          name="category"
          className="mt-1 h-11 w-full rounded-md border border-ink/15 bg-white px-3 text-sm"
          required
          defaultValue="general"
        >
          <option value="retail">{t("categoryRetail")}</option>
          <option value="wholesale">{t("categoryWholesale")}</option>
          <option value="distribution">{t("categoryDistribution")}</option>
          <option value="partnership">{t("categoryPartnership")}</option>
          <option value="general">{t("categoryGeneral")}</option>
        </select>
      </div>

      <div>
        <Label htmlFor="subject">{t("subject")}</Label>
        <Input id="subject" name="subject" required className="mt-1" />
      </div>

      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" name="message" required className="mt-1 min-h-32" />
      </div>

      {status && (
        <p
          className={
            status.ok ? "text-sm text-brand-green" : "text-sm text-red-700"
          }
        >
          {status.text}
        </p>
      )}

      <Button type="submit" disabled={pending} size="lg">
        {pending ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
