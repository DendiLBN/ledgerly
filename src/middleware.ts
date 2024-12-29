import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/invoices/(.*)/payment",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublic(request)) {
    auth();
  }
});

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
