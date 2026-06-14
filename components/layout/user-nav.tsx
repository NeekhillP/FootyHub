'use client'

import Link from 'next/link'
import { signOut } from '@/actions/auth'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function UserNav() {
  const { user, profile, loading } = useAuth()

  async function handleSignOut() {
    await signOut()
  }

  if (loading) {
    return <Skeleton className="h-9 w-20 rounded-full" />
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-9 items-center justify-center rounded-full bg-brand-500 hover:bg-brand-600 px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-all duration-200"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/profile"
        className="hidden text-sm font-medium text-muted-foreground hover:text-brand-500 sm:inline"
      >
        {profile?.username ?? user.email}
      </Link>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  )
}
