# Proposly GTM Strategy & SOP
*v1.0 — Monolith Studio — 17 May 2026*

---

## 1. Product Positioning

### One-Liners by Channel

| Channel | Line |
|---|---|
| Twitter/X | "Write a proposal in 3 steps. Send it in 5 minutes. Never touch Word again." |
| Product Hunt tagline | "Client-ready proposals in under 5 minutes. PDF perfect. No subscription." |
| LinkedIn (founder POV) | "I built the tool I always wanted as a freelance designer — a proposal builder that's actually beautiful and costs $20 once." |
| Reddit / community | "Skip the Word doc. Proposly generates a formatted PDF proposal in under 5 minutes." |
| SEO meta description | "Proposly is a proposal builder for freelancers and agencies. Fill a 3-step form, get a beautiful PDF. $20 lifetime, no subscription." |

### Category Positioning

**Don't call it a "proposal tool."** Position it as:

> **The proposal layer for solo creatives and small agencies.**

Own the niche: **one-time purchase, design-quality output, zero PM bloat.**

This puts Proposly in a category between:
- "Too much" → Bonsai, HoneyBook, Dubsado (subscriptions, CRM, invoicing)
- "Too generic" → Notion, Canva (not built for proposals at all)

The gap: purpose-built + beautiful + one-time price. That's the hole. Own it.

### Primary ICP

**Who:** Freelance designer or UX consultant, 1–3 years in, working independently or as a solo studio.

**Specifics:**
- Revenue bracket: $3K–$15K/month
- Tool stack: Figma + Notion + Loom + maybe some CRM they barely use
- Pain: spends 2–4 hours formatting a proposal in Notion or Word, sends it, client says "can you resend as PDF," repeat
- Current workaround: Canva template they've been abusing for 18 months
- Trigger moment: Lost a project to a competitor whose proposal "looked more professional" — OR — just had to redo a proposal from scratch for the third time in a month

**Psychographic:** Values craft, cares about first impressions, hates administrative overhead, will pay $20 without a second thought if the demo convinces them in 60 seconds.

**Where to find them:** Designer Slack groups, Figma Community, Twitter design circles, r/freelance, r/web_design, local agency forums.

### Secondary ICP

**Who:** Small agency owner (2–10 people), often has a designer but no ops stack.

**Pain:** Proposals are written by whoever has time, formatting is inconsistent, no version control, PDF export is always broken.

**Trigger moment:** New business meeting in 3 days, no proposal template that doesn't embarrass them.

**Difference from primary:** Higher willingness to pay, longer sales cycle to evaluate, more likely to need multiple seats in V2 (but MVP serves them as a single-account tool).

### Anti-Positioning (What Proposly Is NOT For)

- Enterprise sales teams with 15-stage approval flows
- Agencies who already use Salesforce CPQ or Pandadoc (too embedded)
- Anyone who needs e-signature natively (out of scope, add in V2)
- Project management — Proposly ends at the signed proposal, not the project
- Users who expect AI to write the proposal for them (MVP is structured smart form, not AI)

---

## 2. Launch Phases

### Phase 0: Pre-Launch (Now → Launch Day)

**Goal:** Ship the product. Build the audience skeleton. Have all assets ready.

Build checklist (product):
- [ ] Phases 2–7 complete (Supabase, Clerk, PDF export, Lemon Squeezy, share links, polish)
- [ ] Domain live (proposly.io or proposly.app — check availability immediately)
- [ ] Vercel deploy stable
- [ ] Lemon Squeezy $20 product live, test purchase working
- [ ] Error states tested: failed payment, failed export, empty dashboard

Build checklist (marketing):
- [ ] Landing page live with waitlist form (before full launch)
- [ ] Twitter/X account created @proposly (or @useproposly)
- [ ] Product Hunt draft created, assets uploaded, scheduled
- [ ] Demo video recorded (90 seconds — see §3)
- [ ] 3 OG/social preview images ready (1200×630px)
- [ ] Product Hunt gallery (5 images minimum — see §4)
- [ ] Email welcome sequence written (3 emails: welcome → feature tip → upgrade nudge)

Audience building before launch:
- Post build-in-public thread on Twitter (3–5 posts showing the product being built)
- Drop one teaser in 2–3 designer Slack groups with a waitlist link
- Post one preview on Indie Hackers: "Building Proposly — proposal builder for freelancers — want early access?"
- Target: 200+ waitlist signups before launch day

