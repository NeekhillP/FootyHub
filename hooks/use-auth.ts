'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import type { UserProfile } from '@/types/user'

interface AuthState {
  user: User | null
  profile: UserProfile | null
  loading: boolean
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
  })

  useEffect(() => {
    const supabase = createClient()

    async function loadProfile(user: User) {
      const { data } = await supabase.from('users').select('*').eq('id', user.id).single()
      setState({ user, profile: (data as UserProfile | null) ?? null, loading: false })
    }

    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        await loadProfile(user)
      } else {
        setState({ user: null, profile: null, loading: false })
      }
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null

      if (user) {
        loadProfile(user)
      } else {
        setState({ user: null, profile: null, loading: false })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return state
}
