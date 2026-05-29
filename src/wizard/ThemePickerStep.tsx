import { themeList } from '@/constants/themes'
import { ThemeCard } from './ThemeCard'
import type { ThemeId } from '@/types'

interface ThemePickerStepProps {
  selected: ThemeId
  isPro: boolean
  onSelect: (themeId: ThemeId) => void
}

export function ThemePickerStep({ selected, isPro, onSelect }: ThemePickerStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground" style={{ letterSpacing: '-0.02em' }}>Choose a template</h2>
        <p className="text-sm text-muted mt-1">
          1 free template. 4 Pro templates. Each is pixel-perfect.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {themeList.map((theme) => (
          <ThemeCard
            key={theme.id}
            themeId={theme.id}
            selected={selected === theme.id}
            locked={theme.tier === 'pro' && !isPro}
            onSelect={() => {
              if (theme.tier === 'free' || isPro) {
                onSelect(theme.id)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
