import { supabase } from '@/lib/supabase'
import type { ProposalData, ProposalSummary, SectionData } from '@/types'
import { ProposalStatus, ProposalCategory } from '@/types'
import type { ThemeId } from '@/types'

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

function extractSummary(row: DbRow): ProposalSummary {
  const sections: SectionData[] = row.content?.sections ?? []
  const cover = sections.find((s) => s.type === 'cover')
  const pricing = sections.find((s) => s.type === 'pricing')
  const projectTitle = cover?.type === 'cover' ? cover.data.projectTitle : ''
  const clientName = cover?.type === 'cover' ? cover.data.clientName : ''
  const totalValue =
    pricing?.type === 'pricing'
      ? pricing.data.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
      : 0
  return {
    id: row.id,
    projectTitle: projectTitle || 'Untitled',
    clientName,
    totalValue,
    status: row.status as ProposalStatus,
    theme: row.theme as ThemeId,
    category: row.category as ProposalCategory,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    sharedLinkId: row.content?.sharedLinkId ?? null,
  }
}

export async function getProposals(userId: string): Promise<ProposalSummary[]> {
  const { data, error } = await supabase
    .from('proposals')
    .select('id, user_id, status, category, theme, content, created_at, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
  if (error) throw error
  return (data as DbRow[]).map(extractSummary)
}

export async function getProposal(id: string): Promise<ProposalData> {
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return rowToProposal(data as DbRow)
}

export async function createProposal(p: ProposalData): Promise<ProposalData> {
  const { data, error } = await supabase
    .from('proposals')
    .insert({
      user_id: p.userId,
      status: p.status,
      category: p.category,
      theme: p.theme,
      content: { sections: p.sections, sharedLinkId: p.sharedLinkId ?? null },
    })
    .select()
    .single()
  if (error) throw error
  return rowToProposal(data as DbRow)
}

export async function updateProposal(p: ProposalData): Promise<ProposalData> {
  const { data, error } = await supabase
    .from('proposals')
    .update({
      status: p.status,
      category: p.category,
      theme: p.theme,
      content: { sections: p.sections, sharedLinkId: p.sharedLinkId ?? null },
      updated_at: new Date().toISOString(),
    })
    .eq('id', p.id)
    .select()
    .single()
  if (error) throw error
  return rowToProposal(data as DbRow)
}

export async function deleteProposal(id: string): Promise<void> {
  const { error } = await supabase.from('proposals').delete().eq('id', id)
  if (error) throw error
}

export async function updateProposalStatus(id: string, status: string): Promise<void> {
  const { error } = await supabase
    .from('proposals')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}
