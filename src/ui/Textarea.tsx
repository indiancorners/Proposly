import { type TextareaHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-semibold text-muted uppercase tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'px-3 py-2 rounded-lg border text-sm bg-white text-foreground placeholder:text-placeholder resize-none',
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
Textarea.displayName = 'Textarea'
