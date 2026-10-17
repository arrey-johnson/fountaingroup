"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { submitWholesaleAction } from "@/app/actions/wholesale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export function WholesaleForm() {
  const t = useTranslations("wholesale");
  const [pending, start] = useTransition();
  const [isExport, setIsExport] = useState(false);
  const [result, setResult] = useState<{ rfqNumber: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (result) {
    return (
      <div className="border border-brand-green/30 bg-cream/50 p-8 text-center">
        <h3 className="font-display text-2xl">{t("successTitle")}</h3>
        <p className="mt-3 text-muted">{t("successIntro")}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-brand-green">{t("rfqNumber")}</p>
        <p className="mt-2 font-display text-3xl">{result.rfqNumber}</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const form = Object.fromEntries(fd.entries());
        start(async () => {
          const res = await submitWholesaleAction({
            ...form,
            quantity: Number(form.quantity),
            isExport,
          });
          if (!res.ok) {
            setError(res.error);
            return;
          }
          setResult({ rfqNumber: res.rfqNumber });
        });
      }}
    >
      <h2 className="font-display text-2xl">{t("formTitle")}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["fullName", "Full name"],
          ["companyName", "Company name"],
          ["businessType", "Business type"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["whatsapp", "WhatsApp"],
          ["country", "Country"],
          ["city", "City / Destination"],
          ["packaging", "Required packaging / size"],
          ["quantity", "Quantity"],
          ["deliveryDate", "Required delivery date"],
          ["deliveryPreference", "Delivery / Collection preference"],
        ].map(([name, label]) => (
          <div key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              name={name}
              type={name === "quantity" ? "number" : name === "email" ? "email" : name === "deliveryDate" ? "date" : "text"}
              required={!["whatsapp", "deliveryDate"].includes(name)}
              className="mt-1"
            />
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="productSelection">Product requested</Label>
          <select id="productSelection" name="productSelection" className="mt-1 h-11 w-full rounded-md border px-3 text-sm" required>
            <option value="coconut-oil">Coconut Oil</option>
            <option value="mamas-red-oil">Mama&apos;s Red Oil</option>
            <option value="avocado-oil">Avocado Oil</option>
            <option value="palm-kernel-oil">Palm Kernel Oil</option>
            <option value="refined-red-palm-oil">Refined Red Palm Oil</option>
            <option value="avocados">Avocados (Pear)</option>
            <option value="mangoes">Mangoes</option>
            <option value="coconuts">Coconuts</option>
            <option value="pineapples">Pineapples</option>
            <option value="multiple">Multiple Products</option>
          </select>
        </div>
        <div>
          <Label htmlFor="unit">Unit</Label>
          <select id="unit" name="unit" className="mt-1 h-11 w-full rounded-md border px-3 text-sm" required>
            <option value="bottles">Bottles</option>
            <option value="cartons">Cartons</option>
            <option value="litres">Litres</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <Label htmlFor="frequency">Order frequency</Label>
          <select id="frequency" name="frequency" className="mt-1 h-11 w-full rounded-md border px-3 text-sm" required>
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="additionalRequirements">Additional requirements</Label>
        <Textarea id="additionalRequirements" name="additionalRequirements" className="mt-1" />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox checked={isExport} onCheckedChange={(v) => setIsExport(Boolean(v))} />
        International / export inquiry
      </label>
      {isExport && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="destinationPort">Destination port</Label>
            <Input id="destinationPort" name="destinationPort" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="preferredIncoterm">Preferred Incoterm</Label>
            <select id="preferredIncoterm" name="preferredIncoterm" className="mt-1 h-11 w-full rounded-md border px-3 text-sm">
              <option value="Not Sure">Not Sure</option>
              <option value="EXW">EXW</option>
              <option value="FOB">FOB</option>
              <option value="CIF">CIF</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-brand-orange">{error}</p>}
      <Button type="submit" size="lg" disabled={pending}>
        Request a quote
      </Button>
    </form>
  );
}
