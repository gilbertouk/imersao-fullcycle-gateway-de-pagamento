import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const apiKey = request.cookies.get("apiKey")?.value;

  console.log("URL:", url);

  // if (url.pathname.startsWith("/login") && apiKey) {
  //   url.pathname = "/";
  //   return Response.redirect(url);
  // }

  // if (!apiKey && !url.pathname.startsWith("/login")) {
  //   url.pathname = "/login";
  //   return Response.redirect(url);
  // }

  if (!apiKey) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/invoices/:path*"],
};
