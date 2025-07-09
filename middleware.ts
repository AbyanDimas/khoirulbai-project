import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value
  const { pathname } = request.nextUrl

  // 1. User sudah login, tidak boleh ke halaman auth
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
