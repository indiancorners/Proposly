import { Badge } from '@/ui/Badge'
import { ProposalCardMenu } from './ProposalCardMenu'
import type { ProposalSummary, ProposalStatus } from '@/types'
import { useNavigate } from 'react-router-dom'

interface ProposalCardProps {
  proposal: ProposalSummary
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: ProposalStatus) => void
}

export function ProposalCard({ proposal, onDelete, onStatusChange }: ProposalCardProps) {
  const navigate = useNavigate()
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(proposal.totalValue)
  const updatedAt = new Date(proposal.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div
      className="bg-white rounded-2xl p-5 flex flex-col gap-4 cursor-pointer transition-all duration-200"
      style={{ border: '1px solid #D2D2D7' }}
      onClick={() => navigate(`/app/edit/${proposal.id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#AEAEB2'
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#D2D2D7'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Title + menu */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold truncate"
            style={{ fontSize: '14px', letterSpacing: '-0.01em', color: '#1D1D1F' }}
          >
            {proposal.projectTitle || 'Untitled'}
          </p>
          <p className="text-[12px] truncate mt-0.5" style={{ color: '#6E6E73' }}>
            {proposal.clientName || 'No client'}
          </p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <ProposalCardMenu
            proposal={proposal}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        </div>
      </div>

      {/* Value + status */}
      <div className="flex items-center justify-between">
        <span
          className="font-bold"
          style={{ fontSize: '22px', letterSpacing: '-0.03em', color: '#1D1D1F' }}
        >
          {formattedValue}
        </span>
        <Badge variant={proposal.status} />
      </div>

      {/* Template + date */}
      <div className="flex items-center justify-between">
        <span
          className="uppercase font-semibold tracking-widest"
          style={{ fontSize: '10px', color: '#86868B' }}
        >
          {proposal.theme}
        </span>
        <span className="text-[11px]" style={{ color: '#86868B' }}>
          {updatedAt}
        </span>
      </div>
    </div>
  )
}
