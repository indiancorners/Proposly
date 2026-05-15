import type { SharedLink } from '@/types'

export async function createSharedLink(_proposalId: string): Promise<SharedLink> {
  throw new Error('Phase 6: connect Supabase')
}

export async function deleteSharedLink(_linkId: string): Promise<void> {
  throw new Error('Phase 6: connect Supabase')
}

export async function getProposalByLink(_linkId: string): Promise<unknown> {
  throw new Error('Phase 6: connect Supabase')
}
