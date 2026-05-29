// Lemon Squeezy checkout URL builder.
// Reads the base checkout URL from VITE_LEMON_SQUEEZY_CHECKOUT_URL (full URL from LS dashboard)
// and appends checkout[email] + checkout[custom][user_id] so the webhook can identify the buyer.

export function generateCheckoutUrl(userEmail: string, userId: string): string {
  const baseUrl = import.meta.env.VITE_LEMON_SQUEEZY_CHECKOUT_URL
  if (!baseUrl) {
    console.error('VITE_LEMON_SQUEEZY_CHECKOUT_URL is not set')
    return ''
  }
  try {
    const url = new URL(baseUrl)
    if (userEmail) url.searchParams.set('checkout[email]', userEmail)
    if (userId) url.searchParams.set('checkout[custom][user_id]', userId)
    return url.toString()
  } catch {
    console.error('Invalid VITE_LEMON_SQUEEZY_CHECKOUT_URL:', baseUrl)
    return ''
  }
}
