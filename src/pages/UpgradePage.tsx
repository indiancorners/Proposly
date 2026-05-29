import { Check } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'
import { Button } from '@/ui/Button'
import { generateCheckoutUrl } from '@/lib/lemonsqueezy'

const FEATURES = [
  'Unlimited proposals',
  'All 5 premium templates',
  'PDF export (A4, print-ready)',
  'PNG export',
  'Public share links with view tracking',
  'Dashboard analytics',
  'Priority support',
  'Lifetime updates',
]

export function UpgradePage() {
  const { user } = useUser()

  function handleUpgrade() {
    const email = user?.primaryEmailAddress?.emailAddress ?? ''
    const userId = user?.id ?? ''
    const url = generateCheckoutUrl(email, userId)
    if (!url) {
      toast.error('Checkout is not configured. Please contact support.')
      return
    }
    window.open(url, '_blank')
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Go Pro</h1>
        <p className="text-base text-muted">One payment. Lifetime access. No subscriptions.</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-8 shadow-md">
        <div className="text-center mb-8">
          <div className="text-5xl font-extrabold text-foreground mb-1">$20</div>
          <p className="text-sm text-muted">one-time payment · no renewals</p>
        </div>

        <ul className="flex flex-col gap-3 mb-8">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-foreground">
              <Check className="h-4 w-4 text-success flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <Button variant="upgrade" size="lg" className="w-full" onClick={handleUpgrade}>
          Upgrade to Pro — $20 once
        </Button>

        <p className="text-xs text-placeholder text-center mt-4">
          Secure checkout via Lemon Squeezy. 30-day money-back guarantee.
        </p>
      </div>
    </div>
  )
}
