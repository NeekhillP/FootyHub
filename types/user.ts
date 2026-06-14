export type UserRole = 'user' | 'premium' | 'admin'

export interface UserProfile {
  id: string
  email: string
  username: string
  avatar_url: string | null
  bio: string | null
  role: UserRole
  favorite_club_id: string | null
  favorite_club_name: string | null
  created_at: string
  updated_at: string
}

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }
