import { useMemo } from 'react'
import type { ProposalSummary, DashboardStats } from '@/types'

export function useDashboardStats(proposals: ProposalSummary[]): DashboardStats {
  return useMemo(() => {
    const pipeline = { draft: 0, sent: 0, won: 0, lost: 0 }
    let totalValue = 0
    let sharedCount = 0

    for (const p of proposals) {
      pipeline[p.status]++
      totalValue += p.totalValue
      if (p.sharedLinkId) sharedCount++
    }

    return {
      totalProposals: proposals.length,
      sharedCount,
      totalValue,
      pipeline,
    }
  }, [proposals])
}
