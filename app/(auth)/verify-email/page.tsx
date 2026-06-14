import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function VerifyEmailPage() {
  return (
    <Card className="border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
          <Mail className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a verification link to your inbox. Click the link to activate your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-6 text-sm text-muted-foreground">
          Didn&apos;t receive it? Check your spam folder or try signing up again.
        </p>
        <Link
          href="/login"
          className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium hover:bg-muted"
        >
          Back to sign in
        </Link>
      </CardContent>
    </Card>
  )
}
