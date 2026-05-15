import { SectionHeader } from '../SectionHeader'
import type { OverviewData } from '@/types'

interface OverviewSectionProps {
  data: OverviewData
  isInverted?: boolean
}

export function OverviewSection({ data, isInverted }: OverviewSectionProps) {
  return (
    <div className="p-12">
      <SectionHeader label="Overview" heading={data.headline || 'Project Overview'} isInverted={isInverted} />
      <p
        className="text-base leading-relaxed whitespace-pre-wrap"
        style={{ color: isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-secondary)' }}
      >
        {data.body || 'Describe the project goals, challenges, and the value you bring to the engagement.'}
      </p>
    </div>
  )
}
