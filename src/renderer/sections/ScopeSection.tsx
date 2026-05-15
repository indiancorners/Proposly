import { SectionHeader } from '../SectionHeader'
import type { ScopeData } from '@/types'

interface ScopeSectionProps {
  data: ScopeData
  isInverted?: boolean
}

export function ScopeSection({ data, isInverted }: ScopeSectionProps) {
  return (
    <div className="p-12">
      <SectionHeader label="Scope" heading={data.header || 'Scope of Work'} isInverted={isInverted} />
      <div className="flex flex-col gap-4">
        {data.items.length === 0 ? (
          <p className="text-sm" style={{ color: isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-secondary)' }}>
            Add deliverables to your scope of work.
          </p>
        ) : (
          data.items.map((item, i) => (
            <div
              key={item.id}
              className="flex gap-4 py-3 border-b"
              style={{ borderColor: isInverted ? 'rgba(255,255,255,0.12)' : 'var(--t-rule)' }}
            >
              <div
                className="text-sm font-bold w-8 flex-shrink-0 pt-0.5"
                style={{ color: 'var(--t-accent-text)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-primary)' }}
                >
                  {item.deliverable || 'Deliverable'}
                </p>
                {item.description && (
                  <p
                    className="text-sm mt-1"
                    style={{ color: isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-secondary)', opacity: isInverted ? 0.7 : 1 }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
