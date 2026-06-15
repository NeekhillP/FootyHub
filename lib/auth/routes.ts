import { getSafeRedirectUrl, isValidRedirectUrl } from '@/lib/auth/redirect'
import { validateEnv } from '@/lib/env'

export const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/verify-email'] as const

export const PROTECTED_ROUTES = ['/profile', '/settings', '/favorites'] as const

export const ADMIN_ROUTE_PREFIX = '/admin'

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export function isAdminRoute(pathname: string): boolean {
  return pathname === ADMIN_ROUTE_PREFIX || pathname.startsWith(`${ADMIN_ROUTE_PREFIX}/`)
}

export function getAppUrl(): string {
  return validateEnv().NEXT_PUBLIC_APP_URL
}

export { isValidRedirectUrl }

export function getValidatedRedirectUrl(
  redirect: string | null | undefined,
  fallback: string = '/profile'
): string {
  return getSafeRedirectUrl(redirect, fallback)
}

export function getAuthCallbackUrl(
  redirect: string | null | undefined,
  fallback: string = '/profile'
): string {
  const next = getValidatedRedirectUrl(redirect, fallback)
  return `${getAppUrl()}/auth/callback?next=${encodeURIComponent(next)}`
}
