import { useState } from 'react'

export interface ProposlyProState {
  isPro: boolean
  proposalCount: number
  isAtLimit: boolean
  canExport: boolean
  canShare: boolean
  canUseProTemplate: boolean
}

// Phase 3+: fetch from Supabase profiles
// Phase 1: always free user with 2 mock proposals
export function useProposlyPro(): ProposlyProState {
  const [isPro] = useState(false)
  const [proposalCount] = useState(2)

  return {
    isPro,
    proposalCount,
    isAtLimit: !isPro && proposalCount >= 1,
    canExport: isPro,
    canShare: isPro,
    canUseProTemplate: isPro,
  }
}
