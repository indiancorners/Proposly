import type { ThemeId } from '@/types'
import { themeRegistry } from '@/constants/themes'

export function LandingTemplateThumbnail({ themeId }: { themeId: ThemeId }) {
  const theme = themeRegistry[themeId]
  const v = theme.cssVars

  const coverBg     = v['--t-cover-bg']
  const coverText   = v['--t-cover-text']
  const coverAccent = v['--t-cover-accent']
  const bgPrimary   = v['--t-bg-primary']
  const bgSecondary = v['--t-bg-secondary']
  const accent      = v['--t-accent']
  const accentText  = v['--t-accent-text']
  const textPrimary = v['--t-text-primary']
  const textSecondary = v['--t-text-secondary']
  const rule        = v['--t-rule']
  const priceBg     = v['--t-price-bg']
  const priceText   = v['--t-price-text']

  const isFolio  = themeId === 'folio'
  const isDusk   = themeId === 'dusk'
  const isSignal = themeId === 'signal'
  const isVerso  = themeId === 'verso'
  const isCipher = themeId === 'cipher'

  return (
    <div style={{
      width: '300px', height: '400px',
      background: bgPrimary, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Inter", ui-sans-serif, sans-serif',
      position: 'relative',
    }}>
      {isCipher && (
        <div style={{
          position: 'absolute', top: '48%', left: '50%',
          transform: 'translate(-50%, -50%) rotate(-25deg)',
          fontSize: '42px', fontWeight: 900, color: '#635BFF', opacity: 0.05,
          letterSpacing: '0.14em', userSelect: 'none', whiteSpace: 'nowrap',
        }}>PROPOSLY</div>
      )}

      {/* Cover */}
      <div style={{
        background: coverBg, height: '144px',
        padding: '20px 22px 18px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        position: 'relative', flexShrink: 0,
      }}>
        {isFolio && <div style={{ position: 'absolute', top: '20px', left: '22px', right: '22px', height: '0.5px', background: rule }} />}
        {isSignal && (
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        )}
        {isDusk && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(17,16,20,0.8), transparent)' }} />
        )}
        <div style={{ fontSize: '7.5px', fontWeight: 600, letterSpacing: '0.12em', color: isFolio ? textSecondary : coverText, opacity: isFolio ? 0.55 : 0.65, marginBottom: '6px', position: 'relative' }}>
          MONOLITH STUDIO
        </div>
        <div style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.05, color: isFolio ? textPrimary : coverText, position: 'relative', letterSpacing: '-0.01em' }}>
          Brand Identity<br />System
        </div>
        {isDusk && <div style={{ marginTop: '10px', width: '40px', height: '2px', background: accent, position: 'relative' }} />}
        {isVerso && <div style={{ marginTop: '10px', width: '32px', height: '3.5px', background: coverText, position: 'relative' }} />}
        {isCipher && <div style={{ marginTop: '8px', width: '36px', height: '1.5px', background: coverAccent, position: 'relative' }} />}
        {isSignal && (
          <div style={{ marginTop: '10px', alignSelf: 'flex-start', position: 'relative', fontSize: '7px', fontWeight: 600, color: coverText, opacity: 0.75, background: 'rgba(255,255,255,0.18)', borderRadius: '3px', padding: '3px 6px' }}>
            Prepared for Acme Corp
          </div>
        )}
        {isFolio && <div style={{ marginTop: '6px', fontSize: '7px', color: textSecondary, opacity: 0.45, position: 'relative' }}>May 2026 · Proposal</div>}
      </div>

      {/* Overview */}
      <div style={{ padding: '14px 22px 12px', background: bgPrimary, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          {isDusk
            ? <span style={{ fontSize: '7px', fontWeight: 700, color: accent, letterSpacing: '0.12em' }}>01 — OVERVIEW</span>
            : (<><div style={{ height: '0.5px', background: rule, width: '18px', flexShrink: 0 }} /><span style={{ fontSize: '6.5px', fontWeight: 700, letterSpacing: '0.12em', color: accentText, opacity: 0.65 }}>OVERVIEW</span></>)
          }
        </div>
        <div style={{ height: '7px', background: textPrimary, borderRadius: '1.5px', width: '68%', marginBottom: '8px', opacity: 0.88 }} />
        <div style={{ height: '4.5px', background: textSecondary, borderRadius: '1px', opacity: 0.28, marginBottom: '5px' }} />
        <div style={{ height: '4.5px', background: textSecondary, borderRadius: '1px', opacity: 0.28, width: '82%' }} />
      </div>

      {/* Scope */}
      <div style={{ flex: 1, padding: '12px 22px', background: isVerso ? bgSecondary : bgPrimary }}>
        <div style={{ marginBottom: '10px' }}>
          {isDusk
            ? <span style={{ fontSize: '7px', fontWeight: 700, color: accent, letterSpacing: '0.12em' }}>02 — SCOPE</span>
            : <span style={{ fontSize: '6.5px', fontWeight: 700, letterSpacing: '0.12em', color: isVerso ? 'rgba(255,255,255,0.5)' : accentText, opacity: isVerso ? 1 : 0.65 }}>SCOPE OF WORK</span>
          }
        </div>
        {[78, 60, 70].map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px', background: isSignal ? bgSecondary : 'transparent', borderRadius: isSignal ? '5px' : 0, padding: isSignal ? '5px 7px' : 0 }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0, background: isVerso ? 'rgba(255,255,255,0.5)' : accentText, opacity: isVerso ? 1 : 0.7 }} />
            <div style={{ height: '4.5px', borderRadius: '1px', width: `${w}%`, background: isVerso ? 'rgba(255,255,255,0.3)' : textSecondary, opacity: isVerso ? 1 : 0.28 }} />
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div style={{ padding: '10px 22px 14px', background: bgPrimary, flexShrink: 0 }}>
        <div style={{ height: '0.5px', background: rule, marginBottom: '8px' }} />
        {[0, 1].map((i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ height: '4px', width: '44%', background: textSecondary, borderRadius: '1px', opacity: 0.26 }} />
            <div style={{ height: '4px', width: '18%', background: textSecondary, borderRadius: '1px', opacity: 0.35 }} />
          </div>
        ))}
        <div style={{ background: priceBg, padding: '6px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px' }}>
          <div style={{ height: '4px', width: '22%', background: priceText, borderRadius: '1px', opacity: 0.45 }} />
          <div style={{ height: '6px', width: '24%', borderRadius: '1.5px', background: (isDusk || isCipher) ? accent : priceText, opacity: isDusk ? 1 : 0.82 }} />
        </div>
      </div>
    </div>
  )
}