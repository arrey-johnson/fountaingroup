"use client";

import { Link, usePathname } from "@/lib/i18n/navigation";
import { adminLogoutAction } from "@/app/actions/admin";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/wholesale", label: "Wholesale" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/distributors", label: "Distributors" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-border bg-white lg:border-b-0 lg:border-r">
      <div className="sticky top-20 space-y-1 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
          Admin
        </p>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "block rounded px-3 py-2 text-sm",
              pathname === l.href ? "bg-brand-green text-white" : "hover:bg-cream",
            )}
          >
            {l.label}
          </Link>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full"
          onClick={() => adminLogoutAction()}
        >
          Log out
        </Button>
      </div>
    </aside>
  );
}
