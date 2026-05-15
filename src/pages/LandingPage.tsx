import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, FileText, Eye, Download, BarChart3, Link2, Zap, ArrowRight } from 'lucide-react'
import { themeList } from '@/constants/themes'
import { ThemePreviewThumbnail } from '@/wizard/ThemePreviewThumbnail'
import type { ThemeId } from '@/types'

const ease = [0.16, 1, 0.3, 1] as const

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-56px' },
    transition: { duration: 0.8, ease, delay },
  }
}

const STEPS = [
  {
    num: '01',
    title: 'Pick a template',
    desc: 'Choose from 5 premium templates. Each is typeset, production-ready, and distinct — Folio is free forever.',
  },
  {
    num: '02',
    title: 'Fill in the details',
    desc: 'Project title, scope, timeline, pricing — your proposal takes shape section by section as you type.',
  },
  {
    num: '03',
    title: 'Download or share',
    desc: 'Export as a pixel-perfect A4 PDF or send a public link your client opens directly in their browser.',
  },
]

const FEATURES_SMALL = [
  { icon: Eye,      title: 'Live preview',   body: 'See every change in real time. What you see is exactly what your client gets.' },
  { icon: Download, title: 'PDF export',     body: 'A4-perfect, 2× resolution. Ready to attach and send in seconds.' },
  { icon: Link2,    title: 'Share links',    body: 'Generate a public URL, track views, and revoke access anytime.' },
  { icon: BarChart3,title: 'Pipeline',       body: 'Track Draft, Sent, Won, Lost. See your total pipeline value at a glance.' },
  { icon: Zap,      title: 'Fast as hell',   body: 'New proposal to downloaded PDF in under 5 minutes. Built for agencies.' },
]

const FREE_FEATURES = ['1 proposal', 'Folio template', 'Live preview', 'Save to dashboard']
const PRO_FEATURES  = ['Unlimited proposals', 'All 5 templates', 'PDF + PNG export', 'Public share links', 'Pipeline analytics', 'Lifetime updates']

