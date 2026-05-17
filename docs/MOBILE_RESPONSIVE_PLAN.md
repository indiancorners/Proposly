# Proposly Mobile Responsive Plan

**Date:** 2026-05-17  
**Stack:** React 19 + TypeScript + Tailwind v4 (CSS-first, `@tailwindcss/vite`) + Vite  
**Scope:** Full mobile-first audit and implementation plan for all app surfaces

---

## 1. Current State Assessment

### Tailwind breakpoints in use

Tailwind v4 ships with default breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`). The codebase uses these sparingly and inconsistently:

| Breakpoint | Where it appears | Purpose |
|---|---|---|
| `sm:` | `ProposalGrid` (`grid-cols-1 sm:grid-cols-2`) | Card grid layout |
| `md:` | `LandingPage` — editorial break, templates, how-it-works, pricing | Stacks to columns |
| `lg:` | `ProposalGrid` (`lg:grid-cols-3`), `ThemePickerStep` (`lg:grid-cols-3`) | Column expansion |
| `xl:` | `ProposalGrid` (`xl:grid-cols-4`) | Wide layout expansion |

**No `sm:` or `md:` breakpoints exist in:**
- `AppLayout` / `AppSidebar` — fixed `w-60` sidebar, no collapse
- `ProposalEditorLayout` — fixed `h-14` header, no mobile adaptation
- `FormStep` — hardcoded `w-56` left sidebar + flex row
- `ReviewStep` — hardcoded `w-64` right panel + flex row
- `DashboardPage` — fixed `px-8 py-10` padding, no responsive header stacking
- `DashboardFilters` — `flex items-center justify-between` — will overflow below ~380px
- `StatsTileGrid` — `grid-cols-1 md:grid-cols-4` — fine on mobile, but stat values at `32px` bold will clip

### Which screens are desktop-only right now

| Screen | Status | Why it breaks on mobile |
|---|---|---|
| `AppSidebar` / `AppLayout` | Desktop-only | `w-60` sidebar always visible, no hamburger, eats 240px of viewport |
| `FormStep` | Desktop-only | Two-column flex with `w-56` sidebar. On 375px screen, both columns will be ~119px — unusable |
| `ReviewStep` | Desktop-only | Three-pane: `flex-1` preview + `w-64` panel. A4 canvas (794px) overflows. |
| `ProposalEditorLayout` header | Mostly broken | Step indicators + "Dashboard" link on one line — wraps badly below 480px |
| `DashboardFilters` | Partially broken | Tabs + search on one row. Below 480px, tabs are cut off |
| `PublicProposalView` | Broken | `max-w-[794px]` A4 canvas renders at full 794px, causes horizontal scroll on any phone |
| `LandingPage` — templates section | Mostly OK | Uses `flex-col md:flex-row`, but mini gallery (5 × 72px thumbnails) requires ~420px minimum to not feel cramped |

### What is already responsive

- `LandingPage` hero — `clamp()` font sizing, `flex-wrap` CTAs, `px-6` padding — works on mobile
- `LandingPage` editorial/pricing/features — `md:flex-row` / `md:grid-cols-*` columns stack correctly
- `ProposalGrid` — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` — solid
- `SignInPage` / `SignUpPage` — `min-h-screen flex items-center justify-center` + Clerk's own responsive card — works (Clerk handles its own breakpoints)

### Estimated mobile user split

This is a professional proposal builder for agencies. The primary workflow (create → fill → export PDF) is cognitively heavy and multi-step — inherently desktop work. Expected split:

- **Desktop: ~75%** — primary use case, wizard + editing
- **Mobile: ~20%** — dashboard checks, status updates, client forwarding share links
- **Tablet: ~5%** — edge case, may match more if client opens proposals on iPad

**Priority ordering:** Public share view (clients open on any device) > Dashboard quick-check > Landing page > Auth > Wizard (mobile wizard is lowest ROI, highest cost)

---

## 2. Breakpoint Strategy

Three tiers, using Tailwind v4 defaults. No custom breakpoints needed — the existing system is sufficient.

### Mobile — `< 768px` (default / no prefix)
**Covers:** phones (375px–767px)  
**Target behaviors:**
- Single-column layouts everywhere
- Sidebar hidden, replaced by a bottom nav bar or hamburger drawer
- Wizard preview hidden; form-only experience with a "Preview" modal trigger
- A4 canvas scaled down via CSS `transform: scale()` or `zoom` to fit viewport width
- All multi-column flex rows stack vertically (`flex-col`)
- Touch targets minimum 44×44px

