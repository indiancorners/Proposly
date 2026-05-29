import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, ShieldCheck, Lock, Infinity as InfinityIcon } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'
import { generateCheckoutUrl } from '@/lib/lemonsqueezy'

const ease = [0.16, 1, 0.3, 1] as const

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  }
}

const FEATURES = [
  'Unlimited proposals',
  'All 5 premium templates',
  'PDF export — A4, print-ready, 2× resolution',
  'PNG export',
  'Public share links with view tracking',
  'Pipeline analytics dashboard',
  'Priority support',
  'Lifetime updates',
]

const GUARANTEES = [
  { icon: Lock, label: 'Secure checkout' },
  { icon: ShieldCheck, label: '30-day refund' },
  { icon: InfinityIcon, label: 'Lifetime access' },
]

export function UpgradePage() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  function handleUpgrade() {
    const email = user?.primaryEmailAddress?.emailAddress ?? ''
    const userId = user?.id ?? ''
    const url = generateCheckoutUrl(email, userId)
    if (!url) {
      toast.error('Checkout is not configured. Please contact support.')
      return
    }
    setLoading(true)
    window.open(url, '_blank')
    // Reset shortly after — checkout opens in a new tab, user stays on this page.
    setTimeout(() => setLoading(false), 2500)
  }

  return (
    <div className="relative px-4 sm:px-8 py-12 sm:py-20">
      {/* Soft accent glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(37,99,235,0.10) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-md mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-9" {...fadeUp(0)}>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: '#86868B' }}>
            Upgrade
          </p>
          <h1
            className="font-bold mb-3"
            style={{ fontSize: 'clamp(34px, 6vw, 48px)', letterSpacing: '-0.035em', lineHeight: 1.05, color: '#1D1D1F' }}
          >
            Go Pro, once.
          </h1>
          <p className="text-[16px]" style={{ color: '#6E6E73', lineHeight: 1.6 }}>
            One payment unlocks everything — forever. No subscriptions, no renewals, no gotchas.
          </p>
        </motion.div>

        {/* Premium dark card */}
        <motion.div
          {...fadeUp(0.1)}
          className="rounded-3xl p-7 sm:p-9 relative overflow-hidden"
          style={{ background: '#1D1D1F', boxShadow: '0 24px 70px -24px rgba(0,0,0,0.5)' }}
        >
          {/* inner top glow */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-32 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(37,99,235,0.22) 0%, transparent 70%)' }}
          />

          <div className="relative">
            {/* tier + badge */}
            <div className="flex items-center gap-2.5 mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Pro
              </p>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: '#2563EB', color: 'white' }}
              >
                Lifetime
              </span>
            </div>

            {/* price */}
            <div className="flex items-end gap-2 mb-1">
              <span className="font-bold text-white" style={{ fontSize: '56px', letterSpacing: '-0.04em', lineHeight: 1 }}>
                $20
              </span>
              <span className="text-[14px] mb-2" style={{ color: '#86868B' }}>once</span>
            </div>
            <p className="text-[13px] mb-7" style={{ color: '#86868B' }}>
              One-time payment · no renewals, ever.
            </p>

            {/* hairline */}
            <div className="h-px mb-7" style={{ background: 'rgba(255,255,255,0.10)' }} />

            {/* features */}
            <ul className="flex flex-col gap-3.5 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[14px] text-white" style={{ lineHeight: 1.4 }}>
                  <span
                    className="mt-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(48,209,88,0.15)' }}
                  >
                    <Check className="h-3 w-3" style={{ color: '#30D158' }} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="group w-full h-12 rounded-full flex items-center justify-center gap-2 text-[15px] font-semibold transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: '#FFFFFF', color: '#1D1D1F' }}
            >
              {loading ? 'Opening secure checkout…' : 'Upgrade to Pro — $20 once'}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>

            <p className="text-[12px] text-center mt-4" style={{ color: '#86868B' }}>
              Secure checkout via Lemon Squeezy
            </p>
          </div>
        </motion.div>

        {/* Guarantee row */}
        <motion.div className="flex items-center justify-center gap-6 mt-7" {...fadeUp(0.18)}>
          {GUARANTEES.map((g) => (
            <div key={g.label} className="flex items-center gap-1.5">
              <g.icon className="h-3.5 w-3.5" style={{ color: '#86868B' }} />
              <span className="text-[12px]" style={{ color: '#6E6E73' }}>{g.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
