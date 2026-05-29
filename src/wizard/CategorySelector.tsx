import { clsx } from 'clsx'
import type { ProposalCategory } from '@/types'
import { ProposalCategory as Cat } from '@/types'

const CATEGORIES: { value: ProposalCategory; label: string; emoji: string }[] = [
  { value: Cat.Branding, label: 'Branding', emoji: '✦' },
  { value: Cat.App, label: 'App / Product', emoji: '◈' },
  { value: Cat.Website, label: 'Website', emoji: '◻' },
  { value: Cat.General, label: 'General', emoji: '◎' },
]

interface CategorySelectorProps {
  value: ProposalCategory
  onChange: (category: ProposalCategory) => void
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold text-muted uppercase tracking-wide">Proposal Category</p>
      <div className="flex gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={clsx(
              'flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border text-sm font-medium transition-colors',
              value === cat.value
                ? 'border-foreground bg-subtle text-foreground'
                : 'border-border bg-surface text-muted hover:border-border-strong hover:text-foreground'
            )}
          >
            <span className="text-base">{cat.emoji}</span>
            <span className="text-xs">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