### Tablet — `md:` (768px–1023px)
**Covers:** iPad portrait (768px), small laptops  
**Target behaviors:**
- Sidebar can remain visible but at reduced width (`w-48` instead of `w-60`)
- Wizard: sidebar panels still visible but compressed
- Dashboard: 2-column proposal grid
- A4 canvas may show at ~60% scale in split-pane if viewport is wide enough; otherwise hide preview and show action panel only
- Template picker: 2-column grid

### Desktop — `lg:` (> 1024px)
**Covers:** Laptops and desktops — current baseline  
**No changes required.** All existing designs target this tier.

---

## 3. Screen-by-Screen Plan

### Landing Page (`src/pages/LandingPage.tsx`)

Most of this already works. Targeted fixes only.

**Mobile changes:**
- Hero `h1` — `clamp(44px, 7.5vw, 92px)` already responsive. No change needed.
- CTA buttons — `flex-wrap` already present. Verify they don't wrap awkwardly at 375px (both buttons are long strings).
- Templates section — `flex-col md:flex-row` on featured preview already handles stacking. On mobile, the preview card (280×373px) renders fine. The info block below it stacks correctly.
- Mini gallery — 5 thumbnails at `72px` each + `12px` gap = ~396px minimum. Add `overflow-x-auto` + `flex-nowrap` + `pb-2` for horizontal scroll on mobile instead of wrapping/truncating.
- How it works grid — `grid-cols-1 md:grid-cols-3` already stacks. But `borderRight` on items is applied via inline style conditionally for index < 2 — this creates right borders that make no visual sense when stacked vertically. Remove those borders on mobile, add `borderBottom` between stacked items instead. This is a CSS-only fix via `[&:not(:last-child)]:border-b` on mobile.
- Features bento — `md:col-span-2` on the large card. On mobile, all cards are `col-span-1` which is fine since `grid-cols-1` is default.
- Pricing grid — `grid-cols-1 md:grid-cols-2` already stacks. No change needed.
- `px-6` on all sections — sufficient for mobile.

**Tablet changes:**
- No significant changes. Template mini gallery may benefit from `justify-center` which already exists.

---

### Dashboard Page (`src/pages/DashboardPage.tsx`)

**Mobile changes:**
- Outer padding: `px-8` → `px-4` on mobile. Change to `px-4 md:px-8`.
- Header row: `flex items-center justify-between` with title block + "New Proposal" button. On 375px this is fine since button is compact (`h-9 px-5`). Keep as-is, but verify at 320px.
- Stats tiles: `StatsTileGrid` uses `grid-cols-1 md:grid-cols-4`. On mobile renders as 4 stacked tiles — acceptable, but the Pipeline tile with its bar chart may look awkward at full width. No layout change needed; the content itself is fine.
- `DashboardFilters`: **This is the most broken component on mobile.** Currently `flex items-center justify-between` with 5 status tabs on the left and a search input on the right. At 375px: tabs + search won't fit. Fix: stack vertically on mobile — tabs row on top, search below: `flex-col gap-3 md:flex-row md:items-center md:justify-between`. Search input can go full-width on mobile: remove fixed `w-52`, use `w-full md:w-52`.
- `ProposalGrid`: already responsive. On mobile renders 1 column. Fine.

**Tablet changes (768px–1023px):**
- `px-4 md:px-8` — at 768px the `md:px-8` kicks in which is correct.
- Stats grid: `md:grid-cols-4` — at 768px, 4 tiles in a row on an iPad portrait will be ~174px each. Tight but workable. Consider `md:grid-cols-2 lg:grid-cols-4` if stat tiles feel cramped.

---

### Wizard — Step 1: Theme Picker (`src/wizard/ThemePickerStep.tsx`)

**Mobile changes:**
- Grid: currently `grid-cols-2 lg:grid-cols-3`. On mobile (`< 768px`), 2 columns at 375px gives each card ~170px width. `ThemeCard` renders a `ThemePreviewThumbnail` — this should still be legible. This is acceptable; no change strictly needed.
- If thumbnails render at natural A4 proportions scaled down, verify the thumbnail content is readable at 170px width. If it becomes an unrecognizable smear, switch to `grid-cols-1` on mobile: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
- Touch targets on `ThemeCard` buttons: the card itself is the button. At 170px wide it's touch-friendly.

