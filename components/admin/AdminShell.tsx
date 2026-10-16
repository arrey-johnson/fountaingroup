"use client";

import { usePathname } from "@/lib/i18n/navigation";
import { AdminNav } from "./AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-7xl gap-0 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
      <AdminNav />
      <div className="p-4 lg:p-8">{children}</div>
    </div>
  );
}
