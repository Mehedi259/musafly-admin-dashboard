import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Protect all dashboard routes (which are at the root, e.g. /, /deals, /customers)
  // We need to exclude /login, /api, /_next, static files, etc.
  const isPublicRoute = pathname.startsWith('/login') || 
                        pathname.startsWith('/api') || 
                        pathname.startsWith('/_next') ||
                        pathname.includes('.'); // Assumes files like .png, .ico have dots

  if (!authToken && !isPublicRoute) {
    // Redirect unauthenticated users to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authToken && pathname.startsWith('/login')) {
    // Redirect authenticated users away from login page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
