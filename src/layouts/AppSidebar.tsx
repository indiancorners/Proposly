import { NavLink, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Settings, LogOut, Plus } from 'lucide-react'
import { ProBadge } from '@/ui/ProBadge'

interface AppSidebarProps {
  isPro: boolean
}

const NAV = [
  { to: '/app',          label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/settings', label: 'Settings',  icon: Settings,        end: false },
]

export function AppSidebar({ isPro }: AppSidebarProps) {
  const navigate = useNavigate()

  return (
    <aside
      className="w-60 h-screen flex-shrink-0 flex flex-col"
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

      {/* User footer */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid #D2D2D7' }}>
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
            style={{ background: '#1D1D1F' }}
          >
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold truncate" style={{ color: '#1D1D1F' }}>
              Jatin Kumar
            </p>
            <p className="text-[11px] truncate" style={{ color: '#86868B' }}>
              jatin@studio.co
            </p>
          </div>
        </div>
        <button
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
