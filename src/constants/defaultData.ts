import type { ProposalData, ProposalSummary, SectionData } from '@/types'
import { ProposalStatus, ProposalCategory } from '@/types'
import { CATEGORY_SECTION_DEFAULTS, DEFAULT_TERMS } from './sections'

let idCounter = 1
const uid = () => `mock-${idCounter++}-${Math.random().toString(36).slice(2, 7)}`

export function createEmptySections(category: ProposalCategory): SectionData[] {
  const types = CATEGORY_SECTION_DEFAULTS[category]
  return types.map((type) => {
    switch (type) {
      case 'cover':
        return { type: 'cover', data: { projectTitle: '', clientName: '', studioName: '', tagline: '', date: new Date().toISOString().split('T')[0] } }
      case 'overview':
        return { type: 'overview', data: { headline: '', body: '' } }
      case 'scope':
        return { type: 'scope', data: { header: 'Scope of Work', items: [{ id: uid(), deliverable: '', description: '' }] } }
      case 'timeline':
        return { type: 'timeline', data: { header: 'Project Timeline', milestones: [{ id: uid(), phase: 'Phase 1', duration: '2 weeks', description: '' }] } }
      case 'pricing':
        return { type: 'pricing', data: { header: 'Investment', items: [{ id: uid(), description: '', qty: 1, unitPrice: 0 }], currency: 'USD', notes: '' } }
      case 'about':
        return { type: 'about', data: { header: 'About Us', bio: '', team: [] } }
      case 'case_studies':
        return { type: 'case_studies', data: { header: 'Case Studies', entries: [] } }
      case 'process':
        return { type: 'process', data: { header: 'Our Process', steps: [{ id: uid(), stepNumber: 1, title: '', description: '' }] } }
      case 'terms':
        return { type: 'terms', data: { header: 'Terms & Conditions', body: DEFAULT_TERMS } }
      default:
        throw new Error(`Unknown section type: ${type}`)
    }
  })
}

export function createEmptyProposal(userId: string = 'mock-user'): ProposalData {
  return {
    id: uid(),
    userId,
    status: ProposalStatus.Draft,
    category: ProposalCategory.General,
    theme: 'folio',
    sections: createEmptySections(ProposalCategory.General),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sharedLinkId: null,
  }
}

export function createMockProposals(): ProposalSummary[] {
  return [
    {
      id: 'p1',
      projectTitle: 'Brand Identity System',
      clientName: 'Acme Corp',
      totalValue: 12000,
      status: ProposalStatus.Won,
      theme: 'folio',
      category: ProposalCategory.Branding,
      createdAt: '2026-04-20T10:00:00Z',
      updatedAt: '2026-04-25T14:30:00Z',
      sharedLinkId: 'sl-abc123',
    },
    {
      id: 'p2',
      projectTitle: 'Mobile App — MVP',
      clientName: 'StartupXYZ',
      totalValue: 28500,
      status: ProposalStatus.Sent,
      theme: 'signal',
      category: ProposalCategory.App,
      createdAt: '2026-05-01T09:00:00Z',
      updatedAt: '2026-05-02T11:00:00Z',
      sharedLinkId: 'sl-def456',
    },
    {
      id: 'p3',
      projectTitle: 'E-commerce Redesign',
      clientName: 'RetailBrand',
      totalValue: 18000,
      status: ProposalStatus.Draft,
      theme: 'dusk',
      category: ProposalCategory.Website,
      createdAt: '2026-05-10T08:00:00Z',
      updatedAt: '2026-05-10T08:00:00Z',
      sharedLinkId: null,
    },
    {
      id: 'p4',
      projectTitle: 'Full Brand + Web',
      clientName: 'NewCo',
      totalValue: 35000,
      status: ProposalStatus.Lost,
      theme: 'cipher',
      category: ProposalCategory.General,
      createdAt: '2026-04-10T12:00:00Z',
      updatedAt: '2026-04-15T09:00:00Z',
      sharedLinkId: null,
    },
    {
      id: 'p5',
      projectTitle: 'Design System',
      clientName: 'TechFlow',
      totalValue: 22000,
      status: ProposalStatus.Sent,
      theme: 'verso',
      category: ProposalCategory.Branding,
      createdAt: '2026-05-05T10:00:00Z',
      updatedAt: '2026-05-06T16:00:00Z',
      sharedLinkId: 'sl-ghi789',
    },
  ]
}
