# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Proposly — a studio-grade proposal generator SaaS. Users pick a template, fill a multi-step
wizard, preview a live themed render, then export to PDF/PNG or share via a public link. Free
tier is capped (3 proposals, 1 template); a $20 one-time Lemon Squeezy purchase unlocks Pro.

Sister product: **Invoicy** (invoicing). Both share the **same design system DNA** — identical
tokens/components/landing structure; the only per-product difference is the accent hue
(Proposly = blue `#2563EB`, Invoicy = maroon `#8B0000`). Keep them in lockstep.

## Commands

```bash
npm run dev      # Vite dev server → http://localhost:5173
npm run build    # tsc -b && vite build  ← the REAL typecheck + prod build
npm run preview  # serve the built dist/
```

There is **no test runner and no lint script**. `npm run build` is the only gate.

> ⚠️ **Do not trust `tsc --noEmit`.** The root `tsconfig.json` is `{ "files": [], "references": [...] }`,
> so plain `tsc --noEmit` compiles *nothing* and always exits 0 (false green). Only `npm run build`
> (`tsc -b`, which follows the project references) actually typechecks. Always verify with `npm run build`.

Path alias: `@/` → `src/` (configured in `vite.config.ts` and the tsconfigs).

## Hard-won lessons (mistakes already made here — do not repeat)

These cost real time during the go-live. Each is a rule, with the mistake that earned it.

1. **"Typecheck passed" ≠ it builds.** `tsc --noEmit` on the root tsconfig compiled nothing and
   reported success; the actual `tsc -b` build had several errors (missing dep, bad type import).
   → **Always run `npm run build` before claiming a change is clean and before committing.** A commit
   was pushed that didn't build because of this.

2. **Verify *what is actually deployed*, not what you pushed.** Vercel was building the stale `master`
   branch (old MVP, placeholder keys) while all real work was on `main`. Symptoms looked like "env vars
   missing." → When a deploy misbehaves, **fetch the live bundle and inspect it**: `curl` the page, find
   `/assets/index-*.js`, then grep it for a known string from the current code, the baked env values
   (e.g. the Supabase project ref), and `curl /app` to confirm the SPA rewrite (200 vs 404). This
   technique diagnosed both the wrong-branch and the env-var bugs. `main` is the deploy branch.

3. **Strip ALL whitespace from any env value used in an HTTP header.** A long key pasted into Vercel
   wrapped and embedded a newline *mid-string* → "Failed to execute 'set' on 'Headers': Invalid value"
   in production only. `.trim()` (ends only) was not enough; `src/lib/supabase.ts` now `replace(/\s+/g,'')`.
   → Don't assume a value is clean just because it works locally.

4. **Postgres functions returning a composite type yield a row of NULLs, not SQL NULL, on no match.**
   `get_shared_proposal` for a bad link returned `{id:null,...}` (truthy object), so an `if (!data)`
   not-found guard silently passed. → Guard on the **primary key** (`if (!data?.id)`). Test the actual
   REST/RPC response shape; don't assume.

5. **`is_pro` upsert footgun.** `upsertProfile` always writes `is_pro: false`; without the
   `protect_profile_is_pro` trigger, re-upserting a Pro user (e.g. saving Settings) would silently
   downgrade them. The trigger both closes the self-upgrade hole and fixes this. → Don't let the client
   write `is_pro`.

6. **Lemon Squeezy signing secret must be ≤ 40 chars**, and must be set in **both** places — the LS
   webhook config **and** `supabase secrets set LEMON_SQUEEZY_WEBHOOK_SECRET=…`. A 64-char secret was
   rejected by LS; later the LS webhook was saved but the Supabase secret was never set (silent 401s).
   → Verify with `supabase secrets list` (it shows a digest, not the value).

7. **`supabase functions logs` does not exist** in this CLI version — webhook logs are only in the
   Supabase dashboard (Edge Functions → Logs).

8. **Enabling RLS breaks anonymous flows unless you plan for them.** The public share page reads as
   `anon`; turning on RLS blocked it until the `get_shared_proposal` SECURITY DEFINER RPC was added.
   → When adding RLS, account for every unauthenticated path.

9. **The wizard is nested under `AppLayout`.** Adding global app chrome (sidebar / mobile nav) naively
   double-chromed and broke the full-screen editor. → `AppLayout` special-cases `/app/create` and
   `/app/edit` to render bare. Keep that branch in mind when touching layouts.

10. **Design language drift.** DS `Button` shipped `primary` = blue while the premium marketing pages
    used black, and a `purple` gradient leaked into `ProBadge`/`upgrade`. → Primary actions are black
    (`variant="dark"` / `foreground`); blue is accent + Pro signal only; **no purple**. See Design system.

## Architecture

Pure Vite SPA (no server). React 19 + TypeScript + Tailwind v4 + react-router. Three external
services do the backend work:

- **Clerk** — auth (`@clerk/clerk-react`, `<ClerkProvider>` in `src/main.tsx`).
- **Supabase** — the only data store (Postgres + RLS + an Edge Function). No Supabase Auth.
- **Lemon Squeezy** — checkout; a Supabase Edge Function webhook grants Pro.

