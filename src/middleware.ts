import { NextResponse } from 'next/server';
import { auth } from './auth';
import { NextRequest } from 'next/server';

export default auth((req: NextRequest & { auth: any }) => {
  const isLoggedIn = !!req.auth?.user;
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth');

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/todos', req.nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/todos/:path*', '/auth/:path*'],
};
