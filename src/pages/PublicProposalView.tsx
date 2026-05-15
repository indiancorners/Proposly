import { useParams } from 'react-router-dom'
import { createEmptyProposal } from '@/constants/defaultData'
import { ProposalRenderer } from '@/renderer/ProposalRenderer'

// Phase 6: fetch real proposal from shared_links table
export function PublicProposalView() {
  const { linkId } = useParams()
  const proposal = createEmptyProposal() // mock for Phase 1

  if (!linkId) return null

  return (
    <div className="min-h-screen bg-overlay/30 flex flex-col items-center py-10 px-4">
      <div className="max-w-[794px] w-full shadow-xl rounded-xl overflow-hidden">
        <ProposalRenderer proposal={proposal} />
      </div>
      <p className="mt-6 text-xs text-placeholder">
        Created with{' '}
        <a href="/" className="underline hover:text-muted">
          Proposly
        </a>
      </p>
    </div>
  )
}
