"use client";

import { useState, useTransition } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { adminLoginAction } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 pt-32">
      <h1 className="font-display text-3xl">Admin login</h1>
      <p className="mt-2 text-sm text-muted">
        Demo mode uses ADMIN_PASSWORD from environment (default documented in .env.example).
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const password = new FormData(e.currentTarget).get("password") as string;
          start(async () => {
            const res = await adminLoginAction(password);
            if (!res.ok) {
              setError(res.error);
              return;
            }
            router.push("/admin");
          });
        }}
      >
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required className="mt-1" />
        </div>
        {error && <p className="text-sm text-brand-orange">{error}</p>}
        <Button type="submit" disabled={pending} className="w-full">
          Log in
        </Button>
      </form>
    </div>
  );
}
