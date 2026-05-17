import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/clerk-react'
import type { ProposalSummary } from '@/types'
import {
  getProposals,
  deleteProposal as dbDelete,
  updateProposalStatus,
} from '@/services/proposalService'

export function useProposals() {
  const { user, isLoaded } = useUser()
  const [proposals, setProposals] = useState<ProposalSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return
    setIsLoading(true)
    getProposals(user.id)
      .then(setProposals)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [isLoaded, user?.id])

  const deleteProposal = useCallback(async (id: string) => {
    setProposals((prev) => prev.filter((p) => p.id !== id))
    await dbDelete(id).catch(console.error)
  }, [])

  const updateStatus = useCallback(async (id: string, status: ProposalSummary['status']) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p))
    )
    await updateProposalStatus(id, status).catch(console.error)
  }, [])

  return { proposals, isLoading, deleteProposal, updateStatus }
}
