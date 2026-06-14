import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do NOT remove user fetching logic. This refreshes the session if expired.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  const pathname = request.nextUrl.pathname
  if (pathname.startsWith('/admin')) {
    // Check if authenticated user is admin
    // Note: For now during Milestone 0 we allow access if in development,
    // but structure it to enforce admin role checks when Auth is active.
    const userRole = user?.app_metadata?.role || 'user'
    if (!user || userRole !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
