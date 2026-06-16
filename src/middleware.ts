import { NextResponse, type NextRequest } from 'next/server';

/**
 * Expose le pathname courant en header `x-pathname` pour que le root layout
 * puisse masquer la navbar / le footer / le chatbot sur la zone /admin (page
 * utilitaire brandée mais sans chrome du site).
 */
export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set('x-pathname', req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)'],
};
