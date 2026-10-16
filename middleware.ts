import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPath = /\/(en|fr)\/admin(\/|$)/.test(pathname);
  const isLoginPath = /\/(en|fr)\/admin\/login\/?$/.test(pathname);

  if (isAdminPath && !isLoginPath) {
    const session = request.cookies.get("fg_admin_session")?.value;
    const secret = process.env.DEMO_ADMIN_SESSION_SECRET || "fountain-demo-admin-secret";
    if (session !== secret) {
      const locale = pathname.startsWith("/fr") ? "fr" : "en";
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
