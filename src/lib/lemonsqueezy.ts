// Phase 5: Lemon Squeezy checkout
export function generateCheckoutUrl(_userEmail: string, _userId: string): string {
  const storeId = import.meta.env.VITE_LEMON_SQUEEZY_STORE_ID
  const productId = import.meta.env.VITE_LEMON_SQUEEZY_PRODUCT_ID
  return `https://store.lemonsqueezy.com/checkout/buy/${storeId}/${productId}`
}
