import { useState, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, Settings, Plus, LogOut, User } from 'lucide-react'
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

// Mini account dropdown triggered by avatar tap — prevents accidental sign-out.
function AccountMenu() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const initials = (
    user?.firstName?.[0] ?? user?.primaryEmailAddress?.emailAddress?.[0] ?? 'U'
  ).toUpperCase()

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Account menu"
        className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 focus:outline-none"
      >
        {user?.imageUrl ? (
          <img src={user.imageUrl} alt="" className="w-7 h-7 object-cover" />
        ) : (
          <span
            className="w-7 h-7 flex items-center justify-center text-white text-[11px] font-bold"
            style={{ background: '#1D1D1F' }}
          >
            {initials}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-9 z-50 w-48 rounded-2xl py-1.5 bg-white"
          style={{ border: '1px solid #D2D2D7', boxShadow: '0 8px 30px rgba(0,0,0,0.10)' }}
        >
          {/* User info */}
          <div className="px-3.5 py-2.5" style={{ borderBottom: '1px solid #D2D2D7' }}>
            <p className="text-[12px] font-semibold truncate" style={{ color: '#1D1D1F' }}>
              {user?.fullName ?? user?.firstName ?? 'Your account'}
            </p>
            <p className="text-[11px] truncate" style={{ color: '#86868B' }}>
              {user?.primaryEmailAddress?.emailAddress ?? ''}
            </p>
          </div>

          {/* Settings */}
          <button
            onClick={() => { navigate('/app/settings'); setOpen(false) }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-[13px] transition-colors"
            style={{ color: '#1D1D1F' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F5F7')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <User className="h-3.5 w-3.5" style={{ color: '#86868B' }} />
            Settings
          </button>

          {/* Sign out */}
          <div style={{ borderTop: '1px solid #D2D2D7' }} className="pt-1">
            <button
              onClick={() => { setOpen(false); signOut(() => navigate('/')) }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-[13px] transition-colors"
              style={{ color: '#DC2626' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Top bar: logo, plan chip, account menu. Shown < md only.
export function MobileTopBar({ isPro, proposalCount }: MobileNavProps) {
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
        <AccountMenu />
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
