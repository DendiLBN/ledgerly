import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/invoices/(.*)/payment",
  "/_clerk",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublic(request)) {
    auth();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|_clerk).*)",
    "/(api|trpc)(.*)",
  ],
};
