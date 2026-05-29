import { SECTION_LABELS } from '@/constants/sections'
import { CoverForm } from './forms/CoverForm'
import { OverviewForm } from './forms/OverviewForm'
import { ScopeForm } from './forms/ScopeForm'
import { TimelineForm } from './forms/TimelineForm'
import { PricingForm } from './forms/PricingForm'
import { AboutForm } from './forms/AboutForm'
import { CaseStudiesForm } from './forms/CaseStudiesForm'
import { ProcessForm } from './forms/ProcessForm'
import { TermsForm } from './forms/TermsForm'
import type { SectionData, SectionType } from '@/types'
import { useState } from 'react'
import { clsx } from 'clsx'

interface SectionFormPanelProps {
  sections: SectionData[]
  onUpdate: (type: SectionType, data: SectionData['data']) => void
}

export function SectionFormPanel({ sections, onUpdate }: SectionFormPanelProps) {
  const [activeType, setActiveType] = useState<SectionType>(sections[0]?.type ?? 'cover')

  const activeSection = sections.find((s) => s.type === activeType) ?? sections[0]

  function renderForm(section: SectionData) {
    switch (section.type) {
      case 'cover':
        return <CoverForm data={section.data} onChange={(d) => onUpdate('cover', d)} />
      case 'overview':
        return <OverviewForm data={section.data} onChange={(d) => onUpdate('overview', d)} />
      case 'scope':
        return <ScopeForm data={section.data} onChange={(d) => onUpdate('scope', d)} />
      case 'timeline':
        return <TimelineForm data={section.data} onChange={(d) => onUpdate('timeline', d)} />
      case 'pricing':
        return <PricingForm data={section.data} onChange={(d) => onUpdate('pricing', d)} />
      case 'about':
        return <AboutForm data={section.data} onChange={(d) => onUpdate('about', d)} />
      case 'case_studies':
        return <CaseStudiesForm data={section.data} onChange={(d) => onUpdate('case_studies', d)} />
      case 'process':
        return <ProcessForm data={section.data} onChange={(d) => onUpdate('process', d)} />
      case 'terms':
        return <TermsForm data={section.data} onChange={(d) => onUpdate('terms', d)} />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex gap-1 flex-wrap mb-4">
        {sections.map((s) => (
          <button
            key={s.type}
            onClick={() => setActiveType(s.type)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              activeType === s.type
                ? 'bg-foreground text-white'
                : 'text-muted hover:bg-subtle hover:text-foreground'
            )}
          >
            {SECTION_LABELS[s.type]}
          </button>
        ))}
      </div>
      {/* Active form */}
      <div className="flex-1 overflow-auto">
        {activeSection && renderForm(activeSection)}
      </div>
    </div>
  )
}
