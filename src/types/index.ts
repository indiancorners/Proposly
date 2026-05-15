// ─── Enums ────────────────────────────────────────────────────────────────────

export enum ProposalStatus {
  Draft = 'draft',
  Sent = 'sent',
  Won = 'won',
  Lost = 'lost',
}

export enum ProposalCategory {
  Branding = 'branding',
  App = 'app',
  Website = 'website',
  General = 'general',
}

// ─── Theme ────────────────────────────────────────────────────────────────────

export type ThemeId = 'folio' | 'dusk' | 'signal' | 'verso' | 'cipher'

export interface ThemeConfig {
  id: ThemeId
  name: string
  tier: 'free' | 'pro'
  description: string
  cssVars: Record<string, string>
  hasAlternatingSections: boolean
  hasWatermark: boolean
}

// ─── Section Types ─────────────────────────────────────────────────────────────

export type SectionType =
  | 'cover'
  | 'overview'
  | 'scope'
  | 'timeline'
  | 'pricing'
  | 'about'
  | 'case_studies'
  | 'process'
  | 'terms'

// ─── Section Data ─────────────────────────────────────────────────────────────

export interface CoverData {
  projectTitle: string
  clientName: string
  studioName: string
  tagline: string
  date: string
}

export interface OverviewData {
  headline: string
  body: string
}

export interface ScopeItem {
  id: string
  deliverable: string
  description: string
}

export interface ScopeData {
  header: string
  items: ScopeItem[]
}

export interface Milestone {
  id: string
  phase: string
  duration: string
  description: string
}

export interface TimelineData {
  header: string
  milestones: Milestone[]
}

export interface PricingLineItem {
  id: string
  description: string
  qty: number
  unitPrice: number
}

export interface PricingData {
  header: string
  items: PricingLineItem[]
  currency: string
  notes: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
}

export interface AboutData {
  header: string
  bio: string
  team: TeamMember[]
}

export interface CaseStudyEntry {
  id: string
  projectName: string
  client: string
  description: string
  outcome: string
}

export interface CaseStudiesData {
  header: string
  entries: CaseStudyEntry[]
}

export interface ProcessStep {
  id: string
  stepNumber: number
  title: string
  description: string
}

export interface ProcessData {
  header: string
  steps: ProcessStep[]
}

export interface TermsData {
  header: string
  body: string
}

export type SectionData =
  | { type: 'cover'; data: CoverData }
  | { type: 'overview'; data: OverviewData }
  | { type: 'scope'; data: ScopeData }
  | { type: 'timeline'; data: TimelineData }
  | { type: 'pricing'; data: PricingData }
  | { type: 'about'; data: AboutData }
  | { type: 'case_studies'; data: CaseStudiesData }
  | { type: 'process'; data: ProcessData }
  | { type: 'terms'; data: TermsData }

// ─── Proposal ─────────────────────────────────────────────────────────────────

export interface ProposalData {
  id: string
  userId: string
  status: ProposalStatus
  category: ProposalCategory
  theme: ThemeId
  sections: SectionData[]
  createdAt: string
  updatedAt: string
  sharedLinkId?: string | null
}

export interface ProposalSummary {
  id: string
  projectTitle: string
  clientName: string
  totalValue: number
  status: ProposalStatus
  theme: ThemeId
  category: ProposalCategory
  createdAt: string
  updatedAt: string
  sharedLinkId?: string | null
}

// ─── User / Profile ────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string
  email: string
  isPro: boolean
  studioName: string
  defaultCurrency: string
  defaultTerms: string
  createdAt: string
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface PipelineCounts {
  draft: number
  sent: number
  won: number
  lost: number
}

export interface DashboardStats {
  totalProposals: number
  sharedCount: number
  totalValue: number
  pipeline: PipelineCounts
}

// ─── Share Link ───────────────────────────────────────────────────────────────

export interface SharedLink {
  id: string
  proposalId: string
  viewCount: number
  createdAt: string
  expiresAt?: string | null
}

// ─── Wizard ───────────────────────────────────────────────────────────────────

export interface WizardStep {
  id: 1 | 2 | 3
  label: string
}
