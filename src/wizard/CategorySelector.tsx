import { clsx } from 'clsx'
import { Sparkles, Smartphone, Globe, LayoutGrid } from 'lucide-react'
import type { ComponentType } from 'react'
import type { ProposalCategory } from '@/types'
import { ProposalCategory as Cat } from '@/types'

const CATEGORIES: { value: ProposalCategory; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { value: Cat.Branding, label: 'Branding', icon: Sparkles },
  { value: Cat.App, label: 'App / Product', icon: Smartphone },
  { value: Cat.Website, label: 'Website', icon: Globe },
  { value: Cat.General, label: 'General', icon: LayoutGrid },
]

interface CategorySelectorProps {
  value: ProposalCategory
  onChange: (category: ProposalCategory) => void
}

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold text-placeholder uppercase tracking-widest">Proposal category</p>
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((cat) => {
          const active = value === cat.value
          return (
            <button
              key={cat.value}
              onClick={() => onChange(cat.value)}
              className={clsx(
                'flex items-center gap-2 px-3 h-11 rounded-xl border text-left transition-all',
                active
                  ? 'border-foreground bg-foreground text-white'
                  : 'border-border bg-surface text-muted hover:border-border-strong hover:text-foreground'
              )}
            >
              <cat.icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-[12px] font-semibold truncate">{cat.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
