// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { VARIABLE } from './constant/common'

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get(VARIABLE.COOKIE_USER)
  const path = request.nextUrl.pathname

  if (!userCookie && path !== '/welcome') {
    const welcomeUrl = new URL('/welcome', request.url)
    welcomeUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(welcomeUrl)
    // return NextResponse.redirect(new URL('/welcome', request.url))
  }
  
  if (userCookie && path === '/welcome') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Optionally, specify which routes this middleware should run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}