**Tablet changes:**
- `sm:grid-cols-2 lg:grid-cols-3` — at 768px stays at 2 columns (fine). 3-column at 1024px.

---

### Wizard — Step 2: Form (`src/wizard/FormStep.tsx`)

**This is the hardest wizard screen to make mobile-friendly.**

Current layout: `flex gap-6 h-full` with a `w-56 flex-shrink-0` left sidebar (category + section toggles) and a `flex-1 overflow-auto` main panel. On mobile this renders both panels at approximately 119px and `calc(100% - 256px)` which is broken.

**Mobile changes:**
- Replace the side-by-side layout with a stacked accordion approach:
  - At `< 768px`: sidebar controls (CategorySelector + SectionToggleBar) collapse into a sticky top bar or a collapsible drawer at the top of the form. The `SectionFormPanel` takes full width.
  - Use a `<details>` element or a controlled expand/collapse for the `SectionToggleBar` so users can show/hide sections without losing the form area.
  - `CategorySelector` can become a horizontal scrolling pill row at the top.
- Change `FormStep` layout: `flex flex-col md:flex-row gap-6 h-full`.
- The `w-56 flex-shrink-0` sidebar: `w-full md:w-56 md:flex-shrink-0`.
- Sidebar on mobile: `flex-row overflow-x-auto` for section toggles, `pb-4` bottom border separating it from the form.

**Tablet changes:**
- At 768px, the `md:flex-row` restores the side-by-side layout. `w-56` sidebar at 768px is fine — leaves ~512px for the form panel.

---

### Wizard — Step 3: Review / Export Panel (`src/wizard/ReviewStep.tsx`)

**The most architecturally complex responsive problem. See Section 5.**

Current layout: `flex gap-6 h-full` with `flex-1 overflow-auto` proposal preview + `w-64 flex-shrink-0` ExportPanel. The preview contains `ProposalRenderer` inside `max-w-[794px]` — this is an A4 canvas.

**Mobile changes:**
- Hide the side-by-side layout entirely on mobile.
- Replace with a two-tab interface or stacked layout:
  - **Option A (recommended): Tab toggle.** Two tabs: "Preview" and "Export". On mobile, show only one at a time. Default to "Export" tab (since mobile users are more likely finishing up than reviewing layout). The preview tab shows the scaled A4 canvas.
  - **Option B: Stacked.** ExportPanel on top, preview below (scrollable). Simpler to implement, but the proposal preview at mobile widths is borderline useless for actual proofing.
- The `ExportPanel` itself (`src/wizard/ExportPanel.tsx`): currently `p-4 rounded-2xl` with vertical buttons. This is already mobile-friendly as a standalone panel — no layout changes needed.
- Layout change: `flex flex-col-reverse md:flex-row gap-6 h-full` — ExportPanel floats to top on mobile, preview below.

**Tablet changes:**
- At 768px, restore side-by-side. The `w-64` ExportPanel at 768px leaves ~448px for the preview. The A4 canvas (794px) will still need to be scaled down — add `overflow-x-auto` to the preview container at tablet widths.

---

### Proposal Editor Layout (`src/layouts/ProposalEditorLayout.tsx`)

**Mobile changes:**
- Header `h-14 px-6` contains: back link + step indicator row on the left, saving indicator on the right.
- Step indicator in `WizardPage.tsx` renders 3 labeled buttons (`"1. Template"`, `"2. Details"`, `"3. Review"`) with `›` separators. At 375px this row (`"← Dashboard  1. Template › 2. Details › 3. Review"`) is too wide.
- Fix: On mobile, hide the text labels from step buttons, show only numbered pills (`1`, `2`, `3`). Back link can abbreviate or become an icon-only `←`.
- Step buttons: add `hidden sm:inline` on label text, keep number always visible.
- Reduce header padding on mobile: `px-3 md:px-6`.

**Tablet changes:**
- At 768px the full header renders fine. No change needed.

---

### App Sidebar (`src/layouts/AppSidebar.tsx` + `AppLayout.tsx`)

**The most impactful change for the authenticated app.**

Current: `w-60 h-screen flex-shrink-0` always visible. On mobile this consumes 240px of a 375px viewport, leaving 135px for main content — completely unusable.

