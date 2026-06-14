import Link from 'next/link'
import { ShieldX } from 'lucide-react'

export default function ForbiddenPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <ShieldX className="h-7 w-7" />
      </div>
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        You don&apos;t have permission to view this page. Admin access is required.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-brand-500 px-4 text-sm font-semibold text-primary-foreground hover:bg-brand-600"
      >
        Go Home
      </Link>
    </div>
  )
}