### Phase 1: Soft Launch (Invite-Only, Week 1–2)

**Goal:** Validate core flow, collect testimonials, fix critical bugs.

- Send waitlist access in batches of 25–50
- Embed a 2-question in-app survey after first proposal created: "What did you use before?" and "What would make you upgrade to Pro?"
- Target: 10 paying Pro users before public launch
- Manual outreach: DM 20 designers you know personally. Ask for honest feedback + a testimonial if they like it.
- Collect: 3–5 social proof quotes with names and roles for landing page

### Phase 2: Public Launch

**Goal:** Maximum distribution in 48 hours.

Day of launch:
- Product Hunt goes live at 00:01 PT (product launches at midnight)
- Post across all platforms simultaneously (Twitter, LinkedIn, Reddit, Indie Hackers)
- Email waitlist list the launch link
- Ask 5 people specifically to upvote on PH at launch time
- Respond to every PH comment within 30 minutes during the first 6 hours
- Post a "Day 1 live" tweet with a GIF of the product working

Week 1 post-launch:
- Submit to directories (see §6)
- Post "Launch debrief" on Indie Hackers (transparent numbers: visitors, signups, conversions)
- Follow up with anyone who signed up free — short personal email from Jatin

### Phase 3: Post-Launch Growth

**Goal:** Compound via SEO, community, and the portfolio flywheel.

Month 1–3:
- Publish 2 SEO articles/month targeting proposal-related keywords (see §3 SEO section)
- Post one "behind the build" piece per week on Twitter
- Collect one new testimonial per week from active users
- Add a case study page: "How [designer name] used Proposly to close a $12K project"
- Submit to all remaining directories
- Explore AppSumo (see §3)

Month 3+:
- Evaluate V2 features based on in-app survey data (e-signature? AI writing? team seats?)
- Bundle Proposly into Monolith Studio's future tool suite with a suite price
- Start affiliate program if conversion data justifies it ($4–5 per Pro referral)

---

## 3. Platform-by-Platform Strategy

### Product Hunt

**Who's there:** Early adopters, indie hackers, SaaS buyers, VCs, tool collectors. High designer density.

**What to submit:** Full product launch with complete gallery (5 images + video).

**Day-of plan:**
- Launch at 00:01 PT on a Tuesday or Wednesday (highest traffic days)
- Schedule launch 2–3 weeks in advance so gallery is indexed
- Hunter: Use a Product Hunt account with 500+ followers if possible, or launch yourself with a solid follower base. Do not use a "hunter service" — authenticity matters.
- First comment (post as maker): 3–4 sentences, personal, specific. "I'm a freelance designer who spent 3 years hacking Notion templates into proposals. This is what I actually wanted. Free tier is real — 1 proposal, Folio template, no card required."
- Respond to every comment for the first 6 hours — velocity matters for algorithm ranking
- Share the PH link 3× on Twitter during launch day: morning, noon, evening (US time)
- Target: Top 5 of the day. Top 3 of the day unlocks newsletter mention.

**Gallery assets (required):**
1. Hero: Dashboard overview with proposals pipeline
2. Wizard step — clean form in action
3. Before/after: messy Word doc → Proposly PDF
4. Template grid (all 5)
5. Share link + view analytics screen
- Video: 90-second Loom-style walkthrough embedded as first asset

**Expected outcome:** 300–800 upvotes if launched properly. 500–2,000 unique visitors on launch day. 50–150 signups. 5–20 Pro purchases.

---

### AppSumo / Gumroad

**AppSumo analysis:**
- Fit: Medium. AppSumo audience loves one-time tools. $20 is actually too cheap for AppSumo — they typically sell $49–$149 deals.
- Risk: AppSumo customers expect lifetime deal pricing AND ongoing updates. Volume is high but margins are worse.
- Recommendation: **Wait until V2** with more features (e-signature, team seats, AI writing). Reposition at $49 for AppSumo. Launch AppSumo 6+ months post-public launch.

**Gumroad analysis:**
- Fit: High. Design community shops on Gumroad. Good for discovery among freelancers.
- Action: **List on Gumroad now.** Create a listing: "Proposly Pro — Lifetime License" at $20. Gumroad takes 10% but the discovery is worth it. Write a Gumroad-specific description with a GIF.
- Expected: 10–30 additional Pro purchases per month passively.

---

### Indie Hackers

**Who's there:** Bootstrapped founders, solopreneurs, SaaS builders. Strong overlap with target ICP.

