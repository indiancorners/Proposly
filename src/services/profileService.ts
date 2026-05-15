import type { UserProfile } from '@/types'

export async function getProfile(_userId: string): Promise<UserProfile> {
  throw new Error('Phase 3: connect Supabase + Clerk')
}

export async function upsertProfile(_profile: Partial<UserProfile>): Promise<UserProfile> {
  throw new Error('Phase 3: connect Supabase + Clerk')
}
