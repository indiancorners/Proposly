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

// ─── getProposalByLink ────────────────────────────────────────────────────────
// Public share reads run as the anon role, which RLS blocks from reading proposals
// directly. The `get_shared_proposal` SECURITY DEFINER RPC (see supabase/rls.sql)
// resolves the link, atomically bumps view_count, and returns the proposal row.

export async function getProposalByLink(linkId: string): Promise<ProposalData | null> {
  const { data, error } = await supabase.rpc('get_shared_proposal', {
    link_id: linkId,
  })

  if (error) throw error
  // RETURNS proposals expands a no-match into a row of null columns rather than SQL
  // NULL, so check the primary key to distinguish "found" from "link doesn't exist".
  if (!data || !(data as DbRow).id) return null
  return rowToProposal(data as DbRow)
}
