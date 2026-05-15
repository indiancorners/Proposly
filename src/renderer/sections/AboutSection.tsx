import { SectionHeader } from '../SectionHeader'
import type { AboutData } from '@/types'

interface AboutSectionProps {
  data: AboutData
  isInverted?: boolean
}

export function AboutSection({ data, isInverted }: AboutSectionProps) {
  const textColor = isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-primary)'
  const mutedColor = isInverted ? 'rgba(255,255,255,0.6)' : 'var(--t-text-secondary)'

  return (
    <div className="p-12">
      <SectionHeader label="About" heading={data.header || 'About Us'} isInverted={isInverted} />
      <p className="text-base leading-relaxed mb-8 whitespace-pre-wrap" style={{ color: mutedColor }}>
        {data.bio || 'Introduce your studio, your approach, and why you are the right partner for this project.'}
      </p>
      {data.team.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--t-accent-text)' }}>Team</p>
          <div className="flex flex-col gap-2">
            {data.team.map((member) => (
              <div key={member.id} className="flex items-baseline gap-3">
                <span className="text-sm font-semibold" style={{ color: textColor }}>{member.name}</span>
                <span className="text-sm" style={{ color: mutedColor }}>{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
