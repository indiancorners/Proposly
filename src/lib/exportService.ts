import type { RefObject } from 'react'
import type { ProposalSummary } from '@/types'

export async function exportToPDF(
  _ref: RefObject<HTMLElement | null>,
  _meta: Pick<ProposalSummary, 'projectTitle' | 'clientName'>
): Promise<void> {
  // Phase 4: implement html2canvas + jsPDF
  alert('PDF export coming in Phase 4')
}

export async function exportToPNG(
  _ref: RefObject<HTMLElement | null>,
  _meta: Pick<ProposalSummary, 'projectTitle' | 'clientName'>
): Promise<void> {
  // Phase 4: implement html2canvas PNG
  alert('PNG export coming in Phase 4')
}
