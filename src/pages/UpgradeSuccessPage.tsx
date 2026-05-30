import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export function UpgradeSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <motion.div
        className="flex flex-col items-center max-w-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: '#1D1D1F' }}
        >
          <Sparkles className="h-7 w-7 text-white" />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: '#86868B' }}>
          Pro · Lifetime
        </p>
        <h1
          className="font-bold mb-3"
          style={{ fontSize: 'clamp(30px, 5vw, 42px)', letterSpacing: '-0.035em', lineHeight: 1.05, color: '#1D1D1F' }}
        >
          Welcome to Pro.
        </h1>
        <p className="text-[16px] mb-8" style={{ color: '#6E6E73', lineHeight: 1.6 }}>
          Every template, unlimited proposals, PDF export, and share links are yours — for life. No renewals, ever.
        </p>

        <Link
          to="/app/create"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-90 mb-3 w-full"
          style={{ background: '#1D1D1F', color: '#FFFFFF' }}
        >
          Create your first Pro proposal
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/app"
          className="text-[13px] transition-opacity hover:opacity-70"
          style={{ color: '#6E6E73' }}
        >
          Go to dashboard
        </Link>
      </motion.div>
    </div>
  )
}
