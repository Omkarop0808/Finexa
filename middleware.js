import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

const isPublicApiRoute = createRouteMatcher([
  "/api/inngest(.*)",
  "/api/seed(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip protection for public API routes (Inngest, webhooks, etc.)
  if (isPublicApiRoute(req)) {
    return;
  }

  // Simple rate limiting check (lightweight alternative to Arcjet)
  const userAgent = req.headers.get('user-agent') || '';
  const suspiciousPatterns = ['bot', 'crawler', 'spider', 'scraper'];
  const isSuspicious = suspiciousPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  );
  
  // Allow legitimate services (Googlebot, Inngest, etc.)
  const allowedServices = ['Googlebot', 'inngest', 'webhook'];
  const isAllowedService = allowedServices.some(service => 
    userAgent.toLowerCase().includes(service.toLowerCase())
  );
  
  // Block obvious bots but allow legitimate services
  if (isSuspicious && !isAllowedService) {
    return new Response("Forbidden", { status: 403 });
  }

  // Check authentication for protected routes
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