import { ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function UpgradeBanner() {
  const navigate = useNavigate()

  return (
    <div
      className="flex items-center justify-between rounded-2xl px-6 py-5"
      style={{ background: '#1D1D1F' }}
    >
      <div className="flex items-center gap-3">
        <Sparkles className="h-4 w-4 flex-shrink-0" style={{ color: '#86868B' }} />
        <div>
          <p className="text-[14px] font-semibold text-white">
            You've built 3 proposals — time to go unlimited.
          </p>
          <p className="text-[12px] mt-0.5" style={{ color: '#86868B' }}>
            Unlimited proposals. All 5 templates. PDF export. Share links.
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate('/app/upgrade')}
        className="flex-shrink-0 inline-flex items-center gap-2 h-9 px-5 rounded-full text-[13px] font-semibold transition-opacity hover:opacity-85 ml-6"
        style={{ background: 'white', color: '#1D1D1F' }}
      >
        Upgrade — $20 once
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
