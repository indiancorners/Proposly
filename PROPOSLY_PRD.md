# Proposly — Product Requirements Document
**v1.0 · 15 May 2026 · Owner: Jatin Kumar / Monolith Studio**

---

## 1. What It Is

Proposly is a premium proposal generator for agencies, freelancers, and design studios. It replaces Word/Docs with a structured smart form → live preview → one-click PDF workflow. Built as a Monolith Studio product. Not a fork of anything.

**Core value prop:** Agency-grade proposals in under 5 minutes. Zero formatting time.

---

## 2. Who It Is For

**Primary:** Independent designers, design studios, freelance agencies (1–10 people)  
**Secondary:** Consultants, strategists, creative directors pitching project work  
**Not for:** Enterprise sales teams, large agencies with custom tooling

---

## 3. Monetization

| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 forever | 1 proposal · Folio template only · no export · no share |
| Pro | $20 one-time (lifetime) | Unlimited proposals · all templates · PDF/PNG export · share links |

Payment processor: **Lemon Squeezy** (webhook flips `is_premium = true` in Supabase).

---

## 4. Tech Stack (Locked)

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React 19 + Vite 6 + TypeScript 5.8 | Fresh scaffold, not a fork |
| Styling | Tailwind CSS v4 (CSS-first, `@theme`) | No JS config file |
| Font | Open Sans 300/400/600/700/800 | Google Fonts, loaded in index.html |
| Auth | Clerk (`@clerk/clerk-react` v5) | JWT mapped to Supabase `sub` claim |
| Database | Supabase PostgreSQL | RLS enforced via Clerk JWT |
| Payments | Lemon Squeezy | $20 one-time product |
| Export | html2canvas + jsPDF | A4 794×1123px at 2x scale |
| Animations | Framer Motion v12 (`motion/react`) | |
| Icons | Lucide React | |
| Routing | React Router v7 | `createBrowserRouter` |

---

## 5. Design System

**Aesthetic:** Light primary throughout. Apple/Notion-esque. Not dark. Not brutalist.  
**Background:** `#FAFAFA` · **Surface:** `#FFFFFF` · **Accent:** `#2563EB`

### App Color Tokens (`@theme` in CSS)
```
--color-base:          #FAFAFA   (page background)
--color-surface:       #FFFFFF   (cards, panels)
--color-subtle:        #F4F4F5   (sidebar, input fills)
--color-overlay:       #E4E4E7   (hover, dividers)
--color-border:        #E4E4E7
--color-border-strong: #D1D1D6
--color-foreground:    #111118   (primary text)
--color-muted:         #52525B   (secondary text)
--color-placeholder:   #A1A1AA   (tertiary / placeholders)
--color-accent:        #2563EB   (CTA blue)
--color-accent-dark:   #1D4ED8
--color-accent-light:  #EFF6FF
--color-success:       #16A34A   (Won)
--color-warning:       #D97706   (Sent)
--color-danger:        #DC2626   (Lost / errors)
--color-neutral:       #71717A   (Draft)
```

### Typography Scale (Open Sans)
| Token | Size | Weight | Use |
|-------|------|--------|-----|
| display | 48–60px | 800 | Landing hero |
| h1 | 36px | 700 | Page headings |
| h2 | 28px | 700 | Section headings |
| h3 | 22px | 600 | Card headings |
| body-lg | 17px | 400 | Descriptions |
| body | 15px | 400 | Standard |
| label | 12px | 600 | Form labels (uppercase) |
| caption | 11px | 400 | Timestamps, footnotes |

### Spacing
Base: **4px**. Multiples: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

---

## 6. The 5 Templates (Locked)

| # | ID | Name | Tier | BG | Accent | Unique Element |
|---|----|------|------|-----|--------|----------------|
| 1 | `folio` | Folio | **Free** | `#FAF8F3` cream | `#D4C9BB` warm sand | Hairline rules under section headers |
| 2 | `dusk` | Dusk | Pro | `#111014` dark | `#D4952A` amber gold | Section numbers as `— 01 —` |
| 3 | `signal` | Signal | Pro | `#FFFFFF` | `#007AFF` iOS blue | Scope items in `#F2F2F7` rounded blocks |
| 4 | `verso` | Verso | Pro | Alt white/`#111111` | `#111111` rules | Alternating black section break pages |
| 5 | `cipher` | Cipher | Pro | `#FAFAFA` | `#635BFF` Stripe purple | Ghost watermark at 4% opacity |

**Template system:** Each template is a `ThemeConfig` object in `src/constants/themes.ts` with `cssVars: Record<string, string>` injected inline on the proposal root. Components consume `var(--t-*)` custom properties. Two structural flags: `hasAlternatingSections` (Verso) and `hasWatermark` (Cipher).

---

## 7. Proposal Structure

### Section Types (9 total)
| Type | Core? | Label |
|------|-------|-------|
| `cover` | ✓ | Cover |
| `overview` | ✓ | Overview |
| `scope` | ✓ | Scope of Work |
| `pricing` | ✓ | Investment |
| `terms` | ✓ | Terms & Conditions |
| `timeline` | Optional | Timeline |
| `about` | Optional | About Us |
| `case_studies` | Optional | Case Studies |
| `process` | Optional | Our Process |

### Category Presets
| Category | Default Sections |
|----------|-----------------|
| Branding | cover, overview, scope, pricing, about, terms |
| App | cover, overview, scope, timeline, pricing, terms |
| Website | cover, overview, scope, timeline, pricing, process, terms |
| General | all 9 sections |

---

## 8. Routes