**Mobile changes — Option A: Hamburger drawer (recommended):**
- `AppLayout` adds a `useState` for `sidebarOpen`.
- On mobile (`< 768px`): sidebar is `position: fixed; left: -240px; transition: left 0.25s` when closed, `left: 0` when open. Backdrop overlay on open.
- `main` content is full-width on mobile — no `flex` layout.
- Hamburger button (3 lines or `Menu` icon from lucide) appears in a mobile-only top nav bar.
- Alternatively: bottom tab bar with `LayoutDashboard` + `Settings` + `Plus` icons. Simpler, no drawer needed. But this requires restructuring `AppLayout` to accommodate the bottom bar height.

**Mobile changes — Option B: Bottom tab bar (simpler):**
- Hide `AppSidebar` entirely below 768px.
- Add a `<MobileNav>` component: fixed bottom bar, `h-16`, contains icons for Dashboard, New Proposal, Settings. No text labels — icon + dot indicator for active.
- `main` adds `pb-16` on mobile to prevent content hiding under the bar.
- This is fewer moving parts than a drawer and better for thumb navigation.

**Recommendation: Bottom tab bar.** The nav has only 2 items (Dashboard, Settings) + the primary CTA (New Proposal). This maps perfectly to a 3-item bottom bar. Drawer is over-engineered for this nav complexity.

**Tablet changes (768px–1023px):**
- Sidebar visible, optionally at reduced width: `w-48 md:w-60 lg:w-60`.
- No hamburger or bottom bar needed.

---

### Public Proposal View (`src/pages/PublicProposalView.tsx`)

**The highest-priority responsive fix. Clients open this on any device.**

Current: `max-w-[794px] w-full` container with `ProposalRenderer` inside. On a 375px phone, the container is 375px wide but `ProposalRenderer` via `ProposalPage` renders at `width: 100%` (when not `forExport`). However the content inside (fonts, grid columns, section layouts) is designed and tested at 794px. Text may reflow badly.

**Mobile changes:**
- Wrap `ProposalRenderer` in a scale container: render at a fixed `794px` internal width, scale down via CSS transform to fit the viewport.
- Implementation pattern:
  ```tsx
  // In PublicProposalView, wrap the renderer:
  <div className="w-full overflow-hidden" style={{ maxWidth: '794px' }}>
    <div
      style={{
        width: '794px',
        transform: `scale(${Math.min(1, viewportWidth / 794)})`,
        transformOrigin: 'top left',
      }}
    >
      <ProposalRenderer proposal={proposal} />
    </div>
  </div>
  ```
  The outer container height must be set to `794px * scale` to avoid collapsing.
- This keeps the A4 design pixel-perfect while making it viewable at any width. Text remains readable and layout is preserved.
- Add a "Download PDF" CTA button below the proposal on mobile — if they're a Pro user's client viewing a share link, giving them a download path (even if it leads to a Pro gate) adds value.

**Tablet changes:**
- At 768px, `794px` canvas overflows by 26px. Apply the same scale transform: `scale(768/794 ≈ 0.967)`. Imperceptible visually.

---

### Sign In / Sign Up Pages (`src/pages/SignInPage.tsx`, `SignUpPage.tsx`)

**Already mostly responsive.** Clerk's `<SignIn>` and `<SignUp>` components handle their own internal layout. The outer wrapper is `min-h-screen flex flex-col items-center justify-center gap-8` which is fine.

**Mobile changes:**
- The `clerkAppearance` card has `padding: '32px'`. On a 375px screen, Clerk's card will be approximately 330px wide (some internal padding). This is fine.
- Add `px-4` to the outer wrapper so the card doesn't touch viewport edges on small phones: `className="min-h-screen flex flex-col items-center justify-center gap-8 px-4"`.
- The `w-full max-w-sm` constraint Clerk applies internally should prevent overflow. Verify on iOS Safari 15+.

**Tablet changes:**
- No changes needed.

---

## 4. Component-Level Breakdowns

### ProposalRenderer (`src/renderer/ProposalRenderer.tsx`) + ProposalPage (`src/renderer/ProposalPage.tsx`)

`ProposalPage` renders at `width: 100%` in preview mode (when `forExport` is false). However the section components inside — `CoverSection`, `ScopeSection`, `PricingSection`, etc. — are designed assuming ~794px render width. They use fixed `padding`, `grid-cols-*`, and font sizes that assume desktop widths.

