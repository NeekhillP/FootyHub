import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .min(1, 'NEXT_PUBLIC_SUPABASE_URL is required.')
    .url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL.'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required.'),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .min(1, 'NEXT_PUBLIC_APP_URL is required.')
    .url('NEXT_PUBLIC_APP_URL must be a valid URL.'),
})

export type AppEnv = z.infer<typeof envSchema>

let cachedEnv: AppEnv | null = null

export function validateEnv(): AppEnv {
  if (cachedEnv) return cachedEnv

  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  })

  if (!parsed.success) {
    const missingOrInvalid = parsed.error.issues.map((issue) => issue.path.join('.')).join(', ')
    throw new Error(
      `Invalid environment configuration: ${missingOrInvalid}. ` +
        'Set the required values in your environment before starting FootyHub.'
    )
  }

  cachedEnv = parsed.data
  return parsed.data
}
