import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'sonner'
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
      .catch((err) => toast.error(`Failed to load proposals: ${err.message ?? 'unknown error'}`))
      .finally(() => setIsLoading(false))
  }, [isLoaded, user?.id])

  const deleteProposal = useCallback(async (id: string) => {
    if (!user) return
    const prevList = proposals
    setProposals((prev) => prev.filter((p) => p.id !== id))
    try {
      await dbDelete(id, user.id)
      toast.success('Proposal deleted')
    } catch (err) {
      setProposals(prevList) // rollback optimistic update
      toast.error(`Failed to delete: ${err instanceof Error ? err.message : 'unknown error'}`)
    }
  }, [user?.id, proposals])

  const updateStatus = useCallback(async (id: string, status: ProposalSummary['status']) => {
    if (!user) return
    const prevList = proposals
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p))
    )
    try {
      await updateProposalStatus(id, status, user.id)
    } catch (err) {
      setProposals(prevList) // rollback optimistic update
      toast.error(`Failed to update status: ${err instanceof Error ? err.message : 'unknown error'}`)
    }
  }, [user?.id, proposals])

  return { proposals, isLoading, deleteProposal, updateStatus }
}
