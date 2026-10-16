"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { submitDistributorAction } from "@/app/actions/distributor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function DistributorForm() {
  const t = useTranslations("distributor");
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return <p className="border border-brand-green/30 bg-cream/40 p-6 text-center">{t("success")}</p>;
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const products = fd.getAll("productsInterested").map(String);
        const form = {
          ...Object.fromEntries(fd.entries()),
          productsInterested: products,
        };
        start(async () => {
          const res = await submitDistributorAction(form);
          if (!res.ok) {
            setError(res.error);
            return;
          }
          setDone(true);
        });
      }}
    >
      <h2 className="font-display text-2xl">{t("formTitle")}</h2>
      {[
        ["fullName", "Full name"],
        ["company", "Company"],
        ["country", "Country"],
        ["city", "City"],
        ["phone", "Phone"],
        ["email", "Email"],
        ["businessType", "Business type"],
        ["distributionNetwork", "Current distribution network"],
        ["estimatedMonthlyRequirement", "Estimated monthly requirement"],
        ["marketsServed", "Markets served"],
      ].map(([name, label]) => (
        <div key={name}>
          <Label htmlFor={name}>{label}</Label>
          <Input id={name} name={name} required={!["distributionNetwork", "estimatedMonthlyRequirement", "marketsServed"].includes(name)} className="mt-1" />
        </div>
      ))}
      <fieldset>
        <legend className="text-sm font-medium">Products interested in</legend>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input type="checkbox" name="productsInterested" value="coconut-oil" /> Coconut Oil
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input type="checkbox" name="productsInterested" value="mamas-red-oil" /> Mama&apos;s Red Oil
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input type="checkbox" name="productsInterested" value="pure-honey" /> Pure Honey
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input type="checkbox" name="productsInterested" value="organic-coconut-flour" /> Organic Coconut Flour
        </label>
      </fieldset>
      <div>
        <Label htmlFor="additionalInfo">Additional information</Label>
        <Textarea id="additionalInfo" name="additionalInfo" className="mt-1" />
      </div>
      {error && <p className="text-sm text-brand-orange">{error}</p>}
      <Button type="submit" disabled={pending}>Submit application</Button>
    </form>
  );
}
