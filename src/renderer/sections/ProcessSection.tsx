import { SectionHeader } from '../SectionHeader'
import type { ProcessData } from '@/types'

interface ProcessSectionProps {
  data: ProcessData
  isInverted?: boolean
}

export function ProcessSection({ data, isInverted }: ProcessSectionProps) {
  const textColor = isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-primary)'
  const mutedColor = isInverted ? 'rgba(255,255,255,0.6)' : 'var(--t-text-secondary)'

  return (
    <div className="p-12">
      <SectionHeader label="Process" heading={data.header || 'Our Process'} isInverted={isInverted} />
      <div className="flex flex-col gap-6">
        {data.steps.map((step) => (
          <div key={step.id} className="flex gap-5">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: isInverted ? 'rgba(255,255,255,0.1)' : 'var(--t-bg-secondary)', color: 'var(--t-accent-text)' }}
            >
              {step.stepNumber}
            </div>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: textColor }}>{step.title || `Step ${step.stepNumber}`}</p>
              <p className="text-sm" style={{ color: mutedColor }}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
