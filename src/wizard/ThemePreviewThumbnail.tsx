import type { ThemeId } from '@/types'
import { themeRegistry } from '@/constants/themes'

interface ThemePreviewThumbnailProps {
  themeId: ThemeId
}

export function ThemePreviewThumbnail({ themeId }: ThemePreviewThumbnailProps) {
  const theme = themeRegistry[themeId]
  const vars = theme?.cssVars ?? {}

  const coverBg = vars['--t-cover-bg'] ?? '#111'
  const coverText = vars['--t-cover-text'] ?? '#fff'
  const bgPrimary = vars['--t-bg-primary'] ?? '#fafafa'
  const accent = vars['--t-accent'] ?? '#2563eb'
  const accentText = vars['--t-accent-text'] ?? accent
  const rule = vars['--t-rule'] ?? '#e4e4e7'
  const textSecondary = vars['--t-text-secondary'] ?? '#52525b'

  return (
    <div
      className="w-full aspect-[3/4] rounded-lg overflow-hidden border border-border flex flex-col shadow-sm"
      style={{ background: bgPrimary }}
    >
      {/* Cover mock */}
      <div
        className="h-2/5 flex flex-col justify-end p-3"
        style={{ background: coverBg }}
      >
        <div className="h-1 w-10 rounded mb-1.5" style={{ background: coverText, opacity: 0.9 }} />
        <div className="h-0.5 w-6 rounded" style={{ background: coverText, opacity: 0.4 }} />
      </div>
      {/* Content mock */}
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="h-0.5 w-full rounded" style={{ background: rule }} />
        <div className="flex gap-1 items-center">
          <div className="h-1 w-6 rounded" style={{ background: accentText }} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-1 w-full rounded" style={{ background: textSecondary, opacity: 0.3 }} />
          <div className="h-1 w-4/5 rounded" style={{ background: textSecondary, opacity: 0.3 }} />
          <div className="h-1 w-3/5 rounded" style={{ background: textSecondary, opacity: 0.3 }} />
        </div>
        <div className="flex justify-between items-center mt-auto pt-2" style={{ borderTop: `1px solid ${rule}` }}>
          <div className="h-1 w-10 rounded" style={{ background: textSecondary, opacity: 0.4 }} />
          <div className="h-2 w-12 rounded" style={{ background: accent, opacity: 0.9 }} />
        </div>
      </div>
    </div>
  )
}
