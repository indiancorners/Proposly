# PROJECT.md — Proposly
**Monolith Studio Internal Product · v1.0 · 15 May 2026**

---

## Product Identity

| Field | Value |
|-------|-------|
| Product name | Proposly |
| Type | SaaS web app (desktop-first) |
| Owner | Jatin Kumar / Monolith Studio |
| Context | Studio B — Monolith Studio internal product |
| Target user | Independent designers, agencies, freelance studios |
| Monetization | Free ($0 forever) + Pro ($20 one-time lifetime) |
| Payment processor | Lemon Squeezy |
| Revenue model | One-time lifetime purchase. No subscriptions. |
| Revenue target | Part of $50K/mo studio goal |

---

## Locked Product Decisions

These are not up for revision without an explicit re-decision session.

| Decision | What | Why |
|----------|------|-----|
| Design mode | Light primary throughout | Apple/Notion-esque — premium, not dark/brutalist |
| Font | Open Sans (300/400/600/700/800) | Humanist, agency-legible, free |
| Create flow UX | Smart form (no AI for MVP) | Editable headers + body + pricing table. AI adds complexity without clear MVP win. |
| Mobile | Desktop-first, mobile-readable | Building proposals requires real screen estate. Mobile builder adds 30% complexity. |
| Pro price | $20 lifetime | Low friction, high-intent. No subscription fatigue. |
| Proposal storage | Sections as ordered array (JSONB in Supabase) | Enables drag-reorder, future section additions without schema migration |
| Auth | Clerk | Best DX for solo dev. JWT → Supabase RLS via `sub` claim. |
| Payments | Lemon Squeezy | Simple webhook, lifetime products supported natively |
| State management | React Context + local hooks | No Zustand/Redux needed. ProposlyContext for Pro status; useWizardStore for wizard. |
| Categories | Branding / App / Website / General | Drives section defaults. General = all sections. |
| Sections | 9 types total (5 core, 4 optional) | See PROPOSLY_PRD.md §7 |
| Templates | 5 (1 free: Folio, 4 pro) | Folio is the default free. Cipher has watermark. Verso has alternating sections. |
| Export | html2canvas + jsPDF | A4 794×1123px, 2x scale. Phase 4 implementation. |

---

## Design System Quick Ref

**Accent:** `#2563EB` · **Background:** `#FAFAFA` · **Surface:** `#FFFFFF`  
**Success (Won):** `#16A34A` · **Warning (Sent):** `#D97706` · **Danger (Lost):** `#DC2626`  
**Font:** Open Sans · **Tailwind:** v4 CSS-first (`@theme` block, no JS config)

Full token list: `PROPOSLY_PRD.md §5`  
Template specs: `PROPOSLY_PRD.md §6`

---

## Build Status

| Phase | Scope | Status | Date |
|-------|-------|--------|------|
| 1 — UI Shell | All screens, mock data, no persistence | ✅ Complete | 15 May 2026 |
| 2 — Supabase CRUD | Real proposals, auto-save | ⬜ Pending | — |
| 3 — Clerk Auth | Real auth, RLS, user profiles | ⬜ Pending | — |
| 4 — PDF Export | html2canvas + jsPDF, multi-page A4 | ⬜ Pending | — |
| 5 — Lemon Squeezy | Payment, Pro gating live | ⬜ Pending | — |
| 6 — Share Links | Public `/share/:linkId`, view count | ⬜ Pending | — |
| 7 — Stats + Polish | Animated tiles, settings persist, E2E | ⬜ Pending | — |

---

## Phase 1 Smoke Test Checklist

Run before calling Phase 1 done and starting Phase 2.

**Automated (confirmed 15 May 2026):**
- [x] No TypeScript errors (`tsc --noEmit`) — clean
- [x] Production build passes (`npm run build`) — 1716 modules, 4.00s, no errors
- [x] Dev server responds 200 (`http://localhost:5174/`)