**What to post:**
1. **Pre-launch:** "I'm building a proposal builder for freelancers — here's why existing tools all miss the mark" (problem framing post, no product link yet)
2. **Launch day:** "Proposly launched on Product Hunt today — here's the honest numbers from Day 1"
3. **Month 1:** "$[X] in first 30 days selling a $20 one-time tool — here's what worked"
4. **Monthly:** Revenue transparency posts — Indie Hackers rewards honest milestone posts with featured placement

**Cadence:** 1 post per month. Quality over volume — IH rewards depth.

**Expected outcome:** 100–300 referral visitors per post. 5–15 signups. Strong SEO backlinks.

---

### Hacker News

**Show HN — when and how:**
- **When:** Only post Show HN after you have at least 10 real users with testimonials. HN is brutal to unpolished products.
- **Title format:** "Show HN: Proposly – proposal builder for freelancers (3-step wizard, PDF export, $20 lifetime)"
- **Post on a weekday morning US EST.** Peak HN traffic is 8–11am EST.
- **First comment (self):** Address the obvious question — "Why not Bonsai or HoneyBook?" Answer: subscription fatigue + PM bloat. Be direct, no marketing language.
- **Do not post if:** The product has critical bugs, missing core flow, or no real users yet.

**Expected outcome:** HN is unpredictable. 0 upvotes or 200. If it hits front page, expect 1,000–5,000 visitors in 24 hours. Worth one shot, not worth optimizing heavily for.

---

### Twitter/X

**Build-in-public strategy:**

**Audience to build:** Designers, freelancers, indie hackers, agency owners. These people are all on Twitter. The design community specifically is active here.

**Pre-launch cadence (4 posts/week):**
- 1 × "building this" post with a screenshot or GIF
- 1 × observation/opinion post about the problem ("Freelancers spend 4 hours on proposals they should spend 20 minutes on")
- 1 × engagement post (poll, question, ask for opinions)
- 1 × personal thread about the studio/journey

**Post-launch cadence (3 posts/week):**
- 1 × product update or new feature
- 1 × user story or testimonial
- 1 × opinion/insight post (proposal writing, client work, freelancing)

**Format that works:**
- GIFs of the product in motion (dashboard, wizard, PDF output)
- Before/after screenshots (Word doc vs Proposly PDF)
- "I just closed a $X project using this proposal" (with user permission)
- Numbers: "Proposly hit $1K in its first week — here's what I did"

**What not to do:** Don't post pure promotional tweets. Don't repost the same content. Don't post without visuals.

**Expected outcome:** 50–200 followers in first month of consistent posting. 10–30 signups per viral tweet.

---

### LinkedIn

**Jatin's personal brand angle — designer/founder POV:**

**Who's there:** Agency owners, brand managers, marketing leads, startup founders. Decision-makers who commission design work. This is a secondary Proposly audience but a primary Monolith Studio audience.

**Posting angle:** Not "look at my product" — position as "design industry perspective from someone building tools for designers."

**Post types:**
1. "Why freelancers lose proposals to less-talented competitors" (design quality thesis)
2. "What I learned building a SaaS tool as a solo designer" (founder journey)
3. "The $20 proposal that closes $15K projects" (ROI framing)
4. Product announcement: clean, visual, with the PDF output as the hero image

**Cadence:** 2 posts/week. LinkedIn rewards consistency and personal narrative.

**Expected outcome:** LinkedIn converts slower but referrals are higher quality. Expect 5–15 Pro conversions/month from LinkedIn once the audience grows.

---

### Reddit

**Subreddits and tactics:**

| Subreddit | Size | Fit | What to post |
|---|---|---|---|
| r/freelance | 420K | High | "Here's what helped me win more proposals" — value post, product as solution |
| r/web_design | 250K | High | Before/after screenshot post. Let the output speak. |
| r/graphic_design | 850K | Medium | Template showcase — focus on the visual quality of PDFs |
| r/agencies | 50K | High | "How do you send proposals?" — question thread, then introduce product naturally |
| r/SideProject | 180K | Medium | Product launch post, transparent numbers |
| r/Entrepreneur | 1.4M | Low-medium | Only post revenue milestones, not the product itself |

**Rules for Reddit:**
- Never post a direct product link in your first comment in a thread you didn't start. Add value first.
- r/freelance and r/web_design have "self-promotion" limits — post genuine value, mention the product when relevant
- Screenshot posts (no link) perform better than link posts on most design subreddits
- Best performing format: "I built this because I was frustrated with X — here's what the output looks like" with a PDF screenshot

