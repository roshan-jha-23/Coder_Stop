import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {

   const path=request.nextUrl.pathname;
   const publicPath=path==='/account/login' ||path==='/account' || path==='/verifyemail' || path==='/messages/:path*'

   const token=request.cookies.get('token')
    if(publicPath && token){
        return NextResponse.redirect(new URL("/", request.url));
    }

    if(!publicPath && !token){
        return NextResponse.redirect(new URL("/account/login", request.url));
    }
}


export const config = {
  matcher: ["/dashboard/:path*", "/", "/community/:path*", "/platforms/:path*"],
};
