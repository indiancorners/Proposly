import { useThemeCtx, useSectionIndex } from './ThemeContext'

interface SectionHeaderProps {
  label?: string
  heading: string
  isInverted?: boolean
}

export function SectionHeader({ label, heading, isInverted }: SectionHeaderProps) {
  const { layoutVariant } = useThemeCtx()
  const sectionIndex = useSectionIndex()

  if (layoutVariant === 'bauhaus') {
    const ghostNum = String(sectionIndex).padStart(2, '0')
    if (isInverted) {
      return (
        <div className="mb-8 relative" style={{ textAlign: 'right' }}>
          {label && (
            <p
              className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {label}
            </p>
          )}
          <h2
            className="leading-tight"
            style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#FFFFFF' }}
          >
            {heading}
          </h2>
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '2rem',
              bottom: '-1rem',
              fontSize: 140,
              fontWeight: 900,
              lineHeight: 1,
              color: '#FFFFFF',
              opacity: 0.06,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {ghostNum}
          </span>
        </div>
      )
    }
    return (
      <div className="mb-8 relative" style={{ textAlign: 'left' }}>
        {label && (
          <p
            className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2"
            style={{ color: '#111111' }}
          >
            {label}
          </p>
        )}
        <h2
          className="leading-tight pb-2"
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#111111',
            borderBottom: '2px solid #111111',
            display: 'inline-block',
          }}
        >
          {heading}
        </h2>
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '2rem',
            bottom: '-1rem',
            fontSize: 140,
            fontWeight: 900,
            lineHeight: 1,
            color: '#111111',
            opacity: 0.05,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {ghostNum}
        </span>
      </div>
    )
  }

  return (
    <div className="mb-8">
      {label && (
        <p
          className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2"
          style={{ color: isInverted ? 'var(--t-text-inverse)' : 'var(--t-accent-text)' }}
        >
          {label}
        </p>
      )}
      <h2
        className="text-3xl font-bold leading-tight"
        style={{ color: isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-primary)' }}
      >
        {heading}
      </h2>
      <div
        className="mt-4 h-px w-16"
        style={{ background: isInverted ? 'var(--t-text-inverse)' : 'var(--t-rule)' }}
      />
    </div>
  )
}
