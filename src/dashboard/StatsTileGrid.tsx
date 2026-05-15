import { StatTile } from './StatTile'
import { PipelineBar } from './PipelineBar'
import type { DashboardStats } from '@/types'
import { FileText, DollarSign, Share2 } from 'lucide-react'

interface StatsTileGridProps {
  stats: DashboardStats
}

export function StatsTileGrid({ stats }: StatsTileGridProps) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(stats.totalValue)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <StatTile label="Total Proposals" value={stats.totalProposals} icon={<FileText className="h-4 w-4" />} />
      <StatTile label="Pipeline Value"  value={formatted}           icon={<DollarSign className="h-4 w-4" />} />
      <StatTile label="Shared"          value={stats.sharedCount}   icon={<Share2 className="h-4 w-4" />} />
      <div
        className="bg-white rounded-2xl p-6 flex flex-col gap-4"
        style={{ border: '1px solid #D2D2D7' }}
      >
        <p
          className="uppercase font-semibold tracking-widest"
          style={{ fontSize: '11px', color: '#86868B' }}
        >
          Pipeline
        </p>
        <PipelineBar pipeline={stats.pipeline} />
      </div>
    </div>
  )
}