**Expected outcome:** 1–3 Reddit posts/month. Each well-received post: 50–300 visitors, 5–20 signups.

---

### YouTube / Loom

**Demo video — what it should show:**

- **Length:** 90 seconds maximum. 60 seconds is better.
- **No voiceover narration for the first 10 seconds.** Open with the finished PDF. Hook immediately.
- **Structure:**
  - 0–10s: Show a beautiful finished proposal PDF. "This took 4 minutes."
  - 10–30s: Open Proposly. Pick a template. Pick a category.
  - 30–60s: Fill the form. Watch the live preview update.
  - 60–75s: Hit export. PDF downloads. Share link generated.
  - 75–90s: "$20 once. Unlimited proposals. No subscription." → CTA to proposly.io
- **Music:** Instrumental, clean. No upbeat corporate track.
- **Captions:** Yes. Always.
- **Hosting:** Upload to YouTube (for SEO) AND embed on landing page. Also save as GIF for Twitter.

**YouTube channel strategy:** Not a priority in Phase 1. One video is enough. If you want to build a channel, do "freelance proposals" tutorial content — these rank well.

---

### SEO / Content

**5 keyword clusters to target:**

| Cluster | Target Keywords | Intent | Page to Build |
|---|---|---|---|
| 1. Proposal templates | "freelance proposal template", "agency proposal template PDF", "design proposal template" | Commercial | `/templates` — showcase all 5 templates with downloads or previews |
| 2. Proposal builders | "proposal builder for freelancers", "online proposal maker", "best proposal software freelance" | Commercial | Landing page + comparison page |
| 3. How to write proposals | "how to write a freelance proposal", "what to include in a project proposal" | Informational | Blog post — internal links to product |
| 4. vs competitors | "proposly vs bonsai", "bonsai alternatives", "honeybook alternatives freelancers" | Navigational/commercial | Comparison landing pages |
| 5. Pricing + costs | "freelance proposal software pricing", "free proposal template", "proposal tool no subscription" | Commercial | Pricing page with comparison table |

**Pages to build (priority order):**
1. `/templates` — template gallery with PDF previews (P0, drives conversions)
2. Blog post: "How to Write a Freelance Design Proposal (With Template)" (P0, drives organic)
3. `/vs-bonsai` and `/vs-honeybook` comparison pages (P1)
4. Blog post: "5 Mistakes Freelancers Make in Project Proposals" (P1)
5. Blog post: "How to Price Your Design Services (And Communicate It Clearly)" (P2)

**SEO basics to ship at launch:**
- Title tags and meta descriptions on all pages
- OG image on all pages
- `/sitemap.xml` submitted to Google Search Console
- Schema markup on pricing page

---

### Design Communities

| Community | Platform | What to post | Priority |
|---|---|---|---|
| Figma Community | Figma | Publish a free "Proposal Layout" Figma file that links to Proposly | P0 |
| Dribbble | Dribbble | Post the 5 template PDFs as shots. Link to proposly.io in bio. | P1 |
| Behance | Behance | Full case study: "Designing Proposly — a proposal tool for freelancers" | P1 |
| Designer Slack groups | Slack | Share launch post in #tools or #resources channels | P0 |
| Designers on Reddit | r/web_design | Template showcase (visual, no hard sell) | P1 |
| Layers.to | layers.to | Portfolio listing (good SEO backlink) | P2 |
| Fonts In Use | fontsinus.com | Not relevant | Skip |

**Designer Slack groups to target:**
- Designer Hangout (~2,600 members)
- Hexagon UX
- Friends of Figma (local chapters)
- Rethink (product design)
- Any local design community Slacks (India design communities for secondary market)

**Figma Community play:** This is the highest-leverage move in this category. A free "Client Proposal Starter" Figma template with a clear CTA to Proposly will generate passive signups indefinitely. Takes 2 hours to build.

---

### Direct Outreach

**Agency directories to target:**

| Directory | Action |
|---|---|
| Clutch.co | Find agencies with <10 reviews (small shops) → DM them |
| Dribbble Pro directory | Filter freelance designers → DM with demo link |
| Toptal designer profiles | Find freelancers with public contact → email |
| Contra creator directory | Direct message |
| LinkedIn search | "freelance UX designer" + open to work → connect + DM |

**Cold DM script (Twitter/LinkedIn):**

