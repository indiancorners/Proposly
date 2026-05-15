interface SectionHeaderProps {
  label?: string
  heading: string
  isInverted?: boolean
}

export function SectionHeader({ label, heading, isInverted }: SectionHeaderProps) {
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
