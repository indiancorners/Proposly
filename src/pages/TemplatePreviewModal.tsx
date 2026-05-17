import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ProposalRenderer } from '@/renderer/ProposalRenderer'
import { themeRegistry } from '@/constants/themes'
import type { ProposalData, ThemeId } from '@/types'
import { ProposalStatus, ProposalCategory } from '@/types'

// ─── Preview data ─────────────────────────────────────────────────────────────

const PREVIEW_PROPOSALS: Record<ThemeId, ProposalData> = {
  folio: {
    id: 'preview-folio',
    userId: 'preview',
    status: ProposalStatus.Draft,
    category: ProposalCategory.Branding,
    theme: 'folio',
    createdAt: '2026-05-17T00:00:00Z',
    updatedAt: '2026-05-17T00:00:00Z',
    sharedLinkId: null,
    sections: [
      {
        type: 'cover',
        data: {
          projectTitle: 'Brand Identity System',
          clientName: 'Black Ember Coffee Co.',
          studioName: 'Monolith Studio',
          tagline: 'A brand as rich as the coffee.',
          date: 'May 2026',
        },
      },
      {
        type: 'overview',
        data: {
          headline: 'A brand as rich as the coffee.',
          body: 'Black Ember has exceptional beans and a story worth telling — but a brand that disappears on shelf. This project defines a complete visual identity system: from the logo suite to packaging, signage, and a guidelines document that protects the brand as you scale. The result is a brand that earns trust before the first sip.',
        },
      },
      {
        type: 'scope',
        data: {
          header: 'Scope of Work',
          items: [
            { id: 's1', deliverable: 'Brand Strategy Workshop', description: 'Half-day positioning session to define voice, values, and competitive differentiation. Delivered as a brand brief.' },
            { id: 's2', deliverable: 'Logo Suite', description: 'Primary mark, wordmark, monogram, and stacked lockup. Supplied in SVG, AI, and PNG across all colourways.' },
            { id: 's3', deliverable: 'Colour & Type System', description: 'Primary, secondary, and neutral palettes with accessibility specs. Two paired typefaces with usage hierarchy.' },
            { id: 's4', deliverable: 'Packaging Design — 3 SKUs', description: 'Label and pouch design for Espresso Blend, Single Origin Ethiopia, and Cold Brew Concentrate. Print-ready files included.' },
            { id: 's5', deliverable: 'Café Signage Kit', description: 'Interior and exterior signage templates: main fascia, menu board, A-board, and loyalty card.' },
            { id: 's6', deliverable: 'Brand Guidelines PDF', description: '40-page document covering logo usage rules, colour specs, typography, photography direction, and tone of voice.' },
          ],
        },
      },
      {
        type: 'process',
        data: {
          header: 'How We Work',
          steps: [
            { id: 'p1', stepNumber: 1, title: 'Discovery', description: 'Stakeholder interviews, competitor audit, and market positioning. Outputs a brand brief that guides every design decision downstream.' },
            { id: 'p2', stepNumber: 2, title: 'Concept', description: 'Three distinct logo and visual directions presented with rationale. You choose one direction to develop — no Frankenstein hybrids.' },
            { id: 'p3', stepNumber: 3, title: 'Refinement', description: 'Two rounds of revisions on the chosen direction. We fine-tune until the mark is exactly right.' },
            { id: 'p4', stepNumber: 4, title: 'Delivery', description: 'Final files, brand guidelines PDF, and a 30-minute handoff call. You leave with a brand that works from day one.' },
          ],
        },
      },
      {
        type: 'timeline',
        data: {
          header: 'Project Timeline',
          milestones: [
            { id: 'm1', phase: 'Discovery & Strategy', duration: 'Week 1–2', description: 'Brand workshop, competitive audit, brand brief sign-off.' },
            { id: 'm2', phase: 'Concept Development', duration: 'Week 3–4', description: 'Three logo directions, colour and type explorations presented for review.' },
            { id: 'm3', phase: 'Refinement', duration: 'Week 5–6', description: 'Two rounds of revisions on chosen direction, packaging concepts.' },
            { id: 'm4', phase: 'Final Delivery', duration: 'Week 7', description: 'All final files, brand guidelines PDF, handoff call.' },
          ],
        },
      },
      {
        type: 'pricing',
        data: {
          header: 'Investment',
          currency: 'USD',
          items: [
            { id: 'i1', description: 'Brand Strategy Workshop', qty: 1, unitPrice: 3500 },
            { id: 'i2', description: 'Identity Design (logo suite, colour, type)', qty: 1, unitPrice: 6500 },
            { id: 'i3', description: 'Packaging Design — 3 SKUs', qty: 1, unitPrice: 4200 },
            { id: 'i4', description: 'Brand Guidelines PDF', qty: 1, unitPrice: 2800 },
          ],
          notes: '50% due on project commencement. 50% due on final delivery. All files transferred upon receipt of final payment. Signage kit and café templates included at no additional charge.',
        },
      },
      {
        type: 'about',
        data: {
          header: 'About Monolith Studio',
          bio: 'Monolith Studio is a boutique brand and product design studio. We specialise in consumer goods, hospitality, and digital brands — the kind of work where craft matters and every detail has a reason. Nine years, 40+ brands, and a reputation built entirely on referral.',
          team: [
            { id: 't1', name: 'Jatin Kumar', role: 'Creative Director' },
            { id: 't2', name: 'Maya Sinha', role: 'Brand Designer' },
          ],
        },
      },
      {
        type: 'terms',
        data: {
          header: 'Terms & Conditions',
          body: 'A 50% deposit is required before work commences. The remaining balance is due upon delivery of final files. Two rounds of revisions are included in the quoted price; additional revisions are billed at $150/hour. Monolith Studio retains the right to display completed work in its portfolio unless otherwise agreed in writing. Client owns all final delivered assets upon receipt of full payment. Rush delivery (under 3 weeks) incurs a 25% surcharge. This proposal is valid for 30 days from the date of issue.',
        },
      },
    ],
  },

  dusk: {
    id: 'preview-dusk',
    userId: 'preview',
    status: ProposalStatus.Draft,
    category: ProposalCategory.App,
    theme: 'dusk',
    createdAt: '2026-05-17T00:00:00Z',
    updatedAt: '2026-05-17T00:00:00Z',
    sharedLinkId: null,
    sections: [
      {
        type: 'cover',
        data: {
          projectTitle: 'Client Portal Redesign',
          clientName: 'Meridian Capital Partners',
          studioName: 'Monolith Studio',
          tagline: 'Your clients expect discretion. Their digital experience should reflect that.',
          date: 'May 2026',
        },
      },
      {
        type: 'overview',
        data: {
          headline: 'Your clients expect discretion. Their digital experience should reflect that.',
          body: "Meridian's current client portal communicates neither the firm's authority nor the trust it has spent decades building. This engagement redesigns the portal end-to-end — web and iPad — with a design system built to last, a UI that signals premium at first glance, and a handoff that your engineering team can implement without interpretation.",
        },
      },
      {
        type: 'scope',
        data: {
          header: 'Scope of Work',
          items: [
            { id: 's1', deliverable: 'UX Audit', description: 'Heuristic review of the current portal. Identifies friction, hierarchy failures, and trust gaps. Delivered as a prioritised findings report.' },
            { id: 's2', deliverable: 'Information Architecture', description: 'Revised IA for all portal sections: dashboard, portfolio view, documents, reporting, and communications. Navigation logic mapped and approved before design begins.' },
            { id: 's3', deliverable: 'Design System — 48 Components', description: 'Tokens, typography, colour, and 48 production-ready components. Dark theme primary, with all states and variants documented in Figma.' },
            { id: 's4', deliverable: 'Portal Screen Design — 12 Screens', description: 'Full design for all primary portal views: login, dashboard, portfolio overview, position detail, documents, reporting, settings, and notifications.' },
            { id: 's5', deliverable: 'Tablet-Optimised Views', description: 'iPad layout variants for all 12 screens. Responsive breakpoints defined for 11-inch and 12.9-inch Pro.' },
            { id: 's6', deliverable: 'Prototype & Developer Handoff', description: 'Clickable Figma prototype for stakeholder sign-off. Dev Mode annotations, spacing specs, and asset export for engineering.' },
          ],
        },
      },
      {
        type: 'process',
        data: {
          header: 'Our Process',
          steps: [
            { id: 'p1', stepNumber: 1, title: 'Audit & Discovery', description: 'We begin by understanding what exists and what is broken. Heuristic analysis, stakeholder interviews, and a competitive review of best-in-class wealth management portals.' },
            { id: 'p2', stepNumber: 2, title: 'Architecture', description: 'IA and navigation structure defined and approved. No pixel pushed until the architecture is signed off.' },
            { id: 'p3', stepNumber: 3, title: 'Design System', description: 'Tokens and components first. The system underpins every screen — which means changes propagate instantly and engineering has a single source of truth.' },
            { id: 'p4', stepNumber: 4, title: 'Screen Design & Prototype', description: 'Screens designed on top of the system. A fully interactive prototype is delivered for stakeholder review and user testing before final handoff.' },
          ],
        },
      },
      {
        type: 'timeline',
        data: {
          header: 'Project Timeline',
          milestones: [
            { id: 'm1', phase: 'Discovery & Audit', duration: '2 weeks', description: 'UX audit, stakeholder interviews, competitive review, findings report.' },
            { id: 'm2', phase: 'Information Architecture', duration: '1 week', description: 'Navigation structure, IA map, sign-off before design begins.' },
            { id: 'm3', phase: 'Design System', duration: '2 weeks', description: 'Tokens, typography, 48 components across all states and variants.' },
            { id: 'm4', phase: 'Screen Design', duration: '4 weeks', description: '12 screens, web and iPad variants, design reviews at Week 2 and Week 4.' },
            { id: 'm5', phase: 'Prototype & Handoff', duration: '1 week', description: 'Interactive prototype, dev annotations, asset export, handoff call.' },
          ],
        },
      },
      {
        type: 'pricing',
        data: {
          header: 'Investment',
          currency: 'USD',
          items: [
            { id: 'i1', description: 'UX Audit & Strategy', qty: 1, unitPrice: 8000 },
            { id: 'i2', description: 'Design System (48 components)', qty: 1, unitPrice: 14000 },
            { id: 'i3', description: 'Screen Design (12 screens, web + iPad)', qty: 1, unitPrice: 22000 },
            { id: 'i4', description: 'Prototype & Developer Handoff', qty: 1, unitPrice: 6000 },
          ],
          notes: 'Payment in three milestones: 40% on commencement, 30% on design system delivery, 30% on final handoff. NDA available on request. All source files and design system ownership transfer to Meridian Capital Partners upon full payment.',
        },
      },
      {
        type: 'about',
        data: {
          header: 'About Monolith Studio',
          bio: 'Monolith Studio designs digital products for companies where precision and trust are non-negotiable. Our work spans financial services, enterprise SaaS, and regulated industries — environments where good design is a business requirement, not a nicety. We work in small, senior teams. No juniors on your account.',
          team: [
            { id: 't1', name: 'Jatin Kumar', role: 'Product Design Lead' },
            { id: 't2', name: 'Aryan Mehta', role: 'Design Systems Specialist' },
          ],
        },
      },
      {
        type: 'terms',
        data: {
          header: 'Terms & Conditions',
          body: 'Payment is structured across three milestones as outlined in the pricing section. Late payment beyond 14 days incurs a 1.5% monthly fee. Monolith Studio operates under a mutual NDA upon request. Two rounds of revisions are included per deliverable phase; additional revisions are billed at $200/hour. Client retains full ownership of all final deliverables upon receipt of final payment. Source files are excluded from the handoff unless explicitly included in the scope. This proposal is valid for 30 days from the date of issue.',
        },
      },
    ],
  },

  signal: {
    id: 'preview-signal',
    userId: 'preview',
    status: ProposalStatus.Draft,
    category: ProposalCategory.App,
    theme: 'signal',
    createdAt: '2026-05-17T00:00:00Z',
    updatedAt: '2026-05-17T00:00:00Z',
    sharedLinkId: null,
    sections: [
      {
        type: 'cover',
        data: {
          projectTitle: 'iOS App Design — Focus Timer',
          clientName: 'Loom Labs Inc.',
          studioName: 'Monolith Studio',
          tagline: 'Built for the 1% of users who actually want to do less, better.',
          date: 'May 2026',
        },
      },
      {
        type: 'overview',
        data: {
          headline: 'Built for the 1% of users who actually want to do less, better.',
          body: "The productivity app market is full of feature creep and dopamine traps. Loom Labs is betting on the opposite: radical simplicity, intentional friction, and a UI that gets out of the user's way. This engagement designs the full iOS experience — from onboarding through the core focus session to the habits dashboard — with a design system and App Store assets ready for launch.",
        },
      },
      {
        type: 'scope',
        data: {
          header: 'Scope of Work',
          items: [
            { id: 's1', deliverable: 'User Research Synthesis', description: 'Analysis of 15 existing user interviews and competitor teardowns. Outputs a behavioural insight brief and prioritised opportunity map.' },
            { id: 's2', deliverable: 'App IA & User Flows', description: 'Complete information architecture and user flow mapping for all core journeys: onboarding, session creation, active focus, history, and settings.' },
            { id: 's3', deliverable: '28-Screen Design', description: 'Full UI design for all app screens. Includes light mode primary. Every screen annotated with interaction notes.' },
            { id: 's4', deliverable: 'Design System', description: 'iOS-native component library built to HIG standards. Tokens, typography, and component specs ready for Swift implementation.' },
            { id: 's5', deliverable: 'App Store Assets', description: 'App icon (all required sizes), screenshots for iPhone 15 Pro Max (6.7") and iPad, and a promotional banner.' },
            { id: 's6', deliverable: 'Developer Handoff', description: 'Figma Dev Mode annotations, spacing and sizing specs, asset exports, and a 60-minute walkthrough call with your engineering team.' },
          ],
        },
      },
      {
        type: 'process',
        data: {
          header: 'How We Work',
          steps: [
            { id: 'p1', stepNumber: 1, title: 'Research & Insight', description: 'We start with what you already know. Synthesising your existing research is faster and produces sharper insight than starting from scratch.' },
            { id: 'p2', stepNumber: 2, title: 'Architecture First', description: 'Flows and IA before pixels. Approval at this stage prevents expensive design rework later.' },
            { id: 'p3', stepNumber: 3, title: 'System Then Screens', description: 'Design system components are built before screens. Every element is a system element — no one-offs.' },
            { id: 'p4', stepNumber: 4, title: 'Handoff', description: 'Your engineers get annotated specs, a live Figma file, and a walkthrough. No translation required.' },
          ],
        },
      },
      {
        type: 'timeline',
        data: {
          header: 'Project Timeline',
          milestones: [
            { id: 'm1', phase: 'Research Synthesis', duration: '1 week', description: 'User interview analysis, competitor teardowns, insight brief.' },
            { id: 'm2', phase: 'IA & Flows', duration: '1 week', description: 'App architecture, user flows, approval checkpoint.' },
            { id: 'm3', phase: 'Design System', duration: '1.5 weeks', description: 'iOS component library, tokens, typography system.' },
            { id: 'm4', phase: 'Screen Design', duration: '3 weeks', description: '28 screens. Design reviews at end of Week 2 and Week 4.' },
            { id: 'm5', phase: 'App Store & Handoff', duration: '0.5 weeks', description: 'App Store assets, Dev Mode annotations, handoff call.' },
          ],
        },
      },
      {
        type: 'pricing',
        data: {
          header: 'Investment',
          currency: 'USD',
          items: [
            { id: 'i1', description: 'User Research Synthesis', qty: 1, unitPrice: 4000 },
            { id: 'i2', description: 'App IA & User Flows', qty: 1, unitPrice: 5500 },
            { id: 'i3', description: 'Screen Design (28 screens)', qty: 1, unitPrice: 18000 },
            { id: 'i4', description: 'App Store Asset Kit', qty: 1, unitPrice: 1500 },
          ],
          notes: '50% on project start, 50% on final delivery. Design system and all source files included. Expedited timelines available at a 20% surcharge. This quote covers iOS only; Android adaptation available as a separate scope.',
        },
      },
      {
        type: 'about',
        data: {
          header: 'About Monolith Studio',
          bio: 'Monolith Studio designs iOS and Android apps for early-stage and growth-stage startups. We know what Apple reviewers look for, what HIG constraints actually mean in practice, and how to ship a design that engineers can implement without interpretation. We move fast and leave clean files.',
          team: [
            { id: 't1', name: 'Jatin Kumar', role: 'Product Design Lead' },
            { id: 't2', name: 'Priya Nair', role: 'iOS UX Specialist' },
          ],
        },
      },
      {
        type: 'terms',
        data: {
          header: 'Terms & Conditions',
          body: 'A 50% deposit is due before work commences. The remaining balance is due upon delivery of final Figma files. Two rounds of revisions are included per phase; additional revisions are billed at $175/hour. Monolith Studio retains the right to include the completed app in its portfolio. Client owns all delivered assets upon full payment. Android adaptation and dark mode variants are out of scope unless explicitly stated. This proposal is valid for 30 days from the date of issue.',
        },
      },
    ],
  },

  verso: {
    id: 'preview-verso',
    userId: 'preview',
    status: ProposalStatus.Draft,
    category: ProposalCategory.General,
    theme: 'verso',
    createdAt: '2026-05-17T00:00:00Z',
    updatedAt: '2026-05-17T00:00:00Z',
    sharedLinkId: null,
    sections: [
      {
        type: 'cover',
        data: {
          projectTitle: 'Annual Portfolio Monograph',
          clientName: 'Helix Architecture Studio',
          studioName: 'Monolith Studio',
          tagline: 'Architecture is permanent. This book should feel like it.',
          date: 'May 2026',
        },
      },
      {
        type: 'overview',
        data: {
          headline: 'Architecture is permanent. This book should feel like it.',
          body: "Helix has built 18 projects worth documenting. What it doesn't have is a publication that matches their ambition. This monograph changes that — a 120-page A4 hardcover designed for the studio's 10th anniversary, available in a print edition and as a high-fidelity digital PDF. Every spread is considered. Nothing is templated. This is editorial design at the level your work deserves.",
        },
      },
      {
        type: 'scope',
        data: {
          header: 'Scope of Work',
          items: [
            { id: 's1', deliverable: 'Editorial Direction', description: 'Concept, sequencing logic, and narrative structure for all 120 pages. Defines how projects are grouped, introduced, and presented.' },
            { id: 's2', deliverable: 'Grid System & Typography', description: 'Custom grid architecture for text-heavy, image-led, and mixed spreads. Two typeface pairing options presented for approval.' },
            { id: 's3', deliverable: 'Layout Design — 120 Pages', description: 'Full layout for every page: project introductions, full-bleed photography spreads, floor plans, section drawings, and project data pages.' },
            { id: 's4', deliverable: 'Photo Curation Direction', description: 'Sequencing and cropping guidance for all photography. We do not source photography — we direct its use within the layout.' },
            { id: 's5', deliverable: 'Print-Ready PDF', description: 'CMYK, 300 DPI, with bleed and crop marks. Prepared to ISO 12647-2 standards. Sent directly to your printer of choice.' },
            { id: 's6', deliverable: 'Digital PDF Version', description: 'RGB, screen-optimised, with hyperlinked contents. Suitable for website download and email distribution.' },
          ],
        },
      },
      {
        type: 'process',
        data: {
          header: 'Editorial Process',
          steps: [
            { id: 'p1', stepNumber: 1, title: 'Direction', description: 'We define the narrative arc and editorial hierarchy before a single layout is built. A monograph without a point of view is just a catalogue.' },
            { id: 'p2', stepNumber: 2, title: 'Grid & Type', description: 'System-level decisions made first. Grid, margins, typeface, and scale — the invisible architecture that makes every spread feel considered.' },
            { id: 'p3', stepNumber: 3, title: 'Layout', description: 'Spreads designed in batches. Review checkpoints at 40 pages and 80 pages. Final round of corrections before print file preparation.' },
            { id: 'p4', stepNumber: 4, title: 'Production', description: 'Print and digital files prepared, preflight checked, and delivered. We liaise with the printer if required.' },
          ],
        },
      },
      {
        type: 'timeline',
        data: {
          header: 'Production Schedule',
          milestones: [
            { id: 'm1', phase: 'Editorial Direction', duration: '1 week', description: 'Concept, structure, narrative sequencing, and approval.' },
            { id: 'm2', phase: 'Grid & Typography', duration: '1 week', description: 'System design, two typeface options presented, sign-off.' },
            { id: 'm3', phase: 'Layout — First Half', duration: '3 weeks', description: 'Pages 1–60 designed. Review and corrections at end of week 3.' },
            { id: 'm4', phase: 'Layout — Second Half', duration: '3 weeks', description: 'Pages 61–120 designed. Final review and corrections.' },
            { id: 'm5', phase: 'Production & Delivery', duration: '1 week', description: 'Print-ready and digital PDFs prepared, preflight checked, delivered.' },
          ],
        },
      },
      {
        type: 'pricing',
        data: {
          header: 'Investment',
          currency: 'USD',
          items: [
            { id: 'i1', description: 'Editorial Direction & Grid System', qty: 1, unitPrice: 3500 },
            { id: 'i2', description: 'Layout Design (60 spreads × $180)', qty: 60, unitPrice: 180 },
            { id: 'i3', description: 'Cover Design', qty: 1, unitPrice: 2200 },
            { id: 'i4', description: 'Print & Digital Production', qty: 1, unitPrice: 1500 },
          ],
          notes: '50% on commencement, 50% on delivery of final files. Photography sourcing is out of scope. Corrections beyond two rounds per batch are billed at $160/hour. Additional editions (e.g. Japanese translation) quoted separately.',
        },
      },
      {
        type: 'about',
        data: {
          header: 'About Monolith Studio',
          bio: 'Monolith Studio brings editorial rigour to publication design. We work with architecture practices, cultural institutions, and design studios to produce books, monographs, and catalogues that reflect the seriousness of the work they document. Print files that go directly to press, without revision.',
          team: [
            { id: 't1', name: 'Jatin Kumar', role: 'Creative Director' },
            { id: 't2', name: 'Leila Hassan', role: 'Editorial Designer' },
          ],
        },
      },
      {
        type: 'terms',
        data: {
          header: 'Terms & Conditions',
          body: "A 50% deposit is required before the project commences. The remaining 50% is due on delivery of the final print-ready and digital PDF files. Photography must be supplied by the client in high resolution (minimum 300 DPI at print size). Two rounds of corrections are included per layout batch; additional rounds are billed at $160/hour. Monolith Studio retains the right to display two spreads of the completed publication in its portfolio. All layout files are delivered to the client upon full payment. This proposal is valid for 30 days from the date of issue.",
        },
      },
    ],
  },

  cipher: {
    id: 'preview-cipher',
    userId: 'preview',
    status: ProposalStatus.Draft,
    category: ProposalCategory.App,
    theme: 'cipher',
    createdAt: '2026-05-17T00:00:00Z',
    updatedAt: '2026-05-17T00:00:00Z',
    sharedLinkId: null,
    sections: [
      {
        type: 'cover',
        data: {
          projectTitle: 'Dashboard Product Design',
          clientName: 'Parity Finance',
          studioName: 'Monolith Studio',
          tagline: 'Real-time clarity for people who take money seriously.',
          date: 'May 2026',
        },
      },
      {
        type: 'overview',
        data: {
          headline: 'Real-time clarity for people who take money seriously.',
          body: "Personal finance tools fail their most valuable users — the ones who actually want precision. Parity is different: a multi-account aggregator built for people who track every number. This engagement designs the complete dashboard product — component library, 8 core views, dark mode variants, and a token system your engineers can implement from day one. No interpretation required.",
        },
      },
      {
        type: 'scope',
        data: {
          header: 'Scope of Work',
          items: [
            { id: 's1', deliverable: 'Competitive Audit', description: 'Teardown of 6 leading personal finance dashboards. Maps UI patterns, hierarchy conventions, and differentiation opportunities. Delivered as a findings brief.' },
            { id: 's2', deliverable: 'Component Library — 60 Components', description: 'Full design system with design tokens (colour, spacing, radius, shadow), typography scale, and 60 production-ready components with all states and dark mode variants.' },
            { id: 's3', deliverable: 'Dashboard Design — 8 Views', description: 'Net worth overview, account breakdown, transaction feed, budget tracker, investment positions, goals tracker, settings, and onboarding flow.' },
            { id: 's4', deliverable: 'Dark Mode Variants', description: 'Every screen and component supplied in both light and dark mode. Token-based so your engineers implement once and inherit everywhere.' },
            { id: 's5', deliverable: 'API-Ready Design Tokens', description: 'Design tokens exported in JSON, CSS custom properties, and a Figma Variables file. Structured for your API response format.' },
            { id: 's6', deliverable: 'Figma Dev Mode Handoff', description: 'Full Dev Mode annotations, inspect-ready spacing, and a component catalogue your engineering team can implement without a walkthrough.' },
          ],
        },
      },
      {
        type: 'process',
        data: {
          header: 'Our Process',
          steps: [
            { id: 'p1', stepNumber: 1, title: 'Audit & Strategy', description: 'We map the competitive landscape and identify where Parity can lead. Sharp differentiation is a design decision, not a marketing one.' },
            { id: 'p2', stepNumber: 2, title: 'Token System', description: 'Before components, before screens: tokens. Every design decision encoded as a variable so light/dark and future brand updates cost near-zero.' },
            { id: 'p3', stepNumber: 3, title: 'Component Library', description: '60 components built on the token system. Atoms to organisms. Every state, every variant, every dark mode pair.' },
            { id: 'p4', stepNumber: 4, title: 'Screens & Handoff', description: '8 dashboard views built from the component library. Annotated for Dev Mode. Tokens exported in three formats for engineering.' },
          ],
        },
      },
      {
        type: 'timeline',
        data: {
          header: 'Project Timeline',
          milestones: [
            { id: 'm1', phase: 'Audit & Strategy', duration: '1 week', description: 'Competitive teardown, differentiation map, token architecture defined.' },
            { id: 'm2', phase: 'Token System', duration: '1 week', description: 'Colour, spacing, radius, shadow, and typography tokens. Light and dark mode. Sign-off before component work begins.' },
            { id: 'm3', phase: 'Component Library', duration: '3 weeks', description: '60 components, all states, light + dark. Review at Week 2.' },
            { id: 'm4', phase: 'Dashboard Screens', duration: '3 weeks', description: '8 views, light + dark variants. Design reviews at end of Week 2 and Week 4.' },
            { id: 'm5', phase: 'Tokens & Handoff', duration: '1 week', description: 'Token export in 3 formats, Dev Mode annotations, handoff call.' },
          ],
        },
      },
      {
        type: 'pricing',
        data: {
          header: 'Investment',
          currency: 'USD',
          items: [
            { id: 'i1', description: 'Audit & Strategy', qty: 1, unitPrice: 5000 },
            { id: 'i2', description: 'Component Library (60 components, light + dark)', qty: 1, unitPrice: 16000 },
            { id: 'i3', description: 'Dashboard Screens (8 views, light + dark)', qty: 1, unitPrice: 20000 },
            { id: 'i4', description: 'Design Tokens & Developer Handoff', qty: 1, unitPrice: 4000 },
          ],
          notes: 'Payment in three milestones: 40% on commencement, 30% on component library delivery, 30% on final handoff. Mobile (iOS/Android) responsive variants are out of scope. Additional screens can be added at $2,500 per screen. This quote is valid for 30 days.',
        },
      },
      {
        type: 'about',
        data: {
          header: 'About Monolith Studio',
          bio: 'Monolith Studio builds design systems and product UI for fintech, SaaS, and data-heavy applications. We understand token architecture, engineering constraints, and what it takes to ship a component library that actually gets used. Our handoffs do not require interpretation. We have worked in regulated environments and understand the precision those products demand.',
          team: [
            { id: 't1', name: 'Jatin Kumar', role: 'Product Design Lead' },
            { id: 't2', name: 'Karan Joshi', role: 'Design Systems Engineer' },
          ],
        },
      },
      {
        type: 'terms',
        data: {
          header: 'Terms & Conditions',
          body: 'Payment is structured across three milestones as detailed in the pricing section. Late payment beyond 14 days incurs a 1.5% monthly charge. Two rounds of revisions are included per deliverable phase; additional revisions are billed at $200/hour. Mobile variants, additional screens, and animation specs are out of scope unless explicitly included. Monolith Studio retains the right to include this work in its portfolio. Client owns all final deliverables and source files upon receipt of full payment. This proposal is valid for 30 days from the date of issue.',
        },
      },
    ],
  },
}

