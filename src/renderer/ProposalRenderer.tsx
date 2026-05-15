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
import { themeRegistry } from '@/constants/themes'
import type { ProposalData, SectionData, ThemeId } from '@/types'
import { forwardRef } from 'react'

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

export const ProposalRenderer = forwardRef<HTMLDivElement, ProposalRendererProps>(
  ({ proposal, forExport }, ref) => {
    const theme = themeRegistry[proposal.theme as ThemeId]

    return (
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

          return (
            <div
              key={section.type}
              style={
                isInverted
                  ? { background: 'var(--t-bg-secondary)' }
                  : {}
              }
            >
              {renderSection(section, isInverted)}
              {!isLast && section.type !== 'cover' && (
                <SectionDivider isInverted={isInverted} />
              )}
            </div>
          )
        })}
      </ProposalPage>
    )
  }
)
ProposalRenderer.displayName = 'ProposalRenderer'
