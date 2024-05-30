import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resourceUsage } from "process";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath=path==='/account/login'||path==='/account'||path==='/verifyemail'
 const token= request.cookies.get("token")?.value || ''
 
 if(isPublicPath && token){
  return NextResponse.redirect(new URL('/home', request.url))
 }
 if(!isPublicPath && !token){
  return NextResponse.redirect(new URL('/account/login', request.url))
 }

  
}

export const config = {
  matcher: [
    '/',
    '/account/login',
    '/signup',
    '/profile',
    '/verifyemail'
  ]
};
