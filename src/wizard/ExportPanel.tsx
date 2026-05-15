import { Button } from '@/ui/Button'
import { ProGateOverlay } from './ProGateOverlay'
import { Download, Share2, Save, ImageIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { RefObject } from 'react'
import type { ProposalData } from '@/types'
import { exportToPDF } from '@/lib/exportService'

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
        <Button variant="secondary" className="w-full" onClick={() => {}}>
          <ImageIcon className="h-4 w-4" />
          Download PNG
        </Button>
        {!isPro && <ProGateOverlay feature="PNG export requires Pro" />}
      </div>

      <div className="relative overflow-hidden">
        <Button variant="secondary" className="w-full" onClick={() => {}}>
          <Share2 className="h-4 w-4" />
          Share Link
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
