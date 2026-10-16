"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { subscribeAction } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const res = await subscribeAction(email);
          setMessage(res.message);
          if (res.ok) setEmail("");
        });
      }}
    >
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("newsletterPlaceholder")}
        className="border-white/20 bg-white/5 text-white placeholder:text-cream/40"
      />
      <Button type="submit" variant="secondary" disabled={pending}>
        {t("newsletterButton")}
      </Button>
      {message && <p className="basis-full text-xs text-cream/70">{message}</p>}
    </form>
  );
}
