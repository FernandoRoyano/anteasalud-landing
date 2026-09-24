import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session-token';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo proteger /admin/* (no la página de login en /admin)
  if (pathname.startsWith('/admin/')) {
    const valid = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
    if (!valid) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
