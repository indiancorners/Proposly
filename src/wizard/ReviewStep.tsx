import { useRef } from 'react'
import { ProposalRenderer } from '@/renderer/ProposalRenderer'
import { ExportPanel } from './ExportPanel'
import type { ProposalData } from '@/types'

interface ReviewStepProps {
  proposal: ProposalData
  isPro: boolean
  isSaving: boolean
  onSave: () => Promise<void>
}

export function ReviewStep({ proposal, isPro, isSaving, onSave }: ReviewStepProps) {
  const exportRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex gap-6 h-full">
      {/* Scrollable proposal preview */}
      <div className="flex-1 overflow-auto bg-overlay/50 rounded-2xl p-6">
        <div className="mx-auto max-w-[794px] shadow-lg rounded-xl overflow-hidden">
          <ProposalRenderer ref={exportRef} proposal={proposal} />
        </div>
      </div>
      {/* Action panel */}
      <div className="w-64 flex-shrink-0">
        <ExportPanel
          exportRef={exportRef}
          proposal={proposal}
          isPro={isPro}
          isSaving={isSaving}
          onSave={onSave}
        />
      </div>
    </div>
  )
}
