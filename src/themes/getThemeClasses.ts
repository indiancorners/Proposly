import type { ThemeId, SectionType } from '@/types'

interface ThemeClasses {
  sectionWrapper: string
  sectionNumber: string
  priceRow: string
  scopeItem: string
}

export function getThemeClasses(themeId: ThemeId, _sectionType?: SectionType): ThemeClasses {
  switch (themeId) {
    case 'dusk':
      return {
        sectionWrapper: '',
        sectionNumber: 'font-mono text-[var(--t-accent)] text-sm tracking-widest',
        priceRow: 'border-b border-[var(--t-border)] last:border-0',
        scopeItem: 'rounded-lg bg-[var(--t-bg-secondary)] p-3',
      }
    case 'signal':
      return {
        sectionWrapper: '',
        sectionNumber: '',
        priceRow: 'border-b border-[var(--t-border)] last:border-0',
        scopeItem: 'rounded-xl bg-[var(--t-bg-secondary)] p-3',
      }
    case 'verso':
      return {
        sectionWrapper: '',
        sectionNumber: '',
        priceRow: 'border-b border-[var(--t-rule)] last:border-0',
        scopeItem: 'border-l-2 border-[var(--t-accent)] pl-3',
      }
    case 'cipher':
      return {
        sectionWrapper: '',
        sectionNumber: '',
        priceRow: 'border-b border-[var(--t-border)] last:border-0',
        scopeItem: 'border border-[var(--t-border)] rounded-lg p-3',
      }
    case 'folio':
    default:
      return {
        sectionWrapper: '',
        sectionNumber: '',
        priceRow: 'border-b border-[var(--t-rule)] last:border-0',
        scopeItem: '',
      }
  }
}
