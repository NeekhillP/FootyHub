import { getAuthUser } from '@/lib/auth/get-user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function ProfilePage() {
  const { user, profile } = await getAuthUser()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Account details managed via Supabase Auth.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Username</p>
            <p className="text-sm font-semibold">{profile?.username ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Email</p>
            <p className="text-sm font-semibold">{user?.email ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Role</p>
            <Badge variant="outline" className="mt-1 capitalize">
              {profile?.role ?? 'user'}
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Email Verified</p>
            <Badge
              variant="outline"
              className={`mt-1 ${user?.email_confirmed_at ? 'border-emerald-500/30 text-emerald-400' : 'border-amber-500/30 text-amber-400'}`}
            >
              {user?.email_confirmed_at ? 'Verified' : 'Pending'}
            </Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Member since{' '}
          {profile?.created_at
            ? new Date(profile.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : '—'}
        </p>
      </CardContent>
    </Card>
  )
}
