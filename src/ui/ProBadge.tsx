import { clsx } from 'clsx'

interface ProBadgeProps {
  className?: string
}

export function ProBadge({ className }: ProBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold',
        'bg-gradient-to-r from-accent to-purple-600 text-white',
        className
      )}
    >
      PRO
    </span>
  )
}
