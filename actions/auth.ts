'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getAppUrl } from '@/lib/auth/routes'
import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
  type ForgotPasswordInput,
  type SignInInput,
  type SignUpInput,
} from '@/lib/utils/validators'
import type { ActionResult } from '@/types/user'

function formatAuthError(message: string): string {
  const normalized = message.toLowerCase()

  if (normalized.includes('invalid login credentials')) {
    return 'Invalid email or password.'
  }

  if (normalized.includes('email not confirmed')) {
    return 'Please verify your email before signing in.'
  }

  if (normalized.includes('user already registered')) {
    return 'An account with this email already exists.'
  }

  return message
}

export async function signUpWithEmail(input: SignUpInput): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse(input)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const supabase = await createClient()
  const appUrl = getAppUrl()

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { username: parsed.data.username },
      emailRedirectTo: `${appUrl}/auth/callback?next=/profile`,
    },
  })

  if (error) {
    return { success: false, error: formatAuthError(error.message) }
  }

  return { success: true }
}

export async function signInWithEmail(input: SignInInput): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(input)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    return { success: false, error: formatAuthError(error.message) }
  }

  return { success: true }
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function resetPassword(input: ForgotPasswordInput): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse(input)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const supabase = await createClient()
  const appUrl = getAppUrl()

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${appUrl}/auth/callback?next=/settings`,
  })

  if (error) {
    return { success: false, error: formatAuthError(error.message) }
  }

  return { success: true }
}

export async function signInWithGoogle(): Promise<ActionResult<{ url: string }>> {
  const supabase = await createClient()
  const appUrl = getAppUrl()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${appUrl}/auth/callback?next=/profile`,
    },
  })

  if (error) {
    return { success: false, error: formatAuthError(error.message) }
  }

  if (!data.url) {
    return { success: false, error: 'Could not start Google sign-in.' }
  }

  return { success: true, data: { url: data.url } }
}
