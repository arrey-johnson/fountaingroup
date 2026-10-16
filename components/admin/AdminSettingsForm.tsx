"use client";

import { useTransition } from "react";
import { adminUpdateSettingsAction } from "@/app/actions/admin";
import type { SiteSettings } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AdminSettingsForm({ settings }: { settings: SiteSettings }) {
  const [pending, start] = useTransition();

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        start(async () => {
          await adminUpdateSettingsAction({
            email: String(fd.get("email") || ""),
            phone: String(fd.get("phone") || ""),
            whatsapp: String(fd.get("whatsapp") || ""),
            address: String(fd.get("address") || ""),
            city: String(fd.get("city") || ""),
            country: String(fd.get("country") || ""),
            currencyDisplay: String(fd.get("currencyDisplay") || "FCFA"),
            promptstackUrl: String(fd.get("promptstackUrl") || "#"),
          });
          toast.success("Settings saved");
        });
      }}
    >
      {[
        ["email", "Email", settings.email],
        ["phone", "Phone", settings.phone],
        ["whatsapp", "WhatsApp (digits/international)", settings.whatsapp],
        ["address", "Address", settings.address],
        ["city", "City", settings.city],
        ["country", "Country", settings.country],
        ["currencyDisplay", "Currency display", settings.currencyDisplay],
        ["promptstackUrl", "Promptstack URL", settings.promptstackUrl],
      ].map(([name, label, value]) => (
        <div key={name}>
          <Label htmlFor={name}>{label}</Label>
          <Input id={name} name={name} defaultValue={value} className="mt-1" />
        </div>
      ))}
      <Button type="submit" disabled={pending}>Save settings</Button>
    </form>
  );
}
