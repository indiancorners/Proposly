import { NavLink, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Settings, LogOut, Plus, Sparkles } from 'lucide-react'
import { useUser, useClerk } from '@clerk/clerk-react'
import { ProBadge } from '@/ui/ProBadge'
import { FREE_PROPOSAL_LIMIT } from '@/hooks/useProposlyPro'

interface AppSidebarProps {
  isPro: boolean
  proposalCount: number
}

const NAV = [
  { to: '/app',          label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/settings', label: 'Settings',  icon: Settings,        end: false },
]

export function AppSidebar({ isPro, proposalCount }: AppSidebarProps) {
  const navigate = useNavigate()
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <aside
      className="hidden md:flex w-60 h-dvh flex-shrink-0 flex-col"
      style={{ background: '#FFFFFF', borderRight: '1px solid #D2D2D7' }}
    >
      {/* Logo — links back to homepage */}
      <div className="px-5 py-[18px]" style={{ borderBottom: '1px solid #D2D2D7' }}>
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-70">
            <img src="/logo.png" alt="Proposly" className="h-6 w-6 rounded-md flex-shrink-0" />
            <span
              className="font-semibold"
              style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#1D1D1F' }}
            >
              Proposly
            </span>
          </Link>
          {isPro && <ProBadge />}
        </div>
      </div>

      {/* New Proposal */}
      <div className="px-4 py-4">
        <button
          onClick={() => navigate('/app/create')}
          className="w-full flex items-center justify-center gap-2 h-9 rounded-full text-[13px] font-semibold transition-opacity hover:opacity-80"
          style={{ background: '#1D1D1F', color: '#FFFFFF' }}
        >
          <Plus className="h-3.5 w-3.5" />
          New Proposal
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 flex flex-col gap-0.5">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={({ isActive }) =>
              isActive
                ? { color: '#1D1D1F', background: '#F5F5F7', fontWeight: 600 }
                : { color: '#6E6E73', background: 'transparent' }
            }
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Plan / usage */}
      <div className="px-4 pb-4">
        <PlanCard isPro={isPro} proposalCount={proposalCount} />
      </div>

      {/* User footer */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid #D2D2D7' }}>
        <div className="flex items-center gap-2.5 mb-3">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt=""
              className="w-7 h-7 rounded-full flex-shrink-0 object-cover"
            />
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
              style={{ background: '#1D1D1F' }}
            >
              {(user?.firstName?.[0] ?? user?.primaryEmailAddress?.emailAddress?.[0] ?? 'U').toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold truncate" style={{ color: '#1D1D1F' }}>
              {user?.fullName ?? user?.firstName ?? 'Your account'}
            </p>
            <p className="text-[11px] truncate" style={{ color: '#86868B' }}>
              {user?.primaryEmailAddress?.emailAddress ?? ''}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut(() => navigate('/'))}
          className="flex items-center gap-1.5 text-[12px] w-full transition-opacity hover:opacity-60"
          style={{ color: '#86868B' }}
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  )
}

// ─── Plan / usage card ────────────────────────────────────────────────────────

export function PlanCard({ isPro, proposalCount }: { isPro: boolean; proposalCount: number }) {
  if (isPro) {
    return (
      <div
        className="rounded-xl px-3 py-2.5 flex items-center gap-2"
        style={{ background: '#F5F5F7' }}
      >
        <Sparkles className="h-4 w-4 flex-shrink-0" style={{ color: '#1D1D1F' }} />
        <div className="min-w-0">
          <p className="text-[12px] font-semibold" style={{ color: '#1D1D1F' }}>Pro plan</p>
          <p className="text-[11px]" style={{ color: '#86868B' }}>Unlimited proposals</p>
        </div>
      </div>
    )
  }

  const used = Math.min(proposalCount, FREE_PROPOSAL_LIMIT)
  const remaining = Math.max(FREE_PROPOSAL_LIMIT - proposalCount, 0)
  const pct = Math.min((proposalCount / FREE_PROPOSAL_LIMIT) * 100, 100)

  return (
    <div className="rounded-xl px-3 py-3" style={{ background: '#F5F5F7' }}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[12px] font-semibold" style={{ color: '#1D1D1F' }}>Free plan</p>
        <span className="text-[11px]" style={{ color: '#86868B' }}>
          {used} / {FREE_PROPOSAL_LIMIT}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden mb-2.5" style={{ background: '#E5E5EA' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: remaining === 0 ? '#FF453A' : '#1D1D1F' }}
        />
      </div>
      <p className="text-[11px] mb-2.5" style={{ color: '#86868B' }}>
        {remaining > 0
          ? `${remaining} proposal${remaining === 1 ? '' : 's'} left`
          : 'Limit reached — upgrade for unlimited'}
      </p>
      <Link
        to="/app/upgrade"
        className="flex items-center justify-center gap-1.5 h-8 rounded-full text-[12px] font-semibold transition-opacity hover:opacity-80"
        style={{ background: '#1D1D1F', color: '#FFFFFF' }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        Upgrade to Pro
      </Link>
    </div>
  )
}
