import { themeRegistry } from '@/constants/themes'
import type { ThemeId } from '@/types'

export function useThemeVars(themeId: ThemeId): Record<string, string> {
  return themeRegistry[themeId]?.cssVars ?? {}
}
