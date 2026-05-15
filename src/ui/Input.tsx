import { type InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-semibold text-muted uppercase tracking-wide">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'h-9 px-3 rounded-lg border text-sm bg-white text-foreground placeholder:text-placeholder',
            'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors',
            error ? 'border-danger' : 'border-border',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
