import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/invoices/(.*)/payment",
]);

// const isProtected = createRouteMatcher([
//   '/dashboard',
//   '/invoices/:invoiceId',
//   '/invoices/new'
// ])

export default clerkMiddleware((auth, request) => {
  if (!isPublic(request)) {
    auth();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    "/(api|trpc)(.*)",
  ],
};
