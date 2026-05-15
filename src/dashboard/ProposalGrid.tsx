import { ProposalCard } from './ProposalCard'
import { EmptyDashboard } from './EmptyDashboard'
import type { ProposalSummary, ProposalStatus } from '@/types'

interface ProposalGridProps {
  proposals: ProposalSummary[]
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: ProposalStatus) => void
}

export function ProposalGrid({ proposals, onDelete, onStatusChange }: ProposalGridProps) {
  if (proposals.length === 0) {
    return <EmptyDashboard />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}