### The auth + data model (most important thing to understand)

Clerk is the identity provider; Supabase trusts Clerk via **native third-party auth**. The chain:

1. `src/lib/supabase.ts` creates one client and passes an `accessToken` callback that returns the
   live Clerk session JWT (`window.Clerk?.session?.getToken()`). Logged-out visitors send no token → anon role.
2. RLS policies (`supabase/rls.sql`) key off `auth.jwt()->>'sub'`, which **equals the Clerk user id**.
   That same id is stored as `proposals.user_id` and `profiles.id` (both TEXT, not UUID).
3. `profiles.is_pro` can **only** be set by the `service_role` (the webhook). A trigger
   (`protect_profile_is_pro`) pins it for everyone else — clients can never self-upgrade.
4. Public share reads run as `anon`, which RLS blocks, so they go through the
   `get_shared_proposal(uuid)` SECURITY DEFINER RPC (resolves link → proposal, bumps view count).

`src/services/` (`proposalService`, `profileService`, `shareService`) wrap all Supabase calls and
always scope by user id. SQL lives in `supabase/` — run `schema.sql` then `rls.sql` in the SQL
Editor on any new project. The webhook is `supabase/functions/lemonsqueezy-webhook/` (handles
`order_created`; no cancel/refund downgrade handler yet).

### Pro gating

`useProposlyPro()` (`src/hooks/`) fetches the profile, exposes `isPro` / `isAtLimit` / `canExport`
/ `canShare` / `canUseProTemplate`, and **re-fetches on tab focus** (so a purchase completed in the
Lemon Squeezy tab reflects on return). `FREE_PROPOSAL_LIMIT = 3` is exported from there; the same
limit is **also enforced server-side** in `proposalService.createProposal`. Free tier = the `folio`
theme only; the other 4 themes are Pro (`tier` field in `src/constants/themes.ts`).

### Wizard → renderer → export

- **`src/wizard/`** — the 3-step create/edit flow. `useWizardStore` (in `src/hooks/`) holds wizard
  state and auto-saves on a debounce. `ThemePickerStep` → `FormStep` (category + section toggles +
  per-section forms in `wizard/forms/` and `wizard/fields/`) → `ReviewStep` (live preview +
  `ExportPanel`). `ProGateOverlay` blanks Pro-only actions for free users.
- **`src/renderer/`** — the themed proposal renderer. `ProposalRenderer` dispatches each section to a
  `*Section` component and applies the theme's CSS vars. Has a `forExport` mode for capture.
- **`src/lib/exportService.ts`** — `exportToPDF` / `exportToPNG` via html2canvas + jsPDF against the
  renderer's ref.

### Routing & layouts (`src/App.tsx`, `src/layouts/`)

`createBrowserRouter`. Public routes use `PublicLayout`; `/share/:linkId` is `PublicProposalView`
(anon). `/app/*` is wrapped in `AuthGuard` + `AppLayout`. **`AppLayout` renders the wizard routes
(`/app/create`, `/app/edit/:id`) bare** (no sidebar/mobile nav) — the wizard is a focused
full-screen editor via `ProposalEditorLayout`. Mobile: sidebar hides `< md`, replaced by
`MobileTopBar` + `MobileBottomNav`.

## Design system (`src/ui/` — "DS_tools")

Tokens are CSS vars in `src/index.css` (`@theme`): `foreground #1D1D1F`, `accent #2563EB`,
`subtle #F5F5F7`, `border #D2D2D7`, `muted #6E6E73`, etc. **Premium aesthetic = monochrome black**:
primary actions/CTAs and selection states use `foreground` (#1D1D1F / `Button variant="dark"`), with
blue `accent` only as a tasteful highlight and the Pro signal (blue gradient `from-accent to-accent-dark`).
**No purple anywhere.** Headings use tight letter-spacing (−0.02 to −0.04em) and framer-motion `fadeUp`.
When adding UI, reuse `src/ui/` components and match this language rather than introducing new colors.

## Environment & deploy

- `.env` (gitignored) holds 4 client vars (`VITE_CLERK_PUBLISHABLE_KEY`, `VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY`, `VITE_LEMON_SQUEEZY_CHECKOUT_URL`) — all client-public. Server secrets
  (`LEMON_SQUEEZY_WEBHOOK_SECRET`, etc.) live in **Supabase secrets**, never in the client/Vercel.
- `VITE_*` values are baked at build time. The supabase client **strips all whitespace** from the
  URL/key/token because values pasted into dashboards can carry stray newlines that make HTTP
  headers illegal ("Failed to execute 'set' on 'Headers': Invalid value").
- Deployed on **Vercel from the `main` branch** (it is the default branch — `master` was retired).
  `vercel.json` provides the SPA rewrite so deep links (`/app/*`, `/share/:id`) resolve.

## Conventions

- Commit messages end with `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- Branch/PR against `main`.