export function LandingPage() {
  const navigate = useNavigate()

  const heroOffsets = [28, 14, 0, 14, 28]

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-10 text-center">
        {/* Gradient mesh */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(37,99,235,0.08) 0%, transparent 68%)',
          }}
        />

        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold mb-10 tracking-wide"
            style={{
              border: '1px solid rgba(37,99,235,0.18)',
              background: 'rgba(37,99,235,0.05)',
              color: '#2563EB',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#16A34A' }}
            />
            Free to start · $20 for Pro, once
          </div>

          {/* Headline */}
          <h1
            className="font-extrabold tracking-tight mb-6"
            style={{
              fontSize: 'clamp(44px, 7.5vw, 92px)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#1D1D1F',
            }}
          >
            Agency-grade proposals.
            <br />
            Built in minutes.
          </h1>

          {/* Sub */}
          <p
            className="mx-auto mb-10 max-w-2xl"
            style={{ fontSize: '20px', lineHeight: 1.6, color: '#6E6E73' }}
          >
            Stop formatting Word docs. Proposly generates beautifully typeset proposals
            with 5 premium templates — PDF, share, and win — faster than you thought possible.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => navigate('/app/create')}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full text-[15px] font-semibold transition-all duration-200 group hover:opacity-80"
              style={{ background: '#1D1D1F', color: '#FFFFFF' }}
            >
              Create your first proposal
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
            <button
              onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center h-12 px-7 rounded-full text-[15px] font-semibold transition-all duration-200 hover:opacity-70"
              style={{ background: '#F5F5F7', color: '#1D1D1F', border: '1px solid #D2D2D7' }}
            >
              See templates
            </button>
          </div>

          <p className="mt-4 text-[12px]" style={{ color: '#86868B' }}>
            No credit card required · 1 free proposal, always
          </p>
        </motion.div>

        {/* Template strip — staggered wave */}
        <div className="relative w-full max-w-5xl mx-auto mt-16 px-4 overflow-visible">
          <div className="flex items-end justify-center gap-3">
            {themeList.map((theme, i) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: heroOffsets[i] }}
                transition={{ duration: 1, delay: 0.15 + i * 0.07, ease }}
                className="flex-1 max-w-[190px] cursor-pointer group"
                onClick={() => navigate('/app/create')}
              >
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-[1.03]"
                  style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12)', outline: '1px solid rgba(0,0,0,0.06)' }}
                >
                  <ThemePreviewThumbnail themeId={theme.id as ThemeId} />
                </div>
                <div className="mt-2.5 text-center">
                  <p className="text-[12px] font-semibold" style={{ color: '#1D1D1F' }}>{theme.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: theme.tier === 'free' ? '#16A34A' : '#86868B' }}>
                    {theme.tier === 'free' ? 'Free' : 'Pro'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Fade out bottom */}
          <div
            aria-hidden
            className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #ffffff 0%, transparent 100%)' }}
          />
        </div>
      </section>

      {/* ── METRICS STRIP ─────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid #D2D2D7', borderBottom: '1px solid #D2D2D7' }}>
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
            {[
              { value: '5 min', label: 'average time to first proposal' },
              { value: '5',     label: 'premium templates included' },
              { value: '$20',   label: 'one-time Pro, no renewals' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="font-bold"
                  style={{ fontSize: '28px', letterSpacing: '-0.03em', color: '#1D1D1F' }}
                >
                  {stat.value}
                </p>
                <p className="text-[13px] mt-1" style={{ color: '#6E6E73' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES (dark) ──────────────────────────────────────── */}
      <section id="templates" className="py-32 px-6" style={{ background: '#1D1D1F' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#86868B' }}
            >
              Templates
            </p>
            <h2
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(32px, 5vw, 60px)',
                letterSpacing: '-0.035em',
                lineHeight: 1.07,
              }}
            >
              Five templates.
              <br />
              Zero compromise.
            </h2>
            <p className="mt-5 text-[17px]" style={{ color: '#86868B' }}>
              One free. Four Pro. Every one is typeset, production-ready, and distinct.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {themeList.map((theme) => (
              <motion.div
                key={theme.id}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
                }}
                className="group cursor-pointer"
                onClick={() => navigate('/app/create')}
              >
                <div
                  className="rounded-xl overflow-hidden mb-3 transition-all duration-300 group-hover:scale-[1.03]"
                  style={{
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                    outline: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <ThemePreviewThumbnail themeId={theme.id as ThemeId} />
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-semibold text-white">{theme.name}</p>
                  <p
                    className="text-[12px] mt-0.5"
                    style={{ color: theme.tier === 'free' ? '#30D158' : '#86868B' }}
                  >
                    {theme.tier === 'free' ? 'Free' : 'Pro · $20'}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-14" {...fadeUp(0.2)}>
            <button
              onClick={() => navigate('/app/create')}
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-80"
              style={{ background: 'white', color: '#1D1D1F' }}
            >
              Start with Folio — free
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-20" {...fadeUp(0)}>
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#86868B' }}
            >
              How it works
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(32px, 5vw, 60px)',
                letterSpacing: '-0.035em',
                lineHeight: 1.07,
                color: '#1D1D1F',
              }}
            >
              Three steps.
              <br />
              One great proposal.
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ border: '1px solid #D2D2D7' }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                {...fadeUp(i * 0.1)}
                className="p-10 flex flex-col"
                style={{
                  borderRight: i < 2 ? '1px solid #D2D2D7' : undefined,
                }}
              >
                <p
                  className="font-extrabold mb-8 leading-none select-none"
                  style={{ fontSize: '72px', letterSpacing: '-0.04em', color: '#F5F5F7' }}
                >
                  {step.num}
                </p>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: '17px', letterSpacing: '-0.01em', color: '#1D1D1F' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: '#6E6E73', lineHeight: 1.65 }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ───────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: '#F5F5F7' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="mb-14" {...fadeUp(0)}>
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#86868B' }}
            >
              Features
            </p>
            <h2
              className="font-bold max-w-xl"
              style={{
                fontSize: 'clamp(32px, 5vw, 60px)',
                letterSpacing: '-0.035em',
                lineHeight: 1.07,
                color: '#1D1D1F',
              }}
            >
              Everything you need to close.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Large card — spans 2 cols */}
            <motion.div
              {...fadeUp(0)}
              className="md:col-span-2 rounded-2xl p-8 flex flex-col justify-between"
              style={{ background: 'white', minHeight: '240px' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-auto"
                style={{ background: '#EFF6FF' }}
              >
                <FileText className="h-5 w-5" style={{ color: '#2563EB' }} />
              </div>
              <div className="mt-10">
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: '20px', letterSpacing: '-0.01em', color: '#1D1D1F' }}
                >
                  Smart form builder
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: '#6E6E73', lineHeight: 1.65 }}>
                  Section-by-section form. Edit headers, add copy, build pricing tables. No AI, no fluff —
                  just clean inputs that produce beautiful output instantly, every time.
                </p>
              </div>
            </motion.div>

            {/* Small cards */}
            {FEATURES_SMALL.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp((i + 1) * 0.06)}
                className="rounded-2xl p-6 flex flex-col gap-5"
                style={{ background: 'white' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: '#EFF6FF' }}
                >
                  <f.icon className="h-4 w-4" style={{ color: '#2563EB' }} />
                </div>
                <div>
                  <h3
                    className="font-bold mb-1.5"
                    style={{ fontSize: '14px', letterSpacing: '-0.01em', color: '#1D1D1F' }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-[13px]" style={{ color: '#6E6E73', lineHeight: 1.6 }}>
                    {f.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section id="pricing" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-5"
              style={{ color: '#86868B' }}
            >
              Pricing
            </p>
            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(32px, 5vw, 60px)',
                letterSpacing: '-0.035em',
                lineHeight: 1.07,
                color: '#1D1D1F',
              }}
            >
              One price. No games.
            </h2>
            <p className="mt-4 text-[17px]" style={{ color: '#6E6E73' }}>
              Free forever or Pro once. No subscriptions, no renewals, no gotchas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Free */}
            <motion.div
              {...fadeUp(0)}
              className="rounded-2xl p-8 flex flex-col"
              style={{ border: '1px solid #D2D2D7' }}
            >
              <div className="mb-6">
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-5"
                  style={{ color: '#86868B' }}
                >
                  Free
                </p>
                <p
                  className="font-bold mb-1"
                  style={{ fontSize: '48px', letterSpacing: '-0.04em', color: '#1D1D1F' }}
                >
                  $0
                </p>
                <p className="text-[14px]" style={{ color: '#6E6E73' }}>
                  Forever. No card needed.
                </p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px]" style={{ color: '#1D1D1F' }}>
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: '#16A34A' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/app/create')}
                className="w-full h-11 rounded-full text-[14px] font-semibold transition-colors hover:opacity-70"
                style={{ border: '1px solid #D2D2D7', color: '#1D1D1F', background: 'transparent' }}
              >
                Start free
              </button>
            </motion.div>

            {/* Pro */}
            <motion.div
              {...fadeUp(0.08)}
              className="rounded-2xl p-8 flex flex-col relative overflow-hidden"
              style={{ background: '#1D1D1F' }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Pro
                  </p>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: '#2563EB', color: 'white' }}
                  >
                    Most popular
                  </span>
                </div>
                <p
                  className="font-bold mb-1 text-white"
                  style={{ fontSize: '48px', letterSpacing: '-0.04em' }}
                >
                  $20
                </p>
                <p className="text-[14px]" style={{ color: '#86868B' }}>
                  One-time. Lifetime access.
                </p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-white">
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: '#30D158' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/app/upgrade')}
                className="w-full h-11 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-85"
                style={{ background: 'white', color: '#1D1D1F' }}
              >
                Get Pro — $20 once
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-36 px-6 text-center" style={{ background: '#1D1D1F' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <h2
              className="font-bold text-white mb-6"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                letterSpacing: '-0.035em',
                lineHeight: 1.07,
              }}
            >
              Your next proposal is
              <br />5 minutes away.
            </h2>
            <p className="mb-10 text-[17px]" style={{ color: '#86868B' }}>
              Free to start. No design skills needed. No Word docs.
            </p>
            <button
              onClick={() => navigate('/app/create')}
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-80 group"
              style={{ background: 'white', color: '#1D1D1F' }}
            >
              Create your first proposal — free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
