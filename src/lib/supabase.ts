import { createClient } from '@supabase/supabase-js'

// Strip ALL whitespace, not just the ends: env values pasted into hosting
// dashboards (Vercel, etc.) can pick up a newline in the MIDDLE of a long value
// (the field wraps), which makes the apikey/Authorization header illegal
// ("Failed to execute 'set' on 'Headers': Invalid value"). JWTs and URLs never
// contain whitespace, so this is safe and self-healing against a bad paste.
const stripWs = (v?: string) => v?.replace(/\s+/g, '') ?? ''
const SUPABASE_URL = stripWs(import.meta.env.VITE_SUPABASE_URL as string)
const SUPABASE_ANON_KEY = stripWs(import.meta.env.VITE_SUPABASE_ANON_KEY as string)

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
    return token ? stripWs(token) : null
  },
})