> "Hey [name] — saw your work on [project/platform]. I built a proposal tool specifically for designers like you — cuts proposal prep from 2 hours to 5 minutes, PDF-perfect output, $20 once. Happy to give you free Pro access in exchange for honest feedback. Interested?"

**Rules:**
- Personalize the first line. Always. Generic cold DMs get 2% response rate.
- Offer free Pro, not a discount. You want testimonials more than revenue right now.
- Target 10 DMs/day during pre-launch. 50–100 total before launch.
- Expected response rate: 10–20% with personalization. Expected conversions to active users: 30–50%.

---

## 4. Marketing Assets Required

### Static Visuals

| Asset | Format | Dimensions | Priority | Creator |
|---|---|---|---|---|
| OG image — homepage | PNG | 1200×630 | P0 | Figma + Jatin |
| OG image — app/pro page | PNG | 1200×630 | P0 | Figma + Jatin |
| Product Hunt thumbnail | PNG | 240×240 | P0 | Figma + Jatin |
| PH gallery image 1 — Dashboard hero | PNG | 1270×952 | P0 | Screenshot + Figma |
| PH gallery image 2 — Wizard form | PNG | 1270×952 | P0 | Screenshot + Figma |
| PH gallery image 3 — Before/after | PNG | 1270×952 | P0 | Figma |
| PH gallery image 4 — Template grid | PNG | 1270×952 | P0 | Screenshot + Figma |
| PH gallery image 5 — Share/analytics | PNG | 1270×952 | P0 | Screenshot + Figma |
| Twitter social card | PNG | 1200×675 | P0 | Figma + Jatin |
| LinkedIn post image | PNG | 1200×627 | P0 | Figma + Jatin |
| Dribbble shots (5 templates) | PNG | 800×600 | P1 | PDF export from app |
| Gumroad cover image | PNG | 1500×1000 | P1 | Figma |
| Favicon / brand mark | SVG/ICO | 32×32, 180×180 | P0 | Figma + Jatin |

### Motion / Video

| Asset | Format | Length | Priority | Creator |
|---|---|---|---|---|
| 90-second demo video | MP4 | 90s | P0 | Loom or screen record |
| GIF — wizard to PDF | GIF | 10–15s | P0 | Screen record → ezgif |
| GIF — dashboard overview | GIF | 8–10s | P1 | Screen record → ezgif |
| GIF — template switching | GIF | 6–8s | P1 | Screen record → ezgif |
| PH video (embedded in gallery) | MP4 | 90s | P0 | Same as demo video |

### Copy

| Asset | Priority | Notes |
|---|---|---|
| Landing page — headline + subheadline | P0 | 3 variants, A/B test |
| Landing page — feature descriptions (3 features) | P0 | Benefit-first, not feature-first |
| Landing page — FAQ (8 questions) | P0 | Address price, trust, and comparison objections |
| Pricing page copy | P0 | Free vs Pro comparison table |
| Product Hunt — tagline + description (260 chars) | P0 | Must be punchy |
| Email sequence: welcome → feature tip → upgrade nudge | P0 | 3 emails, 3/7/14 day cadence |
| Upgrade page copy | P1 | Loss-aversion framing, not feature list |
| Gumroad listing description | P1 | 400 words max |
| Twitter bio | P0 | One line, includes link |
| LinkedIn post: launch announcement | P0 | Written from Jatin's POV |

### Landing Page Sections (What's Needed)

| Section | Notes | Priority |
|---|---|---|
| Hero | Headline + subheadline + CTA + demo video or GIF | P0 |
| How it works | 3-step visual (not a feature list) | P0 |
| Template gallery | All 5 templates with PDF preview images | P0 |
| Pricing table | Free vs Pro, comparison row by row | P0 |
| Social proof | 3–5 quotes with name, title, and avatar | P1 (need users first) |
| Competitor comparison table | Proposly vs Bonsai vs Notion/Canva | P1 |
| FAQ | 8 questions addressing objections | P0 |
| Footer | Links, email, Twitter, Indie Hackers | P0 |

### Launch Kit — Product Hunt Gallery (5 Images)

Image 1 — **Dashboard overview:** Show the pipeline bar, stat tiles, and a grid of 4–5 proposals with status badges. Dark/light both visible. Headline overlay: "Your proposal pipeline, at a glance."

Image 2 — **The wizard:** Show Step 2 (form) with a live preview side-by-side. Highlight: category pills, section tabs, editable fields. Headline: "Fill a form. Watch the proposal write itself."

