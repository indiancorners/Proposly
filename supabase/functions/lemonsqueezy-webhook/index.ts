// Supabase Edge Function — receives Lemon Squeezy webhooks and upgrades users to Pro.
//
// Deploy:
//   supabase functions deploy lemonsqueezy-webhook --no-verify-jwt
//
// Required secrets (set via `supabase secrets set ...`):
//   LEMON_SQUEEZY_WEBHOOK_SECRET — the signing secret from your LS webhook settings
//
// Auto-provided by Supabase:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//
// Lemon Squeezy webhook URL to register:
//   https://<your-project-ref>.functions.supabase.co/lemonsqueezy-webhook

// @ts-expect-error — Deno-only import resolved at runtime in Supabase Edge Functions
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
// @ts-expect-error — Deno-only import resolved at runtime in Supabase Edge Functions
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// @ts-expect-error — Deno global available at runtime in Supabase Edge Functions
const WEBHOOK_SECRET = Deno.env.get('LEMON_SQUEEZY_WEBHOOK_SECRET') ?? ''
// @ts-expect-error — Deno global available at runtime in Supabase Edge Functions
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
// @ts-expect-error — Deno global available at runtime in Supabase Edge Functions
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function verifySignature(body: string, signature: string): Promise<boolean> {
  if (!signature || !WEBHOOK_SECRET) return false
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const computed = await crypto.subtle.sign('HMAC', key, encoder.encode(body))
  const computedHex = Array.from(new Uint8Array(computed))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  // Constant-time compare
  if (computedHex.length !== signature.length) return false
  let result = 0
  for (let i = 0; i < computedHex.length; i++) {
    result |= computedHex.charCodeAt(i) ^ signature.charCodeAt(i)
  }
  return result === 0
}

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const body = await req.text()
  const signature = req.headers.get('x-signature') ?? ''

  const valid = await verifySignature(body, signature)
  if (!valid) {
    return new Response('Invalid signature', { status: 401 })
  }

  let payload: {
    meta?: { event_name?: string; custom_data?: { user_id?: string } }
  }
  try {
    payload = JSON.parse(body)
  } catch {
    return new Response('Bad payload', { status: 400 })
  }

  const eventName = payload?.meta?.event_name
  const userId = payload?.meta?.custom_data?.user_id

  // Upgrade on first successful order. Lemon Squeezy fires `order_created` once payment succeeds.
  if (eventName === 'order_created' && userId) {
    const { error } = await supabase
      .from('profiles')
      .update({ is_pro: true })
      .eq('id', userId)

    if (error) {
      console.error('Failed to upgrade user:', userId, error)
      return new Response('DB error', { status: 500 })
    }

    console.log('Upgraded user to Pro:', userId)
  }

  return new Response('ok', { status: 200 })
})
