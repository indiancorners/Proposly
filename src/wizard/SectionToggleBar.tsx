import { Toggle } from '@/ui/Toggle'
import { OPTIONAL_SECTIONS, SECTION_LABELS } from '@/constants/sections'
import type { SectionData } from '@/types'

interface SectionToggleBarProps {
  sections: SectionData[]
  onToggle: (type: SectionData['type'], enabled: boolean) => void
}

export function SectionToggleBar({ sections, onToggle }: SectionToggleBarProps) {
  const activeSectionTypes = new Set(sections.map((s) => s.type))

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[11px] font-semibold text-placeholder uppercase tracking-widest mb-2">Optional sections</p>
      <div className="flex flex-col gap-2">
        {OPTIONAL_SECTIONS.map((sectionType) => (
          <div key={sectionType} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm text-foreground">{SECTION_LABELS[sectionType]}</span>
            <Toggle
              checked={activeSectionTypes.has(sectionType)}
              onChange={(checked) => onToggle(sectionType, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
