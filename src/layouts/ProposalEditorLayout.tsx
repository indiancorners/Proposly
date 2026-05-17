import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface ProposalEditorLayoutProps {
  children: ReactNode
  isSaving?: boolean
  stepIndicator?: ReactNode
}

export function ProposalEditorLayout({ children, isSaving, stepIndicator }: ProposalEditorLayoutProps) {
  return (
    <div className="flex flex-col h-dvh">
      {/* Editor top bar */}
      <header className="h-14 flex-shrink-0 flex items-center justify-between px-6 bg-surface border-b border-border">
        <div className="flex items-center gap-4">
          <Link
            to="/app"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          {stepIndicator}
        </div>
        {isSaving && (
          <p className="text-xs text-muted animate-pulse">Saving…</p>
        )}
      </header>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
