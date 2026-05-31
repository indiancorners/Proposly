import { CoverSection } from './sections/CoverSection'
import { OverviewSection } from './sections/OverviewSection'
import { ScopeSection } from './sections/ScopeSection'
import { TimelineSection } from './sections/TimelineSection'
import { PricingSection } from './sections/PricingSection'
import { AboutSection } from './sections/AboutSection'
import { CaseStudiesSection } from './sections/CaseStudiesSection'
import { ProcessSection } from './sections/ProcessSection'
import { TermsSection } from './sections/TermsSection'
import { SectionDivider } from './SectionDivider'
import { ProposalPage } from './ProposalPage'
import { ThemeContext, SectionContext } from './ThemeContext'
import { themeRegistry } from '@/constants/themes'
import type { ProposalData, SectionData, ThemeId } from '@/types'
import { forwardRef, memo, type CSSProperties } from 'react'

interface ProposalRendererProps {
  proposal: ProposalData
  forExport?: boolean
}

function renderSection(section: SectionData, isInverted: boolean) {
  switch (section.type) {
    case 'cover':
      return <CoverSection data={section.data} />
    case 'overview':
      return <OverviewSection data={section.data} isInverted={isInverted} />
    case 'scope':
      return <ScopeSection data={section.data} isInverted={isInverted} />
    case 'timeline':
      return <TimelineSection data={section.data} isInverted={isInverted} />
    case 'pricing':
      return <PricingSection data={section.data} isInverted={isInverted} />
    case 'about':
      return <AboutSection data={section.data} isInverted={isInverted} />
    case 'case_studies':
      return <CaseStudiesSection data={section.data} isInverted={isInverted} />
    case 'process':
      return <ProcessSection data={section.data} isInverted={isInverted} />
    case 'terms':
      return <TermsSection data={section.data} isInverted={isInverted} />
    default:
      return null
  }
}

export const ProposalRenderer = memo(forwardRef<HTMLDivElement, ProposalRendererProps>(
  ({ proposal, forExport }, ref) => {
    const theme = themeRegistry[proposal.theme as ThemeId]

    return (
      <ThemeContext.Provider value={{ layoutVariant: theme?.layoutVariant ?? 'default' }}>
        <ProposalPage
          ref={ref}
          themeId={proposal.theme as ThemeId}
          forExport={forExport}
          watermarkText="PROPOSLY"
        >
          {proposal.sections.map((section, index) => {
            const isInverted =
              theme?.hasAlternatingSections && index % 2 === 1
            const isLast = index === proposal.sections.length - 1
            const isBauhaus = theme?.layoutVariant === 'bauhaus'

            const sectionStyle: CSSProperties = isInverted
              ? {
                  background: 'var(--t-bg-secondary)',
                  ...(isBauhaus && { position: 'relative', overflow: 'hidden' }),
                }
              : {
                  ...(isBauhaus && index !== 0 && { position: 'relative', overflow: 'hidden' }),
                }

            return (
              <SectionContext.Provider key={section.type} value={{ index }}>
                <div style={sectionStyle}>
                  {renderSection(section, isInverted)}
                  {!isLast && section.type !== 'cover' && (
                    <SectionDivider isInverted={isInverted} />
                  )}
                </div>
              </SectionContext.Provider>
            )
          })}
        </ProposalPage>
      </ThemeContext.Provider>
    )
  }
))
ProposalRenderer.displayName = 'ProposalRenderer'
