import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { detectLocale } from "./i18n/detect";
const handleLocale = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!/^\/(en|es)(\/|$)/.test(pathname)) {
    const locale = detectLocale(
      request.cookies.get("superspace-locale")?.value,
      request.headers.get("accept-language"),
      request.headers.get("x-vercel-ip-country"),
    );
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url, 307);
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Vary", "Accept-Language, Cookie, X-Vercel-IP-Country");
    return response;
  }
  return handleLocale(request);
}
export const config = { matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"] };
