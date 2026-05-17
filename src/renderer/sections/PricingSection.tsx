import { SectionHeader } from '../SectionHeader'
import { useThemeCtx } from '../ThemeContext'
import type { PricingData } from '@/types'

interface PricingSectionProps {
  data: PricingData
  isInverted?: boolean
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

export function PricingSection({ data, isInverted }: PricingSectionProps) {
  const { layoutVariant } = useThemeCtx()
  const total = data.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
  const textColor = isInverted ? 'var(--t-text-inverse)' : 'var(--t-text-primary)'
  const mutedColor = isInverted ? 'rgba(255,255,255,0.6)' : 'var(--t-text-secondary)'
  const currency = data.currency || 'USD'
  const isBauhausInverted = layoutVariant === 'bauhaus' && isInverted

  return (
    <div className="p-12" style={isBauhausInverted ? { textAlign: 'right' } : undefined}>
      <SectionHeader label="Investment" heading={data.header || 'Investment'} isInverted={isInverted} />
      <table className="w-full">
        <thead>
          <tr className={isBauhausInverted ? 'text-right' : 'text-left'}>
            <th className="pb-3 text-xs font-bold uppercase tracking-widest" style={{ color: isInverted ? 'rgba(255,255,255,0.6)' : 'var(--t-accent-text)', width: '60%' }}>Description</th>
            <th className="pb-3 text-xs font-bold uppercase tracking-widest text-right" style={{ color: isInverted ? 'rgba(255,255,255,0.6)' : 'var(--t-accent-text)', width: '15%' }}>Qty</th>
            <th className="pb-3 text-xs font-bold uppercase tracking-widest text-right" style={{ color: isInverted ? 'rgba(255,255,255,0.6)' : 'var(--t-accent-text)', width: '25%' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-t" style={{ borderColor: isInverted ? 'rgba(255,255,255,0.12)' : 'var(--t-rule)' }}>
              <td className="py-3 text-sm" style={{ color: textColor }}>{item.description || '—'}</td>
              <td className="py-3 text-sm text-right" style={{ color: mutedColor }}>{item.qty}</td>
              <td className="py-3 text-sm font-semibold text-right" style={{ color: textColor }}>{formatCurrency(item.qty * item.unitPrice, currency)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2" style={{ borderColor: isInverted ? 'rgba(255,255,255,0.3)' : 'var(--t-accent-text)' }}>
            {isBauhausInverted ? (
              <td colSpan={3} className="pt-6" style={{ textAlign: 'right' }}>
                <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Total Investment
                </div>
                <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                  {formatCurrency(total, currency)}
                </div>
              </td>
            ) : (
              <>
                <td colSpan={2} className="pt-4 text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--t-accent-text)' }}>Total Investment</td>
                <td className="pt-4 text-2xl font-bold text-right" style={{ color: textColor }}>{formatCurrency(total, currency)}</td>
              </>
            )}
          </tr>
        </tfoot>
      </table>
      {data.notes && (
        <p className="mt-6 text-sm" style={{ color: mutedColor }}>{data.notes}</p>
      )}
    </div>
  )
}
