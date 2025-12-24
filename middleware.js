import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import aj from '@/lib/arcjet';

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Apply Arcjet protection first (reuse existing config)
  const decision = await aj.protect(req, { userId: "anonymous" });
  
  if (decision.isDenied()) {
    return new Response("Forbidden", { status: 403 });
  }

  // Then check authentication for protected routes
  const { userId } = await auth();
  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

