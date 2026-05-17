# Proposly Template Design Direction
*Research-based structural differentiation brief*
*Version 1.0 — May 2026*

---

## Executive Summary

All five Proposly templates currently share a single layout system: full-width stacked sections, a uniform `SectionHeader` component with identical type hierarchy, and `p-12` padding throughout — differing only in CSS color tokens. This is not a template system; it is a color picker with extra steps. The fix is not a redesign of every pixel — it is the assignment of a distinct **structural archetype** to each template, so that the document's skeleton, spacing rhythm, type scale relationships, and section-entry patterns all diverge. A developer reading this document can implement each template's differentiation through targeted component variants and theme-level layout flags, without rebuilding the data model. The outcome is five documents that a client would never mistake for each other, even in grayscale.

---

## Reference Analysis

### `download.jpg` — Bold B&W Editorial (Business Proposal 2045)
- **Layout:** Asymmetric cover — large display headline left-aligned, key stats (revenue target, success rate) in small type top-left creating a data-anchor before the title. Section dividers are full-bleed black bars with large section numbers (`01`, `02`) in the top-right corner at ~120px equivalent.
- **Typography:** Extreme scale contrast. The cover heading "Business Proposal" runs at ~96px display weight. Section number numerals are decorative (gigantic, right-aligned), functioning as visual separators, not as navigation. Body copy stays compressed at ~13px.
- **Unique device:** Yellow accent cards (`#F5E642`) used selectively as callout containers for single stats (`$180K`, `99%`). Not used on every slide — scarcity gives them weight. Section-intro slides use a full-bleed split: one large image left (40%), text content right (60%).

### `Modelo de Professional Project Proposal Presentation Template do Stock.jpg` — Compact Corporate
- **Layout:** Landscape 16:9 slides, highly consistent 3-column info grid on content slides. Header ("ABOUT US", "BUDGET BREAKDOWN") is extremely large, left-anchored, with content below in a tight grid.
- **Typography:** All-caps heavy sans-serif headers at massive scale — used as structural anchors, not decorative. Body is compact and dense. Zero serif. Zero editorial looseness.
- **Unique device:** Alternating dark/light slide pairs — a dark cover, cream content, dark project stages, cream budget breakdown. Creates a binary rhythm that makes navigation legible without section numbering.

### `Win More Business in 2025_ RUE Proposal Template.jpg` — Fashion Editorial / Asymmetric
- **Layout:** True two-column asymmetric pages. Left column: 30–40% width, contains large display word ("PROPOSAL", "Estimate", "Schedule", "Thanks") at extreme scale. Right column: 60–70%, contains photography and structured body text in small columns.
- **Typography:** Display words are set at headline scale (~120px equivalent), anchored bottom-left. Body text is set in small, tight columns — high contrast between the one giant word and the dense text block. Section titles double as single-word visual anchors.
- **Unique device:** The pricing/estimate section shows line items as a narrow right-column list, with the total amount (`$46,000`) set in large type — the number becomes the visual hero, not the table. Photography bleeds edge-to-edge on the left column for every content slide.

### `PowerPoint Brand Guidelines Template _ Standardize Logo & Identity.jpg` — Modular Grid
- **Layout:** Mixed modes — cover uses centered italic display type floating over body copy. Section-divider slides use dark background with very large section name + small section number top-right. Content slides use a mosaic/bento box grid (multiple image + stat tiles on a single slide).
- **Typography:** Mix of light-weight display (large, centered) with small-caps label text (`SECTION 1`). Numbers as decorative elements (`01`, `2B`, `365`) rendered in large bold weight — stats-as-display-type pattern.
- **Unique device:** Bento-box data layout — a 2×3 or 3×2 tile grid where each tile contains one stat, one image, or one metric. Tiles have rounded corners and varied sizes. Creates density without clutter.

### `Brand Proposal Presentation Layout Stock Template.jpg` — Stark Black/Cream Alternating
- **Layout:** Strict alternating black/cream. Black slides: full-bleed, large all-caps header in white. Cream slides: header top-left, content grid below. No gradients, no photography on most slides. Structural elements only.
- **Typography:** All-caps headers at uniform ~64px. No serif, no script. The constraint is the identity — the rigidity of the type IS the design.
- **Unique device:** Process/workflow steps shown in a horizontal numbered pill sequence at mid-height of the slide, with step description below each pill. Team shown as circular portrait grid with name/role below.

