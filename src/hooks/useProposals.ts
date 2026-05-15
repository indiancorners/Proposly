import { useState } from 'react'
import type { ProposalSummary } from '@/types'
import { createMockProposals } from '@/constants/defaultData'

export function useProposals() {
  const [proposals, setProposals] = useState<ProposalSummary[]>(createMockProposals)
  const [isLoading] = useState(false)

  function deleteProposal(id: string) {
    setProposals((prev) => prev.filter((p) => p.id !== id))
  }

  function updateStatus(id: string, status: ProposalSummary['status']) {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p))
    )
  }

  return { proposals, isLoading, deleteProposal, updateStatus }
}
