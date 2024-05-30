import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/account/login", "/account", "/verifyemail"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow static assets like CSS files
  if (path.startsWith("/_next/") || path.startsWith("/static/")) {
    return NextResponse.next();
  }

  const isPublicPath = PUBLIC_PATHS.includes(path);
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/account/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/account/login",
    "/signup",
    "/profile",
    "/verifyemail",
    "/home",
    "/:path*",
  ],
};
