import { NextResponse } from 'next/server';
import { auth as middleware } from "@/auth";

export default middleware((req) => {
  const allowedPaths = ["/", "/login", "/api/auth/callback/google"];
  const { pathname, origin } = req.nextUrl;

  // Check if the request is for a static file
  const isStaticFile = pathname.startsWith("/_next/") || pathname.startsWith("/static/") || pathname.includes(".");

  if (!req.auth && !allowedPaths.includes(pathname) && !isStaticFile) {
    const newUrl = new URL("/login", origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}