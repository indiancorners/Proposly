import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatsTileGrid } from '@/dashboard/StatsTileGrid'
import { ProposalGrid } from '@/dashboard/ProposalGrid'
import { DashboardFilters } from '@/dashboard/DashboardFilters'
import { UpgradeBanner } from '@/dashboard/UpgradeBanner'
import { useProposals } from '@/hooks/useProposals'
import { useDashboardStats } from '@/hooks/useDashboardStats'
import { useProposlyPro } from '@/hooks/useProposlyPro'
import type { ProposalStatus } from '@/types'

export function DashboardPage() {
  const navigate = useNavigate()
  const { proposals, deleteProposal, updateStatus } = useProposals()
  const stats = useDashboardStats(proposals)
  const { isPro, isAtLimit } = useProposlyPro(proposals.length)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all')

  const filtered = proposals.filter((p) => {
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch = !q || p.projectTitle.toLowerCase().includes(q) || p.clientName.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  return (
    <div className="px-8 py-10 max-w-[1400px] mx-auto flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-bold"
            style={{ fontSize: '22px', letterSpacing: '-0.02em', color: '#1D1D1F' }}
          >
            Dashboard
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: '#6E6E73' }}>
            Your proposals, stats, and pipeline at a glance.
          </p>
        </div>
        <button
          onClick={() => navigate('/app/create')}
          className="inline-flex items-center gap-2 h-9 px-5 rounded-full text-[13px] font-semibold transition-opacity hover:opacity-80"
          style={{ background: '#1D1D1F', color: 'white' }}
        >
          <Plus className="h-3.5 w-3.5" />
          New Proposal
        </button>
      </div>

      {/* Stats */}
      <StatsTileGrid stats={stats} />

      {/* Upgrade banner */}
      {!isPro && isAtLimit && <UpgradeBanner />}

      {/* Filters + grid */}
      <div className="flex flex-col gap-5">
        <DashboardFilters
          search={search}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
        />
        <ProposalGrid
          proposals={filtered}
          onDelete={deleteProposal}
          onStatusChange={updateStatus}
        />
      </div>

    </div>
  )
}
