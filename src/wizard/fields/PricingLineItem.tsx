import { Input } from '@/ui/Input'
import { Trash2 } from 'lucide-react'
import type { PricingLineItem as PricingLineItemType } from '@/types'

interface PricingLineItemProps {
  item: PricingLineItemType
  currency: string
  onChange: (item: PricingLineItemType) => void
  onRemove: () => void
}

export function PricingLineItem({ item, currency, onChange, onRemove }: PricingLineItemProps) {
  const amount = item.qty * item.unitPrice

  function update(key: keyof PricingLineItemType, value: string | number) {
    onChange({ ...item, [key]: value })
  }

  return (
    <div className="flex gap-2 items-end p-3 rounded-xl border border-border bg-subtle">
      <div className="flex-1">
        <Input
          label="Description"
          placeholder="e.g. Brand Strategy"
          value={item.description}
          onChange={(e) => update('description', e.target.value)}
        />
      </div>
      <div className="w-16">
        <Input
          label="Qty"
          type="number"
          min={1}
          value={item.qty}
          onChange={(e) => update('qty', parseInt(e.target.value, 10) || 1)}
        />
      </div>
      <div className="w-28">
        <Input
          label={`Unit (${currency})`}
          type="number"
          min={0}
          value={item.unitPrice}
          onChange={(e) => update('unitPrice', parseFloat(e.target.value) || 0)}
        />
      </div>
      <div className="w-24 text-right pb-0.5">
        <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">Total</p>
        <p className="text-sm font-bold text-foreground">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)}
        </p>
      </div>
      <button
        className="mb-0.5 text-placeholder hover:text-danger transition-colors"
        onClick={onRemove}
        title="Remove"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