**Manual UI checks (open `http://localhost:5174/` and verify):**
- [ ] All routes navigate without 404
- [ ] Landing page: hero, templates section, how it works, pricing all render
- [ ] Wizard Step 1: all 5 templates visible, free label on Folio, Pro lock on others
- [ ] Wizard Step 2: all category pills work, sections update, forms accept input
- [ ] Wizard Step 3: proposal preview renders, all 5 templates apply correct colors
- [ ] Dashboard: stat tiles show correct counts/values from mock data
- [ ] Dashboard: pipeline bar proportional segments render
- [ ] Dashboard: filter tabs and search work on mock proposals
- [ ] Card menu: status change, delete work on mock data
- [ ] Settings page: inputs render, save button shows confirmation
- [ ] Upgrade page: feature list, $20 price, checkout button render

---

## Open Decisions / Blockers

| Item | Status | Notes |
|------|--------|-------|
| Supabase project URL + anon key | Pending | Needed for Phase 2. Create at supabase.com. |
| Clerk publishable key | Pending | Needed for Phase 3. Create at clerk.com. |
| Lemon Squeezy store + product IDs | Pending | Needed for Phase 5. |
| Custom domain | TBD | proposly.io? proposly.app? Check availability. |
| Vercel deployment | Phase 7 | Deploy on first passing E2E suite. |
| Favicon / brand mark | TBD | Simple wordmark or logomark. |
| CLAUDE.md in project root | Done | Present for this project |

---

## Key Files

| File | Purpose |
|------|---------|
| `PROPOSLY_PRD.md` | Full product spec, tech stack, schema, build phases |
| `PROJECT.md` | This file — build status, decisions, blockers |
| `APP_PROPOSAL.md` | Reusable app proposal template (Monolith Studio clients) |
| `src/types/index.ts` | All TypeScript contracts |
| `src/constants/themes.ts` | ThemeConfig for all 5 templates |
| `src/constants/sections.ts` | Category defaults, section labels, DEFAULT_TERMS |
| `src/hooks/useWizardStore.ts` | Wizard state machine (most complex hook) |
| `src/renderer/ProposalRenderer.tsx` | Root renderer — applies theme vars, renders sections |
| `src/layouts/AuthGuard.tsx` | Stub in Phase 1, wire Clerk in Phase 3 |

---

## Architecture Decisions (Context for Future Sessions)

**Theme system:** CSS custom properties (`--t-*` vars) injected inline on `ProposalPage`. Zero Tailwind classes inside proposals — only `var(--t-*)` references. This means templates never interfere with the app UI's Tailwind tokens.

**Section ordering:** `proposal.sections` is an ordered array. User can reorder via toggle. Renderer always renders in `sections` order. Category change resets to defaults.

**Verso alternating sections:** `themeConfig.hasAlternatingSections = true` → odd-indexed sections get `background: var(--t-bg-secondary)` + `isInverted={true}` prop on all children (flips all text/border colors to `--t-text-inverse`).

**Clerk + Supabase RLS (Phase 3):** Clerk JWT template must map `sub → sub`. Supabase policy: `auth.uid()::text = user_id::text`. Text cast is required — Clerk IDs are strings, Supabase UUID foreign keys need explicit cast.

**Public share view:** `/share/:linkId` uses anon Supabase client (no JWT). Only route that touches proposal data without auth. Public read RLS policy on `shared_links` joined with `proposals`.

**html2canvas CORS (Phase 4):** Any logo/image uploads must be in Supabase Storage public bucket. `<img crossOrigin="anonymous" />` on all proposal images. `useCORS: true` in html2canvas config.

---

## Pricing Rationale (Do Not Revisit Without Data)

$20 lifetime was chosen because:
- Lower friction than any subscription for first-time purchase decision
- Target buyer is a solo designer or small agency, not an enterprise
- $20 × 2,500 customers = $50K (achievable with SEO + portfolio positioning)
- Subscription at $5/mo would require 833 paying subs just to hit $50K MRR — harder acquisition curve
- Revisit only if churn data suggests LTV is significantly higher and buyer tolerance is higher
