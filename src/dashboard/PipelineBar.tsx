import type { PipelineCounts } from '@/types'

const segments = [
  { key: 'won'   as const, color: '#16A34A', label: 'Won' },
  { key: 'sent'  as const, color: '#D97706', label: 'Sent' },
  { key: 'draft' as const, color: '#D2D2D7', label: 'Draft' },
  { key: 'lost'  as const, color: '#DC2626', label: 'Lost' },
]

export function PipelineBar({ pipeline }: { pipeline: PipelineCounts }) {
  const total = Object.values(pipeline).reduce((a, b) => a + b, 0)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-1.5 rounded-full overflow-hidden gap-[2px]">
        {total === 0 ? (
          <div className="w-full rounded-full" style={{ background: '#E8E8ED' }} />
        ) : (
          segments.map((seg) => {
            const pct = (pipeline[seg.key] / total) * 100
            if (pct === 0) return null
            return (
              <div
                key={seg.key}
                style={{ width: `${pct}%`, background: seg.color }}
                title={`${seg.label}: ${pipeline[seg.key]}`}
              />
            )
          })
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {segments.map((seg) => (
          <div key={seg.key} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: seg.color }} />
            <span className="text-[11px]" style={{ color: '#6E6E73' }}>
              {seg.label}{' '}
              <span style={{ color: '#1D1D1F', fontWeight: 600 }}>{pipeline[seg.key]}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
