import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, FileText, Eye, Download, BarChart3, Link2, Zap, ArrowRight } from 'lucide-react'
import { themeList, themeRegistry } from '@/constants/themes'
import { LandingTemplateThumbnail } from '@/pages/LandingTemplateThumbnail'
import { TemplatePreviewModal } from '@/pages/TemplatePreviewModal'
import type { ThemeId } from '@/types'

const ease = [0.16, 1, 0.3, 1] as const
const MINI_SCALE = 72 / 300

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-56px' },
    transition: { duration: 0.8, ease, delay },
  }
}

const STEPS = [
  { num: '01', title: 'Pick a template', desc: 'Choose from 5 premium templates. Each is typeset, production-ready, and distinct — Folio is free forever.' },
  { num: '02', title: 'Fill in the details', desc: 'Project title, scope, timeline, pricing — your proposal takes shape section by section as you type.' },
  { num: '03', title: 'Download or share', desc: 'Export as a pixel-perfect A4 PDF or send a public link your client opens directly in their browser.' },
]

const FEATURES_SMALL = [
  { icon: Eye,       title: 'Live preview',  body: 'See every change in real time. What you see is exactly what your client gets.' },
  { icon: Download,  title: 'PDF export',    body: 'A4-perfect, 2× resolution. Ready to attach and send in seconds.' },
  { icon: Link2,     title: 'Share links',   body: 'Generate a public URL, track views, and revoke access anytime.' },
  { icon: BarChart3, title: 'Pipeline',      body: 'Track Draft, Sent, Won, Lost. See your total pipeline value at a glance.' },
  { icon: Zap,       title: 'Under 5 minutes',  body: 'New proposal to downloaded PDF in under 5 minutes. Built for agencies.' },
]

const FREE_FEATURES = ['3 proposals', 'Folio template', 'Live preview', 'Save to dashboard']
const PRO_FEATURES  = ['Unlimited proposals', 'All 5 templates', 'PDF + PNG export', 'Public share links', 'Pipeline analytics', 'Lifetime updates']

