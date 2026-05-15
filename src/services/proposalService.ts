import type { ProposalData, ProposalSummary } from '@/types'

export async function getProposals(_userId: string): Promise<ProposalSummary[]> {
  throw new Error('Phase 2: connect Supabase')
}

export async function getProposal(_id: string): Promise<ProposalData> {
  throw new Error('Phase 2: connect Supabase')
}

export async function createProposal(_data: ProposalData): Promise<ProposalData> {
  throw new Error('Phase 2: connect Supabase')
}

export async function updateProposal(_data: ProposalData): Promise<ProposalData> {
  throw new Error('Phase 2: connect Supabase')
}

export async function deleteProposal(_id: string): Promise<void> {
  throw new Error('Phase 2: connect Supabase')
}