```
/                        LandingPage              (public)
/share/:linkId           PublicProposalView        (public, no auth)
/app                     DashboardPage             (private)
/app/create              WizardPage — new          (private)
/app/edit/:id            WizardPage — edit         (private)
/app/settings            SettingsPage              (private)
/app/upgrade             UpgradePage               (private)
/app/upgrade/success     UpgradeSuccessPage        (private)
```

**AuthGuard:** Phase 1 = stub (always passes). Phase 3 = Clerk `useAuth()`.

---

## 9. Create Flow (Wizard — 3 Steps)

1. **Step 1 — Theme:** Grid of 5 template cards with SVG mini-previews. Pro templates locked + blurred for free users.
2. **Step 2 — Form:** Category pills → section tabs auto-populated from category defaults. Per-section: editable header + body + type-specific inputs (dynamic lists for scope/milestones, pricing table for investment). Optional section toggles in sidebar.
3. **Step 3 — Review:** Full A4 proposal preview. Action panel: PDF download / PNG download (Pro) / Share link (Pro) / Save.

**No AI in MVP.** Smart form = pre-suggested editable headers + structured inputs.

---

## 10. Dashboard

- **Stats row (4 tiles):** Total proposals · Total pipeline value · Proposals shared · Pipeline bar (Draft/Sent/Won/Lost proportional)
- **Filters:** Status pill tabs + search by title/client
- **Proposal grid:** Cards with title, client, value, status badge, template tag, last updated
- **Card menu:** Edit / Duplicate / Change Status / Delete

---

## 11. Database Schema (Supabase)

```sql
-- profiles: linked to Clerk user_id (string)
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  studio_name TEXT DEFAULT '',
  default_currency TEXT DEFAULT 'USD',
  default_terms TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- proposals: full content as JSONB
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','sent','won','lost')),
  category TEXT NOT NULL DEFAULT 'general',
  theme TEXT NOT NULL DEFAULT 'folio',
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- shared_links: public view slugs
CREATE TABLE shared_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);
```

RLS on all tables. Public read policy on `shared_links` for `/share/:linkId`. Auto-update trigger on `proposals.updated_at`.

**Clerk + Supabase JWT:** Clerk JWT template must map `sub → sub`. Supabase RLS: `auth.uid()::text = user_id::text`.

---

## 12. PDF Export Logic

```
forExport=true on ProposalRenderer:
  → disable Framer Motion animations
  → fix container to 794px width
  → html2canvas(ref, { scale: 2, width: 794, useCORS: true })
  → pages = Math.ceil(canvas.height / 1123)   // A4 at 96dpi
  → jsPDF: slice canvas into 1123px pages
  → save as "[ProjectTitle]-[ClientName].pdf"
```

PNG: same capture → `canvas.toBlob('image/png')` → download.

---

## 13. Build Phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Full UI shell — all screens, mock data, no persistence | ✅ Done (15 May 2026) |
| 2 | Supabase CRUD — real proposals, auto-save | Pending |
| 3 | Clerk auth — real auth, RLS enforced, user profiles | Pending |
| 4 | PDF/PNG export — html2canvas + jsPDF, multi-page | Pending |
| 5 | Lemon Squeezy — payment flow, Pro gating live | Pending |
| 6 | Share links — public `/share/:linkId`, view count | Pending |
| 7 | Stats + polish — animated tiles, settings persist, E2E | Pending |

---

## 14. Source File Map

```
src/
├── types/index.ts               — all TypeScript contracts
├── constants/
│   ├── themes.ts                — themeRegistry (5 ThemeConfig objects)
│   ├── sections.ts              — CATEGORY_SECTION_DEFAULTS, DEFAULT_TERMS
│   └── defaultData.ts           — createEmptyProposal(), createMockProposals()
├── lib/
│   ├── supabase.ts              — Supabase client (Phase 3: add Clerk JWT)
│   ├── exportService.ts         — exportToPDF(), exportToPNG() (Phase 4)
│   └── lemonsqueezy.ts          — generateCheckoutUrl() (Phase 5)
├── hooks/
│   ├── useWizardStore.ts        — wizard state machine (most complex)
│   ├── useProposals.ts          — dashboard proposal list
│   ├── useProposal.ts           — single proposal (edit route)
│   ├── useDashboardStats.ts     — derived stats from proposals[]
│   ├── useProposlyPro.ts        — isPro, isAtLimit, canExport, canShare
│   └── useThemeVars.ts          — cssVars for a ThemeId
├── themes/
│   └── getThemeClasses.ts       — structural Tailwind classes per theme
├── renderer/
│   ├── ProposalRenderer.tsx     — root: applies theme vars, renders sections
│   ├── ProposalPage.tsx         — A4 container + watermark layer
│   ├── SectionHeader.tsx
│   ├── SectionDivider.tsx
│   └── sections/               — 9 section components
├── wizard/
│   ├── ThemePickerStep.tsx
│   ├── FormStep.tsx
│   ├── ReviewStep.tsx
│   ├── ThemeCard.tsx + ThemePreviewThumbnail.tsx
│   ├── CategorySelector.tsx
│   ├── SectionToggleBar.tsx
│   ├── SectionFormPanel.tsx
│   ├── ExportPanel.tsx
│   ├── ProGateOverlay.tsx
│   ├── forms/                  — 9 section form components
│   └── fields/                 — DynamicListField, PricingLineItem
├── dashboard/                  — StatsTileGrid, ProposalGrid, filters, cards
├── layouts/                    — RootLayout, AppLayout, PublicLayout, AuthGuard
├── ui/                         — Button, Input, Textarea, Badge, Card, Modal, etc.
└── pages/                      — DashboardPage, WizardPage, LandingPage, etc.
```
