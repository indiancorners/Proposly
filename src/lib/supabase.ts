import { createClient } from '@supabase/supabase-js'

// Trim defensively: env values pasted into hosting dashboards (Vercel, etc.) often
// pick up a trailing newline/space, which makes the apikey/Authorization header
// value illegal ("Failed to execute 'set' on 'Headers': Invalid value").
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string)?.trim()
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string)?.trim()

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
  accessToken: async () => {
    const token = await window.Clerk?.session?.getToken()
    return token ? token.trim() : null
  },
})
