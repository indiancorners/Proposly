import { NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, Settings, Plus } from 'lucide-react'
import { useUser, useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { FREE_PROPOSAL_LIMIT } from '@/hooks/useProposlyPro'

interface MobileNavProps {
  isPro: boolean
  proposalCount: number
}

const TABS = [
  { to: '/app',          label: 'Home',     icon: LayoutDashboard, end: true },
  { to: '/app/create',   label: 'New',      icon: Plus,            end: false },
  { to: '/app/settings', label: 'Settings', icon: Settings,        end: false },
]

// Top bar: logo, plan chip, account avatar (with sign-out menu). Shown < md only.
export function MobileTopBar({ isPro, proposalCount }: MobileNavProps) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()
  const remaining = Math.max(FREE_PROPOSAL_LIMIT - proposalCount, 0)

  return (
    <header
      className="md:hidden h-14 flex-shrink-0 flex items-center justify-between px-4"
      style={{ background: '#FFFFFF', borderBottom: '1px solid #D2D2D7' }}
    >
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Proposly" className="h-6 w-6 rounded-md" />
        <span className="font-semibold" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#1D1D1F' }}>
          Proposly
        </span>
      </Link>
      <div className="flex items-center gap-2.5">
        <Link
          to="/app/upgrade"
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
          style={
            isPro
              ? { background: '#1D1D1F', color: '#FFFFFF' }
              : { background: '#F5F5F7', color: '#1D1D1F' }
          }
        >
          {isPro ? 'Pro' : `Free · ${remaining} left`}
        </Link>
        <button
          onClick={() => signOut(() => navigate('/'))}
          aria-label="Account"
          className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
        >
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="" className="w-7 h-7 object-cover" />
          ) : (
            <span
              className="w-7 h-7 flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: '#1D1D1F' }}
            >
              {(user?.firstName?.[0] ?? user?.primaryEmailAddress?.emailAddress?.[0] ?? 'U').toUpperCase()}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

// Bottom tab bar: Home / New / Settings. Shown < md only.
export function MobileBottomNav() {
  return (
    <nav
      className="md:hidden flex-shrink-0 flex items-stretch"
      style={{ background: '#FFFFFF', borderTop: '1px solid #D2D2D7' }}
    >
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2"
          style={({ isActive }) => ({ color: isActive ? '#1D1D1F' : '#86868B' })}
        >
          <tab.icon className="h-5 w-5" />
          <span className="text-[10px] font-medium">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