Image 3 — **Before/after:** Left side: a messy Word doc or Notion page. Right side: the Folio template PDF, clean and formatted. No headline needed — the contrast sells.

Image 4 — **Template grid:** All 5 templates in thumbnail. Label Free and Pro. Accent: "5 agency-grade templates. Pick one."

Image 5 — **Share + analytics:** Show the share link screen with a view count. Headline: "Know when your client opens the proposal."

---

## 5. Revenue Goals & Funnel Math

### The Funnel

| Stage | Realistic Rate | Notes |
|---|---|---|
| Visitor → Signup (free) | 8–12% | Good landing page + free tier removes friction |
| Signup → Active (creates 1 proposal) | 40–60% | Core activation metric |
| Active free → Pro | 15–25% | One-time purchase lowers resistance vs subscription |
| Overall visitor → Pro | ~2–3% | Industry benchmark for one-time tools |

### Revenue Targets

**$1K MRR equivalent (first $1K month):**
- At $20/Pro: need **50 Pro purchases** in a month
- Funnel math: 50 Pro ÷ 20% free-to-pro rate = 250 active free users needed
- 250 active ÷ 50% activation = 500 signups needed
- 500 signups ÷ 10% visitor-to-signup = **5,000 visitors that month**
- Achievable with Product Hunt launch + 2–3 Reddit posts + Twitter traction

**$5K month:**
- Need **250 Pro purchases** in a month
- OR: accumulating base — 500 total Pro users, still getting 50/month new
- 250 Pro/month = 25,000 monthly visitors at 2% overall conversion
- This requires SEO traction + established community presence (Month 3+)

**$50K total revenue:**
- **2,500 lifetime Pro purchases at $20** = $50,000
- This is the break-even/milestone number, not monthly recurring
- Timeline: achievable in 12–18 months with consistent distribution

### Break-Even Math

**Fixed costs (estimated):**
| Item | Monthly Cost |
|---|---|
| Vercel (Pro) | $20 |
| Supabase (Pro) | $25 |
| Clerk (Pro) | $25 |
| Domain | $2 |
| Lemon Squeezy | 5% + $0.50 per transaction |
| Total (ex-Lemon Squeezy) | ~$72/month |

**Break-even:** 4 Pro purchases/month covers fixed costs ($80 revenue, $72 costs).

**Lemon Squeezy cut per $20 sale:** ~$1.50 = net $18.50 per sale.

**Real break-even:** 4 Pro sales/month. Everything above that is margin.

---

## 6. Listing Strategy

### Priority Listings (Submit in First 30 Days)

| Directory | Category | Why | Expected traffic |
|---|---|---|---|
| Product Hunt | SaaS, Productivity | High traffic, credibility, backlink | 500–5,000 on launch day |
| Gumroad | Tools, Design | Design community buys here, passive | 10–50/month |
| Futurepedia | AI Tools | Wrong fit but high DA, easy submission | 20–100/month |
| There's An AI For That | Tools | Same — wrong AI fit but high discovery | 20–50/month |
| Toolfolio | Design tools | Direct fit | 10–30/month |
| SaaSHub | SaaS directory | DA backlink, aggregator | 10–20/month |
| BetaList | Early-stage products | Pre-launch waitlist signups | 50–200 (one-time) |
| Indie Hackers product page | Bootstrapped SaaS | Community + milestone posts | 20–50/month |
| Alternativeto.net | List as alternative to Bonsai + HoneyBook | Search intent capture | 30–100/month |
| G2 / Capterra | Early listing | Credibility + search | 5–20/month |

### Skip (For Now)

| Directory | Reason |
|---|---|
| AppSumo | Wait for V2 with more features, price at $49+ |
| Envato Market | Wrong format — not a template/theme |
| Shopify App Store | Not applicable |
| Chrome Web Store | Not an extension |

### Copy for Key Listings

**Product Hunt tagline (260 chars):**
"Proposly — client-ready proposals in 5 minutes. Pick a template, fill a 3-step wizard, export a beautiful PDF. No subscription. No PM bloat. $20 lifetime. Built for freelancers and agencies."

**AlternativeTo (for Bonsai listing):**
"Proposly is a lightweight proposal builder with no subscription required. Unlike Bonsai, it has no project management features — it's laser-focused on one thing: a beautiful, formatted PDF proposal in under 5 minutes."

**G2 category:** CRM Software → Proposal Software. Subcategory: Proposal Management.