// ─── Templates ordered array ──────────────────────────────────────────────────

const TEMPLATE_ORDER: ThemeId[] = ['folio', 'dusk', 'signal', 'verso', 'cipher']

// ─── Component ────────────────────────────────────────────────────────────────

interface TemplatePreviewModalProps {
  isOpen: boolean
  initialThemeId: ThemeId
  onClose: () => void
}

export function TemplatePreviewModal({ isOpen, initialThemeId, onClose }: TemplatePreviewModalProps) {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(() => TEMPLATE_ORDER.indexOf(initialThemeId))
  const [slideDir, setSlideDir] = useState<1 | -1>(1)

  // Sync initialThemeId when it changes (user clicks different template thumbnail)
  useEffect(() => {
    const idx = TEMPLATE_ORDER.indexOf(initialThemeId)
    setActiveIndex(idx === -1 ? 0 : idx)
  }, [initialThemeId])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const activeThemeId = TEMPLATE_ORDER[activeIndex]
  const activeTheme = themeRegistry[activeThemeId]
  const activeProposal = PREVIEW_PROPOSALS[activeThemeId]

  const goNext = useCallback(() => {
    setSlideDir(1)
    setActiveIndex((i) => (i + 1) % TEMPLATE_ORDER.length)
  }, [])

  const goPrev = useCallback(() => {
    setSlideDir(-1)
    setActiveIndex((i) => (i - 1 + TEMPLATE_ORDER.length) % TEMPLATE_ORDER.length)
  }, [])

  const handleUseTemplate = () => {
    onClose()
    navigate('/app/create')
  }

  const contentVariants = {
    enter: (dir: number) => ({ x: dir * 20, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -20, opacity: 0 }),
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.88)',
              zIndex: 50,
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '4vh',
              left: '4vw',
              width: '92vw',
              height: '92vh',
              background: '#0D0D0F',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              overflow: 'hidden',
              zIndex: 51,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* HEADER */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '56px',
              padding: '0 24px',
              background: '#0D0D0F',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
            }}>
              {/* Left: template name + tier badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>
                  {activeTheme.name}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  padding: '3px 8px',
                  borderRadius: '20px',
                  background: activeTheme.tier === 'free' ? 'rgba(48,209,88,0.15)' : 'rgba(255,255,255,0.09)',
                  color: activeTheme.tier === 'free' ? '#30D158' : 'rgba(255,255,255,0.4)',
                }}>
                  {activeTheme.tier === 'free' ? 'FREE' : 'PRO'}
                </span>
              </div>

              {/* Center: counter */}
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                {activeIndex + 1} / {TEMPLATE_ORDER.length}
              </span>

              {/* Right: nav + close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={goPrev}
                  aria-label="Previous template"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next template"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)', margin: '0 4px' }} />
                <button
                  onClick={onClose}
                  aria-label="Close preview"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '32px 0',
            }}>
              <div style={{ maxWidth: '794px', margin: '0 auto', padding: '0 24px' }}>
                <AnimatePresence mode="wait" custom={slideDir}>
                  <motion.div
                    key={activeThemeId}
                    custom={slideDir}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <ProposalRenderer proposal={activeProposal} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* FOOTER */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '48px',
              padding: '0 24px',
              background: 'rgba(0,0,0,0.6)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                Template {activeIndex + 1} of {TEMPLATE_ORDER.length}
              </span>
              <button
                onClick={handleUseTemplate}
                style={{
                  height: '32px',
                  padding: '0 16px',
                  borderRadius: '20px',
                  background: 'white',
                  color: '#0D0D0F',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                Use this template →
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
