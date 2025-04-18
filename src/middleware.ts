import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Move auth check to withAuth wrapper for Next.js compatibility
export default withAuth(
  function middleware(req) {
    const allowedPaths = ["/", "/login", "/api/auth/callback/google"];
    const { pathname, origin } = req.nextUrl;
    
    // If user is authenticated and trying to access /login, redirect to /dashboard
    if (pathname === "/login") {
      const dashboardUrl = new URL("/dashboard", origin);
      return NextResponse.redirect(dashboardUrl);
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Configure which routes should check auth
export const config = {
  matcher: [
    // Skip public paths and static assets
    "/((?!api|_next/static|_next/image|favicon.ico|login|/).*)",
  ],
};