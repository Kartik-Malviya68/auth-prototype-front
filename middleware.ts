import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || "bravo_token";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = req.nextUrl;

  const isProtected = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/login" || pathname.startsWith("/register");

  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/login", "/register"] };
