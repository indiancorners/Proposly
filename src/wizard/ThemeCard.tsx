import { clsx } from 'clsx'
import type { ThemeId } from '@/types'
import { themeRegistry } from '@/constants/themes'
import { ProBadge } from '@/ui/ProBadge'
import { ThemePreviewThumbnail } from './ThemePreviewThumbnail'
import { ProGateOverlay } from './ProGateOverlay'
import { Check } from 'lucide-react'

interface ThemeCardProps {
  themeId: ThemeId
  selected: boolean
  locked: boolean
  onSelect: () => void
}

export function ThemeCard({ themeId, selected, locked, onSelect }: ThemeCardProps) {
  const theme = themeRegistry[themeId]

  return (
    <button
      onClick={onSelect}
      className={clsx(
        'relative flex flex-col gap-2 p-2 rounded-2xl border-2 text-left transition-all duration-150',
        selected
          ? 'border-accent shadow-md'
          : 'border-border hover:border-border-strong hover:shadow-sm'
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden rounded-xl">
        <ThemePreviewThumbnail themeId={themeId} />
        {locked && <ProGateOverlay feature={`${theme?.name} template`} />}
        {selected && !locked && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
            <Check className="h-3.5 w-3.5 text-white" />
          </div>
        )}
      </div>
      {/* Info */}
      <div className="px-1 pb-1">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-sm font-semibold text-foreground">{theme?.name}</span>
          {theme?.tier === 'pro' ? <ProBadge /> : <span className="text-xs text-success font-medium">Free</span>}
        </div>
        <p className="text-xs text-muted">{theme?.description}</p>
      </div>
    </button>
  )
}
