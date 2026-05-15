import { useState } from 'react'
import type { ProposalData } from '@/types'
import { createEmptyProposal } from '@/constants/defaultData'

export function useProposal(_id?: string) {
  const [proposal] = useState<ProposalData>(createEmptyProposal)
  const [isLoading] = useState(false)
  return { proposal, isLoading }
}
