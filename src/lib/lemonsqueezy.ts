// Lemon Squeezy checkout URL builder.
// Reads the base checkout URL from VITE_LEMON_SQUEEZY_CHECKOUT_URL (full URL from LS dashboard)
// and appends checkout[email], checkout[custom][user_id], and checkout[redirect_url] so:
//   - the webhook can identify the buyer
//   - LS redirects back to the success page after payment

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
    // C8: redirect back to the success page so users don't get stranded on LS
    url.searchParams.set(
      'checkout[redirect_url]',
      `${window.location.origin}/app/upgrade/success`
    )
    return url.toString()
  } catch {
    console.error('Invalid VITE_LEMON_SQUEEZY_CHECKOUT_URL:', baseUrl)
    return ''
  }
}
