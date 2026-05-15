import { SectionHeader } from '../SectionHeader'
import type { TermsData } from '@/types'

interface TermsSectionProps {
  data: TermsData
  isInverted?: boolean
}

export function TermsSection({ data, isInverted }: TermsSectionProps) {
  const mutedColor = isInverted ? 'rgba(255,255,255,0.6)' : 'var(--t-text-secondary)'

  return (
    <div className="p-12">
      <SectionHeader label="Legal" heading={data.header || 'Terms & Conditions'} isInverted={isInverted} />
      <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: mutedColor }}>
        {data.body}
      </p>
    </div>
  )
}
