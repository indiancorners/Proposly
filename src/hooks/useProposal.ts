import { useState, useEffect } from 'react'
import type { ProposalData } from '@/types'
import { getProposal } from '@/services/proposalService'

export function useProposal(id?: string) {
  const [proposal, setProposal] = useState<ProposalData | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(id))
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return
    setIsLoading(true)
    setError(null)
    getProposal(id)
      .then(setProposal)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setIsLoading(false))
  }, [id])

  return { proposal, isLoading, error }
}
