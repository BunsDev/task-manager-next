import { NextResponse } from "next/server";
import { auth as middleware } from "@/auth";

export default middleware((req) => {
    const allowedPaths = ["/", "/login", "/api/auth/callback/google"];
    const { pathname, origin } = req.nextUrl;

    //this line checks the is there any static file and allow them to render on browser other wise it will break the css
    const isStaticFile =
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/static/") ||
        pathname.includes(".");

    if (!req.auth && !allowedPaths.includes(pathname) && !isStaticFile) {
        const newUrl = new URL("/login", origin);
        return NextResponse.redirect(newUrl);
    }

    if (req.auth && pathname === "/login") {
        const dashboardUrl = new URL("/dashboard", origin);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
