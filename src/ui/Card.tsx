import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'subtle' | 'elevated'
}

const variants = {
  surface: 'bg-surface border border-border shadow-sm',
  subtle: 'bg-subtle',
  elevated: 'bg-surface border border-border shadow-md',
}

export function Card({ variant = 'surface', className, children, ...props }: CardProps) {
  return (
    <div className={clsx('rounded-xl p-4', variants[variant], className)} {...props}>
      {children}
    </div>
  )
}
