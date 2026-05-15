import type { CoverData } from '@/types'

interface CoverSectionProps {
  data: CoverData
}

export function CoverSection({ data }: CoverSectionProps) {
  return (
    <div
      className="w-full min-h-[300px] flex flex-col justify-between p-12"
      style={{ background: 'var(--t-cover-bg)' }}
    >
      <div>
        <p
          className="text-sm font-semibold uppercase tracking-[0.15em] mb-1"
          style={{ color: 'var(--t-cover-accent)', opacity: 0.7 }}
        >
          {data.studioName || 'Studio Name'}
        </p>
      </div>
      <div>
        <h1
          className="text-5xl font-extrabold leading-tight mb-3"
          style={{ color: 'var(--t-cover-text)' }}
        >
          {data.projectTitle || 'Project Title'}
        </h1>
        {data.tagline && (
          <p
            className="text-lg font-light mb-8"
            style={{ color: 'var(--t-cover-text)', opacity: 0.7 }}
          >
            {data.tagline}
          </p>
        )}
        <div className="flex flex-col gap-1">
          <p className="text-sm" style={{ color: 'var(--t-cover-accent)' }}>
            Prepared for
          </p>
          <p
            className="text-xl font-semibold"
            style={{ color: 'var(--t-cover-text)' }}
          >
            {data.clientName || 'Client Name'}
          </p>
          <p
            className="text-sm mt-2"
            style={{ color: 'var(--t-cover-text)', opacity: 0.5 }}
          >
            {data.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}
