import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal, Pencil, Copy, Trash2, ArrowRightLeft } from 'lucide-react'
import { ProposalStatus } from '@/types'
import type { ProposalSummary } from '@/types'
import { useNavigate } from 'react-router-dom'

interface ProposalCardMenuProps {
  proposal: ProposalSummary
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: ProposalStatus) => void
}

const STATUS_OPTIONS = [
  { value: ProposalStatus.Draft, label: 'Draft' },
  { value: ProposalStatus.Sent,  label: 'Sent' },
  { value: ProposalStatus.Won,   label: 'Won' },
  { value: ProposalStatus.Lost,  label: 'Lost' },
]

export function ProposalCardMenu({ proposal, onDelete, onStatusChange }: ProposalCardMenuProps) {
  const [open, setOpen] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setShowStatus(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
        className="p-1.5 rounded-lg transition-colors"
        style={{ color: '#86868B' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#F5F5F7'
          e.currentTarget.style.color = '#1D1D1F'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#86868B'
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-8 z-20 w-44 bg-white rounded-2xl py-1.5"
          style={{
            border: '1px solid #D2D2D7',
            boxShadow: '0 8px 30px rgba(0,0,0,0.10)',
          }}
        >
          {[
            {
              icon: Pencil,
              label: 'Edit',
              onClick: () => { navigate(`/app/edit/${proposal.id}`); setOpen(false) },
            },
            {
              icon: ArrowRightLeft,
              label: 'Change Status',
              onClick: () => setShowStatus(!showStatus),
            },
            {
              icon: Copy,
              label: 'Duplicate',
              onClick: () => setOpen(false),
            },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-[13px] transition-colors"
              style={{ color: '#1D1D1F' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F5F7')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={item.onClick}
            >
              <item.icon className="h-3.5 w-3.5" style={{ color: '#86868B' }} />
              {item.label}
            </button>
          ))}

          {showStatus && (
            <div style={{ borderTop: '1px solid #D2D2D7' }} className="py-1">
              {STATUS_OPTIONS.filter((s) => s.value !== proposal.status).map((s) => (
                <button
                  key={s.value}
                  className="w-full px-5 py-1.5 text-left text-[12px] transition-colors"
                  style={{ color: '#6E6E73' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F5F5F7'
                    e.currentTarget.style.color = '#1D1D1F'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#6E6E73'
                  }}
                  onClick={() => { onStatusChange(proposal.id, s.value); setOpen(false) }}
                >
                  → {s.label}
                </button>
              ))}
            </div>
          )}

          <div style={{ borderTop: '1px solid #D2D2D7' }} className="pt-1">
            <button
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-[13px] transition-colors"
              style={{ color: '#DC2626' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={() => { onDelete(proposal.id); setOpen(false) }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
