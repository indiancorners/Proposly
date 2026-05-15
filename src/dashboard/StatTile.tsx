import type { ReactNode } from 'react'

interface StatTileProps {
  label: string
  value: string | number
  sub?: string
  icon?: ReactNode
}

export function StatTile({ label, value, sub, icon }: StatTileProps) {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-3"
      style={{ border: '1px solid #D2D2D7' }}
    >
      <div className="flex items-center justify-between">
        <p
          className="uppercase font-semibold tracking-widest"
          style={{ fontSize: '11px', color: '#86868B' }}
        >
          {label}
        </p>
        {icon && <span style={{ color: '#86868B' }}>{icon}</span>}
      </div>
      <p
        className="font-bold leading-none"
        style={{ fontSize: '32px', letterSpacing: '-0.03em', color: '#1D1D1F' }}
      >
        {value}
      </p>
      {sub && (
        <p className="text-[12px]" style={{ color: '#6E6E73' }}>
          {sub}
        </p>
      )}
    </div>
  )
}