---

## 7. First 90 Days Timeline

### Month 1: Build + Seed

**Week 1 (May 18–24):** Complete Phases 2–3 (Supabase + Clerk). Domain purchased. Get the app live, even if export isn't ready.

**Week 2 (May 25–31):** Complete Phases 4–5 (export + Lemon Squeezy). Test payment end-to-end. Deploy to Vercel.

**Week 3 (Jun 1–7):** Complete Phases 6–7 (share links + polish). Record demo video. Create all PH gallery images. Set up BetaList listing. Start waitlist.

**Week 4 (Jun 8–14):** Soft launch to waitlist (50 people). First 3 build-in-public tweets. DM outreach to 20 designers. Submit to BetaList. Collect feedback. Fix bugs. Publish Figma Community template.

### Month 2: Launch

**Week 5 (Jun 15–21):** Product Hunt launch. Submit to Gumroad, AlternativeTo, SaaSHub, Indie Hackers. Post on Reddit (r/freelance, r/web_design). LinkedIn launch post. Respond to all comments. Write Indie Hackers launch post.

**Week 6 (Jun 22–28):** Write first SEO blog post ("How to Write a Freelance Design Proposal"). Submit to all directory listings. Post "Day 1 honest numbers" on Indie Hackers + Twitter.

**Week 7 (Jun 29 – Jul 5):** Write second SEO post (competitor comparison). Submit sitemap to Google Search Console. Start Dribbble posting (5 template shots over 5 days). Collect and publish first testimonials on landing page.

**Week 8 (Jul 6–12):** Email sequence review — optimize subject lines based on open rates. DM outreach round 2 (10/day). Post first HN Show HN if you have 10+ real users. Add comparison table to landing page.

### Month 3: Compound

**Week 9–10:** Write 2 more SEO articles. Post Behance case study. Add social proof to landing page. Review in-app survey data — identify top upgrade blockers.

**Week 11–12:** Based on data: ship one V2 feature if there's a clear signal. Start planning AppSumo pitch (timeline: Month 6). Begin building Monolith Studio tool #2 — use the GTM SOP from §9.

---

## 8. KPIs & Success Metrics

### 30 Days

| Metric | Target | Stretch |
|---|---|---|
| Total signups | 200 | 500 |
| Active (created ≥1 proposal) | 80 | 200 |
| Pro purchases | 20 | 50 |
| Revenue | $400 | $1,000 |
| Product Hunt upvotes | 100 | 300 |
| Landing page conversion (visit → signup) | 8% | 12% |

### 60 Days

| Metric | Target | Stretch |
|---|---|---|
| Total signups | 600 | 1,500 |
| Active users | 250 | 600 |
| Pro purchases (total) | 60 | 150 |
| Revenue (total) | $1,200 | $3,000 |
| SEO organic traffic | 200/month | 500/month |
| Testimonials on site | 3 | 8 |
| Directory listings live | 8 | 12 |

### 90 Days

| Metric | Target | Stretch |
|---|---|---|
| Monthly visitors | 5,000 | 15,000 |
| Total Pro purchases | 150 | 400 |
| Total revenue | $3,000 | $8,000 |
| Free → Pro conversion rate | 15% | 25% |
| SEO organic traffic | 500/month | 2,000/month |
| Proposals created (total) | 1,000 | 3,000 |

**What "good" looks like at 90 days:** $3K+ in total sales. 150+ Pro users. SEO starting to pick up (500+ organic/month). A clear signal on what V2 should prioritize. Proposly appearing in at least 10 directory listings.

**Red flags at 90 days:** Free → Pro conversion below 8%. Demo video <30% completion rate. Bounce rate on landing page >80%. Any of these = go back to messaging before spending more on distribution.

---

## 9. Global SOP Template (For Future Monolith Studio Tools)

*Copy this section for every new tool. Fill in brackets. Skip sections that don't apply.*

---

### [TOOL NAME] Positioning Template

```
One-liner (Twitter):    [What it does in one punchy sentence. No jargon.]
One-liner (PH tagline): [Under 60 chars. Action word first.]
One-liner (LinkedIn):   [Founder POV. Personal. Specific.]
Category:               [Own a niche, not a category.]
Primary ICP:            [Role + pain + trigger moment. Be specific.]
Secondary ICP:          [Who else benefits? Fewer specifics needed.]
Anti-positioning:       [Who should NOT buy this? Name it explicitly.]
```

---

### Platform Activation Checklist

