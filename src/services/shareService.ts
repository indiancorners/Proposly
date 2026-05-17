import { supabase } from '@/lib/supabase'
import type { ProposalData, SharedLink, SectionData } from '@/types'
import { ProposalStatus, ProposalCategory } from '@/types'
import type { ThemeId } from '@/types'

// ─── Local DbRow (mirrors proposalService — intentionally duplicated) ─────────

interface DbRow {
  id: string
  user_id: string
  status: string
  category: string
  theme: string
  content: { sections: SectionData[]; sharedLinkId?: string | null }
  created_at: string
  updated_at: string
}

function rowToProposal(row: DbRow): ProposalData {
  return {
    id: row.id,
    userId: row.user_id,
    status: row.status as ProposalStatus,
    category: row.category as ProposalCategory,
    theme: row.theme as ThemeId,
    sections: row.content?.sections ?? [],
    sharedLinkId: row.content?.sharedLinkId ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// ─── createSharedLink ─────────────────────────────────────────────────────────

export async function createSharedLink(proposalId: string): Promise<SharedLink> {
  const { data, error } = await supabase
    .from('shared_links')
    .insert({ proposal_id: proposalId })
    .select()
    .single()
  if (error) throw error
  return {
    id: data.id,
    proposalId: data.proposal_id,
    viewCount: data.view_count,
    createdAt: data.created_at,
    expiresAt: null,
  }
}

// ─── deleteSharedLink ─────────────────────────────────────────────────────────

export async function deleteSharedLink(linkId: string): Promise<void> {
  const { error } = await supabase
    .from('shared_links')
    .delete()
    .eq('id', linkId)
  if (error) throw error
}

// ─── incrementViewCount — fire-and-forget helper ──────────────────────────────
// Supabase JS client doesn't support column expressions (view_count + 1) directly.
// We fetch current count and write back. Acceptable for low-traffic public views.

async function incrementViewCount(linkId: string): Promise<void> {
  const { data } = await supabase
    .from('shared_links')
    .select('view_count')
    .eq('id', linkId)
    .single()
  if (!data) return
  await supabase
    .from('shared_links')
    .update({ view_count: (data.view_count as number) + 1 })
    .eq('id', linkId)
}

// ─── getProposalByLink ────────────────────────────────────────────────────────

export async function getProposalByLink(linkId: string): Promise<ProposalData | null> {
  // 1. Resolve link → proposal_id
  const { data: linkRow, error: linkError } = await supabase
    .from('shared_links')
    .select('proposal_id')
    .eq('id', linkId)
    .single()

  if (linkError) {
    if (linkError.code === 'PGRST116') return null
    throw linkError
  }

  // 2. Increment view count — fire-and-forget, never blocks or fails the render
  incrementViewCount(linkId).catch(() => {})

  // 3. Fetch the proposal
  const proposalId = (linkRow as { proposal_id: string }).proposal_id
  const { data: proposalRow, error: proposalError } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', proposalId)
    .single()

  if (proposalError) throw proposalError
  return rowToProposal(proposalRow as DbRow)
}
