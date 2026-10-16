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
  const [message, setMessage] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.currentTarget).entries());
        start(async () => {
          const res = await submitContactAction(form);
          setMessage(res.ok ? res.message : res.error);
        });
      }}
    >
      <h2 className="font-display text-2xl">{t("formTitle")}</h2>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="category">{t("category")}</Label>
        <select id="category" name="category" className="mt-1 h-11 w-full rounded-md border px-3 text-sm" required>
          <option value="retail">Retail</option>
          <option value="wholesale">Wholesale</option>
          <option value="distribution">Distribution</option>
          <option value="partnership">Partnership</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>
      <div>
        <Label htmlFor="subject">{t("subject")}</Label>
        <Input id="subject" name="subject" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" name="message" required className="mt-1" />
      </div>
      {message && <p className="text-sm text-brand-green">{message}</p>}
      <Button type="submit" disabled={pending}>Send</Button>
    </form>
  );
}
