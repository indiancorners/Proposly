import type { SectionType, ProposalCategory } from '@/types'

export const CORE_SECTIONS: SectionType[] = ['cover', 'overview', 'scope', 'pricing', 'terms']

export const OPTIONAL_SECTIONS: SectionType[] = [
  'timeline',
  'about',
  'case_studies',
  'process',
]

export const CATEGORY_SECTION_DEFAULTS: Record<ProposalCategory, SectionType[]> = {
  branding: ['cover', 'overview', 'scope', 'pricing', 'about', 'terms'],
  app: ['cover', 'overview', 'scope', 'timeline', 'pricing', 'terms'],
  website: ['cover', 'overview', 'scope', 'timeline', 'pricing', 'process', 'terms'],
  general: ['cover', 'overview', 'scope', 'timeline', 'pricing', 'about', 'case_studies', 'process', 'terms'],
}

export const SECTION_LABELS: Record<SectionType, string> = {
  cover: 'Cover',
  overview: 'Overview',
  scope: 'Scope of Work',
  timeline: 'Timeline',
  pricing: 'Investment',
  about: 'About Us',
  case_studies: 'Case Studies',
  process: 'Our Process',
  terms: 'Terms & Conditions',
}

export const SECTION_DESCRIPTIONS: Record<SectionType, string> = {
  cover: 'Project name, client, and date',
  overview: 'Project summary and objectives',
  scope: 'Deliverables and what\'s included',
  timeline: 'Phases, milestones, and deadlines',
  pricing: 'Line items and total investment',
  about: 'Studio bio and team credentials',
  case_studies: 'Portfolio and past work examples',
  process: 'How you work and what to expect',
  terms: 'Payment terms, IP, revisions',
}

export const DEFAULT_TERMS = `PAYMENT TERMS
A 50% deposit is required to begin work. The remaining 50% is due upon project completion before final files are delivered.

REVISIONS
This proposal includes up to 3 rounds of revisions per deliverable. Additional revisions are billed at the agreed hourly rate.

INTELLECTUAL PROPERTY
All intellectual property created under this agreement transfers to the client upon receipt of final payment.

CONFIDENTIALITY
Both parties agree to maintain confidentiality of any proprietary information shared during the project.

CANCELLATION
Should the client choose to cancel the project after work has begun, the deposit is non-refundable. Any work completed beyond the deposit will be invoiced at the agreed rate.`
