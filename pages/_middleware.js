import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  // nextUrl - Includes an extended, parsed, URL object that gives you access
  // to Next.js specific properties such as pathname, basePath, trailingSlash and i18n

  if (req.nextUrl.pathname === '/') {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect('/home');

    // If user is authenticated, continue.
    return NextResponse.next();
  }
}
