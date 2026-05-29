import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Clerk attaches its singleton to `window.Clerk` once <ClerkProvider> mounts.
// We read the active session token on every request so Supabase RLS can identify
// the real user (auth.jwt()->>'sub' === the Clerk user id). Logged-out visitors
// have no session → token is null → requests run as the anon role.
declare global {
  interface Window {
    Clerk?: { session?: { getToken: () => Promise<string | null> } }
  }
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  accessToken: async () => (await window.Clerk?.session?.getToken()) ?? null,
})
