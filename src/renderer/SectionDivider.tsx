interface SectionDividerProps {
  isInverted?: boolean
}

export function SectionDivider({ isInverted }: SectionDividerProps) {
  return (
    <div
      className="h-px my-10 w-full"
      style={{ background: isInverted ? 'rgba(255,255,255,0.15)' : 'var(--t-rule)' }}
    />
  )
}
