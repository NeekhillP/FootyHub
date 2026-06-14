'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signInWithEmail } from '@/actions/auth'
import { AuthDivider } from '@/components/auth/auth-divider'
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const callbackError = searchParams.get('error')
  const next = searchParams.get('next') ?? '/profile'

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const result = await signInWithEmail({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })

    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <div>
      {callbackError === 'auth_callback_error' && (
        <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Authentication failed. Please try again.
        </p>
      )}
      {callbackError === 'verification_failed' && (
        <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Email verification failed. The link may have expired.
        </p>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-brand-500 hover:text-brand-400">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full bg-brand-500 hover:bg-brand-600" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <AuthDivider />
      <GoogleSignInButton />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-medium text-brand-500 hover:text-brand-400">
          Create one
        </Link>
      </p>
    </div>
  )
}
