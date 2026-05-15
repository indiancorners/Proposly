import { SectionHeader } from '../SectionHeader'
import type { CaseStudiesData } from '@/types'

interface CaseStudiesSectionProps {
  data: CaseStudiesData
  isInverted?: boolean
}

export function CaseStudiesSection({ data, isInverted }: CaseStudiesSectionProps) {
  const textColor = isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-primary)'
  const mutedColor = isInverted ? 'rgba(255,255,255,0.6)' : 'var(--t-text-secondary)'

  return (
    <div className="p-12">
      <SectionHeader label="Portfolio" heading={data.header || 'Case Studies'} isInverted={isInverted} />
      <div className="flex flex-col gap-8">
        {data.entries.map((entry) => (
          <div key={entry.id} className="border-t pt-6" style={{ borderColor: isInverted ? 'rgba(255,255,255,0.12)' : 'var(--t-rule)' }}>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-base font-bold" style={{ color: textColor }}>{entry.projectName}</h3>
              <span className="text-sm" style={{ color: 'var(--t-accent-text)' }}>{entry.client}</span>
            </div>
            <p className="text-sm mb-3" style={{ color: mutedColor }}>{entry.description}</p>
            {entry.outcome && (
              <p className="text-sm font-semibold" style={{ color: textColor }}>
                Outcome: <span style={{ color: mutedColor }}>{entry.outcome}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
