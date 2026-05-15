import { SectionHeader } from '../SectionHeader'
import type { TimelineData } from '@/types'

interface TimelineSectionProps {
  data: TimelineData
  isInverted?: boolean
}

export function TimelineSection({ data, isInverted }: TimelineSectionProps) {
  const textColor = isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-primary)'
  const mutedColor = isInverted ? 'rgba(255,255,255,0.6)' : 'var(--t-text-secondary)'

  return (
    <div className="p-12">
      <SectionHeader label="Timeline" heading={data.header || 'Project Timeline'} isInverted={isInverted} />
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: isInverted ? 'rgba(255,255,255,0.2)' : 'var(--t-rule)' }} />
        <div className="flex flex-col gap-8 pl-12">
          {data.milestones.map((m) => (
            <div key={m.id} className="relative">
              <div
                className="absolute -left-8 top-1 w-2.5 h-2.5 rounded-full border-2"
                style={{ background: 'var(--t-bg-surface)', borderColor: 'var(--t-accent)' }}
              />
              <div className="flex items-baseline gap-3 mb-1">
                <p className="text-sm font-bold" style={{ color: textColor }}>{m.phase}</p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: isInverted ? 'rgba(255,255,255,0.1)' : 'var(--t-bg-secondary)', color: mutedColor }}
                >
                  {m.duration}
                </span>
              </div>
              {m.description && (
                <p className="text-sm" style={{ color: mutedColor }}>{m.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
