import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(request: NextRequest) {
  // Only run on admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      const token = await getToken({ req: request, secret })

      // No token found
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
      }

      // Check if user is admin
      if (!token.isAdmin) {
        return NextResponse.redirect(new URL('/', request.url))
      }

      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 