**The A4 constraint is fundamental.** You cannot simply let the canvas reflow to 375px — it will destroy the design. The correct approach for any screen where `ProposalRenderer` appears (ReviewStep preview, PublicProposalView) is the CSS scale technique described in Section 3.

```css
/* In index.css, add: */
.proposal-viewport-scale {
  transform-origin: top left;
  /* JS sets: transform: scale(containerWidth / 794) */
}
```

For `ReviewStep`, the preview container (`flex-1 overflow-auto bg-overlay/50 rounded-2xl p-6`) should apply this scale dynamically. Use a `useResizeObserver` or `useRef` + `ResizeObserver` to compute the container width and derive the scale factor.

### ProposalEditorLayout (split-pane editor)

The layout is not technically split-pane — it's `flex flex-col h-screen` with a fixed header and `flex-1 overflow-hidden` body. The split-pane behavior is inside `ReviewStep` and `FormStep`. Each of those needs its own responsive fix (see Section 3). `ProposalEditorLayout` itself just needs the header padding reduction.

### ExportPanel (`src/wizard/ExportPanel.tsx`)

Already vertically stacked buttons in a `p-4 rounded-2xl` container. On mobile, if shown as a full-width panel (Tab B scenario in ReviewStep), it renders perfectly. The `w-64` width constraint is only applied by the parent `ReviewStep` — remove that fixed width on mobile.

One UX consideration: on mobile, tapping "Download PDF" triggers `html2canvas` which is computationally heavy. The browser may lock up for 2–4 seconds on a mid-range phone. Add a loading state (`isPdfExporting` boolean) that shows a spinner and disables the button. This is not currently in the component.

### DashboardFilters (`src/dashboard/DashboardFilters.tsx`)

Currently `flex items-center justify-between`. On mobile:
- Status tabs: 5 pills × (`px-3.5 py-1.5` + label text). "Draft", "Sent", "Won", "Lost", "All" are all short strings — 5 pills total. At 375px minus padding, that's ~335px for the tab row. Each pill is roughly 55–65px → ~315px total. Barely fits in a row but the search input has no room.
- Fix: `flex-col gap-3 md:flex-row md:items-center md:justify-between`. Search goes full-width on mobile.

### ProposalGrid / ProposalCard (`src/dashboard/ProposalGrid.tsx`, `ProposalCard.tsx`)

