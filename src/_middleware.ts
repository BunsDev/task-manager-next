import { auth as middleware } from "@/auth";

export default middleware((req) => {
  const allowedPaths = ["/", "/login"];
  const { pathname, origin } = req.nextUrl;

  // Check if the request is for a static file (e.g., CSS, JS, images, etc.)
  const isStaticFile = pathname.startsWith("/_next/") || pathname.startsWith("/static/") || pathname.includes(".");

  if (!req.auth && !allowedPaths.includes(pathname) && !isStaticFile) {
    const newUrl = new URL("/login", origin);
    return Response.redirect(newUrl);
  } 
});
