import { useState } from 'react'
import { Button } from '@/ui/Button'
import { ProGateOverlay } from './ProGateOverlay'
import { Download, Share2, Save, ImageIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { RefObject } from 'react'
import type { ProposalData } from '@/types'
import { exportToPDF, exportToPNG } from '@/lib/exportService'
import { createSharedLink } from '@/services/shareService'

interface ExportPanelProps {
  exportRef: RefObject<HTMLElement | null>
  proposal: ProposalData
  isPro: boolean
  isSaving: boolean
  onSave: () => Promise<void>
}

export function ExportPanel({ exportRef, proposal, isPro, isSaving, onSave }: ExportPanelProps) {
  const navigate = useNavigate()
  const cover = proposal.sections.find((s) => s.type === 'cover')
  const meta = {
    projectTitle: cover?.type === 'cover' ? cover.data.projectTitle : 'Proposal',
    clientName: cover?.type === 'cover' ? cover.data.clientName : 'Client',
  }

  type ShareState = 'idle' | 'loading' | 'copied' | 'error'
  const [shareState, setShareState] = useState<ShareState>('idle')
  const [localSharedLinkId, setLocalSharedLinkId] = useState<string | null>(
    proposal.sharedLinkId ?? null
  )

  const shareLabelMap: Record<ShareState, string> = {
    idle: 'Share Link',
    loading: 'Creating link…',
    copied: 'Link Copied!',
    error: 'Error — try again',
  }

  async function handleShare() {
    if (!proposal.id) {
      alert('Save the proposal first before sharing')
      return
    }

    const effectiveId = localSharedLinkId ?? proposal.sharedLinkId

    try {
      let linkId: string
      if (effectiveId) {
        linkId = effectiveId
      } else {
        setShareState('loading')
        const link = await createSharedLink(proposal.id)
        setLocalSharedLinkId(link.id)
        linkId = link.id
      }

      await navigator.clipboard.writeText(`${window.location.origin}/share/${linkId}`)
      setShareState('copied')
      setTimeout(() => setShareState('idle'), 2000)
    } catch {
      setShareState('error')
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-surface border border-border rounded-2xl shadow-sm">
      <Button
        variant="primary"
        onClick={() => exportToPDF(exportRef, meta)}
        className="relative overflow-hidden"
      >
        <Download className="h-4 w-4" />
        Download PDF
        {!isPro && <ProGateOverlay feature="PDF export requires Pro" />}
      </Button>

      <div className="relative overflow-hidden">
        <Button variant="secondary" className="w-full" onClick={() => exportToPNG(exportRef, meta)}>
          <ImageIcon className="h-4 w-4" />
          Download PNG
        </Button>
        {!isPro && <ProGateOverlay feature="PNG export requires Pro" />}
      </div>

      <div className="relative overflow-hidden">
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleShare}
          disabled={shareState === 'loading'}
        >
          <Share2 className="h-4 w-4" />
          {shareLabelMap[shareState]}
        </Button>
        {!isPro && <ProGateOverlay feature="Share links require Pro" />}
      </div>

      <Button variant="ghost" loading={isSaving} onClick={async () => { await onSave(); navigate('/app') }}>
        <Save className="h-4 w-4" />
        Save to Dashboard
      </Button>
    </div>
  )
}
