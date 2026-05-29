import { useState } from 'react'
import type { ComponentType, RefObject } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Download, Share2, Save, Image as ImageIcon, Check, Link2, Loader2 } from 'lucide-react'
import { Button } from '@/ui/Button'
import { ProGateOverlay } from './ProGateOverlay'
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

// A premium, left-aligned action row: icon chip + label + helper hint.
function ActionRow({
  icon: Icon,
  label,
  hint,
  onClick,
  loading,
  disabled,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  hint: string
  onClick: () => void
  loading?: boolean
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="group w-full flex items-center gap-3 px-3 h-[52px] rounded-xl border border-border bg-surface text-left transition-all hover:border-border-strong hover:bg-subtle disabled:opacity-60 disabled:pointer-events-none"
    >
      <span className="w-8 h-8 rounded-lg bg-subtle flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-overlay">
        {loading ? (
          <Loader2 className="h-4 w-4 text-muted animate-spin" />
        ) : (
          <Icon className="h-4 w-4 text-foreground" />
        )}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[13px] font-semibold text-foreground truncate">{label}</span>
        <span className="block text-[11px] text-placeholder truncate">{hint}</span>
      </span>
    </button>
  )
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
    idle: 'Share link',
    loading: 'Creating link…',
    copied: 'Link copied!',
    error: 'Error — try again',
  }

  async function handleShare() {
    if (!proposal.id) {
      toast.warning('Save the proposal first before sharing')
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
      toast.success('Share link copied to clipboard')
      setTimeout(() => setShareState('idle'), 2000)
    } catch (err) {
      setShareState('error')
      toast.error(`Failed to create share link: ${err instanceof Error ? err.message : 'unknown error'}`)
    }
  }

  async function handlePdfExport() {
    try {
      await exportToPDF(exportRef, meta)
      toast.success('PDF downloaded')
    } catch (err) {
      toast.error(`PDF export failed: ${err instanceof Error ? err.message : 'unknown error'}`)
    }
  }

  async function handlePngExport() {
    try {
      await exportToPNG(exportRef, meta)
      toast.success('PNG downloaded')
    } catch (err) {
      toast.error(`PNG export failed: ${err instanceof Error ? err.message : 'unknown error'}`)
    }
  }

  const shareIcon = shareState === 'copied' ? Check : shareState === 'idle' ? Share2 : Link2

  return (
    <div className="flex flex-col gap-4">
      {/* Export & share group */}
      <div className="bg-surface border border-border rounded-2xl p-3.5 shadow-sm flex flex-col gap-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-placeholder px-1">
          Export & share
        </p>

        <div className="relative overflow-hidden rounded-xl">
          <ActionRow icon={Download} label="Download PDF" hint="A4 · print-ready" onClick={handlePdfExport} />
          {!isPro && <ProGateOverlay feature="PDF export requires Pro" />}
        </div>

        <div className="relative overflow-hidden rounded-xl">
          <ActionRow icon={ImageIcon} label="Download PNG" hint="High-resolution image" onClick={handlePngExport} />
          {!isPro && <ProGateOverlay feature="PNG export requires Pro" />}
        </div>

        <div className="relative overflow-hidden rounded-xl">
          <ActionRow
            icon={shareIcon}
            label={shareLabelMap[shareState]}
            hint="Public view-only link"
            onClick={handleShare}
            loading={shareState === 'loading'}
            disabled={shareState === 'loading'}
          />
          {!isPro && <ProGateOverlay feature="Share links require Pro" />}
        </div>
      </div>

      {/* Save — primary completion action */}
      <Button
        variant="dark"
        size="lg"
        className="w-full"
        loading={isSaving}
        onClick={async () => {
          try {
            await onSave()
            toast.success('Proposal saved')
            navigate('/app')
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err)
            toast.error(`Save failed: ${msg}`)
          }
        }}
      >
        <Save className="h-4 w-4" />
        Save to Dashboard
      </Button>
    </div>
  )
}
