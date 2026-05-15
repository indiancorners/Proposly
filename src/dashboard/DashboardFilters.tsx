import { ProposalStatus } from '@/types'
import { Search } from 'lucide-react'

interface DashboardFiltersProps {
  search: string
  statusFilter: ProposalStatus | 'all'
  onSearchChange: (q: string) => void
  onStatusChange: (s: ProposalStatus | 'all') => void
}

const STATUS_TABS: { value: ProposalStatus | 'all'; label: string }[] = [
  { value: 'all',                label: 'All' },
  { value: ProposalStatus.Draft, label: 'Draft' },
  { value: ProposalStatus.Sent,  label: 'Sent' },
  { value: ProposalStatus.Won,   label: 'Won' },
  { value: ProposalStatus.Lost,  label: 'Lost' },
]

export function DashboardFilters({ search, statusFilter, onSearchChange, onStatusChange }: DashboardFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-1">
        {STATUS_TABS.map((tab) => {
          const active = statusFilter === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => onStatusChange(tab.value)}
              className="px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-150"
              style={
                active
                  ? { background: '#1D1D1F', color: '#FFFFFF' }
                  : { background: 'transparent', color: '#6E6E73' }
              }
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = '#F5F5F7' }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
          style={{ color: '#86868B' }}
        />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search proposals…"
          className="h-8 pl-8 pr-3 rounded-full text-[13px] bg-white placeholder:text-[#86868B] focus:outline-none w-52 transition-all"
          style={{ border: '1px solid #D2D2D7', color: '#1D1D1F' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#AEAEB2')}
          onBlur={(e)  => (e.currentTarget.style.borderColor = '#D2D2D7')}
        />
      </div>
    </div>
  )
}
