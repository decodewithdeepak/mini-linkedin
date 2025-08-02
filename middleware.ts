import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get the pathname of the request (e.g. /, /profile/123)
    const { pathname } = request.nextUrl;

    // Define public paths that don't require authentication
    const publicPaths = ['/auth', '/api/auth/login', '/api/auth/register'];

    // Check if the current path is public
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // If it's a public path, allow the request to continue
    if (isPublicPath) {
        return NextResponse.next();
    }

    // For API routes that require authentication, let them handle their own auth
    if (pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // For protected pages, we'll handle authentication on the client side
    // This middleware is mainly for future enhancements
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