For every Monolith Studio tool, activate platforms in this priority order:

| # | Platform | Activate When | Action |
|---|---|---|---|
| 1 | Product Hunt | Launch day | Full gallery + video |
| 2 | Gumroad | Phase 1 done | Listing live |
| 3 | Twitter/X | Day 1 of building | Build-in-public |
| 4 | Indie Hackers | Pre-launch | Waitlist/milestone post |
| 5 | Reddit | Launch week | r/SideProject + niche sub |
| 6 | LinkedIn | Launch week | Personal post from Jatin |
| 7 | Designer communities | Launch week | Slack groups + Figma Community |
| 8 | AlternativeTo | Launch week | List vs top competitor |
| 9 | Dribbble | Launch +7 days | 3–5 visual shots |
| 10 | SEO content | Month 2 | First blog post |
| 11 | Hacker News | Month 2 (with users) | Show HN |
| 12 | AppSumo | Month 6+ (V2) | Only if feature-complete |

---

### Asset Checklist (Every Tool)

**P0 — Required before launch:**
- [ ] Demo video (90 seconds)
- [ ] OG image (1200×630)
- [ ] Product Hunt gallery (5 images + video)
- [ ] Twitter social card
- [ ] Favicon/brand mark
- [ ] 3 product GIFs
- [ ] Landing page copy (hero + features + FAQ + pricing)
- [ ] Email welcome sequence (3 emails)
- [ ] Twitter bio updated

**P1 — Required in first 30 days:**
- [ ] Comparison table (landing page)
- [ ] Testimonials (3+ real users)
- [ ] First SEO blog post
- [ ] Gumroad listing
- [ ] AlternativeTo listing
- [ ] Dribbble shots (3–5)
- [ ] Indie Hackers product page

**P2 — Month 2+:**
- [ ] Competitor comparison pages
- [ ] Case study (1 real user story)
- [ ] Behance case study (building the product)
- [ ] YouTube demo (if building an audience there)

---

### Launch Sequence Checklist (Days -30 to +30)

**Day -30:**
- [ ] Domain purchased
- [ ] Twitter account created
- [ ] BetaList submission (for waitlist)
- [ ] Waitlist page live

**Day -14:**
- [ ] Product Hunt draft created, assets uploaded
- [ ] Demo video recorded
- [ ] All P0 assets complete
- [ ] Landing page live with waitlist form

**Day -7:**
- [ ] Soft launch to waitlist (25–50 people)
- [ ] 5+ real users providing feedback
- [ ] Critical bugs fixed
- [ ] Gumroad listing live

**Day 0 (Launch):**
- [ ] Product Hunt live at 00:01 PT
- [ ] Email waitlist at 6am PT
- [ ] Post across Twitter, LinkedIn, Reddit simultaneously
- [ ] Respond to every PH comment for first 6 hours
- [ ] Post 3× on Twitter during launch day

**Day +1 to +7:**
- [ ] Indie Hackers launch post (honest numbers)
- [ ] Submit to: AlternativeTo, SaaSHub, Toolfolio, Indie Hackers product page
- [ ] DM outreach to 10 designers/day
- [ ] Reddit post in niche subreddit

**Day +14:**
- [ ] Submit to remaining directories
- [ ] First SEO blog post published
- [ ] Sitemap submitted to Google Search Console
- [ ] Review in-app survey data

**Day +30:**
- [ ] Revenue/conversion review
- [ ] Testimonials added to landing page
- [ ] Email sequence reviewed + optimized
- [ ] Decide on V2 priority based on data

---

### KPI Template (Every Tool)

| Metric | 30-day target | 60-day target | 90-day target |
|---|---|---|---|
| Total signups | [X] | [X] | [X] |
| Active users (core action) | [X] | [X] | [X] |
| Paid conversions | [X] | [X] | [X] |
| Revenue | $[X] | $[X] | $[X] |
| Landing page conversion rate | [X]% | [X]% | [X]% |
| Paid conversion rate (free → paid) | [X]% | [X]% | [X]% |
| SEO organic traffic | [X]/month | [X]/month | [X]/month |

**Red flag thresholds (universal):**
- Landing page bounce rate >80% → messaging problem
- Free → paid conversion <8% → value prop not landing
- Demo video <30% completion → first 10 seconds are wrong
- Any of these → fix messaging before adding distribution

---

*Next action: Check proposly.io and proposly.app domain availability. Purchase today. This is blocking the waitlist page.*
