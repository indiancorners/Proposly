import { ProposalStatus } from '@/types'
import { Search } from 'lucide-react'
import { clsx } from 'clsx'

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
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex gap-1">
        {STATUS_TABS.map((tab) => {
          const active = statusFilter === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => onStatusChange(tab.value)}
              className={clsx(
                'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors',
                active
                  ? 'bg-accent text-white'
                  : 'text-muted hover:bg-subtle'
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none text-placeholder" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search proposals…"
          className="h-8 w-52 pl-8 pr-3 rounded-full text-[13px] bg-white text-foreground placeholder:text-placeholder border border-border hover:border-border-strong focus:border-border-strong focus:outline-none transition-colors"
        />
      </div>
    </div>
  )
}
