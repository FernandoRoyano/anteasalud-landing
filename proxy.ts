import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'antea_admin_session';
const COOKIE_VALUE = 'authenticated';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Solo proteger /admin/* (no la página de login en /admin)
  if (pathname.startsWith('/admin/')) {
    const session = req.cookies.get(COOKIE_NAME)?.value;
    if (session !== COOKIE_VALUE) {
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