`ProposalGrid`: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` — already correct.

`ProposalCard`: `p-5` with `font-bold text-[22px]` value display. On mobile at 1-column, the card takes full width — works well. No layout changes needed. The hover effect (`onMouseEnter`/`onMouseLeave`) won't fire on touch — consider adding `active:` state or removing the inline hover entirely in favor of Tailwind's `hover:` utility (which is touch-safe in Tailwind v4 via `@media (hover: hover)`).

---

## 5. The Hard Problems

### Problem 1: ProposalRenderer A4 Canvas — Not Designed to Reflow

**What:** `ProposalRenderer` renders themed sections (cover, scope, pricing, timeline, etc.) inside a 794px-wide A4 canvas. Section components use fixed paddings, grid columns, and typography sized for 794px. There is no "mobile layout" mode in any section component.

**Why it's hard:** This is not a responsive UI component — it is a document renderer. The design intent is pixel-perfect A4 fidelity. Making sections reflow at 375px would require implementing a second layout variant for every section component (`CoverSection`, `ScopeSection`, `PricingSection`, etc.), maintaining parity across 9 section types, and risking divergence between the print-fidelity version and the mobile-reflow version.

**Recommended approach:** Never reflow `ProposalRenderer`. Always render at 794px, apply CSS `transform: scale(viewportWidth / 794)` with `transform-origin: top left`, and adjust the container height to match `1123px * scale`. This is the same technique used by Google Docs, Notion, and Figma for document views on mobile. It preserves design intent at the cost of small text on very small phones — which is acceptable for a document viewer.

For the `ReviewStep` in the wizard: the scale + preview is secondary; the editor should not spend engineering effort on making the A4 preview pixel-perfect on a 375px phone. Show the ExportPanel by default on mobile; let the preview be accessed on-demand via a "Preview" tab.

---

### Problem 2: Wizard Split-Pane — Two Columns That Can't Become One Without UX Redesign

**What:** Both `FormStep` and `ReviewStep` use side-by-side pane layouts. `FormStep` has a control sidebar (category selector + section toggles) that drives what the right panel shows. `ReviewStep` has the A4 preview on the left and action buttons on the right. These are not independent panels — they're coupled.

**Why it's hard:** Simply stacking the panels vertically breaks the mental model. In `FormStep`, the section toggle bar (which controls which sections appear in the form) needs to remain accessible while the user fills in form fields. If it scrolls off screen, users won't know it exists. In `ReviewStep`, hiding the preview removes the primary trust signal before export.

**Recommended approach:**
- `FormStep` on mobile: Convert `SectionToggleBar` into a sticky horizontal scroll bar at the top of the mobile view, above the `SectionFormPanel`. Keep `CategorySelector` as a compact dropdown or 2-column pill grid in a collapsible panel. This preserves discoverability without requiring the user to scroll back up.
- `ReviewStep` on mobile: Two-tab approach. Default to the "Export" tab. The "Preview" tab loads the scaled A4 canvas. Add a tab switcher with `useState` in `ReviewStep` that conditionally renders either the scaled preview or the `ExportPanel`.

---

### Problem 3: AppSidebar — No Mobile Nav Exists at All

**What:** `AppLayout` is `flex h-screen overflow-hidden` with `AppSidebar` (always visible, `w-60`) + `main` (`flex-1`). There is no mobile nav pattern, no hamburger, no collapse mechanism.

**Why it's hard:** This requires a structural change to `AppLayout`. Any implementation (drawer, bottom nav, hamburger + overlay) requires adding state management, conditional rendering based on viewport, and coordinating with React Router's `<Outlet>` to ensure the layout doesn't break in nested routes (Dashboard, WizardPage, SettingsPage, UpgradePage). It also requires testing that the wizard's `ProposalEditorLayout` (which does not use `AppSidebar` — it renders inside `AppLayout`'s `<Outlet>`, replacing the sidebar with its own full-height layout) still works correctly.

Wait: check this — `WizardPage` renders `ProposalEditorLayout` which wraps `flex flex-col h-screen`. But `WizardPage` is rendered inside `AppLayout`'s `<Outlet>`, meaning the sidebar is ALWAYS visible even in the editor. This is a current desktop-only problem too — the sidebar takes up 240px of the editor's available width. On mobile, this makes the wizard completely unusable.

**Recommended approach:** Bottom tab bar on mobile (see Section 3, AppSidebar). This sidesteps the drawer complexity and is appropriate given the nav has only 3 items. For the wizard, the sidebar should still be hidden — add a `useLocation` check in `AppLayout` that suppresses the sidebar (or sets it to `w-0`) when the path matches `/app/create` or `/app/edit/:id`. This also improves desktop UX — the editor shouldn't share viewport space with the sidebar.

---

### Problem 4: `html2canvas` PDF Export on Mobile

**What:** `exportToPDF` in `src/lib/exportService.ts` uses `html2canvas` to rasterize the `ProposalRenderer` DOM node, then `jsPDF` to produce the PDF. On mobile this involves:
1. Rendering a 794px DOM element (may require `forExport: true` mode which overrides `width: 794px` explicitly)
2. `html2canvas` iterating the entire DOM to produce a canvas bitmap
3. Encoding to PNG and embedding in a PDF binary

**Why it's hard:** On a mid-range Android (2023), `html2canvas` on a complex multi-section proposal takes 3–6 seconds and can spike memory to the point of crashing a Safari tab on iOS. The `forExport` prop exists in `ProposalRenderer` / `ProposalPage` but the export flow needs to ensure the rendered element is actually 794px wide when the export is triggered, regardless of the current mobile viewport scale.

**Recommended approach:**
- Keep PDF export as a "desktop-first" feature. On mobile, show a toast/info message: "For best results, open on desktop to download PDF." Don't block it — some users on large tablets may succeed.
- Add a visible loading state with a spinner and "Exporting…" label to the Download PDF button in `ExportPanel` (this is missing today across all platforms).
- Ensure the `exportRef` target (`ProposalRenderer`) has `forExport={true}` set during the export call so `ProposalPage` renders at `width: 794px` explicitly. Currently `ReviewStep` renders with `forExport` not set — verify this in `exportToPDF` implementation.

---

### Problem 5: iOS Safari — `100vh` and Scroll Behavior

**What:** `AppLayout` uses `h-screen` (= `100vh`). On iOS Safari, `100vh` includes the URL bar height, so the layout overflows and the bottom of the sidebar/content is hidden behind the browser chrome.

**Why it's hard:** This is a well-known iOS Safari bug affecting every full-height layout. Tailwind v4 uses `h-screen` which maps to `height: 100vh`. The workaround (`height: 100dvh` — dynamic viewport height) is supported in iOS 15.4+. But Tailwind v4's `dvh` utilities (`h-dvh`) are available and should be used.

**Affected components:**
- `AppLayout`: `h-screen` → `h-dvh`
- `AppSidebar`: `h-screen` → `h-dvh`
- `ProposalEditorLayout`: `h-screen` → `h-dvh`

**Recommended approach:** Replace all `h-screen` with `h-dvh` across these three files. This is a 3-line change and should be the first mobile fix applied — it unblocks all subsequent testing on real iOS devices.

Additional iOS Safari issues:
- `position: sticky` behaves differently in scroll containers with `overflow: auto` on a parent — verify `SectionFormPanel` scroll behavior on iOS.
- `-webkit-overflow-scrolling: touch` is no longer needed (deprecated) but ensure no momentum scroll issues in `FormStep`'s `overflow-auto` main panel.

---

## 6. Implementation Sequence

### Phase 1 — Foundation (1–2 days) — Do This First
Critical fixes that unblock all testing. No UX design decisions required.

1. Replace all `h-screen` with `h-dvh` in `AppLayout`, `AppSidebar`, `ProposalEditorLayout` — fixes iOS Safari immediately.
2. Fix `PublicProposalView` A4 canvas scaling (CSS transform technique). This is the highest-value fix: clients see this on every device.
3. Add `px-4` to `SignInPage` / `SignUpPage` outer wrapper.
4. Fix `DashboardFilters` — stack on mobile (`flex-col md:flex-row`), full-width search.

### Phase 2 — Dashboard (1 day)
Authenticated users checking proposals on mobile. Low complexity.

5. `DashboardPage` padding: `px-4 md:px-8`.
6. `StatsTileGrid`: consider `md:grid-cols-2 lg:grid-cols-4` at tablet breakpoint.
7. `ProposalCard` hover states: add `active:` style for touch, or use `@media (hover: hover)` to scope hover effects.

### Phase 3 — App Navigation (2 days)
The most structural change. Must be done before the wizard.

8. Build `MobileNav` bottom tab bar component.
9. Update `AppLayout` to render `AppSidebar` only at `md:` and above, `MobileNav` below.
10. Add `pb-16 md:pb-0` to `main` content to account for bottom nav height.
11. Suppress sidebar in editor routes (`/app/create`, `/app/edit/:id`) at all viewport widths — or suppress at desktop too if the narrow editor is preferable.

### Phase 4 — Landing Page Polish (0.5 day)
Already mostly works. Small fixes only.

12. Template mini gallery: `overflow-x-auto flex-nowrap` horizontal scroll.
13. How-it-works grid: fix `borderRight` being visible between stacked items on mobile.

### Phase 5 — Wizard (3–4 days)
The most complex phase. Mobile wizard is lower priority than the above but needed for full parity.

14. `ProposalEditorLayout` header: compress step indicators on mobile (number-only pills).
15. `ThemePickerStep`: verify thumbnail legibility at 2-column mobile grid. Switch to `grid-cols-1` if needed.
16. `FormStep`: stack sidebar below/above form on mobile. `SectionToggleBar` becomes horizontal scroll pill row.
17. `ReviewStep`: two-tab approach on mobile (Preview | Export). Build `ReviewTabToggle` component.
18. Implement `useProposalScale` hook for computing the CSS scale factor from container width in `ReviewStep`.
19. `ExportPanel`: add loading state for PDF export (all platforms, not just mobile).

### Phase 6 — QA (1 day)
20. Test on: iOS Safari 17 (iPhone 15), iOS Safari 15 (iPhone 12), Chrome Android (Pixel 7), Chrome Android tablet.
21. Check: scroll areas, touch targets, keyboard appearance (iOS virtual keyboard pushes viewport — test form inputs).
22. Lighthouse mobile audit for `PublicProposalView` — this is the only public URL. Aim for Performance > 80.

---

## 7. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `ProposalRenderer` A4 canvas not scaling properly on mobile — client can't read shared proposals | H | H | CSS `transform: scale()` approach preserves layout entirely. Height compensation needed (`height = 1123px * scale`). Test on iOS Safari and Chrome Android before shipping. |
| Wizard form + live preview becoming unusable on mobile | H | M | Priority is desktop wizard experience. Mobile = form-only with on-demand preview tab. Accept partial parity. Do not attempt to show form + live preview simultaneously on mobile. |
| Clerk auth UI not responsive | L | M | Clerk's own components are responsive. Risk is only the outer wrapper clipping cards. `px-4` on wrapper + testing at 375px resolves this. Monitor Clerk's own release notes for card width changes. |
| Touch interactions on template picker (`ThemePickerStep`) — `ThemeCard` click targets too small at 2-col mobile | M | L | At ~170px card width the hit target is fine. Risk is the `ProGateOverlay` blocking interaction on locked templates — verify touch events pass through correctly. |
| iOS Safari `100vh` / `h-screen` layout overflow — bottom of sidebar cut off | H | H | Replace all `h-screen` with `h-dvh`. Tailwind v4 has `h-dvh` built-in. Zero design impact. Do this in Phase 1. |
| iOS Safari virtual keyboard pushing viewport — form fields in `FormStep` scroll out of view | M | M | Add `env(keyboard-inset-height)` consideration for sticky nav elements. Test with iOS 16+ keyboard avoidance. `dvh` partially mitigates this. |
| `html2canvas` PDF export crashing on mobile (memory spike, tab kill on iOS) | M | H | Show clear "best on desktop" guidance. Add loading state. Do not block the export — just set expectations. iOS Safari's memory limit is ~1.5GB, a single proposal render typically fits but complex ones may not. |
| Performance of `ProposalRenderer` on mobile — CSS-heavy themed sections, multiple font families | M | M | `ProposalRenderer` is render-heavy (custom CSS vars, Open Sans font). In `PublicProposalView`, lazy-load the font and defer non-critical sections with `content-visibility: auto` if initial render is slow. |
| CSS transform scale approach causing `position: sticky` to break inside scaled element | L | L | `transform` on a parent creates a new stacking context, which breaks `position: sticky` for any descendants. Verify none of the section components inside `ProposalRenderer` use sticky. Currently none appear to — but validate. |
| `DashboardFilters` status tab overflow on very small phones (< 360px) | M | L | Adding `overflow-x-auto` to the tabs row handles this. Alternatively shorten labels: "Draft" → "D" on mobile (not recommended — loses clarity). Better: keep labels, allow horizontal scroll. |
| `AppLayout` sidebar refactor breaking nested wizard routes | M | H | Wizard routes (`/app/create`, `/app/edit/:id`) need sidebar suppressed. Use `useLocation` or nested route restructuring. Test all route transitions before shipping Phase 3. |

---

## 8. Effort Estimate

Estimates assume one developer familiar with the codebase. Ranges reflect design decision uncertainty (e.g., whether drawer vs. bottom nav is confirmed before coding starts).

| Area | Low | High | Notes |
|---|---|---|---|
| Foundation fixes (Phase 1) | 0.5 day | 1 day | `h-dvh`, PublicProposalView scale, auth padding, DashboardFilters |
| Dashboard (Phase 2) | 0.5 day | 1 day | Padding, filter stack, card hover touch |
| App navigation / sidebar (Phase 3) | 1.5 days | 2.5 days | MobileNav component + AppLayout restructure + route suppression |
| Landing page polish (Phase 4) | 0.5 day | 0.5 day | Mini gallery scroll, border fix |
| Wizard (Phase 5) | 2.5 days | 4 days | FormStep restructure, ReviewStep tabs, scale hook, EditorLayout header |
| QA / device testing (Phase 6) | 0.5 day | 1 day | Real device testing, Lighthouse |
| **Total** | **6 days** | **10 days** | |

**Recommended slice if time is constrained:**

Ship Phases 1–2 + 4 first (~2–2.5 days). This makes the landing page, auth, dashboard, and public share view functional on mobile — covering the two user types most likely on a phone (prospective users arriving via landing page, clients opening share links). The authenticated wizard remains desktop-only, which is defensible for a professional B2B tool.

Phase 3 (navigation) is the unlock for the dashboard mobile experience actually being good. Without it, authenticated users on mobile see a broken sidebar. Phase 3 should follow immediately after Phase 1–2.

Phases 5–6 (wizard + QA) are the long tail. Deprioritize until the above is shipped and validated with real usage data.