### `Minimal Blue Pitch Deck Layout.jpg` — Swiss Grid / Color Block
- **Layout:** Strong two-column grid on all content slides. Left column anchors the section title (often just 2–3 words, large). Right column carries imagery + descriptive body. The blue (#2B4BF2 equivalent) appears as a solid full-bleed block — one of the two columns is solid blue, the other is white/cream.
- **Typography:** Mixed case — section titles are sentence-case, medium-large (~40px). Cover title at ~80px with script signature below ("by Olivia"). Creates personality through the type-mix, not type size alone.
- **Unique device:** Color-block splitting — each slide is visually divided into a colored half and a neutral half. The title floats in the colored half, content in the neutral half. Timeline section uses a minimal vertical line with week labels on the right.

### `download (1).jpg` — Formal Corporate with Cyrillic (Blend Send)
- **Layout:** Presentation deck with consistent 2-column content slides. Left column: section headline, 2–3 lines; Right column: body copy in small justified text. Testimonials shown in a horizontal 3-card row with quotation mark decorators.
- **Typography:** Large display header ("PROJECT 777") with subtitle below in smaller case. Slides use structured label/value pairs — label in small caps, value in larger weight. Consistent margin gutters throughout.
- **Unique device:** Section numbering as small indicators (`01`, `33`, `34`) in the slide corner — understated, not decorative. History section uses a horizontal timeline with year markers and category icons.

### `download (2).jpg` — Russian/Cyrillic Deck (BlendSend)
- Same as above but confirms the label/value grid pattern and consistent use of navy blue (`#1E3A5F` equivalent) as the primary accent for interactive tiles and callout boxes.

### `Gisela Business Proposal_ Flexible Pricing Plan for Your Success.jpg` — Pricing Layout Archetypes
- **Three distinct pricing layouts shown in one reference:**
  1. **Split comparison** — left black panel with header + description, right white panel with feature comparison table (checkmarks/X). Two-column pricing on a dark/light split.
  2. **Equal column cards** — 4 pricing tiers in equal-width columns separated by thin vertical lines. Price is bottom-anchored, description top-anchored. Very clean, airy.
  3. **Card grid** — dark background, 3 bordered cards (STARTER, BASIC, PRO). Each card has tier label, price, bullet features, arrow CTA. Cards float on the background.

### `Social Media Templates for Coaches & Startups.jpg` — Vertical Social / Type-Forward
- **Layout:** Portrait format (9:16). Large display type fills 60–80% of the frame. Content is minimal — one statement, one CTA button, one logo. No body copy.
- **Unique device:** Large background numerals as decorative element (`01` at ~300px behind the content). Mix of serif italic + sans-serif bold in the same text block for tonal contrast.

### `Screenshot 2026-05-15 100201.png` — Bento/Dashboard Deck (Neon Green + Black)
- **Layout:** Dashboard-grid layout. Multiple variable-size tiles on each slide. Some tiles are large (40% width), some small (20% width). Neon green (`#CAFF00` equivalent) is used as a signal color on key data tiles only.
- **Typography:** Bold sans-serif for tile headers, small monospace-adjacent for data values. Tile label in small caps.
- **Unique device:** Variable-height tiles with individual padding. Not a uniform grid — tile sizes communicate data hierarchy. Total investment shown in a highlighted tile, not a table row.

### `Screenshot 2026-05-15 100244.png` — Same system extended
- Confirms the bento approach across section types. Phase/timeline uses a horizontal band divided into labeled segments (`PHASE 1`, `PHASE 2`, `PHASE 3`) rather than a traditional timeline chart.

### `Screenshot 2026-05-15 100317.png` — High-Energy Purple Deck
- **Layout:** Full-bleed purple backgrounds dominate. Diagonal/angled graphic elements cut across sections. Content is sparse — one large statement per slide.
- **Typography:** Bold weight, mixed sizes, some words underlined as a structural device (not for hyperlinks — purely visual). Section labels are top-left in small caps.
- **Unique device:** Underline as emphasis — a single word within a headline is underlined to direct reading order.

### `Screenshot 2026-05-15 100334.png` — Purple Deck continued
- Confirms the horizontal band timeline pattern. Team section uses a 3-column photo grid with role label beneath. The "3 PHASES TO SUCCESS" section uses large numeral `01 02 03` in a horizontal row as process indicators.

---

## Design Pattern Library

### Pattern 1 — The Asymmetric Split Page
**Source:** RUE Proposal, Minimal Blue Pitch Deck, Gisela Pricing (variant 1)
**Structure:** Each section is a two-column layout. Left column: 30–40% width, solid colored or dark background, contains a single large structural word or number. Right column: 60–70%, white/neutral, contains the actual content. The columns do not need equal height — they stretch to the taller of the two.
**CSS:** `display: grid; grid-template-columns: 2fr 3fr;` on the section wrapper. Left child: `background: var(--t-accent-bg); padding: 3rem; display: flex; align-items: flex-end;`. Right child: `padding: 3rem 4rem;`.
**Effect:** Every section immediately feels like a designed artifact, not a document. The structural word (OVERVIEW, SCOPE, INVESTMENT) becomes both navigation and decoration.

### Pattern 2 — Decorative Section Numerals
**Source:** download.jpg (Business Proposal 2045), PowerPoint Brand Guidelines, Social Media Templates
**Structure:** Large section number (01, 02, 03...) rendered in display weight at ~120–160px, placed in the top-right or bottom-right of a section-entry slide/panel. Functions as a visual anchor, not as a content element.
**CSS:** `font-size: clamp(80px, 12vw, 160px); font-weight: 900; opacity: 0.08–0.12; position: absolute; right: 2rem; bottom: 1rem; line-height: 1;`
**Effect:** Breaks the uniform section-entry feel. Adds depth without adding information.

### Pattern 3 — Bento Tile Grid
**Source:** Screenshots 100201 + 100244, PowerPoint Brand Guidelines
**Structure:** Instead of full-width table rows or stacked text blocks, data is presented in a grid of variable-size tiles. Each tile contains one piece of information. Tiles have subtle borders or backgrounds. Some tiles span 2 columns (featured information).
**CSS:** `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--t-border);` with each tile as a `background: var(--t-bg-surface); padding: 1.5rem;`.
**Effect:** Turns the pricing section from a table into a data dashboard. Especially powerful for Cipher (fintech/SaaS feel).

### Pattern 4 — Full-Bleed Section-Divider Slides
**Source:** download.jpg, Brand Proposal Presentation, Modelo
**Structure:** Dedicated "chapter break" section that spans full width and full height with a dark background. Contains only: section number (large, right-aligned) + section name (large, bottom-left). No body content. Acts as a visual pause and navigation signal.
**CSS:** `min-height: 240px; background: var(--t-bg-dark); display: flex; flex-direction: column; justify-content: flex-end; padding: 3rem; position: relative;` with the number absolutely positioned top-right.
**Effect:** Breaks the monotony of same-height stacked sections. Creates visual rhythm without adding any content.

### Pattern 5 — Type-Weight Contrast Hierarchy (Display + Compact)
**Source:** RUE Proposal, download.jpg, download (1).jpg
**Structure:** Two distinct type scales operating simultaneously — a display scale (48–96px) for structural words and a compact scale (12–14px) for body. Middle weights (24–32px) are avoided entirely, which creates extreme contrast. Section headers are either very large or very small, never medium.
**CSS:** Cover `h1: font-size: clamp(56px, 8vw, 96px); font-weight: 900; letter-spacing: -0.03em;`. Section body: `font-size: 13px; line-height: 1.7; max-width: 48ch;`.
**Effect:** Documents feel designed, not word-processed. The scale jump is the design signature.

### Pattern 6 — Horizontal Rule + Label Section Entry
**Source:** Minimal Blue Pitch Deck, download (1).jpg Formal Corporate
**Structure:** Section headers are introduced by a thin horizontal rule (1px) spanning the full column width, with a small-caps label floating just above or below the rule. The main heading then follows at 2–3× the label size. Three elements: rule → label → heading.
**CSS:** `border-top: 1px solid var(--t-rule); padding-top: 0.75rem; margin-bottom: 2rem;` with label as `font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--t-accent-text);`.
**Effect:** Clean, systematic, iOS-adjacent. Works for Signal and Cipher. Removes the generic "section header + underline" pattern currently in the codebase.

### Pattern 7 — Alternating Full-Bleed Section Backgrounds (True Inversion)
**Source:** Brand Proposal Layout, Modelo
**Structure:** Not just a color token swap — the dark sections have distinct vertical padding and content alignment compared to light sections. Dark sections anchor content to the bottom of the section; light sections anchor content to the top. This creates a visual oscillation rather than a flat alternation.
**CSS on dark sections:** `padding: 4rem 3rem 3rem; justify-content: flex-end;`. Light sections: `padding: 3rem 3rem 4rem; justify-content: flex-start;`. Both use `display: flex; flex-direction: column;`.
**Effect:** Alternation feels intentional rather than mechanical. Currently Verso uses alternating backgrounds but with identical padding — this is why it reads as color change, not structural change.

### Pattern 8 — Pricing as Highlighted Total (Number-as-Hero)
**Source:** RUE Proposal Estimate section, Gisela card variant
**Structure:** The total investment number is set in the largest type on the pricing page (~64px). The line-item table is small and subordinate. The psychological hierarchy reverses — client sees the number first, detail second. A horizontal line above the total visually frames it.
**CSS:** Total amount: `font-size: clamp(40px, 6vw, 72px); font-weight: 800; line-height: 1;`. Line items: `font-size: 13px`. The table is reduced to a compact detail block with the total floating below at 5× the size.
**Effect:** Changes the emotional experience of the pricing section — confidence vs. defensiveness. Currently every template shows the total as a `text-2xl` number after a table, which reads as apologetic.

---

## Template Direction: Folio

**Archetype:** The Printed Editorial Report
**Design Philosophy:** This document should feel like it was designed in InDesign for print — generous margins, editorial hierarchy, a document that a client frames rather than files.

**Structural Signature:**
Single-column, centered reading flow with asymmetric left-margin annotation system. A narrow left gutter (120px wide) carries section labels and page numbers as marginalia, while the main content column (max-width ~640px) sits right-of-center. This creates the unmistakable feel of a Pentagram annual report or an architectural brief.

**Cover:**
Full-bleed cream (#FAF8F3) background — no accent color block. Studio name in small-caps at top-left, very small (11px). Project title in large serif-adjacent or high-contrast sans at 72–80px, bold, anchored to the bottom-left quadrant. Client name below in 18px regular weight. Date in 11px italic at bottom-right. A single thin 1px horizontal rule between the title and client info. No decorative elements. No background textures. Silence IS the design.

**Section Headers:**
Section label lives in the LEFT MARGIN GUTTER (position: absolute or negative margin-left), rendered in 9px uppercase with 0.2em tracking, rotated 90 degrees. Main heading is 40px (not 30px — increase from current), font-weight 700, letter-spacing -0.02em. No underline rule beneath — replaced by a left-hanging accent dot (4px × 4px square in `--t-accent-text` color) at the start of the heading line.

**Typography:**
- Cover: 72–80px display, weight 800, letter-spacing -0.03em
- Section heading: 40px, weight 700, letter-spacing -0.02em
- Subheading / label: 9px uppercase, 0.2em tracking (in margin)
- Body: 15px, line-height 1.8, max-width 600px, color `--t-text-secondary`
- Pull quote / highlight text: 22px, weight 400, italic, color `--t-text-primary`

**Spacing Rhythm:** Generous. Section padding: `padding: 5rem 4rem 5rem 8rem` (left-heavy to create margin column). Between body paragraphs: 24px. Between sections: no divider component — a 1px rule spanning only 25% of the width, right-aligned, at 1.5rem above the next section label.

**Unique Devices:**
1. **Marginalia labels** — section type (OVERVIEW / SCOPE / INVESTMENT) in the left gutter, rotated, at 9px. CSS: `position: absolute; left: 2rem; top: 3rem; transform: rotate(-90deg); transform-origin: center; font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; color: var(--t-accent-text);`
2. **Accent dot before heading** — 4×4px square marker preceding the section heading, inline-block, adds tactile rhythm without a rule underline.
3. **Pull quote block** — for the Overview section, the first sentence of the body is rendered at 22px italic, full-width, above the rest of the 15px body text. Visually separates the lede from the detail.

**What Changes From Today:**
- Increase cover title from `text-5xl` (48px) to 72–80px equivalent (`text-7xl` or `font-size: 76px`)
- Remove `SectionHeader` component's underline rule (`h-px w-16`) — replace with accent dot
- Add left margin gutter via `padding-left: 8rem` on section wrappers and `position: relative` + absolutely-positioned rotated label
- Increase section heading from `text-3xl` (30px) to `text-4xl` (36–40px)
- Increase body text from `text-base` (16px) to body rhythm 15px / line-height 1.8 / max-width 600px
- Add pull-quote first-paragraph treatment in OverviewSection
- Remove `SectionDivider` component — replace with partial right-aligned rule 25% width

**Reference Inspiration:** `Win More Business in 2025_ RUE Proposal Template.jpg` (margin treatment, silence, editorial confidence), `download (1).jpg` (label/value grid, structural marginalia)

---

## Template Direction: Dusk

**Archetype:** The Luxury Client Deck
**Design Philosophy:** A document that justifies a $50K+ engagement before the client reads a word. Every section must signal scarcity, precision, and premium positioning. Dark surfaces, gold accents used with restraint.

**Structural Signature:**
Full-bleed dark sections throughout (no alternating). Cover uses a two-zone vertical split — top 35% of cover is a near-black panel containing only the section number and studio name in very small type; bottom 65% contains the project title in large gold-tinted text and client info. Content sections use an extreme asymmetric gutter: thin 1px gold vertical rule at the 1/4 mark from left creates a sidebar zone, left of rule = section label in gold, right of rule = all content.

**Cover:**
`min-height: 480px`. Dark cover (#111014). Top zone (35%): `border-bottom: 1px solid #D4952A33; padding: 2rem 3rem;` — contains studio name (right-aligned, 10px, gold, uppercase) and a small "01" in gold at 80px opacity. Bottom zone (65%): `padding: 3rem 3rem 4rem;` — project title at 64–72px, color `#F5F0E8`, weight 800, letter-spacing -0.03em. Below title: a 1px gold line 40px wide, then client name at 16px in muted gold (`#A09080`). Date at 11px bottom-right.

**Section Headers:**
Left-gutter gold vertical rule (1px, `--t-accent`) as a structural spine. Section label (9px, uppercase, gold) sits to the left of this rule in the narrow gutter. Section heading (36px, white, weight 700) sits right of rule. Rule height = section header block height. CSS: section wrapper uses `display: grid; grid-template-columns: 80px 1fr; gap: 2rem;` with the rule rendered as `border-left: 1px solid var(--t-accent); padding-left: 1.5rem;` on the content column.

**Typography:**
- Cover: 68px, weight 800, letter-spacing -0.03em, color `#F5F0E8`
- Section heading: 36px, weight 700, color `#F5F0E8`
- Body: 14px, line-height 1.75, color `#A09080`, max-width 580px
- Gold accent text: 9–10px, uppercase, letter-spacing 0.18em, color `#D4952A`
- Stats / highlights: 48px, weight 800, color `#D4952A` (used sparingly — 1 per section max)

**Spacing Rhythm:** Controlled. Section padding: `padding: 4rem 3rem`. Between content items: 20px. The restraint in spacing communicates confidence — no wasted space, no over-breathing. Dark bg removes the need for visual breathing room that light designs require.

**Unique Devices:**
1. **Gold vertical rule spine** — runs down the left side of every content section, creating a binding visual device. CSS: `border-left: 1px solid var(--t-accent); padding-left: 2rem;` on the content column of a 2-column grid with an `80px` left gutter for labels.
2. **Gold stat callouts** — single key number per section rendered at 48px in `#D4952A`. For Pricing: the total investment number becomes this callout. For Scope: deliverable count. CSS: `font-size: 48px; font-weight: 800; color: var(--t-accent); line-height: 1; margin-bottom: 0.25rem;`
3. **Section-entry divider strip** — not a component between sections but a full-width 48px-tall strip of `#1A1820` with the section name in 10px uppercase centered within it. Functions as a ribbon between sections. Replaces current `SectionDivider`.

**What Changes From Today:**
- `hasAlternatingSections` stays `false` — entire document stays dark (no light sections)
- All section wrappers: `background: var(--t-bg-primary)` — no alternation needed
- Cover component restructured: two-zone vertical split using `display: flex; flex-direction: column;`
- `SectionHeader` component for Dusk gets theme-specific variant: left gutter grid + gold rule instead of label + underline rule
- `PricingSection` for Dusk: total investment number upgraded to 48px gold type, table font size reduced to 13px to create scale contrast
- Current `SectionDivider` replaced with ribbon strip component for Dusk theme
- Section padding reduced from `p-12` (48px) to `padding: 4rem 3rem` (asymmetric)

**Reference Inspiration:** `download.jpg` (section number decorative device, dark full-bleed), `Gisela Business Proposal` pricing card variant (dark card with bordered sections), `Minimal Blue Pitch Deck` (gold rule spine concept adapted from color-block split)

---

## Template Direction: Signal

**Archetype:** The SaaS Product Spec
**Design Philosophy:** Figma meets Notion meets an Apple keynote handout. This is the template for product studios, SaaS companies, and technical teams who would rather have no design than bad design. Restraint and precision over warmth.

**Structural Signature:**
Swiss-grid construction. Every section is built on a visible implicit 12-column grid. Section headers use the horizontal rule + label pattern (Pattern 6) — a full-width 1px rule at the top of the section, small-caps label below, heading below that. No decorative elements. Alignment does the work. Blue (#007AFF) appears only as a functional accent — single-word highlights, active row indicators, section-count pills.

**Cover:**
Blue (#007AFF) full-bleed. Content anchored to the bottom-left quadrant. Studio name in 10px white uppercase top-left. Project type label (e.g. "PRODUCT DESIGN PROPOSAL") in blue-tinted white, 11px, tracking 0.15em, above the title. Title at 56px, weight 800, white, letter-spacing -0.02em. Client name block: `Prepared for` at 11px white/50%, client name at 18px white bold. Date right-aligned at 11px white/50%. No imagery, no texture. Clean geometry only.

**Section Headers:**
Full-width 1px top rule → 8px gap → section label in 10px uppercase/blue → 12px gap → section heading at 32px weight 700 black. No bottom rule. No accent dot. The horizontal rule IS the decoration.
CSS: `border-top: 1.5px solid var(--t-rule); padding-top: 0.75rem; margin-bottom: 2.5rem;` wrapping a stack of `label (text-[10px] uppercase tracking-[0.15em] text-accent mb-2) + h2 (text-[32px] font-bold tracking-tight)`.

**Typography:**
- Cover: 56px, weight 800, letter-spacing -0.02em
- Section heading: 32px, weight 700, letter-spacing -0.01em
- Subsection label: 10px, uppercase, 0.15em tracking, color `#007AFF`
- Body: 14px, line-height 1.65, color `#6E6E73`, max-width 560px
- Data values (pricing, metrics): 24px, weight 600, color `#000000`
- Table headers: 10px, uppercase, tracking 0.12em

**Spacing Rhythm:** Systematic. All section padding: `padding: 3.5rem`. Section-internal spacing: consistent 20px between content blocks. Timeline items: 16px gap. Pricing rows: 14px padding per row. No variation — system consistency IS the brand signal.

**Unique Devices:**
1. **Section count pill** — top-right of each section header: a small pill (`px-2 py-0.5 rounded-full`) containing the section index (`01`, `02`) in 9px blue. Positioned absolutely. Signals structured, numbered thinking.
2. **Pricing: comparison column layout** — instead of the current 3-column table (Description / Qty / Amount), Signal uses a 2-column split layout for pricing: left 55% is a narrow line-item list in small type, right 45% is a blue-tinted summary box containing only the total, payment terms, and a horizontal rule above. CSS right box: `background: #EBF5FF; border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center;`
3. **Timeline: Gantt-adjacent row** — instead of stacked timeline items, Signal renders phases as horizontal labeled segments in a row. A thin `height: 6px; background: var(--t-border); border-radius: 3px;` bar at the top of each segment, with phase name below and duration as a small badge. Mirrors how technical PMs document timelines.

**What Changes From Today:**
- `SectionHeader` component: remove bottom rule; add top rule + section count pill (top-right absolute)
- Cover component: restructure to blue full-bleed with bottom-anchored content block
- Section padding: change from `p-12` to `padding: 3.5rem` — slight reduction for denser precision feel
- `PricingSection`: redesign to 2-column split — left = line items, right = summary box with total in 36px type
- `TimelineSection`: redesign from stacked vertical items to horizontal phase band
- `SectionDivider`: replace with a simple `border-top: 1px solid var(--t-border); margin: 0 3.5rem;` — no component needed

**Reference Inspiration:** `Minimal Blue Pitch Deck Layout.jpg` (horizontal rule + label pattern, blue color block), `Screenshot 2026-05-15 100201.png` (tile-based data layout, systematic grid), `Gisela Pricing Plan` (two-panel comparison layout for pricing)

---

## Template Direction: Verso

**Archetype:** The Bauhaus Manifesto
**Design Philosophy:** Maximum contrast, zero compromise. This document communicates authority through reduction. Every section alternates between absolute black and absolute white with the conviction that a proposal this structurally confident doesn't need to explain itself.

**Structural Signature:**
True alternating architecture — but the dark and light sections have DIFFERENT structural behaviors, not just different background colors (fixing the current problem). Dark sections: content right-aligned, large numbers decorative on the left. Light sections: content left-aligned, compact type, ruled tables. The alternation creates a visual call-and-response that no other template can replicate.

**Cover:**
Full-bleed black (#111111). Studio name: top-left, 10px white, uppercase. Two-zone split: left 45% — large white decorative number "01" at 200px, weight 900, opacity 0.08. Right 55% (content): project title at 64px white weight 900, letter-spacing -0.04em. Below title: 40px-wide white 1px rule. Client name: 16px white. Date: 10px white/40%. Bottom-left: studio URL or tagline at 10px white/30%. The decorative number creates depth without photography.

**Section Headers:**
DIFFERENT behavior on dark vs. light sections.
- **Dark sections:** Heading is RIGHT-ALIGNED, 48px, white, weight 900. Section label is right-aligned above, 9px uppercase, white/60%. No rule. A large decorative number (section index) sits left-aligned at 120px, weight 900, white, opacity 0.06 — takes no space, sits behind content via `position: absolute; left: 2rem; bottom: 2rem;`.
- **Light sections:** Heading is LEFT-ALIGNED, 36px, black, weight 700. Section label above, 9px black uppercase. A full-width 2px black bottom border under the heading (not a top rule — directional reversal from Signal).

**Typography:**
- Cover: 64px, weight 900, letter-spacing -0.04em
- Dark section heading: 48px, weight 900, right-aligned — this is the key structural departure
- Light section heading: 36px, weight 700, left-aligned
- Body in dark sections: 14px white/80%, right-aligned, max-width 520px, margin-left auto
- Body in light sections: 14px black/70%, left-aligned, max-width 560px
- Decorative number: 120–160px, weight 900, opacity 0.06

**Spacing Rhythm:** Alternating. Dark sections: `padding: 5rem 3rem 4rem` — more top padding, content weight at bottom. Light sections: `padding: 3rem 3rem 5rem` — more bottom padding, content weight at top. Creates a visual oscillation rhythm — sections breathe differently based on their color mode.

**Unique Devices:**
1. **Decorative ghost numbers** — large section-index numbers (120px+, opacity 0.06–0.08) positioned absolutely behind content. On dark sections: left side. On light sections: right side. Creates depth and positional rhythm without adding information.
2. **Right-aligned dark section content** — the most radical departure. ALL content in dark sections (label, heading, body) is right-aligned. This breaks every expectation and makes the dark↔light alternation feel like turning a physical page, not just a color change.
3. **Pricing on dark background** — Verso always renders the Pricing section as a dark section. Line items as large 15px white type with generous 20px row padding. Total at 56px white, right-aligned — the number dominates the section like a billboard.

**What Changes From Today:**
- `hasAlternatingSections: true` stays — but the structural behavior of dark vs. light sections must diverge
- `ProposalRenderer` must pass section index (not just `isInverted` boolean) to sections so they can apply right-align on dark
- All section components need `isInverted` to conditionally apply `text-right` / `ml-auto` to content blocks
- Cover component: add absolutely-positioned `01` numeral (200px, opacity 0.08) on left half
- `SectionHeader` needs two distinct render modes controlled by `isInverted` — not just color swap
- Pricing section: when `isInverted`, total switches from `text-2xl` to `text-5xl` (56px), right-aligned
- `SectionDivider` between sections: a 1px full-width rule, no padding strip — minimal transition

**Reference Inspiration:** `Brand Proposal Presentation Layout Stock Template.jpg` (strict alternating black/cream, all-caps headers), `download.jpg` (decorative section numbers, full-bleed dark entry), `PowerPoint Brand Guidelines` (large ghost numerals as depth device)

---

## Template Direction: Cipher

**Archetype:** The Fintech Dashboard Brief
**Design Philosophy:** Stripe's docs had a baby with a McKinsey deck. This document is for SaaS founders, fintech products, and API-first companies who understand that precision IS the brand. Data is the hero. Typography is the grid.

**Structural Signature:**
Bento-tile grid system. Content is NOT presented as stacked text blocks — it is organized into a grid of discrete tiles where each tile contains exactly one piece of information. Sections feel like a product dashboard, not a document. The purple (#635BFF) appears as a functional system signal — active tile borders, total amounts, key metrics — never as a decorative wash.

**Cover:**
Near-black (#0A0A0F) full-bleed. Grid lines as a structural motif — a subtle 1px grid at 48px intervals in white/3% opacity provides the foundation. Studio name: top-left, 10px purple uppercase. Top-right: small monospace-style date (`2026-05-17`) and a purple pill containing the proposal type (`DESIGN PROPOSAL`). Title: 64px, weight 800, white, letter-spacing -0.03em — set on the lower-left. Below title: 3 metric tiles inline: `[Scope Type] [Timeline] [Estimate]` — each a small `60px × 24px` pill with label/value. These tiles on the cover set the expectation: this is a data-driven proposal.

**Section Headers:**
A horizontal band at the top of each section: full-width, `background: var(--t-bg-secondary)` (#F4F4F8), height 48px, contains section label left-aligned in 10px purple uppercase with `letter-spacing: 0.15em`, and section number right-aligned in 10px muted gray. Below this band, section heading at 28px weight 700 black — smaller than other templates because the band already announces the section. CSS: band `padding: 0 3rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--t-border);`.

**Typography:**
- Cover: 64px, weight 800, letter-spacing -0.03em, white
- Section band label: 10px, uppercase, 0.15em tracking, `#635BFF`
- Section heading: 28px, weight 700, `#0A0A0F` — notably smaller than other templates (signals density, not hierarchy)
- Body: 14px, line-height 1.6, `#6B7280`, max-width 520px
- Tile value: 32–40px, weight 700, `#0A0A0F`
- Tile label: 10px, uppercase, `#6B7280`
- Monospace-adjacent elements: use `font-variant-numeric: tabular-nums; letter-spacing: -0.01em;`

**Spacing Rhythm:** Dense. Section padding: `padding: 0 3rem 3rem` — the header band provides the top boundary, no additional top padding needed. Tile grid gap: `gap: 1px` with `background: var(--t-border)` on the grid container (negative space IS the border). This creates a seamless tiled layout with hairline separators. Very different from the generous `p-12` currently used.

**Unique Devices:**
1. **Section header band** — a 48px full-width gray band at the top of every section containing the section label (purple, left) and section index (muted, right). Functions like a table column header — signals "this section is a structured data zone." CSS: `background: #F4F4F8; border-bottom: 1px solid var(--t-border); padding: 0 3rem; height: 48px; display: flex; align-items: center; justify-content: space-between;`
2. **Bento pricing grid** — pricing section uses a 3-column tile grid instead of a table. Left 2 columns: individual line-item tiles (`background: white; border: 1px solid var(--t-border); padding: 1.25rem;`). Right column (spanning full height): a summary tile with purple left-border (`border-left: 3px solid #635BFF`), containing total amount in 40px type, currency, payment terms. The table is dissolved into a spatial arrangement.
3. **Cover metric pills** — 3 inline data pills on the cover: `[TIMELINE: 6 weeks] [DELIVERABLES: 12] [INVESTMENT: $24,000]`. Each pill: `border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 0.25rem 0.75rem; font-size: 11px; color: rgba(255,255,255,0.7); display: inline-flex; gap: 0.5rem;` with label in purple and value in white.

**What Changes From Today:**
- `SectionHeader` component: replace with two-part structure — `SectionBand` (48px header strip) + `SectionTitle` (h2 below). The band is new, the underline rule is removed.
- All section wrappers: remove `p-12` — use `padding: 0 3rem 3rem` with band providing top anchoring
- Cover component: add inline metric pills row, add subtle grid motif background (CSS `background-image: linear-gradient` grid pattern)
- `PricingSection` for Cipher: convert from table to bento grid — 2-col line items + 1-col summary tile
- `OverviewSection` for Cipher: add a 3-tile stat row above body (e.g., Project Category / Timeline / Deliverable Count) using bento tile style
- Section divider between sections: remove `SectionDivider` component — the band header of the next section IS the divider
- Font: consider adding `font-variant-numeric: tabular-nums` to all number displays via theme class

**Reference Inspiration:** `Screenshot 2026-05-15 100201.png` + `100244.png` (bento tile grid system, neon accent on key data), `Gisela Business Proposal Pricing Plan.jpg` (all 3 pricing layout variants — card grid is the Cipher model), `Minimal Blue Pitch Deck` (section band / header label pattern)

---

## Implementation Guidance

### Architecture Decision
The current system renders all 5 templates through a single `ProposalRenderer` + shared section components with CSS token overrides. To achieve structural differentiation without breaking the data model, the recommended approach is:

**Option A — Theme-aware section variants (recommended)**
Add a `layoutVariant` property to `ThemeConfig` (e.g., `'editorial' | 'luxury' | 'swiss' | 'bauhaus' | 'dashboard'`). Pass the active `layoutVariant` down through context. Each section component reads the variant and renders a different structural layout while consuming the same data.

```ts
// themes.ts addition
folio: { ..., layoutVariant: 'editorial' }
dusk:  { ..., layoutVariant: 'luxury'   }
signal:{ ..., layoutVariant: 'swiss'    }
verso: { ..., layoutVariant: 'bauhaus'  }
cipher:{ ..., layoutVariant: 'dashboard'}
```

**Option B — Template-specific section overrides**
Create a `sections/variants/` folder with template-specific section files. The `ProposalRenderer` imports the section set based on `themeId`. More code, cleaner isolation.

Either approach works. Option A is faster to ship. Option B is cleaner long-term.

### Concrete CSS/Layout Changes Per Template

**Folio (editorial):**
```
Section wrapper:     padding: 5rem 4rem 5rem 8rem; position: relative;
SectionHeader:       remove bottom rule; add left margin label (position: absolute; left: 2rem; transform: rotate(-90deg); font-size: 9px);
Section h2:          font-size: 40px; font-weight: 700; letter-spacing: -0.02em;
Body text:           font-size: 15px; line-height: 1.8; max-width: 600px;
Cover h1:            font-size: 76px; font-weight: 800; letter-spacing: -0.03em;
SectionDivider:      1px rule, width: 25%, margin-left: auto (right-aligned)
```

**Dusk (luxury):**
```
Section wrapper:     display: grid; grid-template-columns: 80px 1fr; gap: 0; position: relative;
Left gutter:         border-right: 1px solid var(--t-accent); padding: 4rem 1.5rem;
Content column:      padding: 4rem 3rem 4rem 2rem;
Section h2:          font-size: 36px; color: var(--t-text-primary);
Pricing total:       font-size: 48px; font-weight: 800; color: var(--t-accent);
Cover:               2-zone flex column; bottom zone padding-bottom: 4rem;
SectionDivider:      48px full-width band; background: #1A1820; section-name centered 10px uppercase
```

**Signal (swiss):**
```
Section wrapper:     padding: 3.5rem;
SectionHeader:       border-top: 1.5px solid var(--t-rule); padding-top: 0.75rem; no bottom rule;
Section label:       font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--t-accent-text);
Section h2:          font-size: 32px; font-weight: 700; letter-spacing: -0.01em;
Section pill:        position: absolute; right: 3.5rem; top: 3.5rem; border-radius: 999px; border: 1px solid var(--t-border);
Pricing:             display: grid; grid-template-columns: 55% 45%; gap: 2rem;
Pricing right box:   background: #EBF5FF; border-radius: 8px; padding: 1.5rem;
Pricing total:       font-size: 36px; font-weight: 700; color: #007AFF;
SectionDivider:      border-top: 1px solid var(--t-border); margin: 0 3.5rem;
```

**Verso (bauhaus):**
```
Dark section wrapper:    padding: 5rem 3rem 4rem; text-align: right; position: relative;
Dark section h2:         font-size: 48px; font-weight: 900; text-align: right; letter-spacing: -0.04em;
Dark section body:       text-align: right; margin-left: auto; max-width: 520px;
Ghost number:            position: absolute; left: 2rem; bottom: 2rem; font-size: 140px; font-weight: 900; opacity: 0.06; line-height: 1; color: white; pointer-events: none;
Light section wrapper:   padding: 3rem 3rem 5rem; text-align: left; position: relative;
Light section h2:        font-size: 36px; font-weight: 700; border-bottom: 2px solid #111111; padding-bottom: 0.5rem;
Ghost number (light):    position: absolute; right: 2rem; bottom: 2rem; color: #111111; opacity: 0.05;
Dark pricing total:      font-size: 56px; font-weight: 900; text-align: right; color: white;
Cover ghost:             left section; font-size: 200px; opacity: 0.06;
```

**Cipher (dashboard):**
```
Section wrapper:     padding: 0 3rem 3rem; (no top padding — band provides it)
SectionBand:         background: var(--t-bg-secondary); height: 48px; display: flex; align-items: center; justify-content: space-between; padding: 0 3rem; border-bottom: 1px solid var(--t-border); margin: 0 -3rem 2rem; (full bleed within wrapper)
Section label:       font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #635BFF;
Section index:       font-size: 10px; color: var(--t-text-secondary);
Section h2:          font-size: 28px; font-weight: 700; letter-spacing: -0.01em; margin-bottom: 1.5rem;
Pricing grid:        display: grid; grid-template-columns: 1fr 1fr 320px; gap: 1px; background: var(--t-border);
Line item tiles:     background: white; padding: 1.25rem;
Summary tile:        background: white; border-left: 3px solid #635BFF; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center;
Pricing total:       font-size: 40px; font-weight: 700; color: #0A0A0F;
Cover pills:         display: flex; gap: 0.75rem; margin-top: 2rem;
Cover pill item:     border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; padding: 0.25rem 0.75rem; font-size: 11px;
```

---

## Priority Order

**1. Verso — first.** It already has `hasAlternatingSections: true`, meaning the infrastructure for dark/light alternation exists. The structural change (right-align dark content + ghost numbers) is high-impact with moderate implementation complexity. It will immediately prove that structural differentiation works.

**2. Cipher — second.** The `SectionBand` header pattern is a self-contained new component that doesn't break other templates. Once built, the bento pricing grid follows. High visual differentiation payoff.

**3. Signal — third.** The top-rule + label SectionHeader variant is quick to implement. The pricing 2-column split is the only complex piece. Signal's visual change is the most surgical — it will look radically more refined with minimal code change.

**4. Dusk — fourth.** The 2-column grid with gold rule spine requires the most ProposalRenderer refactoring to thread the grid into every section wrapper. Worth doing correctly rather than quickly.

**5. Folio — last.** Folio is the FREE tier and doesn't block conversions to PRO. The left-margin editorial treatment is the most complex CSS positioning work (rotated labels, absolute positioning within flow). Ship the others first, let Folio be the showcase for editorial craft.
