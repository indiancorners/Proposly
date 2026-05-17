import { supabase } from '@/lib/supabase'
import type { UserProfile } from '@/types'

interface ProfileRow {
  id: string
  email: string | null
  is_pro: boolean
  studio_name: string
  default_currency: string
  default_terms: string
  created_at: string
}

function rowToProfile(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    email: row.email ?? '',
    isPro: row.is_pro,
    studioName: row.studio_name,
    defaultCurrency: row.default_currency,
    defaultTerms: row.default_terms,
    createdAt: row.created_at,
  }
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return rowToProfile(data as ProfileRow)
}

export async function upsertProfile(
  profile: Partial<UserProfile> & { id: string }
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: profile.id,
      email: profile.email ?? null,
      is_pro: profile.isPro ?? false,
      studio_name: profile.studioName ?? '',
      default_currency: profile.defaultCurrency ?? 'USD',
      default_terms: profile.defaultTerms ?? '',
    })
    .select()
    .single()

  if (error) throw error
  return rowToProfile(data as ProfileRow)
}
