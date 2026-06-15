export const DEFAULT_REDIRECT_PATH = '/profile'

export function isValidRedirectUrl(redirect: string | null | undefined): redirect is string {
  if (!redirect) return false

  const trimmed = redirect.trim()

  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.includes('\\')) {
    return false
  }

  try {
    const parsed = new URL(trimmed, 'http://localhost')
    return parsed.origin === 'http://localhost'
  } catch {
    return false
  }
}

export function getSafeRedirectUrl(
  redirect: string | null | undefined,
  fallback: string = DEFAULT_REDIRECT_PATH
): string {
  return isValidRedirectUrl(redirect) ? redirect.trim() : fallback
}
