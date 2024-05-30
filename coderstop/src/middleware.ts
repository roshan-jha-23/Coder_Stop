import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl;  
 
}

export const config = {
  matcher: ["/", "/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