export function LandingPage() {
  const navigate = useNavigate()
  const [activeTpl, setActiveTpl] = useState<ThemeId>('signal')
  const activeTheme = themeRegistry[activeTpl]
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewTheme, setPreviewTheme] = useState<ThemeId>('folio')
  return (
    <div className="bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-10 text-center">
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(37,99,235,0.08) 0%, transparent 68%)' }} />
        <motion.div className="relative max-w-4xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold mb-10 tracking-wide" style={{ border: '1px solid rgba(37,99,235,0.18)', background: 'rgba(37,99,235,0.05)', color: '#2563EB' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#16A34A' }} />
            Free to start · $20 for Pro, once
          </div>
          <h1 className="font-extrabold tracking-tight mb-6" style={{ fontSize: 'clamp(44px, 7.5vw, 92px)', lineHeight: 1.05, letterSpacing: '-0.04em', color: '#1D1D1F' }}>
            Agency-grade proposals.<br /><span style={{ color: '#2563EB' }}>Built in minutes.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl" style={{ fontSize: '20px', lineHeight: 1.6, color: '#6E6E73' }}>
            Stop formatting Word docs. Proposly generates beautifully typeset proposals with 5 premium templates — PDF, share, and win — faster than you thought possible.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button onClick={() => navigate('/app/create')} className="inline-flex items-center gap-2 h-12 px-7 rounded-full text-[15px] font-semibold transition-all duration-200 group hover:opacity-80" style={{ background: '#1D1D1F', color: '#FFFFFF' }}>
              Create your first proposal
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
            <button onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center h-12 px-7 rounded-full text-[15px] font-semibold transition-all duration-200 hover:opacity-70" style={{ background: '#F5F5F7', color: '#1D1D1F', border: '1px solid #D2D2D7' }}>
              See templates
            </button>
          </div>
          <p className="mt-4 text-[12px]" style={{ color: '#86868B' }}>3 free proposals · No card needed</p>
        </motion.div>

      </section>

      {/* EDITORIAL BREAK */}
      <section className="py-20 px-6 bg-white" style={{ borderTop: '1px solid #D2D2D7', borderBottom: '1px solid #D2D2D7' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16"
            {...fadeUp(0)}
          >
            {/* Left: editorial statement + USPs */}
            <div style={{ flex: '1 1 0' }}>
              <p
                className="font-extrabold"
                style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', letterSpacing: '-0.035em', lineHeight: 1.1, color: '#1D1D1F' }}
              >
                Most proposals lose before they're read.
              </p>
              <p
                className="mt-4"
                style={{ fontSize: '16px', color: '#6E6E73', lineHeight: 1.7, maxWidth: '480px' }}
              >
                Clients decide in seconds. A poorly formatted proposal signals how you'll manage their project — before you've said a word. The agencies that win consistently are the ones who show up looking the part.
              </p>

              {/* Differentiator pills */}
              <div className="flex flex-col gap-2.5 mt-7" style={{ maxWidth: '480px' }}>
                {[
                  { icon: '⚡', label: 'Client-ready in under 5 minutes' },
                  { icon: '✦', label: 'A4-perfect PDF, every template' },
                  { icon: '→', label: 'Share with a link, track who opened it' },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px 18px', borderRadius: '12px',
                      background: '#F5F5F7', border: '1px solid #E8E8ED',
                    }}
                  >
                    <span style={{ fontSize: '16px', flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1D1D1F' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: product illustration */}
            <div className="flex-shrink-0 w-full md:w-[380px] flex items-center justify-center">
              <img
                src="/product-release.png"
                alt="Launch agency-grade proposals in minutes"
                className="w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>
      {/* TEMPLATES — featured showcase */}
      <section id="templates" className="py-24 px-6" style={{ background: '#1D1D1F' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-5" style={{ color: '#86868B' }}>Templates</p>
            <h2 className="font-bold text-white" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.035em', lineHeight: 1.07 }}>
              Five templates built to win.
            </h2>
            <p className="mt-4 text-[16px]" style={{ color: '#6E6E73' }}>One free. Four Pro. Every one is typeset, production-ready, and distinct.</p>
          </motion.div>

          {/* Featured: preview + info */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col md:flex-row gap-14 items-center justify-center mb-16">
            {/* Preview */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: '-20px', background: `radial-gradient(ellipse at center, ${activeTheme.cssVars['--t-cover-bg']}30 0%, transparent 70%)`, pointerEvents: 'none', transition: 'background 0.5s ease' }} />
              <AnimatePresence mode="wait">
                <motion.div key={activeTpl} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  style={{ width: '280px', height: '373px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)', position: 'relative' }}>
                  <LandingTemplateThumbnail themeId={activeTpl} />
                </motion.div>
              </AnimatePresence>
              <div style={{ position: 'absolute', bottom: '-22px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                A4 · PDF READY
              </div>
            </div>

            {/* Info + CTA */}
            <div style={{ flex: 1, maxWidth: '320px' }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeTpl} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '20px', background: activeTheme.tier === 'free' ? 'rgba(48,209,88,0.15)' : 'rgba(255,255,255,0.08)', color: activeTheme.tier === 'free' ? '#30D158' : 'rgba(255,255,255,0.45)' }}>
                      {activeTheme.tier === 'free' ? '✦ FREE FOREVER' : 'PRO TEMPLATE'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'white', marginBottom: '10px' }}>{activeTheme.name}</h3>
                  <p style={{ fontSize: '15px', color: '#86868B', lineHeight: 1.6, marginBottom: '24px' }}>{activeTheme.description}</p>

                  {activeTheme.tier === 'pro' && (
                    <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '13px', color: 'white' }}>✦</div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'white', marginBottom: '3px' }}>All 5 templates included</div>
                        <div style={{ fontSize: '12px', color: '#86868B' }}>$20 once — unlimited proposals, PDF export, share links, lifetime updates.</div>
                      </div>
                    </div>
                  )}

                  {activeTheme.tier === 'free' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button onClick={() => navigate('/app/create')} className="inline-flex items-center gap-2 rounded-full font-semibold transition-opacity hover:opacity-85 group" style={{ height: '48px', padding: '0 28px', background: 'white', color: '#1D1D1F', fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                        Start with Folio — free
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </button>
                      <button onClick={() => { setPreviewTheme(activeTpl); setPreviewOpen(true) }} className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-opacity hover:opacity-80" style={{ height: '44px', padding: '0 24px', background: 'transparent', color: 'white', fontSize: '14px', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer' }}>
                        <Eye size={14} />
                        Preview full proposal
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button onClick={() => navigate('/app/upgrade')} className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-opacity hover:opacity-85 group" style={{ height: '48px', padding: '0 28px', background: '#2563EB', color: 'white', fontSize: '14px', width: '100%', border: 'none', cursor: 'pointer' }}>
                        Get Pro — $20 once
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </button>
                      <button onClick={() => { setPreviewTheme(activeTpl); setPreviewOpen(true) }} className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-opacity hover:opacity-80" style={{ height: '44px', padding: '0 24px', background: 'white', color: '#1D1D1F', fontSize: '14px', width: '100%', border: 'none', cursor: 'pointer' }}>
                        <Eye size={14} />
                        Preview full proposal
                      </button>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
                        Already Pro?{' '}
                        <button onClick={() => navigate('/app')} style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px', padding: 0 }}>
                          Sign in to use this template →
                        </button>
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mini gallery */}
          <motion.div {...fadeUp(0.2)} className="flex gap-3 justify-start md:justify-center overflow-x-auto pb-2">
            {themeList.map((theme) => (
              <button key={theme.id} onClick={() => setActiveTpl(theme.id as ThemeId)} style={{ padding: 0, background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', border: 'none', flexShrink: 0 }}>
                <div style={{ width: '72px', height: '96px', borderRadius: '10px', overflow: 'hidden', position: 'relative', border: activeTpl === theme.id ? '2px solid rgba(255,255,255,0.8)' : '1.5px solid rgba(255,255,255,0.1)', transition: 'all 0.2s', transform: activeTpl === theme.id ? 'scale(1.06)' : 'scale(1)', boxShadow: activeTpl === theme.id ? '0 8px 24px rgba(0,0,0,0.5)' : 'none' }}>
                  <div style={{ width: '300px', height: '400px', transform: `scale(${MINI_SCALE})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                    <LandingTemplateThumbnail themeId={theme.id as ThemeId} />
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: activeTpl === theme.id ? 'white' : 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}>{theme.name}</div>
                  <div style={{ fontSize: '9px', color: theme.tier === 'free' ? '#30D158' : activeTpl === theme.id ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)', transition: 'color 0.2s' }}>{theme.tier === 'free' ? 'Free' : 'Pro'}</div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>
      {/* HOW IT WORKS */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-20" {...fadeUp(0)}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-5" style={{ color: '#86868B' }}>How it works</p>
            <h2 className="font-bold" style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-0.035em', lineHeight: 1.07, color: '#1D1D1F' }}>
              Three steps.<br />One great proposal.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: '1px solid #D2D2D7', borderRadius: '20px', overflow: 'hidden' }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.num} {...fadeUp(i * 0.1)} className={`p-6 sm:p-10 flex flex-col ${i < 2 ? 'border-b md:border-b-0 md:border-r' : ''}`} style={{ borderColor: '#D2D2D7' }}>
                <p className="font-extrabold mb-8 leading-none select-none" style={{ fontSize: '72px', letterSpacing: '-0.04em', color: '#F5F5F7' }}>{step.num}</p>
                <h3 className="font-bold mb-3" style={{ fontSize: '17px', letterSpacing: '-0.01em', color: '#1D1D1F' }}>{step.title}</h3>
                <p className="text-[14px]" style={{ color: '#6E6E73', lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section className="py-32 px-6" style={{ background: '#F5F5F7' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="mb-14" {...fadeUp(0)}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-5" style={{ color: '#86868B' }}>Features</p>
            <h2 className="font-bold max-w-xl" style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-0.035em', lineHeight: 1.07, color: '#1D1D1F' }}>Everything you need to close.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <motion.div {...fadeUp(0)} className="md:col-span-2 rounded-2xl p-8 flex flex-col justify-between" style={{ background: 'white', minHeight: '240px' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-auto" style={{ background: '#EFF6FF' }}>
                <FileText className="h-5 w-5" style={{ color: '#2563EB' }} />
              </div>
              <div className="mt-10">
                <h3 className="font-bold mb-2" style={{ fontSize: '20px', letterSpacing: '-0.01em', color: '#1D1D1F' }}>Smart form builder</h3>
                <p className="text-[14px]" style={{ color: '#6E6E73', lineHeight: 1.65 }}>Section-by-section form. Edit headers, add copy, build pricing tables. No AI, no fluff — just clean inputs that produce beautiful output instantly, every time.</p>
              </div>
            </motion.div>
            {FEATURES_SMALL.map((f, i) => (
              <motion.div key={f.title} {...fadeUp((i + 1) * 0.06)} className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: 'white' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#EFF6FF' }}>
                  <f.icon className="h-4 w-4" style={{ color: '#2563EB' }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1.5" style={{ fontSize: '14px', letterSpacing: '-0.01em', color: '#1D1D1F' }}>{f.title}</h3>
                  <p className="text-[13px]" style={{ color: '#6E6E73', lineHeight: 1.6 }}>{f.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp(0)}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-5" style={{ color: '#86868B' }}>Pricing</p>
            <h2 className="font-bold" style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-0.035em', lineHeight: 1.07, color: '#1D1D1F' }}>One price. No games.</h2>
            <p className="mt-4 text-[17px]" style={{ color: '#6E6E73' }}>Free forever or Pro once. No subscriptions, no renewals, no gotchas.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <motion.div {...fadeUp(0)} className="rounded-2xl p-8 flex flex-col" style={{ border: '1px solid #D2D2D7' }}>
              <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-5" style={{ color: '#86868B' }}>Free</p>
                <p className="font-bold mb-1" style={{ fontSize: '48px', letterSpacing: '-0.04em', color: '#1D1D1F' }}>$0</p>
                <p className="text-[14px]" style={{ color: '#6E6E73' }}>Forever. No card needed.</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px]" style={{ color: '#1D1D1F' }}>
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: '#16A34A' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/app/create')} className="w-full h-11 rounded-full text-[14px] font-semibold transition-colors hover:opacity-70" style={{ border: '1px solid #D2D2D7', color: '#1D1D1F', background: 'transparent' }}>
                Start free
              </button>
            </motion.div>
            <motion.div {...fadeUp(0.08)} className="rounded-2xl p-8 flex flex-col relative overflow-hidden" style={{ background: '#1D1D1F' }}>
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Pro</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#2563EB', color: 'white' }}>Most popular</span>
                </div>
                <p className="font-bold mb-1 text-white" style={{ fontSize: '48px', letterSpacing: '-0.04em' }}>$20</p>
                <p className="text-[14px]" style={{ color: '#86868B' }}>One-time. Lifetime access.</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-white">
                    <Check className="h-4 w-4 flex-shrink-0" style={{ color: '#30D158' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/app/upgrade')} className="w-full h-11 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-85" style={{ background: 'white', color: '#1D1D1F' }}>
                Get Pro — $20 once
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-36 px-6 text-center" style={{ background: '#1D1D1F' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.035em', lineHeight: 1.07 }}>
              Your next proposal is<br />5 minutes away.
            </h2>
            <p className="mb-10 text-[17px]" style={{ color: '#86868B' }}>Free to start. No design skills needed. No Word docs.</p>
            <button onClick={() => navigate('/app/create')} className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-80 group" style={{ background: 'white', color: '#1D1D1F' }}>
              Create your first proposal — free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </motion.div>
        </div>
      </section>

      <TemplatePreviewModal
        isOpen={previewOpen}
        initialThemeId={previewTheme}
        onClose={() => setPreviewOpen(false)}
      />
    </div>
  )
}