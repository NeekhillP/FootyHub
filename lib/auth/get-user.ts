import { createClient } from '@/lib/supabase/server'
import type { UserProfile } from '@/types/user'

export async function getAuthUser() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return { user: null, profile: null }
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return {
    user,
    profile: (profile as UserProfile | null) ?? null,
  }
}

export async function getAdminUser(auditContext: string) {
  const { user, profile } = await getAuthUser()

  if (!user || !profile) {
    console.warn('[security][admin-authz] Forbidden: unauthenticated access attempt', {
      auditContext,
      userId: user?.id ?? null,
    })
    return { user: null, profile: null }
  }

  if (profile.role !== 'admin') {
    console.warn('[security][admin-authz] Forbidden: non-admin access attempt', {
      auditContext,
      userId: user.id,
      role: profile.role,
    })
    return { user: null, profile: null }
  }

  return { user, profile }
}
