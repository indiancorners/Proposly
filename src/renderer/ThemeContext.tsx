import { createContext, useContext } from 'react'
import type { LayoutVariant } from '@/types'

interface ThemeCtx {
  layoutVariant: LayoutVariant
}

const ThemeContext = createContext<ThemeCtx>({ layoutVariant: 'default' })
const SectionContext = createContext<{ index: number }>({ index: 0 })

export const useThemeCtx = () => useContext(ThemeContext)
export const useSectionIndex = () => useContext(SectionContext).index
export { ThemeContext, SectionContext }
