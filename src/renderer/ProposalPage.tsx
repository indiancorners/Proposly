import { forwardRef, type ReactNode } from 'react'
import type { ThemeId } from '@/types'
import { themeRegistry } from '@/constants/themes'

interface ProposalPageProps {
  themeId: ThemeId
  forExport?: boolean
  children: ReactNode
  watermarkText?: string
}

export const ProposalPage = forwardRef<HTMLDivElement, ProposalPageProps>(
  ({ themeId, forExport, children, watermarkText }, ref) => {
    const theme = themeRegistry[themeId]
    const cssVars = theme?.cssVars ?? {}

    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{
          ...Object.fromEntries(Object.entries(cssVars)),
          width: forExport ? '794px' : '100%',
          minHeight: forExport ? '1123px' : 'auto',
          background: 'var(--t-bg-primary)',
          fontFamily: '"Open Sans", ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {theme?.hasWatermark && watermarkText && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ opacity: 0.04, fontSize: '120px', fontWeight: 800, color: 'var(--t-accent)', zIndex: 0 }}
            aria-hidden
          >
            {watermarkText}
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </div>
    )
  }
)
ProposalPage.displayName = 'ProposalPage'
