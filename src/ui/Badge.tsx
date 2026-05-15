import { clsx } from 'clsx'
import type { ProposalStatus } from '@/types'

type BadgeVariant = ProposalStatus | 'pro' | 'free' | 'neutral'

const styles: Record<BadgeVariant, string> = {
  draft: 'bg-subtle text-muted border border-border',
  sent: 'bg-amber-50 text-amber-800 border border-amber-200',
  won: 'bg-green-50 text-green-800 border border-green-200',
  lost: 'bg-red-50 text-red-700 border border-red-200',
  pro: 'bg-accent text-white',
  free: 'bg-subtle text-muted border border-border',
  neutral: 'bg-subtle text-muted border border-border',
}

const labels: Record<BadgeVariant, string> = {
  draft: 'Draft',
  sent: 'Sent',
  won: 'Won',
  lost: 'Lost',
  pro: 'Pro',
  free: 'Free',
  neutral: '',
}

interface BadgeProps {
  variant: BadgeVariant
  label?: string
  className?: string
}

export function Badge({ variant, label, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold',
        styles[variant],
        className
      )}
    >
      {label ?? labels[variant]}
    </span>
  )
}
