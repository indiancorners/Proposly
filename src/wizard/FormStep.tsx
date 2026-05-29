import { SectionFormPanel } from './SectionFormPanel'
import { SectionToggleBar } from './SectionToggleBar'
import { CategorySelector } from './CategorySelector'
import { Divider } from '@/ui/Divider'
import type { ProposalData, SectionType, ProposalCategory } from '@/types'

interface FormStepProps {
  proposal: ProposalData
  onCategoryChange: (category: ProposalCategory) => void
  onSectionUpdate: (type: SectionType, data: ProposalData['sections'][0]['data']) => void
  onSectionToggle: (type: SectionType, enabled: boolean) => void
}

export function FormStep({ proposal, onCategoryChange, onSectionUpdate, onSectionToggle }: FormStepProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:h-full">
      {/* Left sidebar: category + toggles */}
      <div className="w-full md:w-56 flex-shrink-0 flex flex-col gap-4">
        <CategorySelector value={proposal.category} onChange={onCategoryChange} />
        <Divider />
        <SectionToggleBar sections={proposal.sections} onToggle={onSectionToggle} />
      </div>
      {/* Main: section forms */}
      <div className="flex-1 min-h-0 md:overflow-auto">
        <SectionFormPanel sections={proposal.sections} onUpdate={onSectionUpdate} />
      </div>
    </div>
  )
}
