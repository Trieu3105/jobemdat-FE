import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const protectedPaths = ['/dashboard', '/payments','/orders' , '/profile']
  const path = request.nextUrl.pathname

  if (protectedPaths.includes(path) && !token) {
    const url = request.nextUrl.clone()
    url.pathname = '/' // hoặc trang chính

    // Gắn query để Front-end biết cần mở modal
    url.searchParams.set('authModal', 'true')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/payments','/orders' , '/profile'], // route cần bảo vệ
}
